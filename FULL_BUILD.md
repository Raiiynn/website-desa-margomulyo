KALURAHAN MARGOMULYO — FULL BUILD SPECIFICATION
1. OBJECTIVE

Build a production-ready digital platform for:

KALURAHAN MARGOMULYO
Kapanewon Seyegan, Kabupaten Sleman, D.I. Yogyakarta.

This is a government/public-service platform, not a landing page or portfolio.

The system consists of:

Public Website
Public Services
Transparency Portal
Complaint / Aspiration System
Admin Dashboard / CMS
Authentication & RBAC
Audit Log
Database
Secure Backend/API

Use the provided:

Data Konsep Web Desa Margomulyo.pdf

as the source of truth for Margomulyo-specific content.

Never invent government facts, names, budgets, statistics, contacts, services, documents, or project information.

2. BUILD PRINCIPLE

Build from first principles.

Before coding:

Audit the repository.
Inspect the current stack.
Inspect existing dependencies.
Inspect .claude and installed skills.
Read project documentation.
Inspect the provided Margomulyo source.
Determine the existing architecture.
Create a concise implementation plan.
Then implement.

Do not rewrite working infrastructure without a reason.

Do not introduce unnecessary dependencies.

Do not over-engineer.

3. DESIGN DIRECTION

Visual direction:

Modern Government + Yogyakarta Character + Editorial Information Design

The interface must feel:

official
trustworthy
modern
calm
human
accessible
information-focused
NO AI SLOP

Avoid:

excessive gradients
glassmorphism everywhere
glowing effects
giant hero typography
floating blobs
excessive rounded cards
random 3D decorations
generic SaaS dashboard aesthetics
fake statistics
unnecessary charts
excessive animation
decorative UI without purpose

Do not optimize for "wow".

Optimize for trust, clarity and usability.

4. PUBLIC WEBSITE

Implement these primary areas:

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
Homepage

Prioritize:

institutional identity
important public services
latest news
agenda
transparency
local potential
contact information

Do not create a marketing-style hero.

5. PUBLIC SERVICES

Implement a searchable service directory.

Categories:

Kependudukan
Surat Keterangan
Layanan Mandiri
Aspirasi & Lapor

Service detail should support:

description
requirements
procedure
duration
cost
method
required documents
contact
status

Use only source-backed information.

6. NEWS & INFORMATION

Implement:

article listing
article detail
categories
search
pagination
related content

Content states:

DRAFT
REVIEW
PUBLISHED
ARCHIVED
7. TRANSPARENCY

Implement:

APBKal
budget information
realization
development projects
public documents

Known source data must remain accurate.

Example:

APBKal 2026

Revenue:
Rp 3.842.150.000

Expenditure:
Rp 3.910.850.000

Do not fabricate additional financial data.

Charts are allowed only when they improve understanding.

8. DEVELOPMENT PROJECTS

Support:

project name
location
budget
status
physical progress
financial progress
timeline
documentation

Use source-backed project information only.

9. PUBLIC DOCUMENTS

Implement searchable document repository.

Source-backed examples include:

APBKal 2026
RKPKal 2026
RPJMKal 2021–2027
LPPKal 2025
Perkal Kebudayaan DIY
LAKIP 2025

Document metadata:

title
category
year
description
file type
size
publication date
download
10. COMPLAINT / ASPIRATION

Implement public submission and tracking.

Flow:

Submit
 ↓
Received
 ↓
Reviewed
 ↓
Processing
 ↓
Resolved
 ↓
Closed

Support attachments where appropriate.

Protect private submissions.

Do not expose complaint data publicly.

11. ADMIN DASHBOARD

Admin Dashboard is mandatory.

It is the CMS/back-office for the public website.

Primary modules:

Dashboard

Content
- Berita
- Agenda
- Pages
- Media

Public Services
- Services
- Complaints
- Aspirations

Government
- Structure
- Officials
- Padukuhan

Transparency
- APBKal
- Development
- Documents

Local Potential

Users
Roles
Permissions

Audit Logs

Settings

Dashboard should focus on operational work rather than vanity metrics.

Show useful information such as:

pending review
pending complaints
recent activity
drafts
recently updated content
12. RBAC

Implement server-side Role-Based Access Control.

Minimum roles:

OWNER
ADMIN
EDITOR
OPERATOR

Use granular permissions where useful.

Examples:

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

Never rely only on frontend permission checks.

13. AUTHENTICATION

Implement secure authentication.

Requirements:

password hashing
secure sessions
protected admin routes
server-side authorization
login rate limiting
secure cookies
logout
password recovery if required

Never store plaintext passwords.

Never hardcode secrets.

14. AUDIT LOG

Record important administrative actions.

Minimum:

user
action
resource
resource_id
timestamp
metadata

Track events such as:

publishing content
changing transparency data
changing complaint status
user/role changes
important settings changes
15. DATABASE

Create a clean relational data model.

Core entities should cover:

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

Adapt the model to the actual stack.

Avoid unnecessary complexity.

Use:

foreign keys
indexes
constraints
validation
transactions where required
16. SECURITY

Treat the platform as a real public-sector application.

Protect against:

SQL injection
XSS
CSRF
IDOR
broken access control
privilege escalation
insecure file uploads
brute-force authentication
sensitive data exposure

Validate input server-side.

Do not trust client authorization.

17. FILES & STORAGE

Support secure uploads for:

documents
news images
project images
complaint attachments

Validate:

file type
extension
size
filename

Private files must not accidentally become public.

18. RESPONSIVE DESIGN

The entire platform must work from:

320px → 1920px+

Prioritize mobile usability.

No:

horizontal overflow
broken tables
unreadable forms
desktop-only navigation
tiny touch targets

Admin dashboard must also remain usable on mobile, although desktop is the primary admin workspace.

19. ACCESSIBILITY

Target:

WCAG 2.2 AA

Use:

semantic HTML
keyboard navigation
visible focus
accessible forms
sufficient contrast
alt text
logical headings
reduced-motion support
20. DESIGN SYSTEM

Create a consistent reusable design system.

Define:

typography
colors
spacing
radius
shadows
buttons
forms
cards
tables
badges
navigation
modal
drawer
alerts
loading
empty states
error states

Do not duplicate components unnecessarily.

21. ANIMATION

Animation must be restrained.

Use GSAP / installed motion skills only when they materially improve UX.

Good:

page transitions
subtle reveal
meaningful interaction
timeline visualization

Bad:

constant floating
excessive parallax
animated backgrounds
bouncing everything
decorative motion

Respect prefers-reduced-motion.

Use Lottie only where it adds meaningful feedback.

22. INSTALLED SKILLS

Inspect and use installed skills when appropriate, especially:

Genjutsu
GSAP skills
LottieFiles motion-design skill

Do not force a skill into the project.

Use the simplest implementation that achieves the desired result.

23. PERFORMANCE

Prioritize:

server rendering where appropriate
optimized images
lazy loading
code splitting
caching
minimal client-side JavaScript
optimized fonts
minimal dependencies

Target strong Core Web Vitals.

24. SEO

Public pages must include:

metadata
semantic URLs
canonical URLs
Open Graph
sitemap
robots.txt
structured data where appropriate
semantic headings
25. ERROR / LOADING / EMPTY STATES

Every important page and action must handle:

loading
empty
error
success

Use clear Indonesian language.

Never expose technical stack traces to users.

26. TESTING

Before completion run appropriate:

lint
typecheck
unit tests
integration tests
E2E tests for critical flows
production build

Critical flows:

Public
navigation
search
service detail
document access
complaint submission
Admin
login
authorization
content creation
publishing
complaint processing
user management
audit log
27. SOURCE DATA RULE

Use the Margomulyo PDF as the source of truth.

If information exists:

Use it accurately.

If information is missing:

Do not invent it.

Use:

TODO: VERIFY WITH KALURAHAN

when appropriate.

Development/demo seed data must never be presented as real government information.

28. IMPLEMENTATION ORDER

Execute in this order:

1. Repository Audit

2. Architecture

3. Database + Backend Infrastructure

4. Authentication + RBAC

5. Design System

6. Public Website

7. Public Services

8. Transparency + Documents

9. Complaint System

10. Admin Dashboard

11. CMS + Workflow

12. Audit Logs

13. Responsive + Accessibility

14. SEO + Performance

15. Testing + QA

16. Final AI-Slop Audit

Keep the project buildable after every major phase.

29. DEFINITION OF DONE

The project is complete only when:

Public website works
Admin dashboard works
Authentication works
RBAC works server-side
CMS works
Public services work
Complaints work
Transparency works
Documents work
Audit logs work
Database is structured
File uploads are secured
Mobile layout works
Accessibility is addressed
SEO is implemented
Production build passes
Critical tests pass
No obvious broken routes
No fabricated government information
No obvious AI-slop UI
30. FINAL EXECUTION RULE

Do not build only the homepage.

Build the complete platform.

Do not over-engineer.

Do not fabricate data.

Do not add unnecessary dependencies.

Do not create decorative UI without purpose.

Do not sacrifice usability for visual effects.

Do not sacrifice security for convenience.

Do not sacrifice performance for animation.

Use Claude Opus reasoning where it provides value, but keep implementation simple.

The final product should feel like:

A real digital platform operated by Kalurahan Margomulyo.

Not:

An AI-generated website demo.