import { describe, expect, it } from 'vitest';

import {
  ADMIN_BASE_PATH,
  HEADER_CTA,
  PRIMARY_NAV,
  PUBLIC_ROUTES,
  getSiteUrl,
} from '@/lib/site';

describe('primary navigation', () => {
  // docs/DESIGN_REFERENCE.md §4: the reference navigation is eight items and
  // stays eight. Growing it to cover the fifteen routes is the exact
  // regression this guards against.
  it('has exactly eight items', () => {
    expect(PRIMARY_NAV).toHaveLength(8);
  });

  it('matches the verified labels from the source concept', () => {
    // docs/SOURCE_DATA.md §3 (page 1, verified) and PROJECT_CONTEXT.md.
    expect(PRIMARY_NAV.map((item) => item.label)).toEqual([
      'Beranda',
      'Profil Desa',
      'Pemerintahan',
      'Berita & Informasi',
      'Potensi Desa',
      'Layanan Publik',
      'Transparansi',
      'Kontak',
    ]);
  });

  it('points every item at a declared public route', () => {
    for (const item of PRIMARY_NAV) {
      expect(PUBLIC_ROUTES).toContain(item.href);
    }
  });

  it('uses unique hrefs', () => {
    const hrefs = PRIMARY_NAV.map((item) => item.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });
});

describe('header call-to-action', () => {
  // docs/DESIGN_REFERENCE.md §5.3 finding A01: the source concept renders
  // "Layanan Publik" twice, as a nav item and as the CTA. Two adjacent
  // controls with one destination is an accessibility and IA defect.
  it('does not duplicate a navigation destination', () => {
    expect(PRIMARY_NAV.map((item) => item.href)).not.toContain(HEADER_CTA.href);
  });

  it('does not duplicate a navigation label', () => {
    expect(PRIMARY_NAV.map((item) => item.label)).not.toContain(HEADER_CTA.label);
  });

  it('points at a declared public route', () => {
    expect(PUBLIC_ROUTES).toContain(HEADER_CTA.href);
  });
});

describe('public routes', () => {
  // MASTER_PROMPT.md §7 and FULL_BUILD.md §4 both enumerate fifteen routes.
  it('declares all fifteen specified routes', () => {
    expect(PUBLIC_ROUTES).toHaveLength(15);
  });

  it('declares no duplicates', () => {
    expect(new Set(PUBLIC_ROUTES).size).toBe(PUBLIC_ROUTES.length);
  });

  it('uses root-relative paths without trailing slashes', () => {
    for (const route of PUBLIC_ROUTES) {
      expect(route.startsWith('/')).toBe(true);
      if (route !== '/') {
        expect(route.endsWith('/')).toBe(false);
      }
    }
  });

  it('keeps public routes clear of the admin namespace', () => {
    for (const route of PUBLIC_ROUTES) {
      expect(route.startsWith(ADMIN_BASE_PATH)).toBe(false);
    }
  });
});

describe('getSiteUrl', () => {
  it('falls back to localhost when unconfigured', () => {
    const previous = process.env.NEXT_PUBLIC_SITE_URL;
    delete process.env.NEXT_PUBLIC_SITE_URL;
    expect(getSiteUrl()).toBe('http://localhost:3000');
    if (previous !== undefined) process.env.NEXT_PUBLIC_SITE_URL = previous;
  });

  it('strips a trailing slash so canonical URLs do not double up', () => {
    const previous = process.env.NEXT_PUBLIC_SITE_URL;
    process.env.NEXT_PUBLIC_SITE_URL = 'https://margomulyo.example.id/';
    expect(getSiteUrl()).toBe('https://margomulyo.example.id');
    if (previous === undefined) {
      delete process.env.NEXT_PUBLIC_SITE_URL;
    } else {
      process.env.NEXT_PUBLIC_SITE_URL = previous;
    }
  });
});
