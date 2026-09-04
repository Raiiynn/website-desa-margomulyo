# ARCHITECTURE.md — Implemented foundation

Describes what **exists in the repository today**, at the end of Phase 1. It is
not a plan. Sections marked *(not yet implemented)* name the phase that adds
them, so the gap between foundation and target is explicit.

Decisions and their rationale live in `docs/adr/`. Content rules live in
`docs/SOURCE_DATA.md`. Visual and IA rules live in `docs/DESIGN_REFERENCE.md`.

---

## 1. Stack as implemented

| Concern | Choice | Version |
|---|---|---|
| Framework | Next.js, App Router | 15.5.25 |
| Language | TypeScript, strict | 5.9.x |
| UI runtime | React | 19.2.x |
| Styling | Tailwind CSS v4 (CSS-first) | 4.3.x |
| Linting | ESLint flat config + `eslint-config-next` | 9.39.x / 15.5.x |
| Testing | Vitest (node environment) | 3.2.x |
| Package manager | npm | 10.x |

Runtime dependencies are exactly three: `next`, `react`, `react-dom`. Everything
else is a devDependency. See ADR-0001.

**Not yet implemented:** Supabase (Postgres, Auth, Storage) and Prisma arrive in
Phase 2–3 per ADR-0002. No `@supabase/*` or `prisma` package is installed, and
no environment variable is read anywhere except `NEXT_PUBLIC_SITE_URL`.

---

## 2. Directory layout

```
src/
  app/
    layout.tsx              root layout — <html lang="id">, fonts, metadata
    globals.css             Tailwind entry + design tokens
    not-found.tsx           global 404
    (public)/               public route group — no URL segment
      layout.tsx            public shell
      page.tsx              "/" scaffold placeholder
    (admin)/                admin route group — no URL segment
      layout.tsx            admin shell, noindex
      admin/page.tsx        "/admin" scaffold placeholder
    api/
      health/route.ts       GET /api/health — liveness
  lib/
    site.ts                 site identity, navigation, route declarations
tests/
  site.test.ts              navigation and route invariants
  structure.test.ts         route groups, governance docs, secret hygiene
docs/                       Phase 0 documentation (unchanged by Phase 1)
scripts/
  render-source.py          regenerates source renders from the concept PDF
```

### Route groups

`(public)` and `(admin)` are Next.js route groups: the parentheses keep the
segment out of the URL, so `(public)/profil/page.tsx` serves `/profil` and
`(admin)/admin/page.tsx` serves `/admin`.

They exist because `MASTER_PROMPT.md §4` requires public and administrative
functionality to stay clearly separated while sharing one domain model. Separate
layout trees mean the back-office never inherits public chrome, and route
protection in Phase 3 has exactly one attachment point per surface.

`api/` is a real path segment, not a group — route handlers there serve
`/api/*`.

`tests/structure.test.ts` asserts this shape so a later refactor cannot quietly
collapse the separation.

---

## 3. TypeScript configuration

`strict: true` is the baseline. These additional flags close the gaps it leaves,
because `CLAUDE.md §5` asks for strong typing and this platform handles
citizen data:

| Flag | Why |
|---|---|
| `noUncheckedIndexedAccess` | Array and record access yields `T \| undefined`. Prevents a whole class of runtime crash on empty query results. |
| `exactOptionalPropertyTypes` | `{ a?: string }` cannot be assigned `undefined` explicitly. Keeps "absent" and "present but undefined" distinct — which matters for partial updates in the CMS. |
| `verbatimModuleSyntax` | Type-only imports must say so. Prevents server-only modules being pulled into a client bundle by an erased import. |
| `noUnusedLocals` / `noUnusedParameters` | Dead code is a correctness signal. |
| `noImplicitOverride`, `noFallthroughCasesInSwitch` | Ordinary footguns. |
| `forceConsistentCasingInFileNames` | Development is on Windows; deployment is Linux. This catches case drift before CI does. |

Path alias: `@/*` → `./src/*`, mirrored in `vitest.config.ts` so tests and the
app resolve identically.

---

## 4. Styling

Tailwind CSS v4 with CSS-first configuration. There is no `tailwind.config.ts`:
tokens are declared in `@theme` inside `src/app/globals.css`, and v4's PostCSS
plugin handles vendor prefixing, so `autoprefixer` is not a dependency.

`globals.css` defines **tokens only** — colour, font variables, radii — plus a
small base layer. Components, the type scale and layout primitives are Phase 4.

Three token decisions carried over from `DESIGN_REFERENCE.md §5.2`, where the
reference palette failed WCAG 2.2 AA at body size:

| Token | Reference | Implemented | Contrast |
|---|---|---|---|
| `--color-gold-700` | `#9E7B36` | `#917131` | 4.55:1 on white |
| `--color-gold-750` | `#9E7B36` | `#8D6E30` | 4.54:1 on band |
| `--color-text-muted` | `#8991A1` | `#6E7789` | 4.50:1 on white |

`--color-gold-600` keeps the original `#9E7B36` for non-text use — bars, chip
fills, rules and large display figures — where the 3:1 threshold applies. The
accent stays scarce; only its small-size legibility changes.

The base layer also ships two things the static reference could not:
a `:focus-visible` ring (finding A02) and a full `prefers-reduced-motion`
reset (`CLAUDE.md §11`).

Fonts are loaded through `next/font/google` and self-hosted at build time —
no external stylesheet request, no layout shift. `latin-ext` is subset in for
Indonesian and Javanese terms. The families (Source Serif 4, Plus Jakarta Sans)
match the reference's *pairing structure*; `DESIGN_REFERENCE.md §2.2` requires
the visual match to be confirmed against the page renders before Phase 4 closes.

---

## 5. Navigation and routing

`src/lib/site.ts` is the single source of truth for site identity and routing.
It holds structural configuration only — **no government content**. Contact
details, statistics, officials and services become database records in Phase 2,
gated by `docs/SOURCE_DATA.md`.

Two invariants are enforced by tests rather than convention:

1. **`PRIMARY_NAV` has exactly eight items**, matching the source concept
   (`SOURCE_DATA.md §3`, page 1, verified). `DESIGN_REFERENCE.md §4` requires it
   to stay eight; the fifteen specified routes are reached from within sections,
   not by growing the bar.
2. **`HEADER_CTA` shares neither a label nor an href with any nav item.** The
   reference renders "Layanan Publik" twice — once as nav, once as CTA — which
   is finding A01. The CTA points at `/pengaduan` instead.

`PUBLIC_ROUTES` declares all fifteen routes from `MASTER_PROMPT.md §7` so
routing, the sitemap (Phase 12) and the structural tests share one list. Most
have no page yet; they are built in Phases 5–8.

---

## 6. Security posture as implemented

Baseline only. The real work is Phases 3, 8 and 12.

**Implemented now:**

- Response headers in `next.config.mjs`: `X-Content-Type-Options: nosniff`,
  `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`,
  and a `Permissions-Policy` denying camera, microphone and geolocation.
- `poweredByHeader: false` — no framework version disclosure.
- `images.remotePatterns` is deliberately empty. No remote image host is
  trusted by default; Phase 5 adds the Supabase storage host explicitly.
- `/admin` is `noindex, nofollow, nocache` at the layout level, independent of
  any future auth check.
- `/api/health` reports liveness only — no version, environment, dependency or
  database state (`MASTER_PROMPT.md §28`).
- `.env` is gitignored; `.env.example` carries placeholders only. Two tests
  assert the template contains no JWT or `sb_` token and that
  `SUPABASE_SERVICE_ROLE_KEY` never gains a `NEXT_PUBLIC_` prefix — that prefix
  would inline a key that bypasses RLS into the browser bundle.

**Not yet implemented:** authentication and sessions (Phase 3), the server-side
`can(user, permission)` check (Phase 3), CSRF protection on mutations (Phase 3),
upload validation (Phase 8), rate limiting (Phase 3), and Content-Security-Policy
(Phase 12, once asset and font origins are fixed).

`/admin` is currently **unprotected**. This is safe only because no data layer
exists behind it. Phase 3 must protect it before Phase 9 puts anything there.

---

## 7. Quality gate

```
npm run gates
```

runs `lint → typecheck → test → build` in order, failing fast. Every phase ends
green on this command.

| Script | Command |
|---|---|
| `lint` | `eslint .` |
| `typecheck` | `tsc --noEmit` |
| `test` | `vitest run` |
| `build` | `next build` |

`next.config.mjs` sets `typescript.ignoreBuildErrors: false` and
`eslint.ignoreDuringBuilds: false` explicitly, so the production build cannot
pass while type or lint errors exist.

### What the tests currently cover

Phase 1 tests structural and governance invariants, not behaviour — there is
almost no behaviour yet:

- Navigation shape, labels, uniqueness, and the A01 CTA-duplication guard.
- Route declarations: count, uniqueness, path shape, admin-namespace isolation.
- `getSiteUrl()` fallback and trailing-slash normalisation.
- Route-group structure and `lang="id"` on the document.
- Presence of the Phase 0 governance documents, checksum alignment across
  `CHECKSUMS.txt` / `SOURCE_DATA.md` / `render-source.py`, and that the register
  still carries all 13 conflicts and 19 verification items.
- Secret hygiene in `.env.example` and `.gitignore`.

Component and integration tests arrive with the design system in Phase 4, which
is when `jsdom` and a React test renderer become dependencies that earn their
place. The Vitest environment is `node` until then.

---

## 8. Known constraints

- **Node 22.9.0 is below what the ESLint 9.39 toolchain declares.** Install
  emits `EBADENGINE` for `eslint-visitor-keys`, which wants
  `^20.19.0 || ^22.13.0 || >=24`. Lint runs correctly regardless, but the
  supported floor is recorded as `engines.node >= 20.9.0` and Node should be
  upgraded to 22.13+ before CI is set up.
- **Development is Windows, deployment will be Linux.** Case sensitivity and
  path separators differ. `forceConsistentCasingInFileNames` guards the common
  case; CI must run on Linux.
- **Next.js is pinned to the 15.x line** by an explicit locked decision, though
  16.x is released. Revisiting that is a deliberate decision, not a drive-by
  upgrade.
