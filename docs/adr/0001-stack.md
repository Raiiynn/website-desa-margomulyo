# ADR-0001 — Application stack

- **Status:** Accepted
- **Date:** 2026-09-04
- **Phase:** 0

## Context

The repository was empty at audit: no framework, no dependencies, no git history.
Every architectural decision was open, and nothing existed that could be
destroyed by choosing wrongly.

Requirements that constrain the choice:

- Server-rendered public pages with strong SEO and Core Web Vitals
  (`MASTER_PROMPT §26–27`).
- Minimal client-side JavaScript (`CLAUDE.md §5`).
- Server-side validation and authorization, never client-trusted
  (`FULL_BUILD §12, §16`).
- Strong typing and clear domain boundaries (`CLAUDE.md §5`).
- Minimal dependencies; no library without a clear reason (`CLAUDE.md §5`).

Available toolchain: Node 22.9.0, npm 10.0.0, PHP 8.2.12, Python 3.12.5,
Docker 27.3.1. No pnpm, bun, or local Postgres client.

## Decision

**Next.js 15 (App Router) · TypeScript strict · Tailwind CSS · Prisma · Zod ·
Vitest + Playwright.**

Data, identity and file storage are provided by Supabase — see ADR-0002.

Rationale:

- The App Router's server components default to zero client JS, which satisfies
  the minimal-client-JS and SEO requirements without extra effort.
- Server actions and route handlers give one obvious place to enforce validation
  and authorization on the server.
- Prisma provides typed queries, migrations, foreign keys, indexes and
  constraints — the relational integrity `FULL_BUILD §15` requires.
- Zod validates untrusted input at the server boundary and shares types with
  TypeScript.
- The user's adjacent project (`D:\Project\Areus`) uses this exact stack, so
  conventions, tooling and quality gates carry over with no ramp-up.

### Rejected alternatives

**Laravel 11 + Blade + MySQL.** PHP 8.2 is installed and Laravel ships auth,
RBAC, validation, CSRF and storage out of the box, which would mean less custom
security code. Rejected because it diverges from the user's established
conventions and from the installed React/GSAP skills, and because the team
context here is a single maintainer already fluent in the Next.js stack.

**Next.js with a self-managed database and filesystem storage.** Fewer vendor
dependencies and fully offline-capable. Rejected in favour of Supabase — see
ADR-0002.

## Consequences

- Authorization logic is ours to write and ours to test. This is deliberate; see
  ADR-0002 for why authorization does not live in database policies.
- The build requires `prisma generate` before `next build`.
- Development is on Windows while deployment will target Linux. CI must run on
  Linux to catch path-case divergence.
- One quality gate for every phase:
  `npm run lint && npm run typecheck && npm run test && npm run build`.
