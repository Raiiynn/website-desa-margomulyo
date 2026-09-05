import React from 'react';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';

/**
 * Public route-group shell.
 *
 * Route groups keep the public site and the administrative back-office on
 * separate layout trees while sharing one domain model, as required by
 * MASTER_PROMPT.md §4. The parentheses mean this segment does not appear
 * in the URL: (public)/profil/page.tsx serves /profil.
 */
export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-text-body">
      {/* Skip to content link for keyboard accessibility */}
      <a
        href="#konten-utama"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:outline-none focus:ring-2 focus:ring-blue-700"
      >
        Lompat ke konten utama
      </a>

      <SiteHeader />
      <main id="konten-utama" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
