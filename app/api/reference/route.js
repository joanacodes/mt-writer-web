import { db } from '@/lib/db';
import { isAuthed, unauthorized } from '@/lib/auth';

/* Reference photo for cover generation: stored as base64 in docs.reference_jpg_base64 */
const key = (category) => (category ? `reference_${String(category).toLowerCase().replace(/[^a-z0-9]+/g, '_')}_jpg_base64` : 'reference_jpg_base64');
export async function POST(req) {
  if (!(await isAuthed())) return unauthorized();
  const { data, category } = await req.json();
  if (!data) { await db.from('docs').delete().eq('name', key(category)); return Response.json({ ok: true, removed: true }); }
  if (data.length > 4_000_000) return Response.json({ error: 'Image too large — keep it under 3 MB.' }, { status: 400 });
  await db.from('docs').upsert({ name: key(category), content: data, updated_at: new Date().toISOString() });
  return Response.json({ ok: true });
}
export async function GET() {
  if (!(await isAuthed())) return unauthorized();
  const { data } = await db.from('docs').select('name,updated_at').like('name', 'reference_%');
  return Response.json({ refs: Object.fromEntries((data || []).map((d) => [d.name, d.updated_at])) });
}
export { key as referenceKey };
