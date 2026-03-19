---
phase: 01-foundation
plan: 02
subsystem: animation-system, data-architecture
tags: [framer-motion, typescript, data-files, lazy-motion]
dependency_graph:
  requires: ["01-01"]
  provides: ["motion-provider", "lib-types", "lib-data-all"]
  affects: ["02-hero", "02-philosophy", "02-fund", "02-timeline", "02-media"]
tech_stack:
  added: ["LazyMotion + domAnimation (Framer Motion tree-shaking)"]
  patterns: ["LazyMotion provider at app root", "static TypeScript data files in lib/data/"]
key_files:
  created:
    - components/providers/MotionProvider.tsx
    - lib/types.ts
    - lib/data/hero.ts
    - lib/data/philosophy.ts
    - lib/data/fund.ts
    - lib/data/timeline.ts
    - lib/data/media.ts
    - public/logos/.gitkeep
  modified:
    - app/layout.tsx
decisions:
  - "LazyMotion + domAnimation (not domMax) — reduces client JS by ~30KB vs full bundle"
  - "No AnimatePresence at layout level — single-page site has no page transitions"
  - "All data files are pure TypeScript (no 'use client') — server-compatible"
  - "portfolioCompanies scaffolded as 25 placeholder entries pending logo stealth confirmation"
  - "linkedInPosts and photos left as empty arrays pending Vidit asset supply"
metrics:
  duration: 12
  completed_date: "2026-03-19"
  tasks_completed: 2
  files_created: 8
  files_modified: 1
---

# Phase 01 Plan 02: MotionProvider + TypeScript Types + Content Data Files Summary

**One-liner:** LazyMotion + domAnimation provider wired into app root, plus lib/types.ts with 8 interfaces and 5 typed data files covering all portfolio content.

## What Was Built

### Task 1: MotionProvider wired into root layout (commit: 4596452)

Created `components/providers/MotionProvider.tsx` as a `'use client'` component wrapping `LazyMotion` with the `domAnimation` feature set. Updated `app/layout.tsx` to import and wrap `{children}` in `MotionProvider` inside the body, preserving all existing font imports, metadata, and className attributes. This ensures all animated components in Phase 2+ can use `m.div` without shipping the full Framer Motion bundle.

Key constraints honored:
- `'use client'` directive on first line (LazyMotion uses React context)
- `domAnimation` not `domMax` (avoids drag/layout features not needed)
- No `AnimatePresence` at layout level (single-page site, no page transitions)

### Task 2: TypeScript types and all content data files (commit: 623c5a2)

Created `lib/types.ts` exporting 8 shared interfaces: `Stat`, `PhilosophyPillar`, `Company`, `Investment`, `FundData`, `TimelineEntry`, `LinkedInPost`, `Photo`, `MediaData`.

Created 5 data files in `lib/data/`:
- `hero.ts` — 4 heroStats with real values (16 investments, 1.8x MOIC, Rs.20Cr deployed, 50%+ follow-on), heroHeadshot placeholder, heroIdentity
- `philosophy.ts` — 3 investment philosophy pillars with placeholder body copy
- `fund.ts` — 4 fundStats, 5 standout investments (Go Zero, Kilrr, Fishmongers, Anveshan, Mekr) with placeholder valuations, 25 portfolioCompanies scaffold, fundData aggregate
- `timeline.ts` — 5 career entries in reverse chronological order (Orly → BSC/Barbershop Fund → Nomura London → Nomura Mumbai → NMIMS)
- `media.ts` — empty linkedInPosts and photos arrays pending Vidit asset supply

Created `public/logos/.gitkeep` to ensure the logos directory is tracked in git for Phase 2+ logo assets.

## Verification

All acceptance criteria met:
- `components/providers/MotionProvider.tsx` first line is `'use client'`
- Contains `import { LazyMotion, domAnimation } from 'framer-motion'` and `<LazyMotion features={domAnimation}>`
- Does NOT contain `AnimatePresence` or `domMax`
- `app/layout.tsx` contains MotionProvider import and wraps children
- All font imports (Playfair_Display, DM_Sans, DM_Mono) preserved
- `lib/types.ts` exports all required interfaces
- All 5 data files exist with typed exports matching plan specification
- `public/logos/.gitkeep` exists
- `npx next build` exits 0 — strict TypeScript compiles clean

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check

Files created:
- components/providers/MotionProvider.tsx: FOUND
- lib/types.ts: FOUND
- lib/data/hero.ts: FOUND
- lib/data/philosophy.ts: FOUND
- lib/data/fund.ts: FOUND
- lib/data/timeline.ts: FOUND
- lib/data/media.ts: FOUND
- public/logos/.gitkeep: FOUND

Commits:
- 4596452: feat(01-02): create MotionProvider and wire into root layout — FOUND
- 623c5a2: feat(01-02): define TypeScript types and scaffold all content data files — FOUND

## Self-Check: PASSED
