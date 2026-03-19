---
phase: 02-hero-section
plan: 01
subsystem: ui
tags: [framer-motion, next-image, count-up, viewport-animation, hero]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: Tailwind v4 design tokens, LazyMotion provider, lib/data/hero.ts, lib/types.ts (Stat interface)
provides:
  - Full-viewport hero section with animated name/descriptor/subline fade-up and portrait headshot
  - Stat count-up strip (4 metrics) triggered on viewport entry with cubic ease-out
  - Server/client component split: HeroSection (server) + HeroAnimations + StatCountUp (clients)
  - page.tsx entry point wired to HeroSection
affects:
  - 03-philosophy
  - 04-portfolio
  - 05-media

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "m.* components (not motion.*) required because LazyMotion is active at root — all animated elements use m.h1, m.p, m.div"
    - "viewport={{ once: true }} on all whileInView animations — prevents re-animation on scroll back"
    - "useInView(ref, { once: true }) in client leaf for count-up gating — animation fires on viewport entry only"
    - "Server/client boundary: HeroSection (no 'use client') fetches static data; HeroAnimations and StatCountUp are 'use client' leaves"

key-files:
  created:
    - components/hero/StatCountUp.tsx
    - components/hero/HeroAnimations.tsx
    - components/sections/HeroSection.tsx
  modified:
    - app/page.tsx

key-decisions:
  - "Used m.* (not motion.*) throughout HeroAnimations — LazyMotion at root requires m.* not motion.*"
  - "StatCountUp gated on if (!isInView) return — count-up fires only on viewport entry, not page load"
  - "Headshot hidden on mobile via hidden md:block — portrait only shown at md breakpoint and above"
  - "HeroSection kept as server component — no 'use client' — data imports from static lib/data/hero.ts"

patterns-established:
  - "Section components: server component shells (HeroSection) import static data and pass to 'use client' animation wrappers (HeroAnimations)"
  - "Count-up animation: useInView(ref, { once: true }) gates RAF loop; cubic ease-out eased = 1 - Math.pow(1 - progress, 3)"
  - "Stat display: font-mono text-accent for numbers, font-body text-muted for labels"

requirements-completed: [HERO-01, HERO-02, HERO-03, HERO-04, HERO-05, HERO-06, HERO-07]

# Metrics
duration: 8min
completed: 2026-03-19
---

# Phase 2 Plan 01: Hero Section Summary

**Full-viewport hero with staggered Playfair Display heading, portrait headshot, and 4-stat count-up strip using framer-motion viewport-gated animations**

## Performance

- **Duration:** ~8 min
- **Started:** 2026-03-19T09:31:33Z
- **Completed:** 2026-03-19T09:39:00Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments

- Created `StatCountUp` client component with cubic ease-out count-up triggered by useInView(once:true) — counts fire on viewport entry only, not page load
- Created `HeroAnimations` client wrapper with staggered fade-up (delays 0, 0.15, 0.30s for name/descriptor/subline), portrait headshot (hidden on mobile), hairline separator, and stat strip
- Created `HeroSection` server component that imports hero data (heroIdentity, heroStats, heroHeadshot) and renders layout without 'use client'
- Replaced page.tsx placeholder with HeroSection import — full build passes clean

## Task Commits

Each task was committed atomically:

1. **Task 1: Create StatCountUp, HeroAnimations, HeroSection** - `48ecedd` (feat)
2. **Task 2: Wire HeroSection into page.tsx** - `4129d7e` (feat)

## Files Created/Modified

- `components/hero/StatCountUp.tsx` - Client component; useInView-gated RAF count-up with cubic ease-out; text-accent numbers, text-muted labels
- `components/hero/HeroAnimations.tsx` - Client wrapper; staggered m.h1/m.p fade-ups, portrait Image, hairline separator, StatCountUp stat strip
- `components/sections/HeroSection.tsx` - Server component; imports hero data from lib/data/hero.ts, renders HeroAnimations
- `app/page.tsx` - Entry point; replaced placeholder with HeroSection import

## Decisions Made

- Used `m.*` not `motion.*` throughout HeroAnimations because LazyMotion is active at the root — this is required for the LazyMotion code-splitting to work
- `StatCountUp` uses `if (!isInView) return` guard inside useEffect — ensures count-up fires only on viewport entry, not page load
- Headshot wrapped in `hidden md:block` div — portrait only visible at desktop breakpoints per design spec
- `HeroSection` is a server component — no `'use client'` directive — aligns with PERF-03 rule of pushing 'use client' as far down as possible

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None — TypeScript compilation clean on first attempt, no type errors or import failures.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Hero section fully built and wired. `npm run build` passes clean.
- Phase 3 (Philosophy section) can proceed immediately — HeroSection server component pattern is established as the template for subsequent sections.
- Note: `/vidit-headshot.jpg` placeholder path in lib/data/hero.ts — headshot image not yet supplied. Build succeeds because next/image with unresolvable src renders gracefully.

---
*Phase: 02-hero-section*
*Completed: 2026-03-19*
