---
phase: 03-core-sections
plan: "02"
subsystem: fund-section
tags: [fund, investments, logo-grid, data, framer-motion, count-up]
dependency_graph:
  requires: [components/hero/StatCountUp.tsx, lib/types.ts]
  provides: [components/sections/FundSection.tsx, components/fund/FundAnimations.tsx, components/fund/LogoGrid.tsx, lib/data/fund.ts]
  affects: [app/page.tsx]
tech_stack:
  added: []
  patterns: [server-component-with-client-islands, brandfetch-cdn-with-local-fallback, reuse-existing-count-up]
key_files:
  created:
    - components/sections/FundSection.tsx
    - components/fund/FundAnimations.tsx
    - components/fund/LogoGrid.tsx
  modified:
    - lib/data/fund.ts
decisions:
  - "Brandfetch CDN for 16 companies with known domains; local /logos/{slug}.svg fallback for 9 companies without Brandfetch presence"
  - "LogoGrid onError handler switches CDN URL to local SVG if Brandfetch fails at runtime"
  - "FundSection uses max-w-4xl (wider than prose sections) to accommodate investment table width"
  - "grayscale opacity-60 default / grayscale-0 opacity-100 hover — correct for Warm Sand bg (not brightness/invert which is for dark bg)"
metrics:
  duration_minutes: 3
  completed_date: "2026-03-19"
  tasks_completed: 2
  files_changed: 4
---

# Phase 3 Plan 02: Fund Section Summary

**One-liner:** Barbershop Fund credibility section with animated stats strip (reusing StatCountUp), 5-row investment table with real valuations, and 25-company logo grid with Brandfetch CDN + local SVG fallback and grayscale-to-color hover.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Populate fund data with real investment values and 25 company entries | 579fb00 | lib/data/fund.ts |
| 2 | Build Fund section with stats strip, investment table, and logo grid | da3fd8c | components/fund/FundAnimations.tsx, components/fund/LogoGrid.tsx, components/sections/FundSection.tsx |

## What Was Built

### lib/data/fund.ts
Replaced all placeholder data with real values:
- `standoutInvestments`: 5 companies with real entry/latest valuations, multiples (~12x to ~2x), and co-investor names
- `portfolioCompanies`: 25 named companies — 16 using Brandfetch CDN URLs (`https://cdn.brandfetch.io/{domain}/w/400/h/400/logo`), 9 using local `/logos/{slug}.svg` paths
- `fundStats` and `fundData` kept intact (were already correct)

### components/fund/FundAnimations.tsx (client component)
- Section header with `whileInView` fade-in animation using `m.div`
- Stats strip: `grid grid-cols-2 md:grid-cols-4` reusing `StatCountUp` from `@/components/hero/StatCountUp`
- Standout investments table: `overflow-x-auto` for mobile scroll, 6 columns, Multiple column in `text-accent font-semibold`
- All animation wrappers use `m.div` with `whileInView` + `viewport={{ once: true }}`

### components/fund/LogoGrid.tsx (client component)
- Responsive grid: `grid-cols-3 sm:grid-cols-4 md:grid-cols-5`
- Logo default: `grayscale opacity-60`; hover: `grayscale-0 opacity-100`; transition: `transition-all duration-300`
- `onError` fallback: switches to `/logos/{slug}.svg` if Brandfetch CDN fails
- `loading="lazy"` for off-screen performance; container `h-16` prevents CLS

### components/sections/FundSection.tsx (server component)
- Imports `fundData` from `@/lib/data/fund`
- Composes `FundAnimations` + `LogoGrid`
- `max-w-4xl mx-auto` to accommodate table width

## Verification

- `npx tsc --noEmit`: zero errors
- `npm run build`: compiled successfully, static generation passed (4/4 pages)

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check: PASSED

Files verified:
- FOUND: components/sections/FundSection.tsx
- FOUND: components/fund/FundAnimations.tsx
- FOUND: components/fund/LogoGrid.tsx
- FOUND: lib/data/fund.ts (modified)

Commits verified:
- FOUND: 579fb00 — feat(03-02): populate fund data
- FOUND: da3fd8c — feat(03-02): build Fund section
