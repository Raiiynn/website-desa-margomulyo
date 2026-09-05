import React from 'react';
import Link from 'next/link';
import {
  SITE_SUBTITLE,
} from '@/lib/site';
import {
  BUDGET,
  GOVERNANCE_PILLARS,
  BUDGET_CYCLE_STAGES,
  BUDGET_EXPENDITURE_ALLOCATION_LINES,
  BUDGET_REALIZATION,
  BUDGET_REVENUE_LINES,
  LOCAL_POTENTIALS,
  NEWS,
  SERVICES,
  formatCompactRupiah,
  getSetting,
  formatDateIndonesian,
  formatRupiah,
} from '@/data/fixtures';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StatStrip } from '@/components/ui/StatStrip';
import { LabelledDataCard } from '@/components/ui/LabelledDataCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  ArrowRight,
  CheckCircle,
  Calendar,
  Building,
} from '@/components/ui/Icons';

export default function HomePage() {
  // Published news sorted by date
  const publishedNews = NEWS.filter((n) => n.status === 'PUBLISHED');
  const featuredArticle = publishedNews[0];
  const secondaryArticles = publishedNews.slice(1, 5);

  // Top 4 services to highlight
  const highlightedServices = SERVICES.slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* ------------------------------------------------------------------ */}
      {/* 1. HERO SECTION                                                    */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden bg-navy-900 pt-16 pb-24 lg:pt-24 lg:pb-32 text-white">
        {/* Subtle geometric pattern background representing Yogyakarta cultural architecture */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(#9e7b36 1px, transparent 1px), radial-gradient(#0160a1 1px, #002446 1px)',
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0, 20px 20px',
          }}
          aria-hidden="true"
        />

        <Container className="relative z-10">
          <div className="max-w-3xl">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-gold-400 border border-white/15 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-600" aria-hidden="true" />
              <span>{SITE_SUBTITLE} • DAERAH ISTIMEWA YOGYAKARTA</span>
            </div>

            {/* Serif Display Title */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
              Mewujudkan Tata Kelola Kalurahan yang Jujur, Amanah & Transparan
            </h1>

            {/* Sans Description */}
            <p className="mt-6 text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl font-normal">
              Portal resmi pelayanan administrasi publik terpadu, keterbukaan
              anggaran APBKal, warta pembangunan partisipatif, dan pemberdayaan
              masyarakat di 13 padukuhan Kalurahan Margomulyo.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Button
                href="/layanan"
                size="lg"
                variant="secondary"
                className="font-semibold shadow-lg"
              >
                <span>Jelajahi Layanan Publik</span>
                <ArrowRight size={18} />
              </Button>

              <Button
                href="/transparansi"
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-white/30 hover:bg-white/10 hover:text-white"
              >
                <span>Transparansi APBKal 2026</span>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 2. OVERLAPPING STAT STRIP (Pattern P03)                             */}
      {/* ------------------------------------------------------------------ */}
      <div className="-mt-12 lg:-mt-16">
        <StatStrip />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 3. SAMBUTAN LURAH & 4 PILAR TATA KELOLA (Pattern P05 & P14)         */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 lg:py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Lurah Portrait & Credentials Block */}
            <div className="lg:col-span-5">
              <div className="relative rounded-[16px] border border-border bg-band p-8 text-center sm:text-left flex flex-col items-center sm:items-start">
                {/* Official Monogram Photo Frame */}
                <div className="h-44 w-44 rounded-2xl bg-navy-900 text-white flex flex-col items-center justify-center border-4 border-white shadow-md relative overflow-hidden mb-6">
                  <span className="font-serif text-5xl font-bold text-gold-600">EPM</span>
                  <span className="text-[11px] uppercase tracking-widest text-white/70 mt-2">
                    Lurah Margomulyo
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-700">
                    Kepala Pemerintahan Kalurahan
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-navy-900">
                    Eko Puji Mulyanto
                  </h3>
                  <p className="text-xs text-text-body">
                    Lurah Margomulyo (Masa Jabatan 2021 – 2027)
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-[#e2e8f0] w-full flex items-center justify-between text-xs text-text-muted">
                  <span className="flex items-center gap-1.5">
                    <Building size={14} className="text-blue-700" />
                    <span>Pamong Kalurahan</span>
                  </span>
                  <span className="font-semibold text-navy-900">Seyegan, Sleman</span>
                </div>
              </div>
            </div>

            {/* Statement and Visi-Misi */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2.5 text-xs font-semibold tracking-wider uppercase text-blue-700">
                <span className="h-0.5 w-6 rounded-full bg-blue-700" aria-hidden="true" />
                <span>Sambutan Lurah Margomulyo</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-navy-900 tracking-tight leading-snug">
                {getSetting('village.sambutanHeading')}
              </h2>

              {/* Pull quote with rule border */}
              {/* Verbatim from the source concept, p1 (SOURCE_DATA.md §3.1).
                  Any statement attributed to the kalurahan or its officials must
                  come from the register verbatim — never be written for them. */}
              <blockquote className="border-l-4 border-gold-600 pl-5 py-2 my-4 text-base sm:text-lg font-serif italic text-text-strong leading-relaxed bg-band rounded-r-lg">
                &ldquo;{getSetting('village.sambutanQuote')}&rdquo;
              </blockquote>

              <p className="text-sm text-text-body leading-relaxed">
                {getSetting('village.sambutanBody')}
              </p>

              {/* 4 Pilar Grid Inset */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {GOVERNANCE_PILLARS.map((pillar, idx) => (
                  <div
                    key={pillar.name}
                    className="rounded-lg border border-border bg-white p-3 text-center"
                  >
                    <span className="text-xs font-bold text-blue-700 block">
                      {idx + 1}. {pillar.name}
                    </span>
                    <span className="text-[11px] text-text-muted block mt-1">
                      {pillar.description}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Button href="/pemerintahan" variant="outline" size="sm">
                  <span>Lihat Struktur Pemerintahan Desa</span>
                  <ArrowRight size={14} />
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 4. LAYANAN PUBLIK UNGGULAN (Pattern P06)                            */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 bg-band border-y border-border">
        <Container>
          <SectionHeader
            eyebrow="Pelayanan Administrasi Warga"
            title="Layanan Publik Kalurahan"
            description="Pengurusan dokumen kependudukan, surat keterangan umum, dan perizinan tanpa perantara dengan biaya Rp 0 (Gratis)."
            linkHref="/layanan"
            linkLabel="Lihat Semua Layanan"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlightedServices.map((service) => (
              <LabelledDataCard
                key={service.slug}
                title={service.name}
                category="Administrasi Desa"
                badge={service.badge ?? 'Rp 0'}
                code={service.code}
                description={service.description}
                href={`/layanan#${service.slug}`}
                actionLabel="Lihat Persyaratan"
                items={[
                  { label: 'Waktu Proses', value: service.duration },
                  { label: 'Metode', value: service.method },
                  { label: 'Output', value: service.output },
                ]}
              />
            ))}
          </div>

          {/* Quick Notice Banner on Service */}
          <div className="mt-8 rounded-xl border border-[#d6e7f7] bg-surface-tint p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-700">
            <div className="flex items-center gap-3">
              <span className="h-8 w-8 rounded-full bg-blue-700 text-white flex items-center justify-center shrink-0 font-bold">
                i
              </span>
              <p className="leading-relaxed text-text-strong">
                <strong className="text-blue-700">Layanan Mandiri Daring 24 Jam:</strong> Pengajuan
                surat mandiri kependudukan melalui aplikasi Lukadesi Sleman dan konsultasi WhatsApp
                dapat dilakukan sewaktu-waktu. Validasi petugas diproses pada jam kerja berikutnya.
              </p>
            </div>
            <Link
              href="/layanan"
              className="shrink-0 font-bold text-blue-700 hover:text-navy-900 underline underline-offset-4"
            >
              Panduan Layanan
            </Link>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 5. BERITA & WARTA KEGIATAN (Pattern P04 - Asymmetric 1 + 4)         */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 lg:py-24 bg-white">
        <Container>
          <SectionHeader
            eyebrow="Kabar Kalurahan"
            title="Warta Pembangunan & Kegiatan"
            description="Informasi resmi seputar penyaluran bantuan sosial, evaluasi desa budaya, dan agenda kegiatan masyarakat Margomulyo."
            linkHref="/berita"
            linkLabel="Buka Arsip Berita"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Featured Lead Article (Left 7 cols) */}
            {featuredArticle && (
              <div className="lg:col-span-7 flex flex-col rounded-[12px] border border-border bg-white overflow-hidden hover:border-field-border hover:shadow-md transition-all duration-200">
                {/* Photo placeholder with category overlay */}
                <div className="h-64 sm:h-72 bg-navy-900 relative flex items-end p-6 text-white overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/50 to-transparent" />
                  <div className="relative z-10 space-y-2">
                    <Badge variant="gold">Bantuan Sosial</Badge>
                    <div className="flex items-center gap-3 text-xs text-white/80">
                      <span className="flex items-center gap-1">
                        <Calendar size={13} />
                        <span>{formatDateIndonesian(featuredArticle.publishedAt!)}</span>
                      </span>
                      <span>•</span>
                      <span>{featuredArticle.bylineLabel ?? 'Tim Liputan Margomulyo'}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-navy-900 hover:text-blue-700 transition-colors leading-snug">
                      <Link href={`/berita/${featuredArticle.slug}`}>
                        {featuredArticle.title}
                      </Link>
                    </h3>
                    <p className="mt-3 text-sm text-text-body leading-relaxed line-clamp-3">
                      {featuredArticle.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#f1f5f9] flex items-center justify-between">
                    <Link
                      href={`/berita/${featuredArticle.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 hover:text-navy-900"
                    >
                      <span>Baca Selengkapnya</span>
                      <ArrowRight size={14} />
                    </Link>
                    <span className="text-xs text-text-muted">Warta Resmi Desa</span>
                  </div>
                </div>
              </div>
            )}

            {/* 4 Secondary Vertical Articles (Right 5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              {secondaryArticles.map((article) => (
                <div
                  key={article.slug}
                  className="rounded-[12px] border border-border bg-white p-5 hover:border-field-border hover:bg-band transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs text-text-muted mb-1.5">
                      <span className="font-semibold text-blue-700 text-[11px] uppercase tracking-wider">
                        Warta Kalurahan
                      </span>
                      {article.publishedAt && (
                        <span>{formatDateIndonesian(article.publishedAt)}</span>
                      )}
                    </div>
                    <h4 className="font-semibold text-sm sm:text-base text-text-strong hover:text-blue-700 transition-colors leading-snug line-clamp-2">
                      <Link href={`/berita/${article.slug}`}>{article.title}</Link>
                    </h4>
                  </div>

                  <div className="mt-3 pt-2 flex items-center justify-between text-xs">
                    <Link
                      href={`/berita/${article.slug}`}
                      className="text-blue-700 font-medium hover:underline text-xs inline-flex items-center gap-1"
                    >
                      <span>Rincian</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 6. TRANSPARANSI APBKAL 2026 (Pattern P09)                           */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 bg-band-alt border-y border-border">
        <Container>
          <SectionHeader
            eyebrow="Keterbukaan Anggaran Desa"
            title="Transparansi APBKal Tahun Anggaran 2026"
            description="Laporan keterbukaan anggaran pendapatan, pos belanja, dan realisasi fisik demi akuntabilitas tata kelola desa berlandaskan musyawarah."
            linkHref="/transparansi/apbkal"
            linkLabel="Buka Rincian APBKal 2026"
          />

          {/* Primary Budget Balance KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Pendapatan */}
            <div className="rounded-[12px] border border-border bg-white p-6 shadow-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-700">
                Total Pendapatan Kalurahan
              </span>
              <div className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-navy-900">
                {formatRupiah(BUDGET.totalRevenue)}
              </div>
              <p className="mt-2 text-xs text-text-body">
                Bersumber dari Dana Desa, ADD Sleman, PADes, dan BKK DIY.
              </p>
            </div>

            {/* Belanja */}
            <div className="rounded-[12px] border border-border bg-white p-6 shadow-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-gold-700">
                Total Belanja Kalurahan
              </span>
              <div className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-navy-900">
                {formatRupiah(BUDGET.totalExpenditure)}
              </div>
              <p className="mt-2 text-xs text-text-body">
                Dialokasikan untuk pembangunan fisik, pamong, pembinaan & warga.
              </p>
            </div>

            {/* Pembiayaan Netto & Status */}
            <div className="rounded-[12px] border border-border bg-white p-6 shadow-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-green-700">
                Pembiayaan Netto (SiLPA)
              </span>
              <div className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-navy-900">
                {formatRupiah(BUDGET.netFinancing)}
              </div>
              <p className="mt-2 text-xs text-green-800 font-medium flex items-center gap-1">
                <CheckCircle size={14} />
                <span>{BUDGET.balanceLabel}</span>
              </p>
            </div>
          </div>

          {/* Detailed Allocation Bars Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 4 Sumber Pendapatan */}
            <div className="rounded-[12px] border border-border bg-white p-6 sm:p-7">
              <h3 className="font-semibold text-base text-text-strong mb-4 pb-3 border-b border-[#f1f5f9]">
                Rincian Sumber Pendapatan Kalurahan
              </h3>
              <div className="space-y-4">
                {BUDGET_REVENUE_LINES.map((line) => (
                  <div key={line.label} className="flex items-center justify-between text-xs">
                    <span className="text-text-strong font-medium max-w-[220px] sm:max-w-none">
                      {line.label}
                    </span>
                    <span className="font-mono font-bold text-navy-900 tabular-nums">
                      {formatRupiah(line.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4 Alokasi Belanja */}
            <div className="rounded-[12px] border border-border bg-white p-6 sm:p-7">
              <h3 className="font-semibold text-base text-text-strong mb-4 pb-3 border-b border-[#f1f5f9]">
                Alokasi Penggunaan Anggaran Belanja
              </h3>
              <div className="space-y-4">
                {BUDGET_EXPENDITURE_ALLOCATION_LINES.map((alloc) => (
                  <div key={alloc.label} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-text-strong font-medium">
                        {alloc.label}
                      </span>
                      <span className="font-semibold text-blue-700 tabular-nums">
                        {alloc.percentage}% • {formatCompactRupiah(alloc.amount)}
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-[#f1f5f9] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-blue-700"
                        style={{ width: `${alloc.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Realization Progress Summary Bar */}
          <div className="mt-8 rounded-xl border border-border bg-white p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                Realisasi Anggaran & Fisik {BUDGET_REALIZATION.period}
              </span>
              <p className="text-sm font-semibold text-text-strong">
                Penyerapan Kas {BUDGET_REALIZATION.cashPercent}% ({formatRupiah(BUDGET_REALIZATION.cashAmount)}) • Fisik {BUDGET_REALIZATION.physicalPercent}%
              </p>
              <p className="text-xs text-green-800 font-medium">
                {BUDGET_REALIZATION.physicalNote}
              </p>
            </div>

            <Button href="/transparansi" variant="primary" size="sm">
              <span>Buka Portal Transparansi</span>
              <ArrowRight size={14} />
            </Button>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 7. SIKLUS AKUNTABILITAS 5-TAHAP (Pattern P07)                      */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 bg-white">
        <Container>
          <SectionHeader
            eyebrow="Tata Kelola Anggaran"
            title="5 Tahapan Pengawasan & Siklus APBKal"
            description="Alur pertanggungjawaban pengelolaan keuangan desa sejak perencanaan musrenbang hingga audit inspektorat daerah."
            align="left"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {BUDGET_CYCLE_STAGES.map((stage) => {
              const isDone = stage.statusLabel === 'Tuntas';
              const isOngoing = stage.statusLabel.includes('Berjalan');

              return (
                <div
                  key={stage.stageNumber}
                  className={`rounded-xl border p-5 flex flex-col justify-between ${
                    isOngoing
                      ? 'border-blue-700 bg-band shadow-sm'
                      : isDone
                      ? 'border-green-700/30 bg-white'
                      : 'border-border bg-white'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-serif text-xl font-bold text-navy-900">
                        0{stage.stageNumber}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          isDone
                            ? 'bg-green-700/10 text-green-800'
                            : isOngoing
                            ? 'bg-blue-700/10 text-blue-700'
                            : 'bg-[#f1f5f9] text-text-muted'
                        }`}
                      >
                        {stage.statusLabel}
                      </span>
                    </div>

                    <h4 className="font-semibold text-sm text-text-strong">
                      {stage.name}
                    </h4>

                    <p className="mt-2 text-xs text-text-body leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 8. POTENSI UNGGULAN DESA (Pattern P14)                             */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 bg-band border-t border-border">
        <Container>
          <SectionHeader
            eyebrow="Potensi Kalurahan"
            title="Sektor Unggulan & Kearifan Lokal"
            description="Margomulyo dikenal sebagai lumbung pangan Sleman barat, sentra industri tempe tradisional, dan pusat pelestari seni tradisi Mataram."
            linkHref="/potensi"
            linkLabel="Eksplorasi Potensi Desa"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LOCAL_POTENTIALS.slice(0, 3).map((potential, idx) => (
              <div
                key={potential.slug}
                className="rounded-[12px] border border-border bg-white p-6 flex flex-col justify-between hover:border-field-border hover:shadow-sm transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs text-blue-700 font-semibold uppercase tracking-wider mb-3">
                    <span>{potential.headline}</span>
                    <span className="font-serif font-bold text-base text-gold-700">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-navy-900 tracking-tight">
                    {potential.title}
                  </h3>

                  <p className="mt-2 text-xs text-text-body leading-relaxed line-clamp-3">
                    {potential.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-[#f1f5f9] text-[11px] font-semibold text-green-800">
                    ✓ {potential.highlight}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#f1f5f9]">
                  <Link
                    href={`/potensi#${potential.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-navy-900"
                  >
                    <span>Rincian Potensi</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 9. NAVY CONVERSION PANEL — ADUAN & ASPIRASI (Pattern P13)          */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 bg-navy-900 text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-gold-700 border border-white/15">
              <span>Layanan Partisipasi Warga</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              Punya Masukan, Saran, atau Laporan Pengaduan?
            </h2>

            <p className="text-base text-white/80 leading-relaxed font-normal">
              Pemerintah Kalurahan Margomulyo membuka kanal aduan masyarakat resmi yang
              aman, transparan, dan dapat memilih opsi anonim. Setiap laporan ditangani
              langsung oleh penanggung jawab pengaduan dengan standar respons 1x24 jam kerja.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                href="/pengaduan"
                variant="gold"
                size="lg"
                className="w-full sm:w-auto font-semibold"
              >
                <span>Sampaikan Aduan & Aspirasi</span>
                <ArrowRight size={18} />
              </Button>

              <Button
                href="/kontak"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-white/5 border-white/20 text-white hover:bg-white/10"
              >
                <span>Kontak Kantor Kalurahan</span>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
