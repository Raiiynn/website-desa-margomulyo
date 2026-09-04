# MASTER_PROMPT.md

# KALURAHAN MARGOMULYO — MASTER BUILD PROMPT

## 1. ROLE

Act as a senior:

* Software Architect
* Full-Stack Engineer
* Product Engineer
* UI/UX Engineer
* Security Engineer
* Database Engineer
* QA Engineer

Your responsibility is to build a **production-ready digital government platform** for:

**KALURAHAN MARGOMULYO**
Kapanewon Seyegan, Kabupaten Sleman, D.I. Yogyakarta.

Think like a team building software that will actually be operated by a government organization.

Do not optimize for a visually impressive demo.

Optimize for:

**trust → usability → correctness → security → maintainability → performance.**

---

# 2. PRIMARY DOCUMENTS

Treat these files as the project's operating documentation:

```text
CLAUDE.md
MASTER_PROMPT.md
FULL_BUILD.md
PROJECT_CONTEXT.md
```

Priority:

1. Explicit user requirements
2. Source-of-truth government data
3. `FULL_BUILD.md`
4. `MASTER_PROMPT.md`
5. `PROJECT_CONTEXT.md`
6. Existing repository conventions

Do not contradict higher-priority requirements.

---

# 3. SOURCE DATA

The file:

`Data Konsep Web Desa Margomulyo.pdf`

is the authoritative source for Margomulyo-specific content.

Use it to determine:

* identity
* government information
* services
* transparency information
* budget information
* development projects
* documents
* local potential
* contact information
* village statistics

Never fabricate information.

When data is unavailable:

```text
TODO: VERIFY WITH KALURAHAN
```

Do not turn placeholder data into fake official information.

---

# 4. FIRST PRINCIPLES

This project must be treated as a complete platform.

Do not only build the homepage.

The target system includes:

```text
PUBLIC WEBSITE
      │
      ▼
BACKEND / API
      │
 ┌────┴─────────────┐
 ▼                  ▼
DATABASE        FILE STORAGE
      │
      ▼
ADMIN / CMS
      │
 ├── RBAC
 ├── Workflow
 └── Audit Log
```

The architecture must keep public-facing functionality and administrative functionality clearly separated while sharing the same domain model/backend.

---

# 5. BEFORE IMPLEMENTATION

First inspect the repository.

Determine:

* framework
* language
* package manager
* database
* ORM
* authentication
* API architecture
* file storage
* existing components
* styling system
* testing setup
* deployment configuration
* environment configuration
* existing technical debt
* installed Claude skills/plugins

Also inspect:

```text
.claude/
CLAUDE.md
MASTER_PROMPT.md
FULL_BUILD.md
PROJECT_CONTEXT.md
```

Do not assume the repository is empty.

Do not assume the existing architecture is correct.

Do not destroy working infrastructure without evidence.

---

# 6. ARCHITECTURE

Choose architecture based on actual repository constraints.

Prefer:

* clear domain boundaries
* server-side business logic
* typed contracts
* relational data integrity
* reusable UI components
* predictable state management
* minimal client-side complexity

Avoid unnecessary:

* microservices
* event buses
* abstraction layers
* state-management libraries
* dependencies
* infrastructure complexity

Use the simplest architecture capable of satisfying the requirements.

---

# 7. PUBLIC WEBSITE

The public platform should include:

```text
/
 /profil
 /pemerintahan
 /padukuhan
 /berita
 /agenda
 /layanan
 /layanan/[slug]
 /pengaduan
 /transparansi
 /transparansi/apbkal
 /pembangunan
 /dokumen
 /potensi
 /kontak
```

The homepage should communicate institutional identity and provide direct access to important information.

It should NOT behave like a commercial landing page.

Prioritize:

* services
* important information
* latest news
* agenda
* transparency
* development information
* local potential
* contact information

---

# 8. PUBLIC SERVICE PLATFORM

Services must be searchable.

Categories include:

* Kependudukan
* Surat Keterangan
* Layanan Mandiri
* Aspirasi & Lapor

Service details may include:

* description
* requirements
* procedure
* duration
* cost
* service method
* required documents
* contact
* status

All content must be source-backed.

The interface should minimize citizen effort.

---

# 9. NEWS / INFORMATION

News supports:

* listing
* detail
* category
* search
* pagination
* related content

Workflow:

```text
DRAFT
  ↓
REVIEW
  ↓
PUBLISHED
  ↓
ARCHIVED
```

Publishing must be permission-controlled.

---

# 10. TRANSPARENCY

Transparency is a core feature.

Support:

* APBKal
* budget information
* realization
* development progress
* public documents

Known APBKal 2026 source data:

```text
Revenue:
Rp 3.842.150.000

Expenditure:
Rp 3.910.850.000
```

Do not fabricate additional financial values.

Charts should only exist when they improve comprehension.

Avoid decorative financial dashboards.

---

# 11. DEVELOPMENT TRANSPARENCY

Development projects should support:

* project name
* location
* budget
* status
* physical progress
* financial progress
* timeline
* updates
* supporting documents

Public information must remain source-backed.

---

# 12. DOCUMENT REPOSITORY

Documents should be searchable.

Examples include:

* APBKal 2026
* RKPKal 2026
* RPJMKal 2021–2027
* LPPKal 2025
* Perkal Kebudayaan DIY
* LAKIP 2025

Metadata:

* title
* category
* year
* description
* file type
* file size
* publication date
* download

Secure file handling is mandatory.

---

# 13. COMPLAINT / ASPIRATION SYSTEM

Public workflow:

```text
SUBMIT
  ↓
RECEIVED
  ↓
REVIEWED
  ↓
PROCESSING
  ↓
RESOLVED
  ↓
CLOSED
```

Support:

* complaint submission
* aspiration submission
* status tracking
* attachments where appropriate
* internal handling
* status history

Private submissions must never accidentally become public.

---

# 14. ADMIN DASHBOARD

The admin dashboard is mandatory.

It is the operational back-office of the government platform.

Modules:

```text
Dashboard
Content
 ├── Berita
 ├── Agenda
 ├── Pages
 └── Media

Public Services
 ├── Services
 ├── Complaints
 └── Aspirations

Government
 ├── Structure
 ├── Officials
 └── Padukuhan

Transparency
 ├── APBKal
 ├── Development
 └── Documents

Local Potential

Users
Roles
Permissions

Audit Logs

Settings
```

The dashboard should prioritize operational tasks.

Do not create meaningless SaaS-style metrics just to fill the screen.

---

# 15. RBAC

Roles:

```text
OWNER
ADMIN
EDITOR
OPERATOR
```

Hierarchy and permissions must be enforced server-side.

Example permissions:

```text
news.create
news.update
news.publish
news.delete

services.manage

complaints.view
complaints.update

documents.manage

transparency.manage

users.manage

audit_logs.view
```

OWNER has the highest administrative authority.

Only authorized roles may perform sensitive actions.

---

# 16. AUTHENTICATION

Implement secure authentication.

Requirements may include:

* password hashing
* secure sessions
* protected admin routes
* server-side authorization
* secure cookies
* login rate limiting
* logout
* password recovery when required

Never store plaintext passwords.

Never expose secrets to the client.

---

# 17. AUDIT LOGGING

Important administrative operations must be auditable.

Record:

```text
user
action
resource
resource_id
timestamp
metadata
```

Important events include:

* publishing content
* transparency changes
* complaint status changes
* role changes
* user changes
* sensitive settings changes

Audit logs themselves must be protected.

---

# 18. DATABASE

Core domain entities:

```text
User
Role
Permission
AuditLog

News
NewsCategory
Agenda
Page
Media

Service
ServiceCategory

Complaint
ComplaintAttachment
ComplaintStatusHistory

Budget
BudgetCategory

DevelopmentProject
DevelopmentProjectUpdate

Document

Padukuhan
GovernmentOfficial

LocalPotential
LocalPotentialCategory

SiteSetting
```

Use:

* foreign keys
* indexes
* constraints
* validation
* transactions where required

Avoid denormalized data unless there is a clear reason.

---

# 19. SECURITY

Assume every external input is malicious.

Protect against:

* SQL injection
* XSS
* CSRF
* IDOR
* privilege escalation
* broken access control
* brute force
* insecure uploads
* sensitive data leakage

Validate on the server.

Do not trust:

* frontend permissions
* hidden form fields
* client-side role values
* uploaded file extensions
* user-provided MIME types

---

# 20. FILE STORAGE

Uploads may include:

* public documents
* news media
* development documents
* complaint attachments

Validate:

* file type
* extension
* MIME
* file size
* filename

Private attachments must remain private.

Never expose sensitive storage paths unnecessarily.

---

# 21. DESIGN SYSTEM

Create a consistent system for:

* typography
* colors
* spacing
* radius
* shadows
* buttons
* inputs
* forms
* tables
* badges
* navigation
* modals
* drawers
* alerts
* loading
* empty states
* error states

Prefer reusable components.

Do not create slightly different versions of the same component for every page.

---

# 22. VISUAL DIRECTION

Use:

**Modern Government + Yogyakarta Character + Editorial Information Design**

The site should feel:

* credible
* institutional
* warm
* calm
* modern
* readable
* human

Avoid:

```text
excessive gradients
glassmorphism everywhere
glowing effects
giant typography
floating blobs
random 3D
generic SaaS cards
dashboard clutter
fake statistics
excessive animation
```

The design should look intentionally designed, not generated from a generic AI template.

---

# 23. ANIMATION / MOTION

Installed skills:

* Genjutsu
* GSAP skills
* LottieFiles motion-design skill

Inspect their documentation before using them.

Use animation only when it improves UX.

Good:

* subtle page transitions
* meaningful reveals
* interaction feedback
* timeline visualization
* progressive disclosure

Bad:

* infinite floating objects
* animated backgrounds
* constant parallax
* bouncing elements
* decorative motion everywhere

Respect:

`prefers-reduced-motion`

---

# 24. RESPONSIVE

Support:

```text
320px
375px
390px
414px
768px
1024px
1280px
1440px
1920px+
```

Mobile must be a first-class experience.

Check:

* navigation
* tables
* filters
* forms
* search
* cards
* modals
* document downloads
* complaint forms
* admin operations

Do not simply shrink desktop layouts.

---

# 25. ACCESSIBILITY

Target:

**WCAG 2.2 AA**

Implement:

* semantic HTML
* keyboard navigation
* focus states
* accessible labels
* correct heading hierarchy
* sufficient contrast
* alt text
* accessible errors
* accessible dialogs
* reduced motion

---

# 26. PERFORMANCE

Prioritize:

* SSR where appropriate
* optimized images
* lazy loading
* code splitting
* caching
* minimal client JavaScript
* optimized fonts
* minimal dependencies

Target strong Core Web Vitals.

Do not sacrifice performance for decorative UI.

---

# 27. SEO

Implement where relevant:

* metadata
* semantic URLs
* canonical URLs
* Open Graph
* sitemap
* robots.txt
* structured data
* semantic headings

Public government information should be easy to discover through search engines.

---

# 28. UI STATES

Every important page/action must handle:

```text
loading
success
empty
error
```

Messages should be understandable Indonesian.

Never expose:

* stack traces
* database errors
* internal paths
* secrets
* technical debugging information

---

# 29. TESTING

Validate critical public flows:

```text
navigation
search
service details
document access
complaint submission
```

Validate critical admin flows:

```text
login
authorization
content creation
content publishing
complaint processing
document management
user management
audit logs
```

Run:

```text
lint
typecheck
unit tests where applicable
integration tests where applicable
E2E tests for critical flows
production build
```

---

# 30. IMPLEMENTATION STRATEGY

Implement in this order unless repository constraints require another sequence:

```text
1. Repository Audit
2. Architecture
3. Database + Backend
4. Authentication + RBAC
5. Design System
6. Public Website
7. Public Services
8. Transparency + Documents
9. Complaint / Aspiration
10. Admin Dashboard
11. CMS + Workflow
12. Audit Logs
13. Responsive + Accessibility
14. SEO + Performance
15. Testing + QA
16. AI-Slop Audit
```

Keep the system buildable after every meaningful phase.

---

# 31. DECISION MAKING

When multiple solutions are possible, choose the one that is:

1. simpler
2. safer
3. easier to maintain
4. easier to test
5. more accessible
6. more performant
7. less dependent on unnecessary packages

Do not choose technology because it is trendy.

Do not add complexity just because the project is large.

---

# 32. AI-SLOP AUDIT

Before final completion, inspect the entire UI.

Ask:

* Does this look like a generic AI website?
* Are there too many cards?
* Are there unnecessary gradients?
* Are there fake metrics?
* Are animations meaningful?
* Are components duplicated?
* Is typography intentional?
* Is whitespace purposeful?
* Does the interface feel governmental and trustworthy?
* Is the mobile experience genuinely usable?

Remove anything that exists purely for decoration without improving the experience.

---

# 33. DEFINITION OF DONE

The platform is complete only when:

* public website works
* services work
* transparency works
* documents work
* complaint/aspiration flow works
* admin dashboard works
* authentication works
* RBAC works
* CMS workflow works
* audit logs work
* database is sound
* uploads are secure
* responsive layouts work
* accessibility requirements are addressed
* SEO fundamentals exist
* performance is acceptable
* critical tests pass
* production build succeeds
* no important routes are broken
* no fabricated government facts are presented
* UI does not exhibit obvious AI-slop patterns

---

# 34. EXECUTION RULE

Do not stop after creating a plan.

Do not only build the homepage.

Do not create mock functionality and present it as complete.

Do not invent missing government data.

Do not overengineer.

Do not add unnecessary dependencies.

Do not sacrifice security for convenience.

Do not sacrifice accessibility for aesthetics.

Do not sacrifice performance for animation.

Build the complete system described by `FULL_BUILD.md`.

When uncertain:

**inspect → reason → implement → validate.**
