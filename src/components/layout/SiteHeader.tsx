'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SITE,
  SITE_SUBTITLE,
  SITE_TITLE,
  PRIMARY_NAV,
  HEADER_CTA,
} from '@/lib/site';
import { Menu, X, ArrowRight } from '@/components/ui/Icons';
import { Container } from '@/components/ui/Container';

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white transition-shadow duration-200">
      {/* Top micro-bar with official regional indicator */}
      <div className="bg-navy-900 text-white py-1.5 px-4 text-[11px] font-medium tracking-wide">
        <Container className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-600" aria-hidden="true" />
            <span>Portal Resmi Pemerintah Kalurahan Margomulyo</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-white/80">
            <span>{SITE.kabupaten}</span>
            <span>•</span>
            <span>{SITE.provinsi}</span>
          </div>
        </Container>
      </div>

      {/* Main Header Bar */}
      <Container className="flex h-20 items-center justify-between gap-4">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3.5 focus-visible:outline-2 focus-visible:outline-blue-700 rounded-lg p-1 -ml-1 transition-opacity"
          aria-label="Beranda Kalurahan Margomulyo"
        >
          {/* Official Emblem Mark Badge */}
          <div className="h-12 w-12 rounded-card bg-navy-900 text-white flex items-center justify-center font-serif font-bold text-xl tracking-tight shadow-sm border border-blue-700/30 shrink-0 group-hover:bg-blue-700 transition-colors">
            <span className="text-gold-600">M</span>
          </div>

          <div className="flex flex-col">
            <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-navy-900 leading-none group-hover:text-blue-700 transition-colors">
              {SITE_TITLE}
            </span>
            <span className="mt-1 text-xs font-semibold tracking-wider text-blue-700 uppercase">
              {SITE_SUBTITLE}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation (8 items strict per docs/DESIGN_REFERENCE.md §4) */}
        <nav
          className="hidden xl:flex items-center gap-1"
          aria-label="Navigasi Utama"
        >
          {PRIMARY_NAV.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3.5 py-2 text-sm font-medium transition-colors rounded-md focus-visible:outline-2 focus-visible:outline-blue-700 ${
                  isActive
                    ? 'text-blue-700 font-semibold'
                    : 'text-text-strong hover:text-blue-700 hover:bg-band'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-blue-700 rounded-full"
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Header Action CTA & Mobile Trigger */}
        <div className="flex items-center gap-3">
          <Link
            href={HEADER_CTA.href}
            className="hidden sm:inline-flex items-center gap-2 rounded-control bg-navy-900 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 active:bg-[#00172e] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            <span>{HEADER_CTA.label}</span>
            <ArrowRight size={14} />
          </Link>

          {/* Hamburger trigger for mobile/tablet */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden inline-flex items-center justify-center p-2 rounded-lg text-text-strong hover:bg-band focus-visible:outline-2 focus-visible:outline-blue-700"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu utama'}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="fixed inset-0 top-[110px] z-40 bg-white xl:hidden flex flex-col justify-between border-t border-border p-6 overflow-y-auto"
        >
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-text-muted px-3 pb-2 mb-2 border-b border-border">
              Menu Utama Kalurahan
            </p>
            {PRIMARY_NAV.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-3 rounded-lg text-base transition-colors ${
                    isActive
                      ? 'bg-surface-tint text-blue-700 font-semibold'
                      : 'text-text-strong hover:bg-band'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-text-muted">→</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-6 mt-6 border-t border-border space-y-3">
            <Link
              href={HEADER_CTA.href}
              className="flex w-full items-center justify-center gap-2 rounded-card bg-navy-900 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
            >
              <span>{HEADER_CTA.label}</span>
              <ArrowRight size={16} />
            </Link>

            <div className="text-center text-xs text-text-muted pt-2">
              <span>{SITE_TITLE} • Pelayanan Warga Prima</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
