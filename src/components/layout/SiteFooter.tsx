import React from 'react';
import Link from 'next/link';
import { SITE_TITLE, SITE_SUBTITLE } from '@/lib/site';
import { Container } from '@/components/ui/Container';
import { MapPin, Phone, Mail, Clock, ArrowRight } from '@/components/ui/Icons';
import { getSetting } from '@/data/fixtures';

export function SiteFooter() {
  const address = getSetting(
    'contact.address',
    'Jalan Mulia No. 1, Margomulyo, Seyegan, Sleman, D.I. Yogyakarta 55561'
  );
  const phone = getSetting('contact.phone', '(0274) 4364 719');
  const whatsapp = getSetting('contact.whatsapp', '+62 851 3625 3739');
  const email = getSetting('contact.email', 'desamargomulyo@slemankab.go.id');
  const hoursWeekday = getSetting('service.hoursWeekday', 'Senin–Kamis 08.00–11.00 WIB');
  const hoursFriday = getSetting('service.hoursFriday', 'Jumat 08.00–10.00 WIB');
  const hoursClosed = getSetting(
    'service.hoursClosed',
    'Sabtu, Minggu, dan hari libur nasional tutup'
  );

  return (
    <footer className="bg-navy-900 text-white pt-16 pb-12 border-t-4 border-gold-600">
      <Container>
        {/* 4 Main Footer Zones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Zone 1: Institutional Statement & Sleman Sembada Mark */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center font-serif font-bold text-lg text-gold-400">
                M
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-white leading-tight">
                  {SITE_TITLE}
                </h3>
                <p className="text-xs text-white/70">{SITE_SUBTITLE}</p>
              </div>
            </div>

            <p className="text-xs text-white/70 leading-relaxed pt-1">
              Portal informasi, keterbukaan anggaran, dan pelayanan administrasi
              resmi bagi seluruh warga masyarakat Kalurahan Margomulyo.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 rounded-md bg-white/5 px-3 py-1.5 border border-white/10 text-xs text-gold-400 font-semibold">
                <span className="h-2 w-2 rounded-full bg-gold-600" aria-hidden="true" />
                <span>Sleman Sembada • D.I. Yogyakarta</span>
              </div>
            </div>
          </div>

          {/* Zone 2: Kontak Resmi */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gold-400 mb-4">
              Kontak Resmi
            </h4>

            <div className="flex items-start gap-2.5 text-xs text-white/80 leading-relaxed">
              <MapPin size={16} className="shrink-0 text-gold-600 mt-0.5" />
              <span>{address}</span>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-white/80">
              <Phone size={16} className="shrink-0 text-gold-600" />
              <span>{phone}</span>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-white/80">
              <span className="text-xs font-bold text-gold-400 pl-0.5">WA</span>
              <span>{whatsapp}</span>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-white/80">
              <Mail size={16} className="shrink-0 text-gold-600" />
              <span>{email}</span>
            </div>
          </div>

          {/* Zone 3: Jam Pelayanan */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gold-400 mb-4">
              Jam Pelayanan Kantor
            </h4>

            <div className="space-y-2 text-xs text-white/80">
              <div className="flex items-center gap-2">
                <Clock size={15} className="shrink-0 text-gold-600" />
                <span className="font-semibold text-white">Senin – Kamis</span>
              </div>
              <p className="pl-6 text-white/70">{hoursWeekday}</p>

              <div className="flex items-center gap-2 pt-1">
                <Clock size={15} className="shrink-0 text-gold-600" />
                <span className="font-semibold text-white">Jumat</span>
              </div>
              <p className="pl-6 text-white/70">{hoursFriday}</p>

              <div className="pt-2 pl-6 text-[11px] text-white/50">
                {hoursClosed}
              </div>
            </div>
          </div>

          {/* Zone 4: Navigasi Cepat & Portal Transparansi */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gold-400 mb-4">
              Navigasi Cepat
            </h4>

            <ul className="space-y-2 text-xs text-white/80">
              <li>
                <Link
                  href="/transparansi/apbkal"
                  className="hover:text-gold-400 transition-colors flex items-center justify-between group py-1.5"
                >
                  <span>Transparansi APBKal 2026</span>
                  <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/pembangunan"
                  className="hover:text-gold-400 transition-colors flex items-center justify-between group py-1.5"
                >
                  <span>Proyek Pembangunan Desa</span>
                  <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/layanan"
                  className="hover:text-gold-400 transition-colors flex items-center justify-between group py-1.5"
                >
                  <span>Layanan Administrasi Kependudukan</span>
                  <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/pengaduan"
                  className="hover:text-gold-400 transition-colors flex items-center justify-between group py-1.5"
                >
                  <span>Layanan Pengaduan & Aspirasi</span>
                  <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/dokumen"
                  className="hover:text-gold-400 transition-colors flex items-center justify-between group py-1.5"
                >
                  <span>Arsip Peraturan Kalurahan</span>
                  <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© {new Date().getFullYear()} Pemerintah Kalurahan Margomulyo. Seluruh hak cipta dilindungi.</p>
          <div className="flex items-center gap-6">
            <Link href="/transparansi" className="hover:text-white transition-colors">
              Keterbukaan Informasi Publik
            </Link>
            <Link href="/pengaduan" className="hover:text-white transition-colors">
              Pengaduan Warga
            </Link>
            <Link href="/admin" className="hover:text-white transition-colors">
              Pamong Kalurahan
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
