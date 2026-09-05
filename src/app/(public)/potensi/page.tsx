import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import {
  LOCAL_POTENTIALS,
  PADUKUHAN,
  UMKM,
} from '@/data/fixtures';
import { CheckCircle, ShieldCheck, MapPin, Clock } from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'Potensi Desa',
  description:
    'Eksplorasi potensi pertanian padi irigasi Selokan Van Der Wijck, sentra UMKM Tempe Mbok Sri, kesenian Jathilan Jamblangan, dan budidaya perikanan Margomulyo.',
};

export default function PotensiPage() {
  const mbokSri = UMKM[0];

  return (
    <div className="py-8 sm:py-12">
      <Container>
        <Breadcrumbs items={[{ label: 'Potensi Desa' }]} />

        {/* Page Header */}
        <div className="mt-4 max-w-3xl mb-12">
          <Badge variant="gold" className="mb-3">
            Kemandirian Ekonomi & Tradisi
          </Badge>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-navy-900 tracking-tight">
            Potensi Kalurahan Margomulyo
          </h1>
          <p className="mt-4 text-base text-text-body leading-relaxed">
            Menyajikan kekayaan agrikultur padi sawah subur beririgasi teknis Van Der Wijck,
            industri olahan pangan rakyat berizin edar resmi P-IRT, paguyuban seni tradisi
            Mataram, serta sektor peternakan dan perikanan air tawar.
          </p>
        </div>

        {/* 1. 5 Sektor Unggulan Kalurahan */}
        <div className="mb-20">
          <SectionHeader
            eyebrow="Pilar Kemandirian"
            title="5 Sektor Potensi Ekonomi & Budaya"
            description="Klasifikasi sektor keunggulan yang menjadi penggerak kesejahteraan masyarakat di 13 padukuhan."
          />

          <div className="space-y-6">
            {LOCAL_POTENTIALS.map((item, idx) => (
              <div
                key={item.slug}
                id={item.slug}
                className="rounded-card border border-border bg-white p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 hover:border-field-border hover:shadow-sm transition-all"
              >
                <div className="max-w-2xl space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-lg text-gold-700">
                      0{idx + 1}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-700">
                      {item.headline}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-navy-900">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-text-body leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-green-800">
                    <CheckCircle size={15} />
                    <span>{item.highlight}</span>
                  </div>
                </div>

                <div className="shrink-0 pt-2 lg:pt-0 w-full lg:w-auto">
                  <div className="rounded-card border border-border-accent bg-surface-tint p-4 text-center lg:text-right">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 block">
                      Kategori Potensi
                    </span>
                    <span className="text-sm font-semibold text-navy-900 block mt-0.5">
                      {item.categorySlug.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Sorotan UMKM Unggulan Terverifikasi: Tempe Mbok Sri */}
        {mbokSri && (
          <div className="mb-20">
            <SectionHeader
              eyebrow="Industri Olahan Pangan"
              title="Profil UMKM: Tempe Daun Pisang 'Mbok Sri'"
              description="Contoh keberhasilan ekonomi kerakyatan binaan kalurahan dengan sertifikasi legalitas pangan resmi dan pemberdayaan tenaga kerja lokal."
            />

            <div className="rounded-card border border-border bg-band p-6 sm:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="gold">Industri Rumah Tangga</Badge>
                    <span className="text-xs text-green-700 font-semibold flex items-center gap-1">
                      <ShieldCheck size={14} />
                      <span>Izin P-IRT: {mbokSri.pirtNumber}</span>
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-navy-900">
                    {mbokSri.name}
                  </h3>

                  <p className="text-sm text-text-body leading-relaxed">
                    Produksi tempe tradisional khas Padukuhan Mangsel yang dibungkus daun
                    pisang segar dengan aroma harum alami. Berdiri sejak tahun{' '}
                    {mbokSri.foundedYear} oleh Ibu {mbokSri.ownerName}, menyerap tenaga
                    kerja warga sekitar dan menjadi rujukan kuliner oleh-oleh khas Sleman.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border">
                    <div>
                      <span className="text-[11px] text-text-muted uppercase tracking-wider block font-semibold">
                        Pemilik Usaha
                      </span>
                      <span className="text-sm font-bold text-navy-900">
                        {mbokSri.ownerName}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] text-text-muted uppercase tracking-wider block font-semibold">
                        Tenaga Kerja
                      </span>
                      <span className="text-sm font-bold text-navy-900">
                        {mbokSri.workerCount} Warga Lokal
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] text-text-muted uppercase tracking-wider block font-semibold">
                        Rating Kepuasan
                      </span>
                      <span className="text-sm font-bold text-green-800">
                        ★ {mbokSri.ratingValue} / 5.0 ({mbokSri.ratingCount} Ulasan)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 rounded-card border border-border bg-white p-5 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block">
                    Informasi Kunjungan & Pesanan
                  </span>

                  <div className="text-xs text-text-body space-y-2">
                    <div className="flex items-start gap-2">
                      <MapPin size={15} className="text-blue-700 shrink-0 mt-0.5" />
                      <span>{mbokSri.addressDetail}</span>
                    </div>

                    <div className="flex items-start gap-2">
                      <Clock size={15} className="text-blue-700 shrink-0 mt-0.5" />
                      <span>{mbokSri.operatingHours}</span>
                    </div>

                    <div className="pt-2 text-[11px] text-text-muted border-t border-border">
                      Media Sosial: <strong className="text-navy-900">{mbokSri.socialMedia}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. Sebaran Potensi 13 Padukuhan */}
        <div>
          <SectionHeader
            eyebrow="Sebaran Wilayah"
            title="Karakteristik & Potensi 13 Padukuhan"
            description="Kombinasi keunggulan alamiah yang saling melengkapi di seluruh penjuru Kalurahan Margomulyo."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PADUKUHAN.map((p) => (
              <div
                key={p.number}
                className="rounded-card border border-border bg-white p-5 space-y-2 hover:border-field-border transition-all"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-serif font-bold text-blue-700 text-base">
                    0{p.number}
                  </span>
                  <span className="text-[11px] text-text-muted uppercase tracking-wider">
                    Margomulyo
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-navy-900">
                  Padukuhan {p.name}
                </h3>
                <p className="text-xs text-text-body leading-relaxed">
                  {p.potentialSummary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
