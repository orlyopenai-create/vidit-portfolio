---
phase: 03-core-sections
plan: "03"
subsystem: ui-sections
tags: [kilrr, timeline, framer-motion, server-component, content]
dependency_graph:
  requires: [lib/data/timeline.ts, lib/types.ts, components/kilrr/KilrrAnimations.tsx]
  provides: [KilrrSection, TimelineSection, TimelineAnimations, KilrrAnimations]
  affects: [app/page.tsx]
tech_stack:
  added: []
  patterns: [server-client-split, whileInView-stagger, two-column-responsive-grid]
key_files:
  created:
    - components/kilrr/KilrrAnimations.tsx
    - components/sections/KilrrSection.tsx
    - components/timeline/TimelineAnimations.tsx
    - components/sections/TimelineSection.tsx
  modified:
    - lib/data/timeline.ts
decisions:
  - "Timeline descriptions use whitespace-pre-line to preserve \\n\\n paragraph breaks in BSC and Nomura London entries without extra JSX markup"
  - "KilrrSection keeps copy inline (not in lib/data) per plan spec — paragraphs array directly in the server component"
  - "All investment copy uses we/us/our framing — no first-person singular for investment decisions"
metrics:
  duration_minutes: 3
  completed_date: "2026-03-19"
  tasks_completed: 2
  files_changed: 5
---

# Phase 03 Plan 03: Kilrr Investment Story + Career Timeline Summary

**One-liner:** Kilrr case study (bg-surface, 5-paragraph, we/the fund framing) and Career Timeline (two-column responsive grid, 5 real entries, staggered whileInView) built as server components with client animation wrappers.

## What Was Built

### Task 1: Kilrr Investment Story + Timeline Data Population

**lib/data/timeline.ts** — All 5 placeholder descriptions replaced with verbatim PRD copy. Role titles corrected:
- `Co-founder & CEO` → `Head of Business` (Orly)
- `Founder & Fund Manager` → `Chief of Staff & Head of Investments` (BSC)
- `Analyst` → `Investment Banking Associate — EMEA M&A` (Nomura London)
- `Analyst` → `Investment Banking Analyst — CEEMEA & Corporate DCM` (Nomura Mumbai)
- `BBA` → `BSc Economics, Finance Specialisation` (NMIMS)
- `NMIMS` → `NMIMS School of Economics, Mumbai` (organization)
- `Nomura, London` → `Nomura International, London` (organization)

**components/kilrr/KilrrAnimations.tsx** — `'use client'` component. Receives `title: string` and `paragraphs: string[]`. Renders heading block with single fade-up, then each paragraph with `whileInView` + staggered `delay: i * 0.06`. Uses `m.div` and `m.p` (not `motion.*`).

**components/sections/KilrrSection.tsx** — Server component (no `'use client'`). `bg-surface` background for visual differentiation. Contains full 5-paragraph Kilrr case study using "we/us/our" framing throughout — never "I" for investment decisions. Passes title + paragraphs array to KilrrAnimations.

### Task 2: Career Timeline Section

**components/timeline/TimelineAnimations.tsx** — `'use client'` component. Receives `entries: TimelineEntry[]`. Section heading fades in. Each entry renders in `grid-cols-1 md:grid-cols-[160px_1fr]` — single column on mobile, two-column on desktop. Date: `font-mono text-xs text-muted md:text-right`. Role in `font-display font-bold`. Organization in `text-accent`. Description in `whitespace-pre-line` to preserve paragraph breaks in multi-paragraph entries. Stagger: `delay: i * 0.08`. Border separators: `border-b border-muted/15`.

**components/sections/TimelineSection.tsx** — Server component. Imports `timelineEntries` from `@/lib/data/timeline`, passes to `TimelineAnimations`.

## Verification

- `npx tsc --noEmit` — passed with zero errors (verified after each task)
- `npm run build` — compiled successfully, 4/4 static pages generated
- No placeholder text remains in `lib/data/timeline.ts`
- All 5 role titles match PRD verbatim
- KilrrSection.tsx contains `bg-surface`, no `'use client'`, no first-person investment language
- TimelineAnimations.tsx contains `grid-cols-1 md:grid-cols-[160px_1fr]`, `whitespace-pre-line`, `whileInView`, `viewport={{ once: true }}`, `m.div`

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| Task 1 | bd5d255 | feat(03-03): build Kilrr Investment Story section + populate timeline data |
| Task 2 | 40ea207 | feat(03-03): build Career Timeline section with responsive two-column layout |

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check: PASSED

- [x] `lib/data/timeline.ts` — confirmed "Joined the family men" present, no "[Placeholder" text
- [x] `components/sections/KilrrSection.tsx` — confirmed `bg-surface`, `KilrrAnimations`, "Backing a Founder Before the Category Existed", "What made us back him"
- [x] `components/kilrr/KilrrAnimations.tsx` — confirmed `'use client'`, `whileInView`, `viewport={{ once: true }}`, `m.div`, `m.p`
- [x] `components/sections/TimelineSection.tsx` — confirmed no `'use client'`, imports `timelineEntries`, uses `TimelineAnimations`
- [x] `components/timeline/TimelineAnimations.tsx` — confirmed `'use client'`, `grid-cols-1 md:grid-cols-[160px_1fr]`, `whitespace-pre-line`, `font-mono text-xs text-muted md:text-right`, `delay: i * 0.08`, `border-b border-muted/15`
- [x] Commits bd5d255 and 40ea207 exist in git log
- [x] `npm run build` passed
