# CLAUDE.md

# KALURAHAN MARGOMULYO — CLAUDE CODE OPERATING RULES

## 1. PROJECT

This repository contains the production digital platform for:

**KALURAHAN MARGOMULYO**
Kapanewon Seyegan, Kabupaten Sleman, D.I. Yogyakarta.

This is a **government/public-service platform**.

It is NOT:

* a portfolio
* a startup landing page
* a generic SaaS dashboard
* an AI-generated demo

The system consists of:

* Public Website
* Public Services
* Transparency Portal
* Complaint / Aspiration System
* Admin Dashboard / CMS
* Authentication
* RBAC
* Audit Logs
* Database
* Secure Backend/API

---

## 2. REQUIRED READING

Before making architectural or implementation decisions, read:

1. `MASTER_PROMPT.md`
2. `FULL_BUILD.md`
3. `PROJECT_CONTEXT.md` if present
4. Relevant files in `.claude/`
5. Existing source code and configuration

Do not repeatedly reread entire documents when only a specific section is relevant.

`FULL_BUILD.md` is the primary implementation specification.

---

## 3. SOURCE OF TRUTH

The provided:

`Data Konsep Web Desa Margomulyo.pdf`

is the source of truth for Margomulyo-specific information.

Never invent:

* government officials
* statistics
* budgets
* services
* documents
* development projects
* contacts
* addresses
* village facts
* public claims

If information is missing:

`TODO: VERIFY WITH KALURAHAN`

Do not silently substitute fictional demo data.

---

## 4. OPERATING PRINCIPLE

Before coding:

1. Inspect repository.
2. Inspect existing architecture.
3. Inspect package/dependency configuration.
4. Inspect database/backend structure.
5. Inspect `.claude/` and installed skills.
6. Read relevant documentation.
7. Identify risks and inconsistencies.
8. Make a concise implementation plan.
9. Implement.
10. Validate.

Do not rewrite working infrastructure without a clear reason.

Do not add dependencies unless they provide real value.

Do not overengineer.

---

## 5. ENGINEERING RULES

Prefer:

* simple architecture
* maintainable code
* strong typing
* reusable components
* server-side validation
* server-side authorization
* clear domain boundaries
* relational integrity
* predictable data flow
* minimal client-side JavaScript
* production-safe defaults

Avoid:

* unnecessary abstractions
* premature optimization
* duplicate components
* duplicate business logic
* magic values
* fake APIs
* placeholder implementations presented as finished
* unnecessary libraries

Every implementation should have a clear reason to exist.

---

## 6. UI / UX RULES

The visual direction is:

**Modern Government + Yogyakarta Character + Editorial Information Design**

The interface should feel:

* official
* trustworthy
* calm
* human
* modern
* accessible
* information-focused

Avoid AI-slop patterns:

* excessive gradients
* excessive glassmorphism
* glowing UI
* floating blobs
* giant hero typography
* excessive rounded cards
* unnecessary 3D
* decorative dashboards
* excessive charts
* constant animation
* meaningless micro-interactions

Design for trust and usability, not visual novelty.

---

## 7. RESPONSIVE FIRST

The system must work from:

**320px → 1920px+**

Never assume desktop-only usage.

Check:

* navigation
* tables
* forms
* dialogs
* cards
* filters
* search
* admin dashboard
* document lists
* public service flows

No horizontal overflow unless intentionally required.

---

## 8. ACCESSIBILITY

Target:

**WCAG 2.2 AA**

Use:

* semantic HTML
* keyboard navigation
* visible focus states
* accessible forms
* sufficient contrast
* descriptive labels
* meaningful alt text
* logical headings
* reduced-motion support

Accessibility is part of implementation, not a later polish step.

---

## 9. SECURITY

Treat all external/user input as untrusted.

Protect against:

* SQL injection
* XSS
* CSRF
* IDOR
* broken access control
* privilege escalation
* insecure file uploads
* brute force
* sensitive data exposure

Never expose:

* passwords
* secrets
* private attachments
* internal credentials
* sensitive administrative information

Authorization must be enforced server-side.

---

## 10. ADMIN / RBAC

The Admin Dashboard is mandatory.

Roles:

* OWNER
* ADMIN
* EDITOR
* OPERATOR

Never rely only on frontend role checks.

Important actions must be authorized server-side.

Sensitive actions should produce audit logs.

---

## 11. ANIMATION

Use animation only when it improves:

* navigation
* feedback
* hierarchy
* understanding
* perceived responsiveness

Installed skills include:

* Genjutsu
* GSAP skills
* LottieFiles motion-design skill

Inspect and use them when appropriate.

Do not force animation into every component.

Always respect:

`prefers-reduced-motion`

---

## 12. QUALITY GATE

Before considering work complete, verify:

* typecheck
* lint
* tests where applicable
* production build
* routes
* authentication
* authorization
* responsive behavior
* accessibility
* loading states
* empty states
* error states
* security-sensitive flows

Do not claim something works without validating it.

---

## 13. CHANGE DISCIPLINE

Make the smallest coherent change that solves the problem.

Do not:

* modify unrelated files
* redesign unrelated pages
* introduce unnecessary architecture
* rewrite working components
* remove functionality without reason

When fixing a bug, identify the root cause instead of masking symptoms.

---

## 14. FINAL RULE

Build a real government platform.

Every feature must answer:

**Why does this exist?**

Every UI element must answer:

**Does this help citizens, administrators, or information clarity?**

Every architectural decision must answer:

**Does this improve reliability, maintainability, security, or scalability?**

If not, do not add it.
