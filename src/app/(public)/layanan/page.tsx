'use client';

import React, { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { LabelledDataCard } from '@/components/ui/LabelledDataCard';
import { NumberedProcessRow } from '@/components/ui/NumberedProcessRow';
import {
  SERVICES,
  SERVICE_CATEGORIES,
  SERVICE_PROCEDURE_STEPS,
  getSetting,
} from '@/data/fixtures';
import { Search } from '@/components/ui/Icons';

export default function LayananPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const hoursWeekday = getSetting('service.hoursWeekday', 'Senin–Kamis 08.00–11.00 WIB');
  const hoursFriday = getSetting('service.hoursFriday', 'Jumat 08.00–10.00 WIB');

  const filteredServices = SERVICES.filter((service) => {
    const matchesCategory =
      selectedCategory === 'all' || service.categorySlug === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.requirements.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-8 sm:py-12">
      <Container>
        <Breadcrumbs items={[{ label: 'Layanan Publik' }]} />

        {/* Page Header */}
        <div className="mt-4 max-w-3xl mb-12">
          <Badge variant="blue" className="mb-3">
            Pelayanan Administrasi Kependudukan
          </Badge>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-navy-900 tracking-tight">
            Layanan Publik Kalurahan Margomulyo
          </h1>
          <p className="mt-4 text-base text-text-body leading-relaxed">
            Daftar resmi prosedur pelayanan administrasi kependudukan dan surat
            keterangan umum. Seluruh pelayanan pemerintah desa bebas dari pungutan
            liar dengan tarif resmi <strong>Rp 0 (Gratis)</strong>.
          </p>
        </div>

        {/* SOP Alur 4 Langkah Pelayanan (Pattern P07) */}
        <div className="mb-16">
          <SectionHeader
            eyebrow="Standar Operasional"
            title="4 Langkah Mudah Alur Pelayanan"
            description="Tata cara pengurusan administrasi warga mulai dari penyerahan berkas hingga terbitnya dokumen resmi."
          />

          <NumberedProcessRow
            steps={SERVICE_PROCEDURE_STEPS.map((step) => ({
              number: step.stepNumber,
              title: step.title,
              description: step.description,
              isCurrent: step.stepNumber === 1,
            }))}
          />
        </div>

        {/* Directory with Search-first header (Pattern P11) */}
        <div className="rounded-2xl border border-border bg-band p-6 mb-10">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari jenis surat atau layanan (misal: KTP, NIK, Usaha, Kematian)..."
                className="w-full rounded-xl border border-field-border bg-white pl-10 pr-4 py-2.5 text-xs text-text-strong focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-700"
              />
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 whitespace-nowrap">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-navy-900 text-white shadow-sm'
                    : 'bg-white text-text-body border border-[#e2e8f0] hover:bg-[#f1f5f9]'
                }`}
              >
                Semua Kategori
              </button>
              {SERVICE_CATEGORIES.map((cat) => (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    selectedCategory === cat.slug
                      ? 'bg-navy-900 text-white shadow-sm'
                      : 'bg-white text-text-body border border-[#e2e8f0] hover:bg-[#f1f5f9]'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Services Grid (Pattern P06 · Labelled data cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {filteredServices.map((service) => (
            <div
              key={service.slug}
              id={service.slug}
              className="scroll-mt-28"
            >
              <LabelledDataCard
                title={service.name}
                category="Administrasi Desa"
                badge={service.badge ?? 'Rp 0'}
                code={service.code}
                description={service.description}
                items={[
                  { label: 'Waktu Proses', value: service.duration },
                  { label: 'Metode', value: service.method },
                  { label: 'Output Berkas', value: service.output },
                  { label: 'Persyaratan', value: service.requirements },
                ]}
              />
            </div>
          ))}
        </div>

        {/* Jam Layanan Inset Strip */}
        <div className="rounded-2xl border border-[#d6e7f7] bg-surface-tint p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-blue-700 mb-12">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-base font-bold text-navy-900">
              Jam Buka Loket Pelayanan Balai Kalurahan
            </h3>
            <p className="text-text-body">
              {hoursWeekday} • {hoursFriday}. Hari Sabtu, Minggu, & Libur Nasional tutup.
            </p>
          </div>

          <Button href="/pengaduan" variant="secondary" size="md">
            Layanan Pengaduan Warga
          </Button>
        </div>
      </Container>
    </div>
  );
}
