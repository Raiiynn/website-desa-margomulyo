# Developer Handoff: Kalurahan Margomulyo

**Audit date:** 6 September 2026  
**Repository state audited:** current working tree  
**Scope:** documentation-only audit; this document describes implementation evidence, not the target specification.

## 1. Project Overview

Kalurahan Margomulyo is a government and public-service platform for Kalurahan Margomulyo, Kapanewon Seyegan, Kabupaten Sleman, D.I. Yogyakarta. The intended users are citizens, government staff, and administrators. The intended domain areas are public information, public services, transparency, complaints and aspirations, and an internal CMS.

The repository is currently a **partially implemented public website foundation**. It contains a polished static public presentation, a modeled PostgreSQL/Prisma domain, verified seed data, and a typed server query layer. The database-backed application, authentication, authorization, CMS mutations, storage, and citizen submission workflows are not operationally connected.

Government-specific content is governed by `docs/SOURCE_DATA.md`, whose source is the Margomulyo concept material. The repository deliberately withholds disputed or unverified facts instead of publishing guesses.

## 2. Current Status Matrix

| Area | Status | Current state | Evidence / notes |
|---|---|---|---|
| Public website foundation | DONE | Public layout, navigation, shared UI, responsive styling, and implemented information pages exist. | `src/app/(public)/`, `src/components/`, `src/app/globals.css` |
| Public route registry | PARTIALLY IMPLEMENTED | The registry declares 15 target routes. Most have pages, but `/padukuhan` and `/layanan/[slug]` do not. `/berita/[slug]` exists but is not declared in the registry. | `src/lib/site.ts`, `src/app/(public)/` |
| Static public content | DONE | Pages render verified fixture and seed-data constants at build/runtime. | `src/data/fixtures.ts`, `prisma/seed-data/` |
| Database schema | DONE | Prisma schema and one initial PostgreSQL migration exist. | `prisma/schema.prisma`, `prisma/migrations/20260904160000_init/migration.sql` |
| Migration application | BLOCKED | Repository documentation records that the migration has not been applied because the intended Supabase database was unreachable from the development environment. | `docs/ARCHITECTURE.md` |
| Database seed | PLANNED | An idempotent seed exists but has not been run against a reachable database. | `prisma/seed.ts` |
| Server data layer | PARTIALLY IMPLEMENTED | Prisma client, serialization helpers, and typed query modules exist, but current pages do not import them. | `src/server/`, `src/data/fixtures.ts` |
| Authentication | NOT IMPLEMENTED | No Supabase Auth integration, login, logout, session handling, or password recovery exists. | No auth provider imports or middleware found |
| RBAC enforcement | NOT IMPLEMENTED | Roles, permissions, and assignments are modeled and seeded as constants, but no server-side permission check is implemented. | `prisma/schema.prisma`, `prisma/seed-data/access.ts` |
| Admin dashboard | PARTIALLY IMPLEMENTED | `/admin` renders a static dashboard using fixtures and hardcoded activity entries. It is not a CMS and is not protected by authentication. | `src/app/(admin)/admin/page.tsx`, `src/app/(admin)/layout.tsx` |
| Complaints and aspirations | PARTIALLY IMPLEMENTED | UI and tracking screens exist. Submission creates a browser-only random token; tracking returns a hardcoded result for any non-empty token. Nothing persists. | `src/app/(public)/pengaduan/page.tsx` |
| Contact messages | PARTIALLY IMPLEMENTED | Form UI exists, but submit only prevents the browser default and has no persistence path. | `src/components/forms/ContactMessageForm.tsx` |
| Transparency | PARTIALLY IMPLEMENTED | Static APBKal, project, and document views exist. Database-backed editing and file downloads do not. | `src/app/(public)/transparansi/`, `prisma/seed-data/transparency.ts` |
| File storage | NOT IMPLEMENTED | Storage variables and models are prepared, but no upload, bucket integration, or signed URL route exists. | `.env.example`, `prisma/schema.prisma` |
| Audit logging | PLANNED | `AuditLog` is modeled, but application writes are absent. | `prisma/schema.prisma` |
| Testing infrastructure | DONE | Vitest configuration and seven passing suites exist. Coverage is primarily structural, governance, seed, parity, and boundary testing. | `vitest.config.ts`, `tests/` |
| Deployment | NOT CONFIGURED | No hosting provider, CI/CD workflow, production database, or deployment configuration is present in the repository. | Repository inspection |

## 3. Technology Stack

| Concern | Current implementation |
|---|---|
| Framework | Next.js App Router `15.5.25` |
| Language | TypeScript `5.9.3`, strict compiler settings |
| UI runtime | React `19.2.0`, React DOM `19.2.0` |
| Styling | Tailwind CSS `4.3.3`, CSS-first tokens in `src/app/globals.css` |
| Database target | PostgreSQL through the intended Supabase project; no reachable database was verified during this audit |
| ORM | Prisma `6.19.3`, `@prisma/client` `6.19.3` |
| Authentication | Not implemented; Supabase Auth is an accepted target decision, not a current integration |
| Storage | Not implemented; Supabase Storage is an accepted target decision |
| Testing | Vitest `3.2.7`; Playwright `1.63.0` is installed but no Playwright test suite was found |
| Linting | ESLint `9.39.0` with `eslint-config-next` `15.5.25` |
| Build tooling | Next.js build, Prisma Client generation, Tailwind PostCSS plugin, TypeScript |
| Package manager | npm; `package-lock.json` is present |
| Node requirement | `>=20.9.0` in `package.json`; `scripts/with-env.mjs` requires Node `20.12+` for `process.loadEnvFile` |
| Validation library | No Zod dependency is installed or used, despite its mention in ADR-0001 |

The audited build passed, but Prisma emitted a warning that the `package.json#prisma` configuration is deprecated for Prisma 7. This is a maintenance concern, not a current build failure.

## 4. Local Development Setup

No repository URL or deployment remote is documented here. Obtain the clone URL from the project maintainer, then run the following from the repository root:

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

`npm run dev` starts Next.js. The normal local origin is `http://localhost:3000` unless the environment or Next.js configuration changes it.

Quality commands:

```powershell
npm run lint
npm run typecheck
npm run test
npm run build
npm run gates
npm run start
npm run lint:fix
npm run test:watch
npm run postinstall
```

`npm run gates` runs lint, typecheck, tests, and build in that order.

`npm run start` serves the existing production build. `npm run lint:fix` applies
ESLint autofixes, `npm run test:watch` starts Vitest in watch mode, and
`npm run postinstall` regenerates the Prisma Client after dependency installation.

Prisma commands are wrapped by `scripts/with-env.mjs`, which loads `.env.local` first and falls back to `.env`:

```powershell
npm run db:generate
npm run db:validate
npm run db:status
npm run db:migrate:dev
npm run db:migrate
npm run db:seed
npm run db:studio
```

Do not run migration or seed commands against production until connection strings, database ownership, and backup/rollback procedures are confirmed. The repository records that the initial migration and seed were not successfully applied/run against the intended database.

## 5. Environment Variables

Only names and purposes are documented here. Values from `.env.local` are not part of this handoff.

| Variable | Required now | Purpose | Current usage |
|---|---:|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | No | Intended Supabase project URL for browser-safe integration. | Declared only; not consumed by current source. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | No | Intended browser-safe Supabase key. | Declared only; not consumed by current source. |
| `SUPABASE_SERVICE_ROLE_KEY` | No | Intended server-only privileged Supabase key. | Declared only; not consumed by current source. |
| `DATABASE_URL` | For Prisma database commands | Pooled PostgreSQL connection used by Prisma runtime. | Read by `prisma/schema.prisma`. |
| `DIRECT_URL` | For Prisma migrations | Direct PostgreSQL connection used by Prisma migration operations. | Read by `prisma/schema.prisma`. |
| `SUPABASE_BUCKET_PUBLIC` | No | Intended public storage bucket for official public files and images. | Declared only. |
| `SUPABASE_BUCKET_PRIVATE` | No | Intended private bucket for complaint attachments. | Declared only. |
| `NEXT_PUBLIC_SITE_URL` | No | Canonical site origin and metadata base URL. | Read by `src/lib/site.ts`; falls back to `http://localhost:3000`. |
| `COMPLAINT_TOKEN_SECRET` | No | Intended signing secret for complaint tracking tokens. | Declared only; current browser token simulation does not use it. |
| `NODE_ENV` | Runtime-provided | Controls Prisma logging verbosity. | Read by `src/server/db.ts`. |

The `.env.example` file contains placeholders only. Never add credentials, database URLs, service-role keys, or token values to this document or to source control.

## 6. Repository Structure

```text
src/
  app/                 Next.js routes, layouts, route handlers, global CSS
  components/          Shared layout, UI primitives, icons, and forms
  data/                Interim static fixtures re-exporting verified seed data
  lib/                 Structural site configuration and route declarations
  server/              Server-only Prisma client, serializers, and query modules
prisma/
  schema.prisma        PostgreSQL domain model and constraints
  migrations/          Initial generated/offline migration
  seed.ts              Idempotent database seed entry point
  seed-data/           Verified content and access constants used by the seed
scripts/                Environment wrapper and source-material tooling
tests/                  Vitest structural, data, parity, and boundary suites
docs/                   Architecture, source-data, design, ADR, and source archive docs
```

### Directory responsibilities

- `src/app/` owns route composition and page-level rendering. Database access should not be placed directly in client components.
- `src/components/` owns reusable presentation and form UI. It currently contains no completed mutation/API abstraction.
- `src/data/` is an interim build-time content path. It should be removed or reduced after database-backed page queries are verified.
- `src/server/` is the server-only data boundary. `src/server/db.ts` imports `server-only` to prevent accidental client bundling.
- `prisma/` owns the relational model, migrations, seed entry point, and verified seed constants. It is not currently the runtime source for public pages.
- `tests/` owns repository invariants and data checks. There are no current end-to-end auth, upload, admin mutation, or persistence tests.
- `docs/` records governance and architecture context. It is not proof that a planned feature is implemented.

## 7. Application Architecture and Data Flow

The application uses Next.js App Router with two route groups:

- `(public)` provides the public site shell without adding `public` to URLs.
- `(admin)` provides the administrative shell without adding `admin` as a group segment; the nested `admin` directory produces `/admin`.
- `api` is a real route segment and currently contains `/api/health`.

The root layout in `src/app/layout.tsx` sets Indonesian document language, metadata, viewport settings, and the Source Serif 4 / Plus Jakarta Sans font pairing. `src/app/(public)/layout.tsx` composes the public header/footer. `src/app/(admin)/layout.tsx` composes the admin shell and adds `noindex`, `nofollow`, and `nocache` metadata.

### Current public flow

```text
Browser request
  -> Next.js page in src/app/(public)
  -> page/component imports src/data/fixtures.ts
  -> fixtures re-export verified constants from prisma/seed-data/*
  -> static or client-local presentation
```

Most interactive pages use client-side React state for filtering or form display. Search and category filtering are in-memory. Complaint submission and tracking are simulations.

### Prepared but unused database flow

```text
Future server page or mutation
  -> src/server/queries/*
  -> src/server/db.ts
  -> Prisma Client
  -> PostgreSQL / intended Supabase Postgres
```

`src/server/db.ts` creates a development-safe Prisma singleton and is protected with `server-only`. `src/server/serialize.ts` converts database dates and decimals to serializable values. Query modules exist for content, profile/padukuhan, and transparency, but the current public pages do not consume them.

### API, validation, and error handling

The only route handler is `src/app/api/health/route.ts`, a no-store liveness response returning `{ status: "ok" }`. There are no application mutation route handlers, server actions, middleware, auth callbacks, or server-side request schemas. There is a global `src/app/not-found.tsx` page. Database query functions filter publishable content by status, but they are not yet in the live page path.

## 8. Route Map

| Path | Area | Rendering | Auth | Authorization | Primary source | Status |
|---|---|---|---|---|---|---|
| `/` | Public | Static server page | None | None | Fixtures | DONE |
| `/profil` | Public | Static server page | None | None | Fixtures | DONE |
| `/pemerintahan` | Public | Static server page | None | None | Fixtures | DONE |
| `/padukuhan` | Public target | No page file | None | None | None | NOT IMPLEMENTED |
| `/berita` | Public | Client-filtered page | None | None | Fixtures | DONE |
| `/berita/[slug]` | Public | Static generated page | None | None | Fixtures | PARTIALLY IMPLEMENTED |
| `/agenda` | Public | Static server page | None | None | Fixtures | DONE |
| `/layanan` | Public | Client-filtered page | None | None | Fixtures | DONE |
| `/layanan/[slug]` | Public target | No page file | None | None | None | NOT IMPLEMENTED |
| `/pengaduan` | Public | Client component | None | None | Fixtures plus local state | PARTIALLY IMPLEMENTED |
| `/transparansi` | Public | Static server page | None | None | Fixtures | DONE |
| `/transparansi/apbkal` | Public | Static server page | None | None | Fixtures | DONE |
| `/pembangunan` | Public | Static server page | None | None | Fixtures | DONE |
| `/dokumen` | Public | Static server page | None | None | Fixtures | PARTIALLY IMPLEMENTED |
| `/potensi` | Public | Static server page | None | None | Fixtures | DONE |
| `/kontak` | Public | Client form plus static page | None | None | Fixtures; form has no backend | PARTIALLY IMPLEMENTED |
| `/admin` | Admin | Static client dashboard | None enforced | None enforced | Fixtures and hardcoded activity | PARTIALLY IMPLEMENTED; currently publicly reachable |
| `/api/health` | API | Route handler | None | None | Process liveness only | DONE |
| `/_not-found` | Framework fallback | Next.js fallback | None | None | `src/app/not-found.tsx` | DONE |

The route registry in `src/lib/site.ts` declares the 15 public target routes but omits `/berita/[slug]`, even though `src/app/(public)/berita/[slug]/page.tsx` implements it. The registry includes `/padukuhan` and `/layanan/[slug]`, but neither has a page file.

## 9. Component Architecture

### Layout and navigation

- `src/app/layout.tsx`: root metadata, fonts, language, and document shell.
- `src/app/(public)/layout.tsx`: public header/footer composition.
- `src/app/(admin)/layout.tsx`: separate administrative chrome and noindex metadata.
- `src/components/layout/SiteHeader.tsx`: public navigation and header CTA from `src/lib/site.ts`.
- `src/components/layout/SiteFooter.tsx`: public footer.

### UI primitives and data display

`src/components/ui/` contains `Badge`, `Button`, `Breadcrumbs`, `Container`, `EmptyState`, `Icons`, `LabelledDataCard`, `NumberedProcessRow`, `SectionHeader`, `SemanticProgressBar`, and `StatStrip`. These components form the existing presentation vocabulary and should be reused rather than replaced when connecting database data.

The design tokens and base accessibility rules are in `src/app/globals.css`. The codebase uses CSS-first Tailwind tokens, visible focus styling, and a reduced-motion reset.

### Forms

`src/components/forms/ContactMessageForm.tsx` is a client component with labeled fields and a submit handler that calls `preventDefault()` only. It does not validate server-side or persist messages. The complaint form is embedded in `src/app/(public)/pengaduan/page.tsx` and currently uses local state and simulated results.

There is no completed admin UI component family, form action layer, validation schema, upload component, or feedback/error system for mutations.

## 10. Data Architecture

### Data classifications

- **Real database data:** none was verified as currently consumed by public pages. The Prisma schema defines the intended database model.
- **Static data:** values compiled into the application through `src/data/fixtures.ts` and the page imports that consume it.
- **Fixture data:** `src/data/fixtures.ts` re-exports verified constants from `prisma/seed-data/` so the public site can build without a database.
- **Seeded data:** the records that `prisma/seed.ts` would write to PostgreSQL. The seed is idempotent, but repository documentation records that it has not been run successfully against the intended database.
- **Temporary data:** browser-generated complaint tokens, hardcoded tracking responses, hardcoded admin activity entries, and client-local filtering state.

### Seed architecture

`prisma/seed.ts` writes access, territory, government, statistics, settings, content, transparency, development, documents, local potential, and UMKM data using upserts. It intentionally does not seed users, complaints, complaint categories, or media. This avoids fabricated citizen records and standing credentials.

`tests/fixtures-parity.test.ts` protects parity between the interim fixtures and the verified seed constants. Once a reachable database is validated, pages can move to `src/server/queries/*`; the fixture path should then be retired deliberately rather than maintained as a second source.

### Query architecture

- `src/server/queries/content.ts`: published news, agenda, services, categories, procedure steps, and service channels.
- `src/server/queries/profile.ts`: profile, government, demographic, and padukuhan data.
- `src/server/queries/transparency.ts`: budgets, projects, and documents.
- `src/server/queries/padukuhan.ts`: padukuhan-specific query support.
- `src/server/serialize.ts`: date and decimal conversion for server-to-page data.

No mutation query module or server authorization boundary currently exists.

## 11. Database and Domain Model

`prisma/schema.prisma` targets PostgreSQL and contains 41 models and 10 enums, with relational foreign keys, indexes, unique constraints, and hand-authored PostgreSQL checks in the initial migration.

Major model groups are:

- **Access:** `User`, `Role`, `Permission`, `RolePermission`, `AuditLog`.
- **Territory and government:** `Padukuhan`, `GovernmentOfficial`, `LeadershipTerm`, `VillageInstitution`, `VillageMission`, `GovernancePillar`.
- **Statistics:** `DemographicSnapshot`, `ReligionCount`, `EducationCount`, `OccupationCount`.
- **Content:** `News`, `NewsCategory`, `Agenda`, `Page`, `Media`.
- **Services:** service categories, services, procedure steps, and channels.
- **Complaints:** complaints, categories, attachments, and status history.
- **Transparency:** budgets, budget lines, realizations, and cycle stages.
- **Development:** projects, padukuhan links, and project updates.
- **Documents:** public document metadata.
- **Local economy:** local potentials, UMKM, and products.
- **Configuration:** `SiteSetting`.

Important modeled rules include:

- Roles are the closed enum `OWNER`, `ADMIN`, `EDITOR`, and `OPERATOR`; permissions are editable rows with dotted keys.
- Published content requires a publication timestamp through database checks where applicable.
- Money uses `Decimal(18,2)` because Rupiah totals exceed signed 32-bit integer range.
- Percentages and physical/financial progress are bounded from 0 to 100.
- Completed projects require 100% physical progress.
- Budget net financing must reconcile with receipts and outlays.
- Complaint resolution and closure timestamps require matching status values.
- Complaint attachments cascade with their complaint.
- Complaint tracking stores a token hash rather than a plain token.
- Audit logs preserve actor snapshots and survive user deletion through `SetNull` on the user relation.
- `GovernmentOfficial.name` is nullable because positions are verified but most occupants are not source-verified.
- Disputed padukuhan RW/RT counts and incomplete demographic breakdowns remain nullable rather than being fabricated.

The initial migration directory is `prisma/migrations/20260904160000_init/`. Its existence proves a migration artifact exists, not that it has been applied to a live database. The repository currently has no verified migration table or live database state.

## 12. Authentication, Authorization, and RBAC

### Implemented

- Role and permission models exist in `prisma/schema.prisma`.
- Role and permission constants and assignments exist in `prisma/seed-data/access.ts`.
- The admin layout is marked noindex/nofollow/nocache.
- Global response headers include baseline hardening in `next.config.mjs`.

### Not implemented

- Supabase Auth integration.
- Login, logout, session refresh, and password recovery.
- Middleware or route protection.
- Server-side `can(user, permission)` enforcement.
- Authorization checks in route handlers or mutations.
- User management.
- Audit-log writes.
- Rate limiting and CSRF protection.
- Private attachment authorization and signed URLs.

`/admin` is currently reachable without authentication. This is a known incomplete boundary. The dashboard has no real protected data or mutation capability yet, but it must be protected before operational data or admin actions are connected.

The intended architecture in `docs/adr/0002-database-auth-storage.md` uses Supabase Auth for staff identity, application-code permission checks for authorization, and database RLS as defense in depth. That is an accepted target decision, not a current implementation.

## 13. Feature Inventory

### Public Website

**Status: DONE for the static foundation.** The public shell, navigation, footer, responsive layout, metadata, and most declared pages exist under `src/app/(public)/`.

### Village Profile

**Status: PARTIALLY IMPLEMENTED.** `/profil` and `/pemerintahan` render static verified content from fixtures. `/padukuhan` is declared but has no page. The profile query layer exists but is unused by pages.

### Government / Administration

**Status: PARTIALLY IMPLEMENTED.** Government positions, leadership history, institutions, missions, and pillars are modeled and represented in static pages. Staff identity and operational administration are not connected to auth or database CRUD.

### News & Information

**Status: PARTIALLY IMPLEMENTED.** `/berita` and generated `/berita/[slug]` pages exist with static content and local filtering. Database-backed publication workflow, search, related content, and pagination are not operational. The dynamic route is omitted from `PUBLIC_ROUTES`.

### Public Services

**Status: PARTIALLY IMPLEMENTED.** `/layanan` presents a static service directory with local filtering. `/layanan/[slug]` is missing. No service application submission or database-backed service management exists.

### Transparency

**Status: PARTIALLY IMPLEMENTED.** APBKal, realization, development, and document presentation exist as static pages. Document metadata has no connected download files; editing and publication workflows do not exist.

### Village Potential

**Status: DONE for static presentation.** `/potensi` renders verified potential and UMKM content from fixtures. Database connection and admin editing are absent.

### Citizen Complaints

**Status: PARTIALLY IMPLEMENTED.** `/pengaduan` provides the UI shell, anonymous option, token display, and tracking UI. Submission, token signing, persistence, status transitions, attachments, private storage, and staff processing are not implemented.

### Authentication

**Status: NOT IMPLEMENTED.** No identity or session flow exists.

### Admin

**Status: PARTIALLY IMPLEMENTED.** `/admin` is a static dashboard presentation. CMS modules, role-aware navigation, CRUD, workflow, user management, and audit logs are absent.

### Database

**Status: PARTIALLY IMPLEMENTED.** The domain model, migration SQL, seed, Prisma client, serializers, and read queries exist. Live application connectivity and page consumption are absent.

## 14. Incomplete Features

### Database-backed public pages

- **Status:** PARTIALLY IMPLEMENTED.
- **Existing:** Prisma schema, migration artifact, seed data, fixtures, server singleton, serializers, and read query modules.
- **Missing:** A reachable configured database, applied migration, successful seed run, query integration in pages, runtime error/loading handling, and removal of the duplicate fixture path.
- **Files:** `src/server/queries/`, `src/server/db.ts`, `src/data/fixtures.ts`, `prisma/seed.ts`.
- **Dependency:** Valid `DATABASE_URL`/`DIRECT_URL` and a reachable PostgreSQL instance.
- **Priority:** Highest foundation priority.

### Authentication and `/admin` protection

- **Status:** NOT IMPLEMENTED.
- **Existing:** Role/permission schema and seed constants; admin shell and noindex metadata.
- **Missing:** Supabase Auth, sessions, middleware/route guard, staff user provisioning, permission checks, and protected server actions.
- **Files:** `src/app/(admin)/layout.tsx`, `prisma/schema.prisma`, `prisma/seed-data/access.ts`, `docs/adr/0002-database-auth-storage.md`.
- **Dependency:** Database availability and server-side auth integration.
- **Priority:** Must precede operational admin mutations.

### CMS and audit trail

- **Status:** PLANNED.
- **Existing:** Content models, workflow enum, `AuditLog` model, and static admin presentation.
- **Missing:** CRUD routes/actions, validation, draft/review/publish transitions, role enforcement, audit writes, conflict handling, and feedback states.
- **Files:** `src/app/(admin)/admin/page.tsx`, `prisma/schema.prisma`, `src/server/`.
- **Dependency:** Authentication/RBAC and database-backed data flow.
- **Priority:** High after access control.

### Complaint submission and tracking

- **Status:** PARTIALLY IMPLEMENTED.
- **Existing:** Public UI, categories in HTML, anonymous toggle, token display, and tracking layout.
- **Missing:** Server validation, persistence, cryptographically secure token generation, token hashing, status history, staff workflow, attachments, private storage, rate limiting, and real lookup behavior.
- **Files:** `src/app/(public)/pengaduan/page.tsx`, `prisma/schema.prisma`, `.env.example`.
- **Dependency:** Database, server mutation boundary, token secret, and storage design.
- **Priority:** High because the current UI implies a submission succeeded when it did not persist.

### Contact message handling

- **Status:** PARTIALLY IMPLEMENTED.
- **Existing:** Accessible labeled form UI.
- **Missing:** A persistence model or approved delivery destination, server validation, CSRF protection, spam/rate controls, success/error states, and privacy handling.
- **Files:** `src/components/forms/ContactMessageForm.tsx`, `src/app/(public)/kontak/page.tsx`.
- **Dependency:** Product decision on whether contact messages belong in the database or another official channel.
- **Priority:** Medium.

### Missing public routes and content capabilities

- **Status:** NOT IMPLEMENTED for `/padukuhan` and `/layanan/[slug]`; PARTIALLY IMPLEMENTED for news pagination/search and documents.
- **Existing:** Route declarations and query functions for some target data.
- **Missing:** Page files, route-level loading/error/empty states, database-backed search, pagination, and file download endpoints.
- **Files:** `src/lib/site.ts`, `src/server/queries/`, `src/app/(public)/`.
- **Dependency:** Decide and validate database-backed read path first.
- **Priority:** Medium after data connection.

## 15. Known Issues

### Functional Issues

- Complaint submission is simulated with `Math.random()` and does not write a complaint. The UI presents a success state regardless of backend persistence because no backend exists. Severity: high. File: `src/app/(public)/pengaduan/page.tsx`.
- Complaint tracking returns the same hardcoded processing-style result for every non-empty token. Severity: high. File: `src/app/(public)/pengaduan/page.tsx`.
- Contact submission is a no-op. Severity: medium. File: `src/components/forms/ContactMessageForm.tsx`.
- `/admin` displays hardcoded audit activity and fixture metrics rather than operational data. Severity: high for operational use. File: `src/app/(admin)/admin/page.tsx`.
- Document entries have metadata but no verified download file flow. Severity: medium. Files: `src/app/(public)/dokumen/page.tsx`, `prisma/schema.prisma`.

### Architecture Issues

- Public pages bypass the prepared server query layer and read fixtures directly. This creates a deliberate but temporary duplicate path. Severity: high before production data operation. Files: `src/data/fixtures.ts`, `src/server/queries/`.
- The route registry and filesystem disagree: `/berita/[slug]` is implemented but undeclared, while `/padukuhan` and `/layanan/[slug]` are declared but absent. Severity: medium. Files: `src/lib/site.ts`, `src/app/(public)/`.
- No mutation boundary exists for forms or admin actions. Severity: high. Files: `src/app/`, `src/server/`.

### UX Issues

- Some pages communicate operational claims such as complaint registration and admin activity while the underlying systems are static or simulated. Severity: high because public trust is affected. Files: complaint and admin pages above.
- Search/filter behavior is limited to client-side fixture data and cannot represent database content. Severity: medium. Files: news and service pages.

### Accessibility Issues

- A full WCAG 2.2 AA audit and browser-level interaction suite are not present. Static tests cover design-system and structural invariants, not all user journeys. Severity: medium. Files: `tests/`, `scripts/visual-qa.mjs`.

### Security Issues

- `/admin` has no authentication or authorization guard. It is currently noindex but publicly reachable. Severity: critical before real admin data is added. Files: `src/app/(admin)/layout.tsx`, `src/app/(admin)/admin/page.tsx`.
- CSRF protection, rate limiting, upload validation, private storage access control, and Content-Security-Policy are not implemented. Severity: high for future mutations. Evidence: `docs/ARCHITECTURE.md`, `docs/adr/0002-database-auth-storage.md`.
- The browser complaint token uses non-cryptographic `Math.random()`. Severity: high if treated as a real secret. File: `src/app/(public)/pengaduan/page.tsx`.

### Deployment Issues

- No deployment provider, CI workflow, production environment, or verified live database is configured in the repository. Severity: high for release readiness.
- Node `20.9+` is declared, but the environment wrapper needs Node `20.12+`; the practical minimum should be aligned before CI. Severity: medium. Files: `package.json`, `scripts/with-env.mjs`.
- Development is on Windows while deployment is intended for Linux; casing remains a CI concern. Severity: medium. Evidence: `tsconfig.json`, `docs/ARCHITECTURE.md`.

### Data Issues

- The seed intentionally omits users, complaints, complaint categories, and media. These are not missing by accident; they require real operational input or file assets. Severity: expected/planned. File: `prisma/seed.ts`.
- Source conflicts and verification gaps are represented as nullable/withheld values. Developers must not fill them with plausible estimates. Severity: high if content is changed. File: `docs/SOURCE_DATA.md`.

## 16. Technical Debt

- Interim fixture imports must eventually be replaced by server query imports without creating two competing content sources.
- The public route registry is not generated from or checked against all page files.
- The project has no reusable server mutation/validation/authorization abstraction yet.
- Admin UI is presentation-only and contains hardcoded operational activity.
- The database query layer has read functions but no mutation, transaction, or domain authorization layer.
- Playwright is installed, but no browser test suite is present.
- The current Vitest environment is `node`; component and browser behavior are not covered.
- `package.json#prisma` is deprecated for Prisma 7 and should be migrated before a Prisma major upgrade.
- The accepted ADR mentions Zod, but Zod is not installed; server validation remains to be designed and implemented.
- The source concept archive and verification register are valuable governance assets but require maintainers to keep checksums and source data aligned when source material changes.

## 17. Architectural Decisions to Preserve

### ADR-0001: Application stack

The project chose Next.js App Router, strict TypeScript, Tailwind, Prisma, Zod as the intended validation library, and Vitest/Playwright because server rendering, typed boundaries, and minimal client-side JavaScript fit the platform. Current code verifies most of the stack but not Zod usage. Reference: `docs/adr/0001-stack.md`.

### ADR-0002: Database, authentication, and storage

The intended provider is Supabase for PostgreSQL, Auth, and Storage. Prisma owns the relational schema and migrations. Application code owns authorization, with RLS as defense in depth. Public files and private complaint attachments use separate storage policies. Reference: `docs/adr/0002-database-auth-storage.md`.

These are accepted architectural decisions, but the corresponding integrations must not be described as current until source code, configuration, and a verified environment demonstrate them.

## 18. Development Rules for Continuation

- Treat `docs/SOURCE_DATA.md` as the publication gate for Margomulyo-specific facts. Do not invent officials, statistics, budgets, contacts, services, documents, or public claims.
- Keep database access server-only. Preserve the `server-only` boundary in `src/server/db.ts` and do not import Prisma-capable modules into client components.
- Validate untrusted input on the server before persistence or privileged actions.
- Enforce authorization server-side for every admin action and protected data access; client role checks are insufficient.
- Keep private complaints and attachments out of public responses and public storage.
- Preserve relational integrity and existing Prisma constraints. Do not bypass the migration model with ad hoc database changes.
- Preserve the public/admin route-group separation.
- Maintain responsive behavior from 320px through large desktop widths and preserve keyboard focus and reduced-motion behavior.
- Prefer the existing shared components and tokens over parallel UI primitives.
- Treat fixtures as temporary once database integration is verified; do not silently let fixtures and database content diverge.
- Run the quality gate before considering a change complete.

Relevant governance references are `CLAUDE.md`, `docs/ARCHITECTURE.md`, `docs/SOURCE_DATA.md`, and the two ADRs.

## 19. Testing and Quality Gates

The configured test framework is Vitest in a Node environment. There are seven suites:

- `tests/database.test.ts`
- `tests/design-system.test.ts`
- `tests/fixtures-parity.test.ts`
- `tests/seed-data.test.ts`
- `tests/server-boundary.test.ts`
- `tests/site.test.ts`
- `tests/structure.test.ts`

The audited result was **179 tests passed across 7 files**. The suites cover route declarations, structure, governance documents, design tokens, fixture/seed parity, seed relationships/arithmetic, Prisma/schema presence, and server-boundary rules. They do not prove authentication, authorization, database connectivity, persistence, upload security, admin mutations, or critical browser journeys.

Verified commands and results on 6 September 2026:

| Command | Result |
|---|---|
| `npm run lint` | Passed |
| `npm run typecheck` | Passed |
| `npm run test` | Passed: 7 files, 179 tests |
| `npm run build` | Passed; 24 routes generated |
| `npm run gates` | Defined as the combined gate; individual commands above passed |

Before committing future changes, run:

```powershell
npm run lint
npm run typecheck
npm run test
npm run build
```

Add focused tests for each new server mutation, authorization boundary, and persistence flow. Add browser/E2E coverage before claiming a citizen or admin workflow is operational.

## 20. Deployment Status

**NOT CONFIGURED in this repository.** No hosting provider, CI/CD workflow, production deployment script, live database verification, Supabase project configuration, or production observability setup was found.

The current build is suitable for local verification, not evidence of production readiness. The health route is a liveness probe only; it does not verify database readiness.

## 21. Important Files

| File | Purpose | Why it matters |
|---|---|---|
| `CLAUDE.md` | Repository operating rules | Defines source-of-truth, security, accessibility, and scope constraints. |
| `MASTER_PROMPT.md` | Target platform requirements | Describes intended public, admin, auth, and data capabilities; not implementation proof. |
| `FULL_BUILD.md` | Full target specification | Lists required platform features and workflows. |
| `PROJECT_CONTEXT.md` | Project identity and verified context | Establishes Margomulyo terminology and high-level domain. |
| `docs/ARCHITECTURE.md` | Implemented foundation notes | Records phase status, interim fixture strategy, and known constraints. |
| `docs/SOURCE_DATA.md` | Publication gate | Defines verified facts, conflicts, and withheld information. |
| `docs/DESIGN_REFERENCE.md` | Visual/IA rules | Explains design tokens, navigation limits, and reference direction. |
| `docs/adr/0001-stack.md` | Stack decision | Explains framework, ORM, testing, and validation direction. |
| `docs/adr/0002-database-auth-storage.md` | Data/auth/storage decision | Explains Supabase, Prisma, Auth, authorization, RLS, and bucket intent. |
| `package.json` | Versions and commands | Authoritative scripts, Node engine, dependencies, and Prisma seed command. |
| `src/lib/site.ts` | Site identity and route registry | Single structural source for navigation and declared public routes. |
| `src/data/fixtures.ts` | Interim page data | Current public content path and fixture/seed parity boundary. |
| `src/server/db.ts` | Prisma singleton | Server-only database access boundary. |
| `src/server/queries/` | Typed read queries | Prepared database-backed read path, currently unused by pages. |
| `prisma/schema.prisma` | Domain model | Defines entities, relationships, enums, indexes, and constraints. |
| `prisma/migrations/20260904160000_init/migration.sql` | Initial migration | Database artifact whose application remains unverified. |
| `prisma/seed.ts` | Database seed entry point | Idempotent source-backed seed; deliberately omits private/unknown data. |
| `scripts/with-env.mjs` | Prisma environment wrapper | Loads `.env.local`/`.env` for Prisma commands and requires Node `20.12+`. |
| `next.config.mjs` | Next/build/security configuration | Defines build failure behavior, headers, image policy, and URL behavior. |
| `tests/` | Current verification suite | Protects structure/data invariants but not operational workflows. |

## 22. Do Not Redo

The next developer should preserve and build on the following verified work:

- Public route-group and layout foundation.
- Existing responsive visual system and CSS design tokens.
- Indonesian document language, metadata baseline, focus styling, and reduced-motion reset.
- Shared layout and UI primitives under `src/components/`.
- Source-data publication rules and conflict/verification registers.
- Prisma domain schema and initial migration artifact unless a deliberate ADR changes them.
- Idempotent seed architecture and fixture/seed parity tests.
- Server-only Prisma singleton, serializers, and typed read query modules.
- Existing structural, data-integrity, and governance test infrastructure.
- Baseline security headers, noindex admin metadata, and liveness endpoint.

These are foundations, not proof that the corresponding production feature is complete. Connect and validate them before replacing them.

## 23. Recommended Next Steps

### 1. Establish a reachable development database

- **Objective:** Make the existing PostgreSQL target usable and confirm the environment.
- **Prerequisite:** Obtain approved Supabase/database access and configure `DATABASE_URL` and `DIRECT_URL` without exposing values.
- **Files:** `.env.example`, `scripts/with-env.mjs`, `prisma/schema.prisma`.
- **Expected result:** `npm run db:validate`, `npm run db:status`, migration deploy, and Prisma generation operate against the approved database.

### 2. Apply the migration and run the verified seed

- **Objective:** Create the existing relational schema and source-backed baseline data.
- **Prerequisite:** Step 1 and an approved migration procedure.
- **Files:** `prisma/migrations/20260904160000_init/migration.sql`, `prisma/seed.ts`, `prisma/seed-data/`.
- **Expected result:** Database state matches the schema and seed is idempotent without fabricated users, complaints, or media.

### 3. Replace fixture reads with server query reads

- **Objective:** Make public pages consume the database-backed read layer.
- **Prerequisite:** Successful migration/seed and query verification.
- **Files:** `src/app/(public)/`, `src/server/queries/`, `src/server/serialize.ts`, `src/data/fixtures.ts`.
- **Expected result:** Public content is read through server-only queries; fixture parity tests remain until the swap is proven, then fixtures can be retired.

### 4. Implement staff identity and protect `/admin`

- **Objective:** Ensure no administrative surface is publicly operable before adding mutations.
- **Prerequisite:** Reachable Supabase project and database-backed staff records.
- **Files:** `src/app/(admin)/`, `src/lib/`, new server auth boundary, `prisma/schema.prisma`, `docs/adr/0002-database-auth-storage.md`.
- **Expected result:** Authenticated staff sessions, protected admin routes, safe session handling, and clear unauthenticated behavior.

### 5. Implement server-side RBAC and audit writes

- **Objective:** Enforce OWNER/ADMIN/EDITOR/OPERATOR permissions on the server.
- **Prerequisite:** Step 4.
- **Files:** `prisma/seed-data/access.ts`, `prisma/schema.prisma`, `src/server/`, admin mutation boundaries.
- **Expected result:** Every protected action checks permission server-side and sensitive changes append `AuditLog` records.

### 6. Build the CMS workflow

- **Objective:** Replace the static admin dashboard with operational content management.
- **Prerequisite:** Database reads, auth, RBAC, and audit logging.
- **Files:** `src/app/(admin)/admin/page.tsx`, `src/server/`, relevant Prisma models.
- **Expected result:** Draft/review/published/archived workflows, validated CRUD, role-aware actions, and useful empty/loading/error states.

### 7. Implement persisted complaint and contact workflows

- **Objective:** Make public submissions truthful, private, rate-limited, and staff-processable.
- **Prerequisite:** Database, server validation, auth/RBAC for staff, and approved privacy/storage design.
- **Files:** `src/app/(public)/pengaduan/page.tsx`, `src/components/forms/ContactMessageForm.tsx`, complaint models, `.env.example`.
- **Expected result:** Secure token generation/hash lookup, persistence, status history, staff processing, real success/error handling, and no public exposure of private data.

### 8. Implement storage and attachment controls

- **Objective:** Support public document/media files and private complaint attachments.
- **Prerequisite:** Supabase Storage configuration, server authorization, and upload validation design.
- **Files:** `docs/adr/0002-database-auth-storage.md`, `prisma/schema.prisma`, `next.config.mjs`, new server storage boundaries.
- **Expected result:** Validated uploads, public/private bucket separation, signed private access, and tests for unauthorized reads.

### 9. Complete missing routes and read features

- **Objective:** Align filesystem routes, registry, and target public information architecture.
- **Prerequisite:** Database-backed reads.
- **Files:** `src/lib/site.ts`, `src/app/(public)/padukuhan/`, `src/app/(public)/layanan/[slug]/`, news/documents pages.
- **Expected result:** Missing pages exist, `/berita/[slug]` is represented consistently, and search/pagination/download behavior reflects actual data.

### 10. Add operational QA and deployment configuration

- **Objective:** Establish release confidence for public and administrative workflows.
- **Prerequisite:** All production workflows above.
- **Files:** `tests/`, Playwright test locations, CI/deployment configuration, `next.config.mjs`.
- **Expected result:** Browser coverage for critical flows, security/accessibility checks, Linux CI, database readiness checks, deployment process, and documented rollback/operations.

## 24. Troubleshooting

### Prisma reports missing environment variables

Prisma reads `.env`, while Next.js reads `.env.local`. Use the project scripts such as `npm run db:validate` so `scripts/with-env.mjs` loads `.env.local` first. Confirm that both `DATABASE_URL` and `DIRECT_URL` exist in the local environment without committing them.

### Prisma commands fail before connecting

Check the Node version. `scripts/with-env.mjs` calls `process.loadEnvFile`, which requires Node `20.12+`, while `package.json` declares a lower engine floor of `20.9.0`. Upgrade Node before changing application code.

### Database migration or seed cannot connect

The repository records previous Supabase connectivity failures. Check network access, project status, pooled versus direct connection strings, and whether the migration has already been applied. Do not mark the database as complete based only on the migration file existing.

### Build succeeds but pages are not database-backed

This is expected in the current foundation. The build uses `src/data/fixtures.ts`; it does not prove Prisma connectivity or query consumption. Check imports in the page files before claiming the data migration is complete.

### `/admin` is accessible without login

This is a known incomplete feature, not a local routing error. No middleware or Supabase Auth guard currently exists. Do not add real operational data to the dashboard until the route is protected server-side.

### A public form appears to submit

The complaint form and contact form currently provide UI-only behavior. Inspect the handlers before relying on any submission; there is no persistence or official notification flow.

## 25. Handoff Checklist

### Environment

- [ ] Repository URL and branch confirmed with maintainer
- [ ] Node version is compatible with both `package.json` and `scripts/with-env.mjs`
- [ ] Dependencies installed
- [ ] Environment configured without committing secrets
- [ ] Development server works

### Understanding

- [ ] Current fixture-based data flow understood
- [ ] Prepared Prisma/query flow understood
- [ ] Public and admin route groups understood
- [ ] Route registry mismatch understood
- [ ] Database entities and migration status understood
- [ ] Auth/RBAC absence and target design understood

### Verification

- [ ] `npm run lint` passes
- [ ] `npm run typecheck` passes
- [ ] `npm run test` passes
- [ ] `npm run build` passes
- [ ] Database migration status verified against a real environment
- [ ] No credentials or secrets are present in the diff

### Continuation

- [ ] Existing foundation is preserved
- [ ] Incomplete features and simulated flows are understood
- [ ] `/admin` remains unprotected only until auth work is completed, with no real sensitive data added
- [ ] First implementation task is database connectivity and migration verification
- [ ] Next dependency-aware milestone is documented for the team

## 26. Audit Notes

This handoff was generated from the current source tree, Prisma schema/migration/seed files, tests, package/configuration files, and existing project documentation. The audited commands passed on 6 September 2026: lint, typecheck, 179 Vitest tests, and production build. The build emitted the Prisma configuration deprecation warning noted above.

The only intended change from this audit is this documentation file. No application logic, UI, Prisma schema, migration, package configuration, environment file, authentication, or authorization implementation was changed.
