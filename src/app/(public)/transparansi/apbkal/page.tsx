import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import {
  BUDGET,
  BUDGET_EXPENDITURE_ALLOCATION_LINES,
  BUDGET_EXPENDITURE_BIDANG_LINES,
  BUDGET_FINANCING_LINES,
  BUDGET_REALIZATION,
  BUDGET_REVENUE_LINES,
  formatCompactRupiah,
  formatRupiah,
} from '@/data/fixtures';

export const metadata: Metadata = {
  title: 'Rincian APBKal 2026',
  description:
    'Rincian lengkap Anggaran Pendapatan dan Belanja Kalurahan (APBKal) Margomulyo Tahun Anggaran 2026.',
};

export default function APBKalDetailPage() {
  return (
    <div className="py-8 sm:py-12">
      <Container>
        <Breadcrumbs
          items={[
            { label: 'Transparansi', href: '/transparansi' },
            { label: 'Rincian APBKal 2026' },
          ]}
        />

        {/* Page Header */}
        <div className="mt-4 max-w-3xl mb-12">
          <Badge variant="gold" className="mb-3">
            Peraturan Kalurahan TA 2026
          </Badge>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-navy-900 tracking-tight">
            Neraca Lengkap APBKal TA 2026
          </h1>
          <p className="mt-4 text-base text-text-body leading-relaxed">
            Dokumen resmi penetapan anggaran Kalurahan Margomulyo. Seluruh data
            keuangan tersaji secara terbuka, dapat diaudit oleh warga, dan telah
            direkonsiliasi sesuai peraturan perundang-undangan.
          </p>
        </div>

        {/* Ringkasan Postur 3 Kotak Utama */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="rounded-card border border-border bg-white p-6 shadow-sm">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 block">
              1. Total Pendapatan
            </span>
            <div className="mt-2 font-serif text-3xl font-bold text-navy-900">
              {formatRupiah(BUDGET.totalRevenue)}
            </div>
            <span className="text-xs text-text-muted mt-1 block">
              {formatCompactRupiah(BUDGET.totalRevenue)}
            </span>
          </div>

          <div className="rounded-card border border-border bg-white p-6 shadow-sm">
            <span className="text-xs font-semibold uppercase tracking-wider text-gold-700 block">
              2. Total Belanja
            </span>
            <div className="mt-2 font-serif text-3xl font-bold text-navy-900">
              {formatRupiah(BUDGET.totalExpenditure)}
            </div>
            <span className="text-xs text-text-muted mt-1 block">
              {formatCompactRupiah(BUDGET.totalExpenditure)}
            </span>
          </div>

          <div className="rounded-card border border-border bg-white p-6 shadow-sm">
            <span className="text-xs font-semibold uppercase tracking-wider text-green-700 block">
              3. Pembiayaan Netto
            </span>
            <div className="mt-2 font-serif text-3xl font-bold text-navy-900">
              {formatRupiah(BUDGET.netFinancing)}
            </div>
            <span className="text-xs text-green-800 mt-1 block font-medium">
              ✓ {BUDGET.balanceLabel}
            </span>
          </div>
        </div>

        {/* Tabel Pendapatan & Belanja */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Pendapatan */}
          <div className="rounded-card border border-border bg-white p-6 sm:p-8">
            <h2 className="font-serif text-xl font-bold text-navy-900 mb-4 pb-3 border-b border-border">
              Penerimaan Pendapatan Kalurahan
            </h2>
            <div className="space-y-4">
              {BUDGET_REVENUE_LINES.map((line) => (
                <div
                  key={line.label}
                  className="flex items-center justify-between text-xs py-1 border-b border-band"
                >
                  <span className="font-medium text-text-strong">{line.label}</span>
                  <span className="font-mono font-bold text-navy-900 tabular-nums">
                    {formatRupiah(line.amount)}
                  </span>
                </div>
              ))}
              <div className="pt-3 flex items-center justify-between text-sm font-bold text-navy-900">
                <span>Jumlah Pendapatan</span>
                <span className="font-mono">{formatRupiah(BUDGET.totalRevenue)}</span>
              </div>
            </div>
          </div>

          {/* Belanja Menurut Alokasi */}
          <div className="rounded-card border border-border bg-white p-6 sm:p-8">
            <h2 className="font-serif text-xl font-bold text-navy-900 mb-4 pb-3 border-b border-border">
              Alokasi Pengeluaran Belanja
            </h2>
            <div className="space-y-4">
              {BUDGET_EXPENDITURE_ALLOCATION_LINES.map((alloc) => (
                <div key={alloc.label} className="space-y-1 py-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-text-strong">{alloc.label}</span>
                    <span className="font-mono font-bold text-blue-700 tabular-nums">
                      {alloc.percentage}% • {formatRupiah(alloc.amount)}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-band rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-700 rounded-full"
                      style={{ width: `${alloc.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
              <div className="pt-3 flex items-center justify-between text-sm font-bold text-navy-900">
                <span>Jumlah Belanja</span>
                <span className="font-mono">{formatRupiah(BUDGET.totalExpenditure)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Klasifikasi 5 Bidang Permendagri */}
        <div className="rounded-card border border-border bg-white p-6 sm:p-8 mb-16">
          <SectionHeader
            eyebrow="Klasifikasi Regulasi"
            title="Belanja Berdasarkan 5 Bidang Permendagri"
            description="Standar pengelompokan anggaran kalurahan sesuai tata kelola keuangan desa nasional."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {BUDGET_EXPENDITURE_BIDANG_LINES.map((bidang, idx) => (
              <div
                key={bidang.label}
                className="rounded-card border border-border bg-band p-4 flex flex-col justify-between"
              >
                <div>
                  <span className="font-serif font-bold text-lg text-blue-700 block mb-1">
                    0{idx + 1}
                  </span>
                  <h3 className="font-semibold text-xs text-text-strong leading-snug">
                    {bidang.label}
                  </h3>
                </div>
                <div className="mt-4 pt-2 border-t border-border">
                  <span className="text-xs font-mono font-bold text-navy-900 block">
                    {bidang.amountLabel}
                  </span>
                  <span className="text-[11px] text-text-muted block">
                    Porsi: {bidang.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pembiayaan & Realisasi Semester II */}
        <div id="realisasi" className="rounded-card border border-border bg-band p-6 sm:p-8 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Rincian Pembiayaan */}
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-navy-900">
                Pos Pembiayaan Kalurahan
              </h3>
              <p className="text-xs text-text-body">
                Pemanfaatan Sisa Lebih Perhitungan Anggaran (SiLPA) tahun sebelumnya
                untuk menutup defisit belanja dan penyertaan modal BUMKal.
              </p>
              <div className="space-y-2 text-xs">
                {BUDGET_FINANCING_LINES.map((line) => (
                  <div
                    key={line.label}
                    className="flex items-center justify-between p-3 rounded-lg bg-white border border-border"
                  >
                    <span className="text-text-strong font-medium">{line.label}</span>
                    <span className="font-mono font-bold text-navy-900">
                      {formatRupiah(line.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Capaian Realisasi */}
            <div className="rounded-card border border-border-accent bg-white p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-green-700">
                  Laporan Realisasi {BUDGET_REALIZATION.period}
                </span>
                <Badge variant="green">{BUDGET_REALIZATION.physicalNote}</Badge>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span>Penyerapan Kas SP2D: {BUDGET_REALIZATION.cashPercent}%</span>
                    <span className="font-mono">{formatRupiah(BUDGET_REALIZATION.cashAmount)}</span>
                  </div>
                  <div className="h-2 w-full bg-band rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-700 rounded-full"
                      style={{ width: `${BUDGET_REALIZATION.cashPercent}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span>Kemajuan Fisik Pekerjaan: {BUDGET_REALIZATION.physicalPercent}%</span>
                    <span>Target: {BUDGET_REALIZATION.physicalTargetPercent}%</span>
                  </div>
                  <div className="h-2 w-full bg-band rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-700 rounded-full"
                      style={{ width: `${BUDGET_REALIZATION.physicalPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
