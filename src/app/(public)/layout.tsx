/**
 * Public route-group shell.
 *
 * Route groups keep the public site and the administrative back-office on
 * separate layout trees while sharing one domain model, as required by
 * MASTER_PROMPT.md §4. The parentheses mean this segment does not appear
 * in the URL: (public)/profil/page.tsx serves /profil.
 *
 * The designed header, navigation and footer are Phase 4 (design system)
 * and Phase 5 (public website). This file establishes the landmark
 * structure they will attach to.
 */
export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <main id="konten-utama">{children}</main>;
}
