import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Source_Serif_4 } from 'next/font/google';

import { SITE, SITE_SUBTITLE, SITE_TITLE, getSiteUrl } from '@/lib/site';

import './globals.css';

/*
 * Type pairing per docs/DESIGN_REFERENCE.md §2.2: a high-contrast
 * old-style serif for display against a humanist geometric sans for UI.
 * Self-hosted through next/font — no external stylesheet request, and no
 * layout shift. `latin-ext` is required for Indonesian and Javanese terms.
 *
 * DESIGN_REFERENCE §2.2 requires the visual match to be confirmed against
 * docs/source/renders/p01-beranda-00.png before Phase 4 closes.
 */
const sourceSerif = Source_Serif_4({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-source-serif',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-plus-jakarta',
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: SITE_TITLE,
    template: `%s — ${SITE_TITLE}`,
  },
  description: `Portal resmi ${SITE.name}, ${SITE.kapanewon}, ${SITE.kabupaten}, ${SITE.provinsi}.`,
  applicationName: SITE_TITLE,
  formatDetection: { telephone: false },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    siteName: SITE_TITLE,
    title: SITE_TITLE,
    description: SITE_SUBTITLE,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#002446',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={SITE.lang} className={`${sourceSerif.variable} ${plusJakarta.variable}`}>
      <body>{children}</body>
    </html>
  );
}
