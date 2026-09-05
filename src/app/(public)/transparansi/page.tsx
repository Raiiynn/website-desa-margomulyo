import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import {
  BUDGET,
  BUDGET_CYCLE_STAGES,
  BUDGET_REALIZATION,
  DEVELOPMENT_PROJECTS,
  DOCUMENTS,
  formatCompactRupiah,
  formatRupiah,
} from '@/data/fixtures';
import {
  ArrowRight,
} from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'Transparansi Kalurahan',
  description:
    'Portal keterbukaan informasi publik dan akuntabilitas keuangan APBKal 2026 Pemerintah Kalurahan Margomulyo.',
};

export default function TransparansiPage() {
  return (
    <div className="py-8 sm:py-12">
      <Container>
        <Breadcrumbs items={[{ label: 'Transparansi' }]} />

        {/* Page Header */}
        <div className="mt-4 max-w-3xl mb-12">
          <Badge variant="gold" className="mb-3">
            Akuntabilitas Publik
          </Badge>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-navy-900 tracking-tight">
            Transparansi & Keterbukaan Anggaran
          </h1>
          <p className="mt-4 text-base text-text-body leading-relaxed">
            Pemerintah Kalurahan Margomulyo menyajikan keterbukaan pengelolaan
            keuangan desa, tahapan musrenbang, realisasi kegiatan pembangunan fisik,
            serta arsip produk hukum Peraturan Kalurahan secara transparan.
          </p>
        </div>

        {/* 4 PINTU UTAMA HUB TRANSPARANSI (Per DESIGN_REFERENCE §4) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Pintu 1: APBKal */}
          <Link
            href="/transparansi/apbkal"
            className="group rounded-2xl border border-border bg-white p-6 hover:border-blue-700 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="h-10 w-10 rounded-xl bg-surface-tint text-blue-700 flex items-center justify-center font-bold text-sm mb-4">
                01
              </div>
              <h2 className="font-serif text-xl font-bold text-navy-900 group-hover:text-blue-700 transition-colors">
                Neraca APBKal 2026
              </h2>
              <p className="mt-2 text-xs text-text-body leading-relaxed">
                Rincian penerimaan pendapatan Rp 3,84 M, alokasi belanja Rp 3,91 M,
                serta pembiayaan netto SiLPA desa.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#f1f5f9] flex items-center justify-between text-xs font-semibold text-blue-700">
              <span>Buka Rincian Neraca</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Pintu 2: Realisasi Anggaran */}
          <Link
            href="/transparansi/apbkal#realisasi"
            className="group rounded-2xl border border-border bg-white p-6 hover:border-green-700 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="h-10 w-10 rounded-xl bg-green-700/10 text-green-700 flex items-center justify-center font-bold text-sm mb-4">
                02
              </div>
              <h2 className="font-serif text-xl font-bold text-navy-900 group-hover:text-green-700 transition-colors">
                Realisasi Semester II
              </h2>
              <p className="mt-2 text-xs text-text-body leading-relaxed">
                Laporan penyerapan kas belanja {BUDGET_REALIZATION.cashPercent}% dan
                capaian fisik {BUDGET_REALIZATION.physicalPercent}% (+2% di atas target).
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#f1f5f9] flex items-center justify-between text-xs font-semibold text-green-700">
              <span>Capaian Penyerapan</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Pintu 3: Proyek Pembangunan */}
          <Link
            href="/pembangunan"
            className="group rounded-2xl border border-border bg-white p-6 hover:border-gold-600 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="h-10 w-10 rounded-xl bg-gold-600/15 text-gold-750 flex items-center justify-center font-bold text-sm mb-4">
                03
              </div>
              <h2 className="font-serif text-xl font-bold text-navy-900 group-hover:text-gold-600 transition-colors">
                Proyek Pembangunan
              </h2>
              <p className="mt-2 text-xs text-text-body leading-relaxed">
                Pantau progres {DEVELOPMENT_PROJECTS.length} paket pekerjaan fisik
                saluran irigasi, corblok jalan tani, dan sarana warga.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#f1f5f9] flex items-center justify-between text-xs font-semibold text-gold-750">
              <span>Daftar Proyek Fisik</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Pintu 4: Arsip Dokumen Publik */}
          <Link
            href="/dokumen"
            className="group rounded-2xl border border-border bg-white p-6 hover:border-blue-700 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="h-10 w-10 rounded-xl bg-surface-tint text-blue-700 flex items-center justify-center font-bold text-sm mb-4">
                04
              </div>
              <h2 className="font-serif text-xl font-bold text-navy-900 group-hover:text-blue-700 transition-colors">
                Arsip Dokumen Terbuka
              </h2>
              <p className="mt-2 text-xs text-text-body leading-relaxed">
                Unduh naskah resmi {DOCUMENTS.length} dokumen Peraturan Kalurahan,
                LAKIP, LPPKal, RKPKal, dan RPJMKal.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#f1f5f9] flex items-center justify-between text-xs font-semibold text-blue-700">
              <span>Unduh Arsip Regulasi</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Ringkasan Eksekutif APBKal 2026 */}
        <div className="rounded-2xl border border-border bg-white p-6 sm:p-10 mb-16 shadow-sm">
          <SectionHeader
            eyebrow="Tahun Anggaran 2026"
            title="Ringkasan Postur Keuangan Desa"
            description={BUDGET.basis}
            linkHref="/transparansi/apbkal"
            linkLabel="Lihat Seluruh Tabel Rincian"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
            <div className="rounded-xl border border-border bg-band p-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 block">
                Pendapatan
              </span>
              <span className="font-serif text-2xl font-bold text-navy-900 block mt-1">
                {formatCompactRupiah(BUDGET.totalRevenue)}
              </span>
              <span className="text-xs text-text-muted block mt-1">
                {formatRupiah(BUDGET.totalRevenue)}
              </span>
            </div>

            <div className="rounded-xl border border-border bg-band p-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gold-750 block">
                Belanja Kalurahan
              </span>
              <span className="font-serif text-2xl font-bold text-navy-900 block mt-1">
                {formatCompactRupiah(BUDGET.totalExpenditure)}
              </span>
              <span className="text-xs text-text-muted block mt-1">
                {formatRupiah(BUDGET.totalExpenditure)}
              </span>
            </div>

            <div className="rounded-xl border border-border bg-band p-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-green-700 block">
                Pembiayaan Netto
              </span>
              <span className="font-serif text-2xl font-bold text-navy-900 block mt-1">
                {formatCompactRupiah(BUDGET.netFinancing)}
              </span>
              <span className="text-xs text-text-muted block mt-1">
                {formatRupiah(BUDGET.netFinancing)}
              </span>
            </div>

            <div className="rounded-xl border border-green-700/30 bg-green-700/5 p-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-green-800 block">
                Status Neraca
              </span>
              <span className="font-serif text-xl font-bold text-green-800 block mt-1">
                Berimbang (Nol)
              </span>
              <span className="text-xs text-green-700 block mt-1">
                Defisit Tertutup SiLPA
              </span>
            </div>
          </div>
        </div>

        {/* 5 Tahapan Siklus Penganggaran (Pattern P07) */}
        <div className="mb-20">
          <SectionHeader
            eyebrow="Proses Akuntabilitas"
            title="Siklus Penganggaran & Audit Kalurahan"
            description="5 gerbang pengawasan partisipatif mulai dari rembug warga padukuhan hingga pemeriksaan inspektorat."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {BUDGET_CYCLE_STAGES.map((st) => (
              <div
                key={st.stageNumber}
                className="rounded-xl border border-border bg-white p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif font-bold text-lg text-navy-900">
                      0{st.stageNumber}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#f1f5f9] text-text-muted">
                      {st.statusLabel}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-text-strong">{st.name}</h3>
                  <p className="mt-2 text-xs text-text-body leading-relaxed">
                    {st.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
