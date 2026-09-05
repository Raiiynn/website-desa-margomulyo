import React from 'react';
import Link from 'next/link';
import { SITE_SUBTITLE } from '@/lib/site';
import {
  BUDGET,
  BUDGET_REALIZATION,
  DEMOGRAPHICS,
  DOCUMENTS,
  GOVERNANCE_PILLARS,
  LOCAL_POTENTIALS,
  NEWS,
  SERVICES,
  formatDateIndonesian,
  formatRupiah,
  getSetting,
} from '@/data/fixtures';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StatStrip } from '@/components/ui/StatStrip';
import { LabelledDataCard } from '@/components/ui/LabelledDataCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SemanticProgressBar } from '@/components/ui/SemanticProgressBar';
import {
  ArrowRight,
  Calendar,
  Building,
} from '@/components/ui/Icons';

export default function HomePage() {
  // Reference p1, recorded in SOURCE_DATA §3.2. The source's fourth card
  // ("86 RT") is withheld under conflict C05, so this ships as three.
  const TERRITORY_CARDS = [
    {
      figure: `${DEMOGRAPHICS.areaHectares.replace('.', ',')} Ha`,
      label: 'Luas Wilayah',
      caption: getSetting('village.areaCaption'),
    },
    {
      figure: `${DEMOGRAPHICS.padukuhanCount} Padukuhan`,
      label: 'Wilayah Dusun',
      caption: getSetting('village.padukuhanCaption'),
    },
    {
      figure: `${DEMOGRAPHICS.rwCount} RW`,
      label: 'Rukun Warga',
      caption: getSetting('village.rwCaption'),
    },
  ];

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
        <Container className="relative z-10">
          <div className="max-w-3xl">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-gold-400 border border-white/15 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-600" aria-hidden="true" />
              <span>{SITE_SUBTITLE}</span>
            </div>

            {/* Serif Display Title */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
              Selamat Datang di Kalurahan Margomulyo
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

              <Button href="/transparansi" size="lg" variant="inverse">
                <span>Transparansi APBKal 2026</span>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 2. OVERLAPPING STAT STRIP (Pattern P03)                             */}
      {/* ------------------------------------------------------------------ */}
      {/* P03: the strip overlaps the hero from md upward. On small screens it
          returns to normal document flow — a negative margin there would
          crowd the hero copy and clip on 320px viewports. */}
      <div className="md:-mt-12 lg:-mt-16">
        <StatStrip />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 3. SAMBUTAN LURAH (reference p1)                                */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 lg:py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Lurah Portrait & Credentials Block */}
            <div className="lg:col-span-5">
              <div className="relative rounded-card border border-border bg-band p-8 text-center sm:text-left flex flex-col items-center sm:items-start">
                {/* Official Monogram Photo Frame */}
                <div className="h-44 w-44 rounded-card bg-navy-900 text-white flex flex-col items-center justify-center border-4 border-white shadow-md relative overflow-hidden mb-6">
                  <span className="font-serif text-5xl font-bold text-gold-600">EPM</span>
                  <span className="text-[11px] uppercase tracking-widest text-white/70 mt-2">
                    Lurah Margomulyo
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-700">
                    Kepala Pemerintahan Kalurahan
                  </span>
                  <p className="font-serif text-2xl font-bold text-navy-900">
                    Eko Puji Mulyanto
                  </p>
                  <p className="text-xs text-text-body">
                    Lurah Margomulyo (Masa Jabatan 2021 – 2027)
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-border w-full flex items-center justify-between text-xs text-text-muted">
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
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {GOVERNANCE_PILLARS.map((pillar, idx) => (
                  <div
                    key={pillar.name}
                    className="rounded-card border border-border bg-white p-4"
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
      {/* 4. MENGENAL KALURAHAN — WILAYAH (reference p1)                  */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 lg:py-24 bg-band border-y border-border">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 lg:items-end">
            <div className="lg:col-span-8">
              <SectionHeader
                eyebrow="Wilayah Strategis Seyegan"
                title="Mengenal Kalurahan Margomulyo"
                description={getSetting('village.territoryIntro')}
              />
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <Link
                href="/profil"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:underline underline-offset-4"
              >
                <span>Lihat Profil Lengkap Kalurahan</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/*
            The reference renders a fourth card here, "86 RT — Rukun Tetangga".
            SOURCE_DATA conflict C05 withholds it: pages 2 and 3 disagree on 9 of
            13 padukuhan and neither itemisation sums to the stated 86. Three
            cards is the honest composition.
          */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {TERRITORY_CARDS.map((item) => (
              <div
                key={item.label}
                className="rounded-card border border-border bg-white p-6"
              >
                <p className="font-serif text-3xl font-bold text-navy-900" data-numeric>
                  {item.figure}
                </p>
                <p className="mt-1 text-sm font-semibold text-text-strong">{item.label}</p>
                <p className="mt-2 text-xs leading-relaxed text-text-muted">{item.caption}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 5. BERITA & INFORMASI TERKINI (P04)                             */}
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
              <div className="lg:col-span-7 flex flex-col rounded-card border border-border bg-white overflow-hidden hover:border-field-border hover:shadow-md transition-all duration-200">
                {/*
                    Editorial masthead, not an image slot. Official
                    photography is unavailable (SOURCE_DATA V16), so this
                    band is sized to its own content rather than reserving
                    space for a picture that will never load.
                  */}
                <div className="bg-navy-900 flex items-center justify-between gap-4 px-6 py-5 text-white">
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

                  <span
                    aria-hidden="true"
                    className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-card border border-white/20 bg-white/5 font-serif text-xl font-bold text-gold-400"
                  >
                    M
                  </span>
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

                  <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
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
                  className="rounded-card border border-border bg-white p-5 hover:border-field-border hover:bg-band transition-all duration-200 flex flex-col justify-between"
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
      {/* 6. LAYANAN PUBLIK (P09)                                         */}
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
          <div className="mt-8 rounded-card border border-border-accent bg-surface-tint p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-700">
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
      {/* 7. POTENSI UNGGULAN MARGOMULYO                                  */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 bg-white border-t border-border">
        <Container>
          <SectionHeader
            eyebrow="Potensi Kalurahan"
            title="Sektor Unggulan & Kearifan Lokal"
            description="Margomulyo dikenal sebagai lumbung pangan Sleman barat, sentra industri tempe tradisional, dan pusat pelestari seni tradisi Mataram."
            linkHref="/potensi"
            linkLabel="Eksplorasi Potensi Desa"
          />

          {/*
            Six-column track so five cards resolve to 2-then-3 rather than
            leaving an orphan cell. That is the rhythm the reference uses
            here: two wide cards above three narrower ones. At md the
            fifth card spans full width instead of sitting alone at half.
          */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            {LOCAL_POTENTIALS.map((potential, idx) => (
              <div
                key={potential.slug}
                className={`rounded-card border border-border bg-white p-6 flex flex-col justify-between hover:border-field-border hover:shadow-sm transition-all duration-200 ${
                    idx < 2
                      ? 'md:col-span-3'
                      : idx < 4
                        ? 'md:col-span-3 lg:col-span-2'
                        : 'md:col-span-6 lg:col-span-2'
                  }`}
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

                  <p className="mt-2 text-xs text-text-body leading-relaxed">
                    {potential.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-border text-[11px] font-semibold text-green-800">
                    ✓ {potential.highlight}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border">
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
      {/* 8. TRANSPARANSI — TIGA PINTU (reference p1)                     */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 lg:py-24 bg-band border-y border-border">
        <Container>
          <SectionHeader
            eyebrow="Akuntabilitas Publik Tahun 2026"
            title="Terbuka untuk Seluruh Masyarakat"
            description="Akses informasi perencanaan, realisasi anggaran, dan regulasi kalurahan terbuka untuk dipantau."
            linkHref="/transparansi"
            linkLabel="Lihat Transparansi Lengkap"
          />

          {/*
            Three summary doors, matching the reference homepage. The full APBKal
            breakdown lives on /transparansi/apbkal and the five-gate
            accountability cycle on /transparansi — rendering either here would
            duplicate them and overload the homepage.
          */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
            <article className="flex flex-col rounded-card border border-border bg-white p-6">
              <div>
                <Badge variant="blue">TA 2026</Badge>
              </div>
              <h3 className="mt-3 font-serif text-xl font-bold text-navy-900">
                APBKal Margomulyo
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-body">
                Struktur Anggaran Pendapatan dan Belanja Kalurahan tahun berjalan.
              </p>
              <dl className="mt-4 border-t border-border pt-4">
                <dt className="text-sm text-text-muted">Total Pendapatan</dt>
                <dd className="font-serif text-2xl font-bold text-navy-900" data-numeric>
                  {formatRupiah(BUDGET.totalRevenue)}
                </dd>
              </dl>
              <Link
                href="/transparansi/apbkal"
                className="mt-auto pt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:underline underline-offset-4"
              >
                <span>Rincian Neraca APBKal</span>
                <ArrowRight size={15} />
              </Link>
            </article>

            <article className="flex flex-col rounded-card border border-border bg-white p-6">
              <div>
                <Badge variant="green">{BUDGET_REALIZATION.period}</Badge>
              </div>
              <h3 className="mt-3 font-serif text-xl font-bold text-navy-900">
                Realisasi Program Kerja
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-body">
                Capaian fisik pembangunan, irigasi, dan pemberdayaan masyarakat.
              </p>
              <div className="mt-4 border-t border-border pt-4">
                <SemanticProgressBar
                  label="Capaian Fisik Lapangan"
                  percentage={Number(BUDGET_REALIZATION.physicalPercent)}
                  targetPercentage={Number(BUDGET_REALIZATION.physicalTargetPercent)}
                  variant="blue"
                />
              </div>
              <Link
                href="/pembangunan"
                className="mt-auto pt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:underline underline-offset-4"
              >
                <span>Daftar Kegiatan Pembangunan</span>
                <ArrowRight size={15} />
              </Link>
            </article>

            <article className="flex flex-col rounded-card border border-border bg-white p-6">
              <div>
                <Badge variant="gold">Dokumen Resmi</Badge>
              </div>
              <h3 className="mt-3 font-serif text-xl font-bold text-navy-900">
                Dokumen &amp; Laporan
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-body">
                Peraturan Kalurahan, RKPKal, RPJMKal, dan laporan pertanggungjawaban.
              </p>
              <ul className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
                {DOCUMENTS.slice(0, 2).map((doc) => (
                  <li key={doc.slug} className="flex items-start gap-2 text-text-body">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-600" aria-hidden="true" />
                    <span className="leading-snug">{doc.categoryLabel}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/dokumen"
                className="mt-auto pt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:underline underline-offset-4"
              >
                <span>Arsip Dokumen Terbuka</span>
                <ArrowRight size={15} />
              </Link>
            </article>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 9. AJAKAN ADUAN & ASPIRASI (P13)                                */}
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
                className="w-full sm:w-auto"
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
