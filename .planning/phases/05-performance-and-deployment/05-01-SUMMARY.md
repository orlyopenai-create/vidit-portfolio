---
phase: 05-performance-and-deployment
plan: "01"
subsystem: accessibility-and-seo
tags: [wcag, contrast, seo, metadata, robots, sitemap]
dependency_graph:
  requires: []
  provides: [wcag-aa-contrast, seo-metadata, robots-txt, sitemap-xml]
  affects: [all-components, app-layout]
tech_stack:
  added: []
  patterns: [text-foreground/N opacity scale for accessible color contrast, Next.js MetadataRoute for robots and sitemap]
key_files:
  created:
    - app/robots.ts
    - app/sitemap.ts
  modified:
    - components/hero/StatCountUp.tsx
    - components/hero/HeroAnimations.tsx
    - components/about/AboutAnimations.tsx
    - components/philosophy/PhilosophyAnimations.tsx
    - components/fund/FundAnimations.tsx
    - components/kilrr/KilrrAnimations.tsx
    - components/timeline/TimelineAnimations.tsx
    - components/beyondwork/BeyondWorkAnimations.tsx
    - components/media/MediaAnimations.tsx
    - components/media/GalleryGrid.tsx
    - components/media/LinkedInCard.tsx
    - components/sections/FooterSection.tsx
    - app/layout.tsx
decisions:
  - "text-foreground/N opacity scale replaces text-muted/text-accent for WCAG AA compliance at small text sizes"
  - "text-accent kept only at text-lg+ (large text 3:1 threshold) or font-semibold bold contexts"
  - "PhilosophyAnimations decorative pillar numbers (text-4xl text-accent/30) kept — WCAG incidental text exemption"
  - "metadataBase set to https://vidit-portfolio-vert.vercel.app — update when custom domain confirmed"
  - "Pre-existing lint errors in Lightbox.tsx and LogoGrid.tsx are out of scope — deferred"
metrics:
  duration: 15
  completed_date: "2026-03-20"
  tasks_completed: 2
  files_modified: 15
---

# Phase 5 Plan 01: WCAG Contrast Fixes and SEO Metadata Summary

WCAG AA contrast violations fixed across all 12 components by replacing text-muted/text-accent with text-foreground opacity scale; SEO metadata completed with metadataBase, openGraph, twitter card, robots.ts and sitemap.ts.

## Tasks Completed

| # | Task | Commit | Files |
|---|------|--------|-------|
| 1 | Fix WCAG AA contrast violations across all components | edd6dc1 | 12 component files |
| 2 | Add SEO metadata, robots.ts, and sitemap.ts | e1c8969 | app/layout.tsx, app/robots.ts, app/sitemap.ts |

## What Was Built

### Task 1: WCAG AA Contrast Fixes

All `text-muted` and `text-accent` usages at small text sizes (text-xs, text-sm, text-base) replaced with `text-foreground` at appropriate opacity levels. The pattern used:

- `text-foreground/70` — standard informational small text (replaces text-muted)
- `text-foreground/75` — prose body paragraphs (replaces text-muted in about/philosophy/kilrr)
- `text-foreground/60` — overlines, dates, placeholder text (replaces text-accent/text-muted at xs)
- `text-foreground/50` — copyright/legal fine print
- `text-foreground/80` — interactive links (footer email/LinkedIn)
- `text-foreground/40` — decorative large-letter-spaced cities text (exempted: decorative)

All remaining `text-accent` uses are at WCAG-safe sizes:
- Large text (text-lg+): HeroAnimations identity descriptor
- Large mono (text-3xl+): StatCountUp count display
- Bold/semibold: FundAnimations multiple column data
- Decorative low-opacity: PhilosophyAnimations pillar numbers (text-accent/30)

### Task 2: SEO Metadata

- `app/layout.tsx`: Added `metadataBase`, full `openGraph` block, and `twitter` card block
- `app/robots.ts`: Created — Next.js auto-serves at `/robots.txt`, references sitemap URL
- `app/sitemap.ts`: Created — Next.js auto-serves at `/sitemap.xml`, single root URL entry
- Build output confirms `/robots.txt` and `/sitemap.xml` as static routes

## Verification Results

- `npm run build` — passes with zero TypeScript errors (both tasks)
- `/robots.txt` and `/sitemap.xml` confirmed in build route listing
- `grep -rn "text-muted" components/` — zero text-color matches (only border/bg uses remain)
- `grep -rn "text-accent" components/` — 4 matches, all at appropriate large text or bold sizes

## Deviations from Plan

None — plan executed exactly as written.

## Deferred Issues (Out of Scope)

Pre-existing lint errors not introduced by this plan:

1. `components/media/Lightbox.tsx:21` — ESLint `react-hooks/set-state-in-effect` error (setMounted in useEffect). This is the SSR guard pattern documented in STATE.md decisions. Pre-existing.
2. `components/fund/LogoGrid.tsx:22` — ESLint warning for `<img>` vs `<Image />`. Pre-existing.

These are unrelated to this plan's changes and will need a separate fix task.

## Self-Check

- [x] app/robots.ts exists
- [x] app/sitemap.ts exists
- [x] app/layout.tsx contains metadataBase
- [x] Commits edd6dc1 and e1c8969 exist in git log
- [x] Build passes with /robots.txt and /sitemap.xml routes
