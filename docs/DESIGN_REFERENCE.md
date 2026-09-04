# DESIGN_REFERENCE.md — Reference → Refined Production Interface

`Data Konsep Web Desa Margomulyo.pdf` is the **primary visual and
information-architecture reference** for the public website, not only its content
source.

The mandate is:

> **Reference → Refined Production Interface** — not **Reference → Generic AI Redesign.**

Preserve the concept's information hierarchy, editorial structure, institutional
character, Yogyakarta identity and content relationships. Improve typography,
spacing, responsive behaviour, accessibility, component consistency, interaction
quality and performance.

**Review rule (enforced in Phase 14):** every public screen must trace to a
reference pattern in section 3, or be justified here as a documented refinement
in section 5 or 6. Drift toward a generic government/SaaS aesthetic is a review
failure, not a matter of taste.

Ground truth: `docs/source/renders/` — regenerate with
`python scripts/render-source.py`.

---

## 1. Character

What the reference actually is, stated plainly so it is not lost in translation:

- **Institutional, not corporate.** Deep navy, a serif voice, real photography of
  this village and its people. No startup gradient, no glass, no glow.
- **Editorial, not dashboard.** Long, sectioned, scrolling pages with a strong
  reading rhythm. Content leads; chrome recedes.
- **Information-dense but calm.** The transparency page carries a full budget
  breakdown without feeling like an analytics product, because the density is
  organised into labelled, bordered blocks rather than floating widgets.
- **Warm through restraint.** A single gold accent against navy and white does
  the Yogyakarta work. It is scarce by design.
- **Photography carries local identity.** Rice fields under Merapi, the Lurah at
  his desk, warga at a bansos distribution. This is not replaceable with icons
  or illustration.

---

## 2. Extracted design tokens

Sampled from the rendered pages by dominant-colour analysis over solid UI
regions, not estimated. Hex values are exact.

### 2.1 Colour

| Token | Value | Observed usage |
|---|---|---|
| `navy-900` | `#002446` | Display headings, primary buttons, icon chips, visi panel, CTA panels, step markers, footer |
| `blue-700` | `#0160A1` | Links, active nav, progress fill, inline actions |
| `blue-600` | `#1169A6` | Active nav underline variant |
| `gold-600` | `#9E7B36` | Scarce accent — one stat chip, misi numerals, "04" step, the 78% figure, eyebrow dots, gold progress |
| `green-700` | `#0E7C46` | Completed project bars |
| `green-800` | `#037756` | Verified/success inline text |
| `surface` | `#FFFFFF` | Cards |
| `surface-tint` | `#F1F8FF` | Stat tiles, inset rows, info strips |
| `band` | `#F8F9FF` | Alternating section background |
| `band-alt` | `#F4F9FF` | Secondary band |
| `text-strong` | `#131C26` | Card titles, sans headings |
| `text-body` | `#667085` | Body copy |
| `text-muted` | `#8991A1` | Card descriptions, captions |

Two of these fail WCAG at body size and are corrected in section 5.

### 2.2 Typography

The reference pairs a **high-contrast old-style serif** for display against a
**humanist geometric sans** for UI and body. That pairing *is* the institutional
character — serif for authority, sans for clarity — and it is preserved.

| Role | Treatment in reference |
|---|---|
| Page title | Serif, ~56px, navy, tight leading, 2 lines max |
| Section heading | Serif, ~38–42px, navy |
| Card / block title | Sans, ~20–24px, `text-strong`, medium weight |
| Eyebrow | Sans, ~12–13px, uppercase, letterspaced ~0.08em, `blue-700` or gold, often preceded by a short rule |
| Body | Sans, ~15–16px, `text-body`, generous leading |
| Caption / meta | Sans, ~13–14px, `text-muted` |
| Statistic | Serif, ~32–40px, navy — numbers get the serif, deliberately |
| Data label | Sans, ~13px, uppercase, letterspaced |

**Production families** — the concept's exact fonts are not embedded as
identifiable families in a way this render can confirm, so we match the
*structure* with well-hinted open-source families carrying full Latin Extended:

- Display serif: **Source Serif 4** (fallback: Lora)
- UI/body sans: **Plus Jakarta Sans** (fallback: Inter)

Both are variable, self-hosted via `next/font` for zero layout shift, subset to
`latin` + `latin-ext`. Confirm the visual match against
`docs/source/renders/p01-beranda-00.png` before Phase 4 closes.

### 2.3 Geometry & elevation

| Token | Value |
|---|---|
| Card radius | ~12px |
| Chip / pill radius | full |
| Button radius | ~8–10px |
| Icon chip | ~44px square, ~10px radius |
| Card border | 1px, ~`#E8EEF6` |
| Card shadow | near-zero — a hairline border does the work |
| Content max width | ~1200px within a 1280px viewport |
| Section padding | ~72–96px vertical at desktop |
| Grid | 4-column card rows; 2-up asymmetric splits for feature blocks |

Restraint is the point: cards sit on the page rather than float above it.

---

## 3. Confirmed reference patterns

These are preserved. Each is implemented once, as a shared component.

**P01 · Section header triad.** Eyebrow (short rule + uppercase letterspaced
label) → serif headline → sans deck, with an optional right-aligned text link
("Lihat Semua Berita →"). Used on every section of every page. This is the
backbone of the editorial structure.

**P02 · Alternating section bands.** White and `#F8F9FF` alternate down the page.
This rhythm is what stops a long page reading as undifferentiated card soup.

**P03 · Hero with overlapping stat strip.** Photographic establishing shot,
left-aligned overlay, eyebrow + serif title + motto + two actions. A white
elevated card overlaps the hero's lower edge carrying four verified figures, with
a provenance line beneath ("Data Profil Kependudukan Terverifikasi per 1
September 2026 · Sistem Informasi Kalurahan (SIK) Sleman"). **Citing the source
under the numbers is the transparency posture the whole platform is for** —
keep it.

**P04 · Editorial news block.** One large featured article (image, category chip,
date, serif headline, excerpt, reading time, action) beside a vertical list of
four compact items (thumbnail, category, date, headline). Not a uniform 3-card
grid — the asymmetry is the hierarchy.

**P05 · Portrait + statement block.** Photograph on one side; eyebrow, serif
headline, rule-bordered pull-quote, supporting paragraphs, action, and a
secondary contact affordance on the other. Used for the Lurah's sambutan.

**P06 · Labelled data card.** Icon chip, title, description, then a labelled
key/value list (Persyaratan · Waktu · Output · Metode), with a status chip and a
footer action row. Used for services; generalises to documents and projects.

**P07 · Numbered process row.** `01–04` markers, title, description, and an
outcome chip per step. Used for the service SOP and the 5-gate budget cycle. The
final step is gold-marked; the current step is filled rather than outlined.

**P08 · Semantic progress bar.** Label, description, large percentage, bar, and a
footer pairing context with status ("Target Periode: 80%" / "Status: Melebihi
Ekspektasi Tahapan (+2%)"). Colour encodes state: blue in progress, green
complete, gold financial. **Never decorative** — every bar shows a real figure.

**P09 · Budget breakdown block.** Total as a serif figure with a plain-language
caption, then an itemised list of source/allocation rows with values and shares.
Reconciles visibly to its total.

**P10 · Project tracker card.** Status chip, monospace ID (`FIS-01/26`), title,
description, location and allocation rows with icons, progress bar, and a status
footnote. Filter chips above ("Semua · Selesai · Berjalan · Direncanakan").

**P11 · Directory with search-first header.** Prominent search input with a
submit action, category filter chips, then the result grid. Used for services,
documents and UMKM. Search leads because minimising citizen effort is the goal.

**P12 · Quiet inset info row.** `#F1F8FF` row with a label left and a value or
status chip right. Used for service hours, legality, quick facts. Cheap, calm,
highly reusable.

**P13 · Navy conversion panel.** Full-width navy block with a gold eyebrow chip,
serif headline, paragraph, and one or two actions. Closes most pages. Used
sparingly — once per page, never stacked.

**P14 · Value/principle card grid.** Icon chip, uppercase title, description.
Used for the 4 Pilar and the 10 Misi (the latter with gold numerals). One card in
the row takes the gold chip; the rest are blue.

**P15 · Vertical timeline.** Dotted rail, name, role caption, right-aligned
period chip, with the active entry filled and badged. Used for the leadership
history.

**P16 · Footer.** Four zones — institutional statement with "Sleman Sembada"
mark, Kontak Resmi, Jam Pelayanan, Navigasi Cepat — over a navy ground.

---

## 4. Information architecture

The reference's top-level navigation is **eight items**, and stays eight:

```
Beranda · Profil Desa · Pemerintahan · Berita & Informasi
Potensi Desa · Layanan Publik · Transparansi · Kontak
```

`MASTER_PROMPT §7` and `FULL_BUILD §4` require fifteen routes. They are not in
conflict: the additional routes are sub-destinations reached from within
sections, exactly as the reference does it.

| Route | Reached from |
|---|---|
| `/` | nav |
| `/profil` | nav |
| `/pemerintahan` | nav |
| `/padukuhan` | `/profil` (13 padukuhan grid), `/pemerintahan` (kewilayahan) |
| `/berita` | nav |
| `/agenda` | `/berita` (agenda block) |
| `/layanan`, `/layanan/[slug]` | nav |
| `/pengaduan` | `/layanan` (Aspirasi & Lapor), `/kontak`, footer |
| `/transparansi` | nav |
| `/transparansi/apbkal` | `/transparansi` ("Rincian Neraca APBKal") |
| `/pembangunan` | `/transparansi` ("Daftar Kegiatan Pembangunan") |
| `/dokumen` | `/transparansi` ("Arsip Dokumen Terbuka") |
| `/potensi` | nav |
| `/kontak` | nav |

Two cross-cutting relationships in the reference must survive, because they are
what make the site feel like one system rather than eight brochures:

- **Padukuhan is a spine.** The same 13 padukuhan appear as administrative units
  (`/padukuhan`), as potential profiles (`/potensi`), as project locations
  (`/pembangunan`), and as a domicile field on the contact form. One canonical
  entity, referenced everywhere.
- **Transparency is a hub.** `/transparansi` is a landing surface with four
  doors — APBKal, Realisasi, Proyek Pembangunan, Dokumen — each a summary card
  linking to the full view.

---

## 5. Accessibility findings

Measured against the sampled palette. Target: **WCAG 2.2 AA**.

### 5.1 Contrast audit

| Pair | Ratio | Verdict |
|---|---|---|
| `#131C26` heading on white | 17.19 | AAA |
| `#002446` navy on white | 15.66 | AAA |
| white on `#002446` | 15.66 | AAA |
| `#0160A1` action blue on white | 6.58 | AA |
| white on `#0160A1` | 6.58 | AA |
| `#037756` green on white | 5.56 | AA |
| `#0E7C46` green bar on white | 5.26 | AA |
| `#667085` body on white | 4.97 | AA |
| `#667085` body on `#F8F9FF` band | 4.73 | AA |
| **`#9E7B36` gold on white** | **3.93** | **fails AA at body size** |
| **`#9E7B36` gold on band** | **3.74** | **fails AA at body size** |
| **white on `#9E7B36` gold** | **3.93** | **fails AA at body size** |
| **`#8991A1` muted on white** | **3.17** | **fails AA at body size** |
| **`#8991A1` muted on band** | **3.02** | **fails AA at body size** |

### 5.2 Required corrections

Minimal darkening that reaches AA while preserving hue and the visual
relationship to the original:

| Token | Reference | Production | Ratio | Applies to |
|---|---|---|---|---|
| `gold-700` (text) | `#9E7B36` | `#917131` | 4.55 on white | Gold text below 18.66px |
| `gold-750` (on band) | `#9E7B36` | `#8D6E30` | 4.54 on band | Gold text on `#F8F9FF` |
| `text-muted` | `#8991A1` | `#6E7789` | 4.50 on white | All muted body text |

`#9E7B36` is **retained unchanged** for non-text uses — progress bars, icon chip
fills, rules, and large display figures at or above 18.66px bold / 24px regular,
where 3:1 is the applicable threshold. The scarcity of gold is preserved; only
its legibility at small sizes changes.

### 5.3 Other findings

- **A01 · Duplicate navigation target.** The header renders "Layanan Publik"
  twice — once as a nav item, once as the CTA button. Two controls, same
  destination, adjacent. Confusing for screen-reader and keyboard users, and a
  wasted primary action. **Fix:** keep the nav item; repoint the CTA to a
  distinct high-value destination (`/pengaduan` or "Ajukan Layanan").
- **A02 · No visible focus states.** A static render shows none. All interactive
  elements need a visible focus ring meeting 3:1 against adjacent colours.
- **A03 · Status conveyed by colour alone.** Project and step chips distinguish
  Selesai / Berjalan / Direncanakan largely by colour. Text labels are present in
  most cases — verify every instance, and ensure progress bars carry an
  accessible text equivalent, not just a fill width.
- **A04 · Search inputs show placeholder-only labelling.** "Cari layanan: KTP,
  Surat Kematian, PBB, SKTM, dll…" sits in the placeholder with no persistent
  label. Needs a real `<label>` (visually hidden if the design requires).
- **A05 · Form required-field marking.** The contact form marks required fields
  with `*` and a footnote. Keep, and add `aria-required` plus programmatic error
  association.
- **A06 · Heading hierarchy.** The concept's visual sizing must map to a correct
  `h1`→`h6` order per route; eyebrows are not headings.
- **A07 · Icon-only affordances.** Download icons on document rows need
  accessible names identifying *which* document.
- **A08 · Reduced motion.** No motion exists in the reference, so nothing is
  lost by honouring `prefers-reduced-motion` fully.
- **A09 · Language.** Content is Indonesian; set `lang="id"` and mark Javanese
  terms (Jathilan, Turonggo Bekso Tomo, Merti Dusun, laras pelog/slendro)
  appropriately where pronunciation matters.

---

## 6. Responsive findings

**The reference is desktop-only.** All 9 pages are 1280px-wide captures; there is
no mobile design to preserve. Per `CLAUDE.md §7` the platform must work
320px→1920px+, so mobile is designed *within* the reference's language rather
than derived from it. `FULL_BUILD §18` forbids simply shrinking desktop layouts.

| ID | Finding | Approach |
|---|---|---|
| **R01** | Header nav wraps at its own design width — "Profil Desa" and "Berita & Informasi" already break to two lines at 1280px, and eight items plus a CTA will not fit below ~1100px. | Full nav ≥1024px; below that a drawer with the eight items, the CTA pinned, and focus trapped. Fix the desktop wrap by tightening item spacing and setting the type scale, not by dropping items. |
| **R02** | The hero stat strip overlaps the hero's lower edge — a fixed-position relationship that has no defined reflow. | ≥1024px: 4-up overlapping card as designed. 768–1023px: 2×2, still overlapping. <768px: stop overlapping; stack the four figures full-width below the hero. Provenance line stays attached. |
| **R03** | 4-column card rows throughout (misi, pilar, kanal, padukuhan, stats). | 4 → 2 → 1 at 1024 / 640. The 13-padukuhan grid gets a 3 → 2 → 1 ladder to avoid a lone orphan. |
| **R04** | The APBKal breakdown is a wide label/value table. | Below 640px become stacked label-above-value rows. No horizontal scroll for financial figures — they must be readable, per `FULL_BUILD §18`. |
| **R05** | The 5-gate budget cycle is a horizontal 5-step row. | Below 1024px rotate to a vertical timeline reusing P15's rail, rather than shrinking five columns into illegibility. |
| **R06** | News block is a 2-column asymmetric split. | Below 900px the featured article stacks above the compact list; the list keeps its thumbnails. |
| **R07** | Service cards carry 4 labelled metadata rows plus a 2-action footer. | Cards go full-width below 640px; the action footer stacks; touch targets ≥44×44px. |
| **R08** | The document repository is a wide row list (title, meta, size, download). | Below 768px become stacked cards with the download as a full-width action. |
| **R09** | The contact form is a 2-column field grid. | Single column below 768px; the map/address panel moves below the form. |
| **R10** | Admin dashboard has no reference at all. | Desktop-primary per `FULL_BUILD §18`, but must remain usable on mobile. Designed in Phase 9 using the same tokens and components. |

Breakpoints: `320 · 375 · 390 · 414 · 768 · 1024 · 1280 · 1440 · 1920` per
`MASTER_PROMPT §24`, verified at each.

---

## 7. Production refinements

Improvements to the reference, allowed because they serve typography, spacing,
consistency, interaction, performance or accessibility — never novelty.

- **Component consolidation.** The concept draws the same card several slightly
  different ways across pages. Production ships one card, one chip, one stat
  tile, one progress bar, one section header, one filter row, one search field.
  `MASTER_PROMPT §21` requires it and it is what keeps the system coherent.
- **Type scale.** Replace ad-hoc sizes with a fixed modular scale; set optical
  sizing, tabular numerals for all financial figures, and `text-wrap: balance`
  on serif headlines so the two-line hero holds across viewports.
- **Spacing scale.** Normalise to a 4px base with a defined section rhythm.
- **State coverage.** The concept shows only populated success states. Every
  list, form and action ships loading, empty, error and success states in clear
  Indonesian (`FULL_BUILD §25`) — and given the verification register in
  `SOURCE_DATA.md`, **empty states will be genuinely reachable**, so they are
  first-class work, not an afterthought.
- **Motion.** The reference is static; restraint is therefore the default and
  nothing is lost by minimalism. Permitted: section reveal on first scroll,
  progress bars animating once to their real value, page transitions, focus and
  hover feedback, drawer transitions. Forbidden: ambient loops, parallax,
  floating decoration, animated backgrounds, scroll-jacking. All gated behind
  `prefers-reduced-motion` and implemented with the installed GSAP skills only
  where CSS cannot do it.
- **Performance.** Server components by default; client JS only for the drawer,
  filters, search and forms. `next/image` with explicit dimensions for the
  photography the reference depends on. Self-hosted variable fonts. Target strong
  Core Web Vitals per `MASTER_PROMPT §26`.
- **Data integrity in the UI.** Per `SOURCE_DATA.md §6`, counts and pagination
  derive from real records. The concept's decorative pill bar on the APBKal
  summary card is removed outright — it contradicts the itemisation it sits
  beside.

---

## 8. Explicitly rejected

Directions that would violate the mandate, listed so they are not reintroduced:

- Replacing the serif display face with an all-sans "modern gov" look.
- Flattening the asymmetric news block into a uniform 3-card grid.
- Adding gradients, glassmorphism, glow, floating blobs or 3D decoration
  (`CLAUDE.md §6`).
- Spreading gold beyond its scarce accent role.
- Replacing village photography with stock imagery, icons or illustration.
- Adding charts the reference does not have. Charts are permitted only where they
  aid comprehension (`FULL_BUILD §7`); the existing progress bars and itemised
  breakdowns already do that job.
- Vanity metrics on the admin dashboard (`FULL_BUILD §11`).
- Any aesthetic from the installed `industrial-brutalist-ui`, `brandkit` or
  `gpt-taste` skills. They are available in `.agents/skills/` but conflict with
  this direction and are not to drive the design.
