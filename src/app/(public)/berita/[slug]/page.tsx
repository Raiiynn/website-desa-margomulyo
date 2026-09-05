import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { NEWS, formatDateIndonesian } from '@/data/fixtures';
import { Calendar, CheckCircle, ShieldCheck } from '@/components/ui/Icons';

export async function generateStaticParams() {
  return NEWS.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = NEWS.find((n) => n.slug === slug);
  if (!article) return { title: 'Warta Tidak Ditemukan' };

  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function BeritaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = NEWS.find((n) => n.slug === slug);

  if (!article) {
    notFound();
  }

  // Related articles
  const otherArticles = NEWS.filter(
    (n) => n.slug !== slug && n.status === 'PUBLISHED'
  ).slice(0, 3);

  return (
    <div className="py-8 sm:py-12">
      <Container>
        <Breadcrumbs
          items={[
            { label: 'Berita & Informasi', href: '/berita' },
            { label: article.title },
          ]}
        />

        <article className="max-w-3xl mx-auto mt-8">
          {/* Article Header Meta */}
          <div className="space-y-3 pb-6 border-b border-border">
            <div className="flex items-center gap-3 flex-wrap">
              <Badge variant="blue">
                {article.categorySlug.replace('-', ' ').toUpperCase()}
              </Badge>
              {article.publishedAt && (
                <span className="flex items-center gap-1.5 text-xs text-text-muted">
                  <Calendar size={14} />
                  <span>{formatDateIndonesian(article.publishedAt)}</span>
                </span>
              )}
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900 tracking-tight leading-tight">
              {article.title}
            </h1>

            <div className="flex items-center justify-between text-xs text-text-body pt-2">
              <span>Penulis: {article.bylineLabel ?? 'Tim Liputan Margomulyo'}</span>
              <span className="text-green-800 font-medium flex items-center gap-1">
                <CheckCircle size={14} />
                <span>Terbitan Resmi Desa</span>
              </span>
            </div>
          </div>

          {/* Lead Excerpt Paragraph */}
          <div className="my-8 rounded-card border border-border-accent bg-surface-tint p-5 sm:p-6 text-sm sm:text-base font-medium text-navy-900 leading-relaxed">
            {article.excerpt}
          </div>

          {/* Main Article Body Content (Verbatim from SOURCE_DATA) */}
          <div className="prose prose-slate max-w-none text-base text-text-strong leading-relaxed space-y-5">
            <p>{article.body}</p>
          </div>

          {/* Verification / Source Footer Note */}
          <div className="mt-12 pt-6 border-t border-border rounded-card bg-band p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-text-muted">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-blue-700 shrink-0" />
              <span>
                Dipublikasikan secara sah oleh Pemerintah Kalurahan Margomulyo, Seyegan.
              </span>
            </div>
            <Link
              href="/berita"
              className="font-semibold text-blue-700 hover:underline shrink-0"
            >
              ← Kembali ke Arsip Berita
            </Link>
          </div>
        </article>

        {/* Related Articles Strip */}
        {otherArticles.length > 0 && (
          <div className="mt-20 pt-12 border-t border-border">
            <h3 className="font-serif text-2xl font-bold text-navy-900 mb-8">
              Warta Terkait Lainnya
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherArticles.map((other) => (
                <div
                  key={other.slug}
                  className="rounded-card border border-border bg-white p-5 flex flex-col justify-between hover:border-field-border hover:shadow-sm transition-all"
                >
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 block mb-2">
                      {other.categorySlug.replace('-', ' ')}
                    </span>
                    <h4 className="font-bold text-sm text-navy-900 hover:text-blue-700 transition-colors line-clamp-2">
                      <Link href={`/berita/${other.slug}`}>{other.title}</Link>
                    </h4>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border text-xs text-text-muted">
                    {other.publishedAt && formatDateIndonesian(other.publishedAt)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
