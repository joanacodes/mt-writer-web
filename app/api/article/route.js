import { db } from '@/lib/db';
import { isAuthed, unauthorized } from '@/lib/auth';
import { articleCost } from '@/lib/cost';
import { allowedPaths, frontMatter } from '@/lib/prompt';
import { validate } from '@/lib/validate';
import { settings } from '@/lib/db';
export const dynamic = 'force-dynamic';

export async function GET(req) {
  if (!(await isAuthed())) return unauthorized();
  const { searchParams } = new URL(req.url);
  const { data } = await db.from('articles').select('*').eq('plan_id', searchParams.get('id'));
  const { data: cover } = await db.from('covers').select('plan_id,slug,mime,prompt,published_at').eq('plan_id', searchParams.get('id')).maybeSingle();
  return Response.json({ articles: data || [], cover: cover || null, cost: await articleCost(searchParams.get('id')) });
}
/* Saving an edit: force the shared translationKey, re-run the checks, and store the fresh warnings. */
export async function POST(req) {
  if (!(await isAuthed())) return unauthorized();
  const { id, lang, body: raw } = await req.json();
  const { data: row } = await db.from('plan').select('*').eq('id', id).maybeSingle();
  if (!row) return Response.json({ error: 'unknown row' }, { status: 404 });
  const body = raw.replace(/^translationKey:.*$/m, `translationKey: "post-${row.slug_en}"`);
  const st = await settings(); const paths = await allowedPaths();
  const { problems, words } = validate(body, row, lang, paths, { imagePrompts: st.image_prompts === '1' });
  await db.from('articles').update({ body, edited: true, words, warnings: problems.join('; '), updated_at: new Date().toISOString() }).eq('plan_id', id).eq('lang', lang);
  await db.from('plan').update({ [`status_${lang}`]: problems.length ? 'check' : 'written' }).eq('id', id);
  return Response.json({ ok: true, warnings: problems });
}
