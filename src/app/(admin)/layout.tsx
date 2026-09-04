import type { Metadata } from 'next';

/**
 * Administrative route-group shell.
 *
 * Separate layout tree from (public) so the back-office never inherits
 * public chrome, and so route protection has one obvious attachment point.
 *
 * NOT YET PROTECTED. Authentication and the server-side `can()` check
 * arrive in Phase 3 (docs/adr/0002-database-auth-storage.md). Until then
 * these routes carry nothing sensitive — no data layer exists.
 */
export const metadata: Metadata = {
  // The back-office must never be indexed, regardless of auth state.
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <main id="konten-admin">{children}</main>;
}
