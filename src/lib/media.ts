/**
 * Public Supabase Storage URL builder.
 *
 * Deliberately NOT server-only: it is a pure string template with no
 * database dependency, built from `NEXT_PUBLIC_SUPABASE_URL` — already a
 * browser-exposed value. It only ever applies to the "public" bucket; there
 * is no equivalent helper for private buckets, because a private object must
 * never be reachable by a predictable URL — access to complaint attachments
 * goes through an authorized server route instead, once that milestone
 * exists.
 */
export function publicMediaUrl(bucket: string, path: string): string {
  const base = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? '').replace(/\/$/, '');
  return `${base}/storage/v1/object/public/${bucket}/${path}`;
}
