import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login Admin — Kalurahan Margomulyo',
  description:
    'Halaman masuk Panel Pamong untuk aparatur kalurahan Margomulyo.',
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLoginLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
