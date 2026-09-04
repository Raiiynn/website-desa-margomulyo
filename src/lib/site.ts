/**
 * Site-level configuration.
 *
 * Scope: structural identity and navigation only. Government content —
 * contact details, statistics, officials, services — is NOT defined here.
 * It becomes database records in Phase 2, gated by docs/SOURCE_DATA.md.
 *
 * The navigation below is verified content: the eight items are exactly
 * those in the source concept (docs/SOURCE_DATA.md §3, page 1) and match
 * PROJECT_CONTEXT.md. docs/DESIGN_REFERENCE.md §4 requires that this list
 * stays at eight; deeper routes are reached from within sections, not by
 * growing the navigation bar.
 */

export const SITE = {
  name: 'Kalurahan Margomulyo',
  kapanewon: 'Kapanewon Seyegan',
  kabupaten: 'Kabupaten Sleman',
  provinsi: 'D.I. Yogyakarta',
  locale: 'id-ID',
  lang: 'id',
} as const;

/** Full administrative title, e.g. for metadata and the masthead. */
export const SITE_TITLE = `${SITE.name}` as const;

/** e.g. "Kapanewon Seyegan • Kabupaten Sleman" — the masthead subtitle. */
export const SITE_SUBTITLE = `${SITE.kapanewon} • ${SITE.kabupaten}` as const;

export interface NavItem {
  readonly label: string;
  readonly href: string;
}

/**
 * Primary navigation — eight items, per DESIGN_REFERENCE.md §4.
 *
 * Adding a ninth item is a design regression, not a feature. Sub-routes
 * (/padukuhan, /agenda, /pembangunan, /dokumen, /pengaduan) are reached
 * from within their parent sections.
 */
export const PRIMARY_NAV: readonly NavItem[] = [
  { label: 'Beranda', href: '/' },
  { label: 'Profil Desa', href: '/profil' },
  { label: 'Pemerintahan', href: '/pemerintahan' },
  { label: 'Berita & Informasi', href: '/berita' },
  { label: 'Potensi Desa', href: '/potensi' },
  { label: 'Layanan Publik', href: '/layanan' },
  { label: 'Transparansi', href: '/transparansi' },
  { label: 'Kontak', href: '/kontak' },
] as const;

/**
 * The header's call-to-action.
 *
 * DESIGN_REFERENCE.md §5.3 finding A01: the source concept renders
 * "Layanan Publik" twice — once in the navigation and once as the CTA.
 * Two adjacent controls pointing at one destination is a defect, so the
 * CTA points somewhere distinct and higher-value.
 */
export const HEADER_CTA: NavItem = {
  label: 'Aduan & Aspirasi',
  href: '/pengaduan',
} as const;

/**
 * Every public route the platform will serve, per MASTER_PROMPT §7 and
 * FULL_BUILD §4. Declared here so routing, the sitemap and structural
 * tests share one source of truth. Pages are built in Phases 5-8.
 */
export const PUBLIC_ROUTES = [
  '/',
  '/profil',
  '/pemerintahan',
  '/padukuhan',
  '/berita',
  '/agenda',
  '/layanan',
  '/layanan/[slug]',
  '/pengaduan',
  '/transparansi',
  '/transparansi/apbkal',
  '/pembangunan',
  '/dokumen',
  '/potensi',
  '/kontak',
] as const;

export type PublicRoute = (typeof PUBLIC_ROUTES)[number];

/** Base path for the administrative back-office. Protected from Phase 3. */
export const ADMIN_BASE_PATH = '/admin' as const;

/**
 * Canonical origin. Falls back to localhost so the app builds without a
 * configured environment; production must set NEXT_PUBLIC_SITE_URL.
 */
export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  return url.replace(/\/$/, '');
}
