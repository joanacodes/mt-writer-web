import { db } from '@/lib/db';
import { isAuthed, unauthorized } from '@/lib/auth';
export const dynamic = 'force-dynamic';

export async function GET() {
  if (!(await isAuthed())) return unauthorized();
  const { data, error } = await db.from('plan').select('*').order('sort', { ascending: true }).limit(2000);
  if (error) return Response.json({ error: error.message }, { status: 500 });
  const { data: arts } = await db.from('articles').select('plan_id,lang,published_at,updated_at');
  const pub = {};
  for (const a of arts || []) { if (a.published_at) (pub[a.plan_id] = pub[a.plan_id] || {})[a.lang] = new Date(a.updated_at) > new Date(a.published_at) ? 'stale' : 'live'; }
  return Response.json((data || []).map((r) => ({ ...r, pub_en: pub[r.id]?.en || '', pub_fr: pub[r.id]?.fr || '' })));
}
