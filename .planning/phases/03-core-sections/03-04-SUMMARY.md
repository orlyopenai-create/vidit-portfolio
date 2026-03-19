---
phase: 03-core-sections
plan: "04"
subsystem: sections
tags: [beyond-work, footer, page-wiring, framer-motion, server-component]
dependency_graph:
  requires: [03-01, 03-02, 03-03]
  provides: [BeyondWorkSection, FooterSection, full-page-scroll]
  affects: [app/page.tsx]
tech_stack:
  added: []
  patterns: [server-client-split, whileInView-stagger, mailto-link, bg-surface-footer]
key_files:
  created:
    - components/beyondwork/BeyondWorkAnimations.tsx
    - components/sections/BeyondWorkSection.tsx
    - components/sections/FooterSection.tsx
  modified:
    - app/page.tsx
decisions:
  - BeyondWorkSection keeps copy inline (not in lib/data) — section is atomic and single-use, no data-file overhead needed
  - FooterSection has no animations — server component only, no use client needed
  - Interests use middot separator (·) as inline text, not a list element
  - Footer uses bg-surface (#EDE4D8) for visual differentiation — not a dark background per original PRD
metrics:
  duration: 8
  completed_date: "2026-03-20"
  tasks_completed: 2
  files_created: 4
---

# Phase 3 Plan 04: Beyond Work + Footer + Full Page Wiring Summary

**One-liner:** BeyondWork section (Story of My Life + middot interests) and Footer (mailto + LinkedIn new tab) built as server components; all 8 sections wired into page.tsx in scroll order, build passing.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Build Beyond Work and Footer sections | 1a3ac80 | components/beyondwork/BeyondWorkAnimations.tsx, components/sections/BeyondWorkSection.tsx, components/sections/FooterSection.tsx |
| 2 | Wire all 8 sections into page.tsx in scroll order | d3b58a9 | app/page.tsx |

## What Was Built

### Task 1: BeyondWork and Footer Sections

**BeyondWorkAnimations** (`components/beyondwork/BeyondWorkAnimations.tsx`) — `'use client'` animation wrapper:
- Two sub-sections in `grid grid-cols-1 md:grid-cols-2 gap-12` — side-by-side on desktop, stacked mobile
- Section heading fades in with `whileInView` + `viewport={{ once: true }}`
- Story of My Life and Interests each stagger in with delay 0.1 and 0.15 respectively
- Uses `m.div` (not `motion.div`) per LazyMotion constraint

**BeyondWorkSection** (`components/sections/BeyondWorkSection.tsx`) — server component:
- Story of My Life paragraph: 5 editions, 32 speakers, 500+ attendees, ~600K YouTube views
- Interests as inline string with middot separators (not bullets): `Badminton · Vipassana Meditation · Formula 1 · Bachata · Techno & House Music · Travel (30+ countries) · Board Games`
- No `'use client'` — passes string props to BeyondWorkAnimations

**FooterSection** (`components/sections/FooterSection.tsx`) — server component:
- `bg-surface` (`#EDE4D8`) background for visual differentiation from main content
- Email as `<a href="mailto:dugarvidit@gmail.com">` — no contact form
- LinkedIn as `target="_blank" rel="noopener noreferrer"` — opens in new tab
- Closing line: "Open to conversations about early-stage consumer investing in India."
- Copyright: "© 2026 Vidit Dugar"
- No `'use client'` — static server component

### Task 2: Full Page Wiring

`app/page.tsx` updated to import and render all 8 sections in scroll order:
1. HeroSection
2. AboutSection
3. PhilosophySection
4. FundSection
5. KilrrSection
6. TimelineSection
7. BeyondWorkSection
8. FooterSection

File is 20 lines — clean imports, clean render, no logic, no state, no `'use client'`.

## Deviations from Plan

None — plan executed exactly as written.

## Verification

- `npx tsc --noEmit` — passed with zero errors after Task 1
- `npm run build` — passed with exit code 0 after Task 2; static page generated at `/`

## Self-Check: PASSED

- FOUND: components/beyondwork/BeyondWorkAnimations.tsx
- FOUND: components/sections/BeyondWorkSection.tsx
- FOUND: components/sections/FooterSection.tsx
- FOUND: app/page.tsx
- FOUND: commit 1a3ac80 (Task 1)
- FOUND: commit d3b58a9 (Task 2)
