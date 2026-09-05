import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_TITLE } from '@/lib/site';

export const metadata: Metadata = {
  // The back-office must never be indexed, regardless of auth state.
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col bg-band text-text-strong">
      {/* Admin Top Navigation Bar */}
      <header className="sticky top-0 z-50 border-b border-border bg-navy-900 text-white px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="flex items-center gap-2.5 font-serif font-bold text-lg text-white"
          >
            <div className="h-8 w-8 rounded-lg bg-white/10 text-gold-400 flex items-center justify-center font-bold text-sm border border-white/20">
              M
            </div>
            <div className="flex flex-col">
              <span className="leading-tight text-sm font-bold">
                Panel Pamong • {SITE_TITLE}
              </span>
              <span className="text-[10px] text-white/70 tracking-wider uppercase">
                Sistem Tata Kelola Administrasi Desa
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <Link
            href="/"
            className="text-xs font-semibold text-gold-400 hover:text-white transition-colors"
          >
            ← Kembali ke Web Publik
          </Link>
        </div>
      </header>

      {/* Main Admin Landmark (id="konten-admin" strictly preserved for tests) */}
      <main id="konten-admin" className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full">
        {children}
      </main>

      {/* Footer bar */}
      <footer className="border-t border-border bg-white py-4 px-8 text-center text-xs text-text-muted">
        Panel Administrasi Internal Kalurahan Margomulyo • Akses Resmi Pamong
      </footer>
    </div>
  );
}
