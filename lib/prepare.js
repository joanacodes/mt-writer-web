/* Makes sure a row has its French (or English) title/keyword/slug before writing in that language. */
import { db, settings, doc, log } from './db';
import { callText } from './providers';
import { record, normalise } from './cost';

export const slugify = (s) => String(s || '').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 70);

async function uniquePath(prefix, slug) {
  const { data } = await db.from('plan').select('path_en,path_fr');
  const used = new Set((data || []).flatMap((x) => [x.path_en, x.path_fr]).filter(Boolean));
  let s = slug, p = `${prefix}${s}/`;
  while (used.has(p)) { s += '-2'; p = `${prefix}${s}/`; }
  return { slug: s, path: p };
}

export async function ensureLanguage(row, lang) {
  const has = lang === 'fr' ? row.title_fr && row.slug_fr : row.title_en && row.slug_en;
  if (has) return row;
  const st = await settings();
  const model = st.cheap_model && st.cheap_model !== 'none' ? st.cheap_model : st.model;
  const provider = model.startsWith('claude') ? 'anthropic' : model.startsWith('gpt') ? 'openai' : model.startsWith('gemini') ? 'google' : st.provider;
  const prompt = (await doc('prepare_titles')) || 'Propose the missing counterpart in the other language: an SEO title (keyword first, 55–70 characters), a target keyword, a URL slug (lowercase ASCII, hyphens). French must be genuinely French. Return ONLY JSON: [{"id":"…","title":"…","keyword":"…","slug":"…"}]';
  const line = lang === 'fr'
    ? `id=${row.id} | need: FRENCH | english title: ${row.title_en} | keyword: ${row.keyword_en} | category: ${row.category}`
    : `id=${row.id} | need: ENGLISH | french title: ${row.title_fr} | keyword: ${row.keyword_fr} | category: ${row.category}`;
  const r = await callText({ provider, model, system: [{ type: 'text', text: prompt }], user: line, maxTokens: 800 });
  await record({ plan_id: row.id, kind: 'prepare', provider, model, usage: normalise(provider, r.usage) });
  const m = /\[[\s\S]*\]/.exec(r.text); const it = m ? JSON.parse(m[0])[0] : null;
  if (!it) throw new Error('could not prepare the title');
  const patch = {};
  if (lang === 'fr') { const u = await uniquePath('/fr/blog/', slugify(it.slug || it.title)); Object.assign(patch, { title_fr: it.title, keyword_fr: it.keyword, slug_fr: u.slug, path_fr: u.path }); }
  else { const u = await uniquePath('/blog/', slugify(it.slug || it.title)); Object.assign(patch, { title_en: it.title, keyword_en: it.keyword, slug_en: u.slug, path_en: u.path }); }
  await db.from('plan').update(patch).eq('id', row.id);
  await log(`${row.id}: ${lang.toUpperCase()} title prepared — ${patch.title_fr || patch.title_en}`);
  return { ...row, ...patch };
}
