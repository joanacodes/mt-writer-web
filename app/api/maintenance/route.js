import { db, log } from '@/lib/db';
import { isAuthed, unauthorized } from '@/lib/auth';
import { allowedPaths } from '@/lib/prompt';
import { validate } from '@/lib/validate';
import { settings } from '@/lib/db';

/* Housekeeping actions from the settings panel. */
export async function POST(req) {
  if (!(await isAuthed())) return unauthorized();
  const { action } = await req.json();
  if (action === 'clear_logs') { await db.from('logs').delete().gt('id', 0); return Response.json({ ok: true }); }
  if (action === 'reset_queued') { await db.from('plan').update({ status_en: 'todo' }).eq('status_en', 'queued'); await db.from('plan').update({ status_fr: 'todo' }).eq('status_fr', 'queued'); await db.from('jobs').update({ status: 'abandoned' }).in('status', ['submitted', 'in_progress']); await log('queued rows reset to todo; open batches abandoned'); return Response.json({ ok: true }); }
  if (action === 'recheck') {
    const st = await settings(); const paths = await allowedPaths(); const opts = { imagePrompts: st.image_prompts === '1' };
    const { data: arts } = await db.from('articles').select('plan_id,lang,body'); let n = 0, bad = 0;
    for (const a of arts || []) {
      const { data: row } = await db.from('plan').select('*').eq('id', a.plan_id).maybeSingle(); if (!row) continue;
      const body = a.body.replace(/^translationKey:.*$/m, `translationKey: "post-${row.slug_en}"`);
      const { problems, words } = validate(body, row, a.lang, paths, opts);
      await db.from('articles').update({ body, words, warnings: problems.join('; ') }).eq('plan_id', a.plan_id).eq('lang', a.lang);
      await db.from('plan').update({ [`status_${a.lang}`]: problems.length ? 'check' : 'written' }).eq('id', row.id);
      n++; if (problems.length) bad++;
    }
    await log(`recheck: ${n} article(s) re-validated, ${bad} with warnings`); return Response.json({ ok: true, n, bad });
  }
  if (action === 'clear_cover_queue') { await db.from('queue').delete().neq('status', 'done'); return Response.json({ ok: true }); }
  return Response.json({ error: 'unknown action' }, { status: 400 });
}
