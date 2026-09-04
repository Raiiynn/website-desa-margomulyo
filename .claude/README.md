# .claude/

`CLAUDE.md §2` and `MASTER_PROMPT.md §5` instruct that this directory be
inspected before architectural or implementation decisions. It did not exist at
the Phase 0 audit; this file makes that documented path real.

## Read order

1. `CLAUDE.md` — operating rules
2. `MASTER_PROMPT.md` — build prompt and priority order
3. `FULL_BUILD.md` — the primary implementation specification
4. `PROJECT_CONTEXT.md` — project identity
5. `docs/SOURCE_DATA.md` — **the content publication gate**
6. `docs/DESIGN_REFERENCE.md` — the visual and IA mandate
7. `docs/adr/` — architectural decisions

## Two rules that override convenience

**Content.** No Margomulyo fact reaches the public site, seed data or CMS
defaults unless it appears in `docs/SOURCE_DATA.md §3`. Section 4 lists values
the source contradicts itself on; section 5 lists what is missing. Both are
withheld, not guessed. Inventing a plausible figure is the single worst failure
available on this project.

**Design.** `Data Konsep Web Desa Margomulyo.pdf` is the primary visual and
information-architecture reference, not only a content source. The mandate is
*Reference → Refined Production Interface*, not *Reference → Generic AI
Redesign*. Every public screen must trace to a pattern in
`docs/DESIGN_REFERENCE.md §3` or be justified there as a documented refinement.

## Skills

Installed skills live outside this directory:

- `.agents/skills/` — 13 vendored design/output skills (`skills-lock.json`)
- `~/.claude/skills/` — GSAP skills, LottieFiles `motion-design`
- `~/.claude/plugins/` — `genjutsu`

`docs/DESIGN_REFERENCE.md §8` records which of these must **not** drive the
design: `industrial-brutalist-ui`, `brandkit` and `gpt-taste` push aesthetics
that conflict with the mandated direction.

## Source material

The 181 MB concept PDF is archived in `docs/source/` and gitignored. Its SHA-256
and extracted text are committed. Regenerate page renders with:

```
python scripts/render-source.py
```

A checksum mismatch means the source changed and `docs/SOURCE_DATA.md` must be
re-verified before any content ships.
