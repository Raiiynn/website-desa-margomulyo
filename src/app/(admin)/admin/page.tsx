'use client';

import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  BUDGET,
  BUDGET_REALIZATION,
  DEVELOPMENT_PROJECTS,
  NEWS,
  SERVICES,
  formatCompactRupiah,
} from '@/data/fixtures';
import { ShieldCheck } from '@/components/ui/Icons';

export default function AdminDashboardPage() {
  const publishedNewsCount = NEWS.filter((n) => n.status === 'PUBLISHED').length;
  const draftNewsCount = NEWS.filter((n) => n.status === 'DRAFT').length;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="rounded-card border border-border bg-white p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="navy">Dasbor Eksekutif</Badge>
            <span className="text-xs text-text-muted">Tahun Anggaran 2026</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-navy-900">
            Pusat Kendali Administrasi Margomulyo
          </h1>
          <p className="mt-1 text-xs text-text-body">
            Ikhtisar operasional layanan publik, pengaduan warga, pemantauan
            APBKal, dan pembaruan kegiatan pembangunan desa.
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-2">
          <Button href="/layanan" variant="outline" size="sm">
            Lihat Layanan Warga
          </Button>
          <Button href="/transparansi" variant="primary" size="sm">
            Portal Transparansi
          </Button>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="rounded-card border border-border bg-white p-5 shadow-sm">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 block">
            Layanan Publik Aktif
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-navy-900">
              {SERVICES.length}
            </span>
            <span className="text-xs text-green-800 font-medium">SOP Terstandar</span>
          </div>
          <span className="text-xs text-text-muted mt-2 block">
            Tarif resmi Rp 0 (Bebas Pungli)
          </span>
        </div>

        <div className="rounded-card border border-border bg-white p-5 shadow-sm">
          <span className="text-xs font-semibold uppercase tracking-wider text-gold-700 block">
            Realisasi Anggaran
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-navy-900">
              {BUDGET_REALIZATION.cashPercent}%
            </span>
            <span className="text-xs text-text-muted">Kas Terserap</span>
          </div>
          <span className="text-xs text-text-muted mt-2 block">
            {formatCompactRupiah(BUDGET_REALIZATION.cashAmount)} / {formatCompactRupiah(BUDGET.totalExpenditure)}
          </span>
        </div>

        <div className="rounded-card border border-border bg-white p-5 shadow-sm">
          <span className="text-xs font-semibold uppercase tracking-wider text-green-700 block">
            Progres Proyek Fisik
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-navy-900">
              {BUDGET_REALIZATION.physicalPercent}%
            </span>
            <span className="text-xs text-green-800 font-medium">+2% Target</span>
          </div>
          <span className="text-xs text-text-muted mt-2 block">
            {DEVELOPMENT_PROJECTS.length} Paket Kegiatan Pembangunan
          </span>
        </div>

        <div className="rounded-card border border-border bg-white p-5 shadow-sm">
          <span className="text-xs font-semibold uppercase tracking-wider text-navy-900 block">
            Warta & Publikasi
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-navy-900">
              {publishedNewsCount}
            </span>
            <span className="text-xs text-text-muted">Rilis Publik</span>
          </div>
          <span className="text-xs text-text-muted mt-2 block">
            {draftNewsCount} Naskah Draf Perlu Dilengkapi
          </span>
        </div>
      </div>

      {/* Main Grid: Recent Complaints / Activities & Management Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 cols: Modul Administrasi Pamong */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-card border border-border bg-white p-6 shadow-sm">
            <h2 className="font-serif text-lg font-bold text-navy-900 mb-4 pb-3 border-b border-border">
              Modul Tata Kelola Kalurahan
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="rounded-card border border-border p-4 hover:border-blue-700 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-navy-900">Pengaduan Warga</h3>
                  <Badge variant="blue">Respons Aktif</Badge>
                </div>
                <p className="text-text-body leading-relaxed">
                  Lacak dan proses aduan masuk dengan SLA maksimal 1x24 jam kerja.
                </p>
                <div className="mt-3 pt-2 border-t border-border flex justify-end">
                  <Link href="/pengaduan" className="font-semibold text-blue-700">
                    Buka Kanal Aduan →
                  </Link>
                </div>
              </div>

              <div className="rounded-card border border-border p-4 hover:border-blue-700 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-navy-900">Publikasi Warta</h3>
                  <Badge variant="green">{publishedNewsCount} Terbit</Badge>
                </div>
                <p className="text-text-body leading-relaxed">
                  Kelola rilis berita resmi, pengumuman bansos, dan agenda kalurahan.
                </p>
                <div className="mt-3 pt-2 border-t border-border flex justify-end">
                  <Link href="/berita" className="font-semibold text-blue-700">
                    Buka Arsip Warta →
                  </Link>
                </div>
              </div>

              <div className="rounded-card border border-border p-4 hover:border-blue-700 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-navy-900">APBKal & Realisasi</h3>
                  <Badge variant="gold">TA 2026</Badge>
                </div>
                <p className="text-text-body leading-relaxed">
                  Pemutakhiran neraca pendapatan, alokasi bidang, dan penyerapan SP2D.
                </p>
                <div className="mt-3 pt-2 border-t border-border flex justify-end">
                  <Link href="/transparansi/apbkal" className="font-semibold text-blue-700">
                    Rincian APBKal →
                  </Link>
                </div>
              </div>

              <div className="rounded-card border border-border p-4 hover:border-blue-700 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-navy-900">Proyek Pembangunan</h3>
                  <Badge variant="navy">5 Paket TPK</Badge>
                </div>
                <p className="text-text-body leading-relaxed">
                  Pantau kemajuan fisik corblok, irigasi, dan sarana warga di padukuhan.
                </p>
                <div className="mt-3 pt-2 border-t border-border flex justify-end">
                  <Link href="/pembangunan" className="font-semibold text-blue-700">
                    Tracker Proyek →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Audit Log / Riwayat Perubahan Terbaru */}
          <div className="rounded-card border border-border bg-white p-6 shadow-sm">
            <h2 className="font-serif text-lg font-bold text-navy-900 mb-4 pb-3 border-b border-border">
              Riwayat Aktivitas Tata Kelola (Audit Trail)
            </h2>
            <div className="space-y-3 text-xs">
              {[
                {
                  action: 'Verifikasi Laporan APBKal Semester II',
                  user: 'Rini Sapta Wadani (Kasi Tata Pemerintahan)',
                  time: 'Hari ini, 09:30 WIB',
                  status: 'Tercatat',
                },
                {
                  action: 'Pembaruan Progres Fisik Saluran Irigasi (FIS-01/26)',
                  user: 'Ulu-Ulu (Kasi Pembangunan)',
                  time: 'Kemarin, 14:15 WIB',
                  status: 'Tercatat',
                },
                {
                  action: 'Penyaluran Cadangan Beras 1.956 KPM',
                  user: 'Tim Liputan Margomulyo',
                  time: '1 September 2026',
                  status: 'Tercatat',
                },
              ].map((log, idx) => (
                <div
                  key={idx}
                  className="flex items-start justify-between gap-4 p-3 rounded-card bg-band border border-border"
                >
                  <div>
                    <span className="font-semibold text-text-strong block">
                      {log.action}
                    </span>
                    <span className="text-[11px] text-text-body block mt-0.5">
                      Oleh: {log.user}
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[11px] text-text-muted block">
                      {log.time}
                    </span>
                    <span className="text-[10px] text-green-800 font-semibold block mt-0.5">
                      ✓ {log.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 5 cols: Informasi Tim Kerja & Catatan RBAC */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-card border border-border-accent bg-surface-tint p-6 text-xs text-blue-700 space-y-4">
            <h3 className="font-bold text-sm text-navy-900 flex items-center gap-1.5">
              <ShieldCheck size={18} className="text-blue-700" />
              <span>Pemberitahuan Fondasi Keamanan & RBAC</span>
            </h3>
            <p className="leading-relaxed text-text-strong">
              Tampilan dasbor ini merupakan <strong>UI Foundation</strong> untuk
              aparatur pamong kalurahan Margomulyo. Sesuai arsitektur ADR-0002,
              autentikasi dan izin akses berbasis peran (OWNER, ADMIN, EDITOR, OPERATOR)
              diterapkan di lapisan server pada tahap integrasi backend.
            </p>
            <div className="pt-2 border-t border-border-accent text-[11px] text-text-muted">
              Status Sistem: Siap untuk pengkoneksian Supabase Auth & Session Guard.
            </div>
          </div>

          <div className="rounded-card border border-border bg-white p-6 shadow-sm space-y-3">
            <h3 className="font-serif text-base font-bold text-navy-900">
              Kontak Tim Pendamping IT Desa
            </h3>
            <p className="text-xs text-text-body leading-relaxed">
              Jika mengalami kendala operasional portal kalurahan, hubungi tim pengelola
              Sistem Informasi Kalurahan (SIK) Kabupaten Sleman.
            </p>
            <div className="pt-2">
              <Button href="/kontak" variant="outline" size="sm" className="w-full">
                Bantuan & Dukungan Teknis
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
