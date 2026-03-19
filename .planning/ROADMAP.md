# Roadmap: Vidit Dugar — VC Portfolio Website

## Overview

Build a single-page scrolling portfolio site that communicates Vidit's investment track record, philosophy, and operator background to VC partners within 90 seconds. The build follows a strict dependency order: toolchain and design tokens first, reusable animated components next (via the Hero section), the full narrative/credibility content body third, the asset-dependent media section fourth, and a final performance validation and production deployment pass. Content placeholders are used throughout so no phase is blocked on pending assets from Vidit.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation** - Scaffold Next.js project with design tokens, fonts, dark background, MotionProvider, and static data files (completed 2026-03-19)
- [x] **Phase 2: Hero Section** - Build the full-viewport hero with animated stat count-ups and scroll-triggered fade-ins (completed 2026-03-19)
- [x] **Phase 3: Core Sections** - Build all narrative and credibility sections (About, Philosophy, Fund, Kilrr, Timeline, Beyond Work, Footer) (completed 2026-03-19)
- [ ] **Phase 4: Media Section** - Build the Writing & Media section with LinkedIn post cards, photo gallery, and lightbox
- [ ] **Phase 5: Performance and Deployment** - Validate Lighthouse 90+, confirm responsive layout, and cut over to production

## Phase Details

### Phase 1: Foundation
**Goal**: A runnable Next.js project exists with the correct toolchain, design tokens, typography system, dark background (no FOUC), Framer Motion provider, and all content data files scaffolded with placeholders
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05, FOUND-06, FOUND-07, FOUND-08
**Success Criteria** (what must be TRUE):
  1. `npm run dev` starts without errors and renders a dark (`#0D0D0D`) page with no white flash on load
  2. Playfair Display, DM Sans, and DM Mono are visibly applied and load from self-hosted files (no external font requests visible in network tab)
  3. Vercel preview deployment exists and updates automatically on push to main
  4. All `lib/data/*.ts` files exist with placeholder content and TypeScript compiles clean (`next build` passes)
  5. `LazyMotion` provider is configured at app root — a test `m.div` animates without importing the full Framer Motion bundle
**Plans:** 3/3 plans complete

Plans:
- [x] 01-01-PLAN.md — Scaffold Next.js 16 with Tailwind v4, fonts, dark background, design tokens
- [x] 01-02-PLAN.md — MotionProvider, TypeScript types, and content data files with placeholders
- [x] 01-03-PLAN.md — Vercel deployment and Cloudflare env var configuration

### Phase 2: Hero Section
**Goal**: The full-viewport hero section is live — name, identity descriptor, subline, headshot placeholder, and four animated stat count-up widgets that trigger on scroll entry
**Depends on**: Phase 1
**Requirements**: HERO-01, HERO-02, HERO-03, HERO-04, HERO-05, HERO-06, HERO-07
**Success Criteria** (what must be TRUE):
  1. Visiting the site shows a full-viewport hero with "VIDIT DUGAR" as the dominant heading in Playfair Display
  2. Scrolling into the stat strip causes the four numbers (16, 1.8x, ₹20Cr, 50%+) to count up from zero — they do not animate on page load, only on viewport entry
  3. Stat numbers render in amber/gold (`#C8922A`); labels render in muted off-white
  4. A clearly labelled headshot placeholder appears in the hero and can be swapped by changing one value in the data file
  5. All hero text elements fade in on scroll entry with `viewport={{ once: true }}` — they do not re-animate on scroll back
**Plans:** 1/1 plans complete

Plans:
- [x] 02-01-PLAN.md — Build hero components (StatCountUp, HeroAnimations, HeroSection) and wire into page.tsx

### Phase 3: Core Sections
**Goal**: Every narrative and credibility section is present and populated with placeholder-ready content — the site is fully shippable even before real photos or LinkedIn posts are supplied
**Depends on**: Phase 2
**Requirements**: NARR-01, NARR-02, NARR-03, PHIL-01, PHIL-02, PHIL-03, TRACK-01, TRACK-02, TRACK-03, TRACK-04, TRACK-05, TRACK-06, TRACK-07, TRACK-08, CASE-01, CASE-02, CASE-03, TIME-01, TIME-02, TIME-03, TIME-04, TIME-05, PERS-01, PERS-02, PERS-03, FOOT-01, FOOT-02, FOOT-03, FOOT-04
**Success Criteria** (what must be TRUE):
  1. Scrolling top-to-bottom reveals every section in order: About/The Story, Investment Philosophy, The Barbershop Fund (stats + table + logo grid), Kilrr Investment Story, Career Timeline, Beyond Work, and Footer — with no missing sections
  2. The pull quote "Running a company taught me things no pitch deck ever could." is displayed prominently in large Playfair Display in the About section
  3. All 25 portfolio company logos appear in a grid rendered white/monochrome; hovering any logo reveals its original color
  4. The standout investments table shows 5 rows (Go Zero, Kilrr, Fishmongers, Anveshan, Mekr) with all columns populated
  5. The career timeline shows 5 entries in reverse chronological order and collapses to a single column on mobile
  6. The footer shows email as a mailto link, LinkedIn opening in a new tab, and the closing line — no contact form present
**Plans:** 4/4 plans complete

Plans:
- [ ] 03-01-PLAN.md — About / The Story section + Investment Philosophy section with real copy
- [ ] 03-02-PLAN.md — The Barbershop Fund section (stats, investment table, logo grid)
- [ ] 03-03-PLAN.md — Kilrr Investment Story case study + Career Timeline section
- [ ] 03-04-PLAN.md — Beyond Work + Footer sections + wire all 8 sections into page.tsx

### Phase 4: Media Section
**Goal**: The Writing & Media section is live with LinkedIn post cards and a photo gallery with lightbox — built with placeholders so Vidit can swap in real content without touching component code
**Depends on**: Phase 3
**Requirements**: MEDIA-01, MEDIA-02, MEDIA-03, MEDIA-04, MEDIA-05, MEDIA-06
**Success Criteria** (what must be TRUE):
  1. The Writing & Media section displays a two-column editorial grid with LinkedIn post card placeholders showing truncated text, date, and "read more →" links — swapping real posts requires only a data file change
  2. The photo gallery shows placeholder states (or supplied photos if available) loaded from Cloudflare URLs; no photos are loaded from `/public/`
  3. Clicking a photo opens a full-screen lightbox; pressing Escape closes it and arrow keys navigate between photos
  4. Hovering a photo shows a dark overlay with a caption
  5. Off-screen gallery images are lazy-loaded — only images in or near the viewport trigger network requests
**Plans**: TBD

### Phase 5: Performance and Deployment
**Goal**: The production site is live, Lighthouse scores 90+ across all four categories, the layout is verified responsive at 375px, and `next build` passes TypeScript strict mode with no errors
**Depends on**: Phase 4
**Requirements**: PERF-01, PERF-02, PERF-03, PERF-04, PERF-05, PERF-06
**Success Criteria** (what must be TRUE):
  1. Running Lighthouse on the production URL returns 90+ on Performance, Accessibility, Best Practices, and SEO
  2. The site renders correctly at 375px viewport width — hero, timeline, and logo grid all reflow without horizontal overflow or broken layouts
  3. No white flash is visible on hard reload in any browser (background set before JS hydration)
  4. Font loading causes no visible layout shift — characters do not reflow after initial paint
  5. `next build` completes with `"strict": true` in tsconfig and zero TypeScript errors
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 3/3 | Complete   | 2026-03-19 |
| 2. Hero Section | 1/1 | Complete   | 2026-03-19 |
| 3. Core Sections | 4/4 | Complete    | 2026-03-19 |
| 4. Media Section | 0/TBD | Not started | - |
| 5. Performance and Deployment | 0/TBD | Not started | - |
