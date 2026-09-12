import { db } from '@/lib/db';
import { isAuthed, unauthorized } from '@/lib/auth';
export const dynamic = 'force-dynamic';

export async function GET() {
  if (!(await isAuthed())) return unauthorized();
  const { data, error } = await db.from('plan').select('*').order('sort', { ascending: true }).limit(2000);
  if (error) return Response.json({ error: error.message }, { status: 500 });
  const { data: arts } = await db.from('articles').select('plan_id,lang,published_at,updated_at,words');
  const pub = {}, words = {};
  for (const a of arts || []) { (words[a.plan_id] = words[a.plan_id] || {})[a.lang] = a.words || 0; if (a.published_at) (pub[a.plan_id] = pub[a.plan_id] || {})[a.lang] = new Date(a.updated_at) > new Date(a.published_at) ? 'stale' : 'live'; }
  return Response.json((data || []).map((r) => ({ ...r, pub_en: pub[r.id]?.en || '', pub_fr: pub[r.id]?.fr || '', words_en: words[r.id]?.en || 0, words_fr: words[r.id]?.fr || 0 })));
}
