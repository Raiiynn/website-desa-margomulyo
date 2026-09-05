'use client';

import React, { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { DOCUMENTS } from '@/data/fixtures';
import { Download, Search, CheckCircle } from '@/components/ui/Icons';

export default function DokumenPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredDocs = DOCUMENTS.filter((doc) => {
    const matchesCat = selectedCategory === 'ALL' || doc.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="py-8 sm:py-12">
      <Container>
        <Breadcrumbs
          items={[
            { label: 'Transparansi', href: '/transparansi' },
            { label: 'Arsip Dokumen Publik' },
          ]}
        />

        {/* Page Header */}
        <div className="mt-4 max-w-3xl mb-12">
          <Badge variant="blue" className="mb-3">
            Keterbukaan Informasi Publik
          </Badge>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-navy-900 tracking-tight">
            Arsip Dokumen & Produk Hukum Desa
          </h1>
          <p className="mt-4 text-base text-text-body leading-relaxed">
            Akses publik untuk mengunduh naskah peraturan kalurahan resmi, dokumen
            perencanaan APBKal, serta laporan pertanggungjawaban tahunan.
          </p>
        </div>

        {/* Search & Category Filter (Pattern P11) */}
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
                placeholder="Cari judul dokumen atau regulasi kalurahan..."
                className="w-full rounded-xl border border-field-border bg-white pl-10 pr-4 py-2.5 text-xs text-text-strong focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-700"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 whitespace-nowrap">
              {[
                { key: 'ALL', label: 'Semua Kategori' },
                { key: 'APBKAL', label: 'APBKal' },
                { key: 'RKPKAL', label: 'RKPKal' },
                { key: 'RPJMKAL', label: 'RPJMKal' },
                { key: 'PERKAL', label: 'Peraturan Kalurahan' },
                { key: 'LPPKAL', label: 'LPPKal' },
                { key: 'LAKIP', label: 'LAKIP' },
              ].map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    selectedCategory === cat.key
                      ? 'bg-navy-900 text-white shadow-sm'
                      : 'bg-white text-text-body border border-[#e2e8f0] hover:bg-[#f1f5f9]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Documents Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {filteredDocs.map((doc) => (
            <div
              key={doc.slug}
              className="rounded-2xl border border-border bg-white p-6 sm:p-7 flex flex-col justify-between hover:border-field-border hover:shadow-sm transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <Badge variant="blue">{doc.category}</Badge>
                  <span className="font-mono text-xs text-text-muted bg-band px-2 py-0.5 rounded border border-[#e2e8f0]">
                    Tahun {doc.year}
                  </span>
                </div>

                <h3 className="font-serif text-lg sm:text-xl font-bold text-navy-900 leading-snug">
                  {doc.title}
                </h3>

                <p className="mt-2 text-xs text-text-body leading-relaxed">
                  {doc.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#f1f5f9] flex items-center justify-between text-xs">
                <span className="text-green-800 font-medium flex items-center gap-1">
                  <CheckCircle size={14} />
                  <span>Dokumen Sah Kalurahan</span>
                </span>

                <button
                  type="button"
                  onClick={() =>
                    alert(
                      `Naskah dokumen "${doc.title}" tersedia di kantor Sekretariat Kalurahan Margomulyo atau dapat diajukan permohonan salinan digital melalui Pejabat Pengelola Informasi & Dokumentasi (PPID).`
                    )
                  }
                  className="inline-flex items-center gap-1.5 font-semibold text-blue-700 hover:text-navy-900 transition-colors"
                >
                  <Download size={14} />
                  <span>Unduh Dokumen</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
