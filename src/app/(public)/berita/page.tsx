'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  NEWS,
  NEWS_CATEGORIES,
  AGENDA,
  formatDateIndonesian,
} from '@/data/fixtures';
import { Calendar, Search, ArrowRight, MapPin } from '@/components/ui/Icons';

export default function BeritaPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const publishedArticles = NEWS.filter((n) => n.status === 'PUBLISHED');

  const filteredNews = publishedArticles.filter((article) => {
    const matchesCategory =
      selectedCategory === 'all' || article.categorySlug === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-8 sm:py-12">
      <Container>
        <Breadcrumbs items={[{ label: 'Berita & Informasi' }]} />

        {/* Header */}
        <div className="mt-4 max-w-3xl mb-12">
          <Badge variant="blue" className="mb-3">
            Warta & Pengumuman Resmi
          </Badge>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-navy-900 tracking-tight">
            Berita & Informasi Kalurahan
          </h1>
          <p className="mt-4 text-base text-text-body leading-relaxed">
            Pemberitahuan terkini penyaluran bantuan pangan, kegiatan evaluasi desa
            budaya, prestasi kalurahan, dan agenda resmi musyawarah warga.
          </p>
        </div>

        {/* Directory with Search-first header (Pattern P11) */}
        <div className="rounded-2xl border border-border bg-band p-6 mb-12">
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
                placeholder="Cari judul warta atau kata kunci kegiatan..."
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
              {NEWS_CATEGORIES.filter((c) => c.isFilter).map((cat) => (
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

        {/* Main Content Layout: News List (8 cols) + Agenda Sidebar (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          {/* News Feed */}
          <div className="lg:col-span-8 space-y-6">
            {filteredNews.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-field-border bg-white p-12 text-center text-xs text-text-body">
                Tidak ada berita yang cocok dengan kriteria pencarian Anda.
              </div>
            ) : (
              filteredNews.map((article) => (
                <article
                  key={article.slug}
                  className="rounded-2xl border border-border bg-white p-6 sm:p-7 hover:border-field-border hover:shadow-sm transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs text-text-muted mb-2.5">
                      <span className="font-semibold text-blue-700 uppercase tracking-wider text-[11px]">
                        {article.categorySlug.replace('-', ' ')}
                      </span>
                      {article.publishedAt && (
                        <span className="flex items-center gap-1">
                          <Calendar size={13} />
                          <span>{formatDateIndonesian(article.publishedAt)}</span>
                        </span>
                      )}
                    </div>

                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-navy-900 hover:text-blue-700 transition-colors leading-snug">
                      <Link href={`/berita/${article.slug}`}>{article.title}</Link>
                    </h2>

                    <p className="mt-3 text-xs sm:text-sm text-text-body leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#f1f5f9] flex items-center justify-between text-xs">
                    <span className="text-text-muted">
                      {article.bylineLabel ?? 'Pemerintah Kalurahan Margomulyo'}
                    </span>
                    <Link
                      href={`/berita/${article.slug}`}
                      className="inline-flex items-center gap-1.5 font-semibold text-blue-700 hover:text-navy-900"
                    >
                      <span>Baca Lengkap</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              ))
            )}
          </div>

          {/* Agenda & Jadwal Resmi Kegiatan Kalurahan Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#f1f5f9]">
                <h3 className="font-serif text-lg font-bold text-navy-900">
                  Agenda Resmi Desa
                </h3>
                <Badge variant="gold">Jadwal Terverifikasi</Badge>
              </div>

              <div className="space-y-4">
                {AGENDA.map((item) => (
                  <div
                    key={item.slug}
                    className="rounded-xl border border-border bg-band p-4 space-y-2"
                  >
                    <div className="flex items-center gap-2 text-xs font-semibold text-blue-700">
                      <Calendar size={14} />
                      <span>{formatDateIndonesian(item.startsAt)}</span>
                    </div>

                    <h4 className="font-bold text-xs sm:text-sm text-text-strong leading-snug">
                      {item.title}
                    </h4>

                    {item.location && (
                      <div className="flex items-center gap-1.5 text-[11px] text-text-body">
                        <MapPin size={13} className="shrink-0 text-blue-700" />
                        <span>{item.location}</span>
                      </div>
                    )}

                    {item.description && (
                      <p className="text-[11px] text-text-body leading-relaxed pt-1 border-t border-[#e2e8f0]">
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Contact Box */}
            <div className="rounded-2xl border border-[#d6e7f7] bg-surface-tint p-6 text-xs text-blue-700 space-y-3">
              <h4 className="font-bold text-sm text-navy-900">
                Kanal Informasi Warga
              </h4>
              <p className="leading-relaxed text-text-strong">
                Informasi penting seputar penyaluran bantuan sosial juga disosialisasikan
                melalui ketua RW/RT dan papan pengumuman di Balai Kalurahan.
              </p>
              <div className="pt-2">
                <Button href="/pengaduan" variant="secondary" size="sm" className="w-full">
                  Kirim Aduan Terkait Bansos
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
