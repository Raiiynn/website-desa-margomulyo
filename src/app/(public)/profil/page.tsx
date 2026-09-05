import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import {
  EDUCATION_LEVELS,
  GOVERNANCE_PILLARS,
  MISSIONS,
  OCCUPATIONS,
  RELIGIONS,
  STATISTICS_SOURCE_LABEL,
  TYPED_PADUKUHAN,
  formatNumber,
  getSetting,
} from '@/data/fixtures';

export const metadata: Metadata = {
  title: 'Profil Desa',
  description:
    'Profil lengkap Kalurahan Margomulyo, Kapanewon Seyegan, Kabupaten Sleman. Visi, misi, sejarah, demografi kependudukan, dan 13 padukuhan.',
};

export default function ProfilPage() {
  const vision = getSetting(
    'village.vision',
    'Menciptakan Tata Kelola Pemerintahan Yang Jujur, Amanah dan Transparan Dalam Rangka Mewujudkan Kalurahan Margomulyo Yang Adil, Merata dan Sejahtera.'
  );

  const legalBasis = getSetting(
    'village.legalBasis',
    'Maklumat Nomor 5 Tahun 1948 tertanggal 22 April 1948 — konsolidasi tiga kelurahan lama: Gerjen, Sompokan, dan Jamblangan.'
  );

  return (
    <div className="py-8 sm:py-12">
      <Container>
        <Breadcrumbs items={[{ label: 'Profil Desa' }]} />

        {/* Page Header */}
        <div className="mt-4 max-w-3xl mb-12">
          <Badge variant="blue" className="mb-3">
            Identitas & Wilayah
          </Badge>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-navy-900 tracking-tight">
            Profil Kalurahan Margomulyo
          </h1>
          <p className="mt-4 text-base text-text-body leading-relaxed">
            Mengenal lebih dekat Kalurahan Margomulyo di Kapanewon Seyegan, Kabupaten
            Sleman, Daerah Istimewa Yogyakarta — sejarah penyatuan tiga kelurahan lama,
            arah pembangunan desa, serta keragaman 14.384 warganya.
          </p>
        </div>

        {/* Visi & Dasar Hukum Panel */}
        <div className="rounded-card border border-border bg-navy-900 p-8 sm:p-12 text-white relative overflow-hidden mb-16 shadow-md">
          <div className="max-w-2xl relative z-10 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-400">
              Visi Pembangunan Kalurahan
            </span>
            <p className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold leading-snug text-white">
              &ldquo;{vision}&rdquo;
            </p>
            <div className="pt-4 border-t border-white/15 text-xs text-white/80 space-y-1">
              <span className="font-bold text-gold-400 block uppercase tracking-wider text-[11px]">
                Dasar Pembentukan Kalurahan
              </span>
              <p className="leading-relaxed">{legalBasis}</p>
              <p className="text-[11px] text-white/60 pt-1">
                Hari Jadi Kalurahan diperingati setiap tanggal 11 November.
              </p>
            </div>
          </div>
        </div>

        {/* 10 Misi Pembangunan Kalurahan (Pattern P14 with gold numerals) */}
        <div className="mb-20">
          <SectionHeader
            eyebrow="Arah Kebijakan"
            title="10 Misi Pembangunan Kalurahan"
            description="Fokus program kerja kalurahan untuk optimalisasi pamong, pengairan pertanian, BUMKal, dan pelayanan prima warga."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MISSIONS.map((misi) => (
              <div
                key={misi.number}
                className="rounded-card border border-border bg-white p-5 flex items-start gap-4 hover:border-field-border hover:shadow-sm transition-all"
              >
                <div className="h-9 w-9 rounded-lg bg-gold-600/10 text-gold-750 flex items-center justify-center font-serif font-bold text-base shrink-0 border border-gold-600/20">
                  {String(misi.number).padStart(2, '0')}
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700">
                    {misi.label}
                  </span>
                  <h3 className="text-sm font-semibold text-text-strong">
                    {misi.title}
                  </h3>
                  <p className="text-xs text-text-body leading-relaxed">
                    {misi.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Pilar Tata Kelola Pemerintahan */}
        <div className="mb-20">
          <SectionHeader
            eyebrow="Nilai Integritas"
            title="4 Pilar Tata Kelola Kalurahan"
            description="Landasan moral dan etika aparatur pamong desa dalam melaksanakan tugas kepemerintahan."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GOVERNANCE_PILLARS.map((pilar, idx) => (
              <div
                key={pilar.name}
                className="rounded-card border border-border bg-band p-6 text-center space-y-2"
              >
                <span className="font-serif text-2xl font-bold text-blue-700 block">
                  0{idx + 1}
                </span>
                <h3 className="font-bold text-base text-navy-900">
                  {pilar.name}
                </h3>
                <p className="text-xs text-text-body leading-relaxed">
                  {pilar.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Demografi Penduduk & Statistik Terverifikasi */}
        <div className="mb-20">
          <SectionHeader
            eyebrow="Kependudukan & Wilayah"
            title="Statistik Kependudukan Terverifikasi"
            description={`Rincian kependudukan berdasarkan data resmi per 1 September 2026. Total populasi 14.384 jiwa terbagi berimbang antara laki-laki dan perempuan.`}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Agama */}
            <div className="rounded-card border border-border bg-white p-6">
              <h3 className="font-semibold text-sm text-text-strong mb-4 pb-2 border-b border-border">
                Komposisi Agama
              </h3>
              <div className="space-y-3">
                {RELIGIONS.map((rel) => (
                  <div
                    key={rel.religion}
                    className="flex items-center justify-between text-xs"
                  >
                    <span className="text-text-body">{rel.religion}</span>
                    <span className="font-semibold text-navy-900 tabular-nums">
                      {formatNumber(rel.people)} Jiwa ({rel.percentage ?? '<0.01'}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pendidikan */}
            <div className="rounded-card border border-border bg-white p-6">
              <h3 className="font-semibold text-sm text-text-strong mb-4 pb-2 border-b border-border">
                Jenjang Pendidikan
              </h3>
              <div className="space-y-3">
                {EDUCATION_LEVELS.map((edu) => (
                  <div
                    key={edu.level}
                    className="flex items-center justify-between text-xs"
                  >
                    <span className="text-text-body truncate max-w-[160px]">
                      {edu.level}
                    </span>
                    <span className="font-semibold text-navy-900 tabular-nums">
                      {formatNumber(edu.people)} Jiwa
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 5 Mata Pencaharian Terbanyak */}
            <div className="rounded-card border border-border bg-white p-6">
              <h3 className="font-semibold text-sm text-text-strong mb-4 pb-2 border-b border-border">
                Top 5 Pekerjaan Warga
              </h3>
              <div className="space-y-3">
                {OCCUPATIONS.map((occ) => (
                  <div
                    key={occ.occupation}
                    className="flex items-center justify-between text-xs"
                  >
                    <span className="text-text-body">
                      {occ.rank}. {occ.occupation}
                    </span>
                    <span className="font-semibold text-navy-900 tabular-nums">
                      {formatNumber(occ.people)} Jiwa
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-4 text-xs text-text-muted text-center">
            Sumber Data: {STATISTICS_SOURCE_LABEL}
          </p>
        </div>

        {/* 13 Wilayah Padukuhan */}
        <div id="padukuhan">
          <SectionHeader
            eyebrow="Kewilayahan"
            title="13 Padukuhan di Margomulyo"
            description="Daftar padukuhan resmi dengan potensi lokal pertanian padi sawah, perikanan, serta UMKM rakyat."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TYPED_PADUKUHAN.map((pad) => (
              <div
                key={pad.number}
                className={`rounded-card border p-5 flex flex-col justify-between bg-white hover:border-field-border hover:shadow-sm transition-all ${
                  pad.isHistoricalCore ? 'border-gold-600/40 bg-[#fdfbf7]' : 'border-border'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-serif font-bold text-blue-700 text-base">
                      0{pad.number}
                    </span>
                    {pad.isHistoricalCore && (
                      <Badge variant="gold">Inti Sejarah</Badge>
                    )}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-navy-900">
                    Padukuhan {pad.name}
                  </h3>
                  <p className="mt-2 text-xs text-text-body leading-relaxed">
                    {pad.potentialSummary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs text-text-muted">
                  <span>Seyegan, Sleman</span>
                  <span className="text-blue-700 font-semibold text-[11px]">
                    Kalurahan Margomulyo
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
