# ADR-0002 — Database, authentication and file storage

- **Status:** Accepted
- **Date:** 2026-09-04
- **Phase:** 0

## Context

The platform needs a relational database, administrative authentication, and file
storage for two materially different classes of file:

- **Public:** official documents (APBKal, RKPKal, RPJMKal, LPPKal, Perkal,
  LAKIP), news images, project photography.
- **Private:** complaint and aspiration attachments, which
  `FULL_BUILD §10` and `§17` require never become public.

`FULL_BUILD §12` requires server-enforced RBAC across four roles (OWNER, ADMIN,
EDITOR, OPERATOR) with granular permissions, and `§16` requires protection
against IDOR and broken access control.

## Decision

**Supabase provides Postgres, Auth and Storage.**

### Database

Supabase Postgres. Prisma owns the schema, migrations and typed queries. App
queries use the pooled connection; migrations use the direct connection.

SQLite for development was rejected: dev/prod divergence in migrations,
constraints and concurrency is a known failure mode, and it is the same issue the
adjacent Areus project resolved by dropping SQLite.

### Authentication

Supabase Auth handles **identity only** — login, session, password reset — and
only for administrative users. Citizens never receive accounts: complaint
tracking is by unguessable token, so the public site has no login surface at all.
This keeps the citizen-facing attack surface minimal and removes any need to
write custom password hashing or session handling.

### Authorization

**Authorization lives in application code, not in Row Level Security.**

Roles and permissions are modelled in our own `Role`, `Permission` and
`RolePermission` tables. Every server action and route handler that mutates or
exposes protected data calls a single `can(user, permission)` check.

RLS is enabled on every table as **defense-in-depth**, denying by default so that
a leaked anon key cannot read data directly. It is not the primary control.

This split is deliberate. `FULL_BUILD §12` requires authorization to be
server-enforced, and Phase 13 requires it to be tested. Policy-only authorization
scattered across SQL is hard to review as a whole, hard to unit-test, and hard to
reason about when a permission changes. One reviewable module, plus a database
backstop, satisfies both the requirement and the audit.

### Storage

Two buckets:

| Bucket | Access | Contents |
|---|---|---|
| `public` | Public read | Official documents, news images, project photos |
| `private` | No public read | Complaint and aspiration attachments |

Private files are never linked directly. A request goes through an authenticated
route handler that verifies the caller holds `complaints.view` (or owns the
tracking token), then issues a short-lived signed URL. The service-role key is
server-only and never reaches the client.

Uploads are validated server-side for extension, MIME, magic bytes and size, and
filenames are normalised — user-supplied extensions and MIME types are not
trusted (`FULL_BUILD §16`).

## Consequences

**Risks introduced, both of which get explicit Phase 13 tests:**

1. A leaked `SUPABASE_SERVICE_ROLE_KEY` bypasses every check. It is server-only,
   never in `NEXT_PUBLIC_*`, and never logged.
2. A misconfigured bucket turns private complaint attachments public. A test
   asserts the private bucket rejects unauthenticated reads.

**Other consequences:**

- A vendor dependency. Prisma owning the schema keeps migration away from
  Supabase feasible: the database is standard Postgres, and Auth and Storage are
  the coupled surfaces.
- Credentials are required before Phase 2 begins. Phases 0 and 1 do not need
  them.
- Two connection strings must be configured correctly, or migrations will fail
  against the pooler.
