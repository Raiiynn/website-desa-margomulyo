#!/usr/bin/env node
/**
 * Rendered visual QA.
 *
 * Captures the public routes at the reference viewports and measures the
 * defects that are unreliable to eyeball: horizontal overflow, elements
 * escaping the viewport, tap-target sizes, and heading structure.
 *
 * Dev-only tooling. Not imported by the application.
 *
 * Usage:  node scripts/visual-qa.mjs [baseUrl] [outDir]
 */

import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { chromium } from 'playwright';

const BASE = process.argv[2] ?? 'http://localhost:3000';
const OUT = process.argv[3] ?? 'C:/Users/Lenovo/AppData/Local/Temp/claude/qa';

const ROUTES = [
  '/', '/profil', '/pemerintahan', '/berita', '/potensi',
  '/layanan', '/transparansi', '/kontak',
  '/agenda', '/dokumen', '/pembangunan', '/pengaduan',
];

const VIEWPORTS = [
  { name: '1280', width: 1280, height: 800 },
  { name: '1440', width: 1440, height: 900 },
  { name: '768', width: 768, height: 1024 },
  { name: '390', width: 390, height: 844 },
  { name: '320', width: 320, height: 844 },
];

/** Runs in the page: find real layout defects rather than guessing. */
function audit() {
  const doc = document.documentElement;
  const vw = doc.clientWidth;

  const overflowing = [];
  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    // Ignore anything inside a deliberately scrollable container.
    let scrollable = false;
    for (let p = el.parentElement; p; p = p.parentElement) {
      const o = getComputedStyle(p).overflowX;
      if (o === 'auto' || o === 'scroll') { scrollable = true; break; }
    }
    if (scrollable) continue;
    if (r.right > vw + 1 || r.left < -1) {
      overflowing.push({
        tag: el.tagName.toLowerCase(),
        cls: (el.className || '').toString().slice(0, 60),
        left: Math.round(r.left),
        right: Math.round(r.right),
        text: (el.textContent || '').trim().slice(0, 40),
      });
    }
  }

  const small = [];
  for (const el of document.querySelectorAll('a, button, input, select, textarea')) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    if (r.height < 24 || r.width < 24) {
      small.push({
        tag: el.tagName.toLowerCase(),
        w: Math.round(r.width),
        h: Math.round(r.height),
        text: (el.textContent || '').trim().slice(0, 30),
      });
    }
  }

  const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => ({
    level: Number(h.tagName[1]),
    size: getComputedStyle(h).fontSize,
    family: getComputedStyle(h).fontFamily.split(',')[0].replace(/["']/g, ''),
    text: (h.textContent || '').trim().slice(0, 44),
  }));

  return {
    scrollWidth: doc.scrollWidth,
    clientWidth: vw,
    hasHorizontalOverflow: doc.scrollWidth > vw + 1,
    overflowing: overflowing.slice(0, 8),
    smallTargets: small.slice(0, 8),
    headings,
    h1Count: document.querySelectorAll('h1').length,
  };
}

const browser = await chromium.launch();
const results = [];

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 120)); });
  page.on('pageerror', (e) => errors.push(String(e).slice(0, 120)));

  for (const route of ROUTES) {
    const slug = route === '/' ? 'index' : route.replace(/\//g, '-').replace(/^-/, '');
    errors.length = 0;
    await page.goto(BASE + route, { waitUntil: 'networkidle' });
    const data = await page.evaluate(audit);
    const dir = join(OUT, vp.name);
    mkdirSync(dir, { recursive: true });
    await page.screenshot({ path: join(dir, `${slug}.png`), fullPage: vp.width >= 1280 });
    results.push({ route, viewport: vp.name, ...data, consoleErrors: [...errors] });
  }
  await ctx.close();
}

await browser.close();

// --- summary -------------------------------------------------------------
let problems = 0;
console.log('\nHORIZONTAL OVERFLOW');
for (const r of results) {
  if (r.hasHorizontalOverflow) {
    problems += 1;
    console.log(`  ${r.viewport.padEnd(5)} ${r.route.padEnd(16)} scroll=${r.scrollWidth} client=${r.clientWidth}`);
    for (const o of r.overflowing) {
      console.log(`        <${o.tag}> [${o.left}..${o.right}] "${o.text}" ${o.cls}`);
    }
  }
}
if (!problems) console.log('  none at any viewport');

console.log('\nTAP TARGETS UNDER 24px');
let tiny = 0;
for (const r of results.filter((x) => x.viewport === '390' || x.viewport === '320')) {
  for (const s of r.smallTargets) {
    tiny += 1;
    console.log(`  ${r.viewport} ${r.route.padEnd(16)} <${s.tag}> ${s.w}x${s.h} "${s.text}"`);
  }
}
if (!tiny) console.log('  none');

console.log('\nCONSOLE / HYDRATION ERRORS');
let errs = 0;
for (const r of results) {
  for (const e of r.consoleErrors) { errs += 1; console.log(`  ${r.viewport} ${r.route}: ${e}`); }
}
if (!errs) console.log('  none');

console.log('\nHEADING STRUCTURE (1280)');
for (const r of results.filter((x) => x.viewport === '1280')) {
  const levels = r.headings.map((h) => h.level);
  let skip = 'ok', prev = 0;
  for (const l of levels) {
    if (prev && l > prev + 1) { skip = `skip h${prev}->h${l}`; break; }
    prev = l;
  }
  console.log(`  ${r.route.padEnd(16)} h1=${r.h1Count} ${skip}`);
}

console.log('\nTYPE SCALE (1280, homepage)');
const home = results.find((r) => r.viewport === '1280' && r.route === '/');
for (const h of home.headings.slice(0, 8)) {
  console.log(`  h${h.level} ${h.size.padStart(6)}  ${h.family.padEnd(22)} ${h.text}`);
}

console.log(`\nscreenshots: ${OUT}`);
