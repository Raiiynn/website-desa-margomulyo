import type { Metadata } from 'next';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

export const metadata: Metadata = {
  // The back-office must never be indexed, regardless of auth state.
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen bg-band text-text-strong">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Main Admin Landmark (id="konten-admin" strictly preserved for tests) */}
        <main id="konten-admin" className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full">
          {children}
        </main>

        {/* Footer bar */}
        <footer className="border-t border-border bg-white py-3 px-6 text-center text-[11px] text-text-muted">
          Panel Administrasi Internal Kalurahan Margomulyo • Akses Resmi Pamong
        </footer>
      </div>
    </div>
  );
}
