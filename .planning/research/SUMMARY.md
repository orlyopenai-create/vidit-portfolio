# Project Research Summary

**Project:** Vidit Dugar — VC Portfolio Website
**Domain:** Single-page personal portfolio targeting Indian VC partners and talent leads
**Researched:** 2026-03-18
**Confidence:** HIGH (stack/architecture), MEDIUM (features/pitfalls domain knowledge)

## Executive Summary

This is a single-page scrolling personal branding site for a finance-to-VC professional whose primary audience is investment partners at early-stage Indian consumer funds. The expert approach is a statically-rendered Next.js App Router site: Server Components deliver the content with zero client JS overhead, and a narrow set of Client Component leaves power the interactive elements (count-up stat animations, scroll-triggered fade-ins, photo lightbox). Content is stored as static TypeScript data files with no CMS, no database, and no runtime fetching — this is the fastest possible architecture for a Lighthouse 90+ target and the simplest to maintain for a site whose content changes rarely.

The recommended approach uses Next.js 16.x with Tailwind CSS 4.x, Framer Motion 11.x, and `next/font/google` for zero-CLS self-hosted fonts, deployed to Vercel. The most critical design decision is the Server/Client Component boundary: section-level components stay as Server Components; only the interactive leaves (`AnimatedStat`, `ScrollFadeIn`, `PortfolioLogoGrid`, `MasonryGallery`, `Lightbox`, `NavDots`) carry `'use client'`. Collapsing this boundary — making entire sections client components — directly tanks Lighthouse performance scores and undermines the core site goal.

The primary risks are performance-related: Google Fonts loaded via `<link>` tags instead of `next/font` causes CLS and external requests; Framer Motion imported without `LazyMotion` inflates the JS bundle by 80-130KB; and a hero headshot delivered as an unoptimized JPEG can push LCP above 4 seconds on mobile. Each of these is a build-time configuration choice that is far easier to get right at foundation stage than to fix retroactively. The VC audience context also imposes feature discipline: the "never build" list (contact form, dark/light toggle, skills bars, hard CTAs, PDF resume) is as important as the feature list.

---

## Key Findings

### Recommended Stack

The stack is well-validated against official sources (Next.js docs updated 2026-03-16). Next.js 16.1.7 is the current stable version — the project brief references "14+" but there is no reason to target v14 for a greenfield build. Turbopack is the default bundler in v16 (no config needed). Tailwind v4 is a significant rewrite with CSS-native token syntax (`@theme` block in globals.css, no `tailwind.config.js` required). Framer Motion v11 handles all animation requirements in one library — count-up stats, scroll-triggered reveals, lightbox overlay — without the complexity of GSAP or the limitations of pure CSS.

**Core technologies:**
- **Next.js 16.x**: Framework and routing — App Router is mature, Vercel-native, zero-config deploy, Server Components reduce client JS
- **React 19.x**: Ships with Next.js 16; required for Server Components model
- **TypeScript 5.x**: Catches data shape bugs at compile time; critical for structured content (stats, timeline, portfolio table)
- **Tailwind CSS 4.x**: v4 is CSS-native (no config file), faster, ships with `create-next-app` defaults; `@tailwindcss/postcss` replaces v3 plugin
- **Framer Motion 11.x**: Count-up stats via `useInView` + `useMotionValue`; scroll animations via `whileInView`; must be wrapped in `LazyMotion` to avoid bundle bloat
- **`next/font/google`**: Self-hosts Playfair Display, DM Sans, DM Mono at build time — zero CLS, no external requests, the only acceptable approach for Lighthouse 90+
- **Vercel**: Zero-config deploy; `next/image` optimization included; Edge CDN; preview deployments per branch
- **`clsx` + `tailwind-merge`**: Class composition utilities via `cn()` wrapper

See `.planning/research/STACK.md` for installation commands, config file templates, and version verification steps.

### Expected Features

The audience is numerically literate investment professionals who give a personal site roughly 90 seconds before forming a judgment. Missing table-stakes features signal incompleteness; differentiators create a memorable impression that separates an operator-investor from a generic finance CV.

**Must have (table stakes):**
- Hero with clear identity statement + quantified track record above the fold — VC partners give <10 seconds before bouncing
- Headshot / real photo — trust signal; placeholder-only at launch reads as incomplete
- Career timeline with firm names, roles, and notable callouts — background verification expected
- Investment philosophy (numbered pillars with rationale) — distinguishes operator-investor from generic finance background
- Barbershop Fund track record + portfolio logo grid — fund manager site without this looks like something to hide
- Kilrr case study — proof of investment thinking depth, not just that investments happened
- Footer with email + LinkedIn — contact path required; no form needed
- Mobile responsiveness — VC partners frequently receive forwarded links on mobile

**Should have (differentiators):**
- Animated stat count-up on scroll entry — makes quantified achievements feel earned, not static
- Prose narrative "The Story" section — long-form first-person arc signals self-awareness; rare on finance profiles
- Monochrome logo grid with hover color reveal — rewards curiosity, maintains dark aesthetic
- Pull quote styled with Playfair Display — anchors the narrative section, creates shareable moment
- Career section as visual vertical timeline — makes a non-linear path legible without explanation
- Writing & Media section with curated LinkedIn posts — signals active ecosystem voice
- "Beyond work" / personal section — VC hiring is relationship-based; investors want to know the person

**Defer (v2+):**
- Blog / long-form writing section — defer until there is real published content to show; empty blog is worse than no blog
- Password-protected deal memo pages — adds auth complexity not warranted in V1
- CMS integration — static TypeScript files are faster to ship and sufficient for V1 content velocity
- Analytics surfacing — add Vercel Analytics privately post-deploy; never surface publicly

**Never build:**
- Contact form, dark/light mode toggle, skills/progress bars, hard CTAs ("Hire Me"), PDF resume download, social proof widgets, stock photo illustrations, LinkedIn embeds

See `.planning/research/FEATURES.md` for full table of anti-features with rationale.

### Architecture Approach

The site lives at a single `/` route. `app/page.tsx` is a Server Component that assembles all section components vertically. All section components (`HeroSection`, `AboutSection`, `PhilosophySection`, `FundSection`, `KilrrSection`, `MediaSection`, `TimelineSection`, `BeyondSection`, `FooterSection`) are Server Components. Interactive leaves carry `'use client'` and are as thin as possible. All content is static TypeScript in `lib/data/` — no fetch, no database, no CMS. Data flows unidirectionally from `lib/data/*.ts` → `app/page.tsx` (Server) → section components → Client Component leaves.

**Major components:**
1. **`app/layout.tsx`** (Server) — HTML shell, font CSS variables, global dark background, `MotionProvider` wrapper
2. **`app/page.tsx`** (Server) — assembles all sections, page-level SEO metadata
3. **Section components** (Server) — one per visible section; receive data props from page, render static HTML
4. **`ScrollFadeIn`** (Client) — thin `whileInView` wrapper used by almost every section
5. **`AnimatedStat`** (Client) — count-up animation; `useInView` + `useMotionValue` + `animate()`
6. **`PortfolioLogoGrid`** (Server/CSS) — monochrome logos; hover color reveal via CSS `filter` only
7. **`MasonryGallery` + `Lightbox`** (Client) — CSS columns layout + modal state for photo gallery
8. **`NavDots`** (Client) — fixed-position scroll indicator
9. **`MotionProvider`** (Client) — `LazyMotion` + `domAnimation` wrapper; reduces Framer Motion bundle from ~150KB to ~18KB
10. **`lib/data/*.ts`** — single source of truth for all iterated content (stats, portfolio, timeline, philosophy, media)

See `.planning/research/ARCHITECTURE.md` for full file structure, component boundaries table, data flow diagram, all 6 implementation patterns with code, and the suggested 4-stage build order.

### Critical Pitfalls

1. **Framer Motion in Server Components without `'use client'`** — Build error or hydration crash on every animated section. Prevention: any file importing from `framer-motion` must have `'use client'`; use thin wrapper components so static content stays server-rendered.

2. **Google Fonts via `<link>` tag instead of `next/font`** — External request to Google on every load, FOUT (Flash of Unstyled Text), direct CLS hit of 0.15–0.3, and privacy regression. Prevention: use `next/font/google` exclusively in `app/layout.tsx` from day one.

3. **Dark background flash on load (FOUC)** — White flash visible for 50–200ms if background is applied via Tailwind class or Client Component. Prevention: set `background-color: #0D0D0D` directly in `globals.css` on `html, body` — not just via Tailwind class.

4. **Framer Motion bundle without `LazyMotion`** — Imports the full 150KB bundle; JS bundle exceeds 200KB and Lighthouse drops below 90. Prevention: use `LazyMotion` + `domAnimation` in root provider (Pattern 2 in ARCHITECTURE.md); use `m.div` instead of `motion.div`.

5. **Unoptimized hero headshot** — Large uncompressed JPEG (3MB from iPhone) as LCP element pushes LCP to 4+ seconds on mobile throttled, dropping Lighthouse to 60–70. Prevention: `priority={true}` on `next/image` for hero, `sizes` prop for responsive serving, source file < 1MB.

6. **SVG logos in `next/image`** — Optimization disabled for SVGs by default; external SVG URLs cause CORS. Prevention: use `<img>` tags for SVGs; store all logos in `/public/logos/` locally.

7. **CSS `filter: grayscale` on SVG `<img>` in Safari** — Filter transitions on SVG elements flicker in some Safari versions. Prevention: apply CSS filter to a wrapping `<div>`, not the `<img>` directly.

See `.planning/research/PITFALLS.md` for full pitfall catalog with detection methods and phase-specific warnings table.

---

## Implications for Roadmap

The architecture research provides an explicit 4-stage build order that maps cleanly to roadmap phases. The dependency structure is well-understood: foundation must precede UI primitives, which must precede sections, which must precede the polish/asset pass. The FEATURES.md MVP recommendation aligns with this order. The suggested phase structure below follows the ARCHITECTURE.md build order with pitfall mitigations integrated.

### Phase 1: Foundation

**Rationale:** Every subsequent phase depends on this. Font CLS, dark background FOUC, and Framer Motion bundle size are all foundation-stage configuration decisions — retroactive fixes require touching every file. Get these right first.

**Delivers:** Runnable Next.js project with correct toolchain, design tokens, fonts, dark background, `MotionProvider`, TypeScript types, and placeholder data files.

**Addresses:** Design system (color palette `#0D0D0D` / `#C8922A` / `#F5F0E8`, typography system Playfair Display + DM Sans + DM Mono), global layout structure.

**Avoids:** Pitfall 3 (Google Fonts via `<link>`), Pitfall 4 (dark background FOUC), Pitfall 8 (full Framer Motion bundle — `LazyMotion` goes in here), Pitfall 14 (incorrect `AnimatePresence` at layout level).

**Stack elements:** `create-next-app` scaffold, Tailwind v4 PostCSS config, `next/font/google` setup, `MotionProvider`, `lib/types.ts` + `lib/data/*.ts` with placeholder content.

### Phase 2: Reusable UI Primitives

**Rationale:** `ScrollFadeIn`, `AnimatedStat`, `SectionHeading`, and `PullQuote` are used across multiple sections. Building them in isolation before sections allows validation and prevents the bad pattern of making section components client components to accommodate animation.

**Delivers:** The reusable component library — animation wrapper, stat counter, heading, quote — tested in isolation.

**Addresses:** The `'use client'` boundary discipline; verifies Framer Motion patterns work before sections are built.

**Avoids:** Pitfall 1 (Framer Motion in Server Components), Pitfall 2 (hydration mismatch from scroll hooks), Pitfall 6 (stat counter running on server or before viewport entry), Pitfall 12 (animating layout-triggering properties).

**Stack elements:** Framer Motion `whileInView`, `useInView`, `useMotionValue`, `animate()`; `LazyMotion` / `m.div` pattern.

### Phase 3: Core Sections (Narrative and Credibility)

**Rationale:** The sections that carry the primary VC comprehension goal — Hero, About, Philosophy, Timeline, FundSection (stats + table), and Footer — form the minimum viable site. These must ship for the site to fulfill its purpose. KilrrSection is included here because it is prose-only (no complex assets).

**Delivers:** A complete, shippable single-page site with placeholder assets. Every section from table-stakes feature list present. Lighthouse 90+ achievable at this stage.

**Addresses:** Hero identity + animated stats, narrative "The Story" section, investment philosophy pillars, Barbershop Fund track record + placeholder logo grid, Kilrr case study, career timeline, footer contact path.

**Avoids:** Pitfall 5 (logo grid external image `remotePatterns`) — logos stored in `/public/logos/`; Pitfall 7 (CSS columns for logo grid) — use CSS Grid; Pitfall 9 (Safari CSS filter on SVG) — filter on wrapper div; Pitfall 10 (SVG in `next/image`); Pitfall 11 (unoptimized headshot — `priority` prop); Pitfall 13 (timeline absolute positioning — use CSS Grid/Flexbox); Pitfall 15 (Tailwind `prose` class on editorial content).

**Uses:** All section component patterns from ARCHITECTURE.md; `lib/data/*.ts` as content source; `ScrollFadeIn` and `AnimatedStat` from Phase 2.

### Phase 4: Media Section and Polish

**Rationale:** MediaSection is the most asset-dependent section (photos, LinkedIn post cards) and cannot be completed until Vidit supplies real content. NavDots requires all section IDs to exist. The responsive pass and Lighthouse audit belong here because they require the full section set to be meaningful.

**Delivers:** Complete site with real assets swapped in, photo gallery with lightbox, LinkedIn post cards, NavDots scroll indicator, responsive layout verified at 375px, Lighthouse 90+ confirmed.

**Addresses:** Writing & Media section (LinkedIn post cards + photo masonry gallery), "Beyond work" section, NavDots.

**Avoids:** Pitfall 17 (LinkedIn CDN thumbnail URLs — download to `/public/writing/` at content ingestion); responsive layout issues.

**Stack elements:** `MasonryGallery` (CSS columns for photos, not logo grid), `Lightbox` (client state, no routing), `NavDots`.

**Asset dependencies:** Real headshot, confirmed portfolio logos, curated LinkedIn posts (6–8), personal photos (podcast, Orly, travel). These block final asset swap but not component build.

### Phase 5: Deployment and Validation

**Rationale:** Deployment is not a final step to discover issues — it is a validation gate. TypeScript errors that pass `next dev` silently fail `next build`. Vercel preview deployments should be used continuously from Phase 1 onward; this phase represents the formal production cutover.

**Delivers:** Production deployment at target domain (ideally `vidit.vc`), OG image for social sharing, Vercel Analytics configured privately, `next build` type-check passing.

**Avoids:** Pitfall 16 (TypeScript errors caught only in Vercel build — run `next build` locally before push, `"strict": true` in tsconfig from Phase 1).

### Phase Ordering Rationale

- Foundation before everything: FOUC, font CLS, and bundle size issues are configuration decisions that affect every file; getting them wrong in Phase 1 creates pervasive technical debt.
- Primitives before sections: Building `ScrollFadeIn` and `AnimatedStat` in isolation enforces the correct `'use client'` architecture before section components are written; prevents the anti-pattern of adding `'use client'` to section components.
- Core sections before media: The narrative and credibility sections (Hero, About, Philosophy, Fund, Kilrr, Timeline) can ship with placeholder assets; MediaSection cannot be finished without real photos and LinkedIn posts.
- NavDots last in build order: Requires all section IDs to be in place.
- Deployment continuous, not final: Vercel preview deployments per branch from Phase 1; Phase 5 is production cutover only.

### Research Flags

Phases with standard, well-documented patterns (safe to skip deep research-phase):
- **Phase 1 (Foundation):** Next.js + Tailwind v4 setup is documented with official sources; STACK.md contains exact config files and install commands.
- **Phase 2 (UI Primitives):** All Framer Motion patterns are specified in ARCHITECTURE.md with complete code; standard RSC boundary patterns documented in Next.js official docs.
- **Phase 5 (Deployment):** Vercel + Next.js deployment is zero-config; no research needed.

Phases that may benefit from targeted research during planning:
- **Phase 3 (Core Sections — FundSection specifically):** The portfolio logo grid SVG/CSS filter behavior in Safari (Pitfall 9) has MEDIUM confidence; verify in target browser before committing to the CSS filter approach. Also validate "we/the fund" attribution language requirements with Vidit before writing investment copy.
- **Phase 4 (Media Section):** LinkedIn post card content requires Vidit to supply curated posts; photo gallery asset pipeline (download, optimize, add to `/public/`) needs a confirmed asset handoff process. CSS Grid masonry (`grid-template-rows: masonry`) has LOW confidence on 2026 browser support — verify against MDN before using; safe fallback is CSS columns for photos (unlike logo grid, reading order is less critical for photos).

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Next.js 16.1.7 official docs (verified 2026-03-16); Tailwind v4 official upgrade guide; `next/font` official docs. Framer Motion v11 version is MEDIUM — npm was inaccessible during research; verify at install time. |
| Features | MEDIUM | External research tools unavailable; findings from training knowledge of VC hiring norms and direct analysis of PROJECT.md. Core table-stakes list is HIGH confidence (domain-stable); differentiator and anti-feature judgments are MEDIUM (audience-dependent). |
| Architecture | HIGH | Next.js App Router Server/Client patterns verified against official docs (2026-03-16). Framer Motion `LazyMotion` / `whileInView` patterns are MEDIUM confidence (training data, August 2025 cutoff) — verify API shape before implementation. |
| Pitfalls | HIGH | Critical pitfalls (Google Fonts CLS, dark FOUC, Framer Motion SSR, bundle size) are verified against official docs. Safari CSS filter behavior and CSS Grid masonry browser support are MEDIUM confidence — must be tested in target environments. |

**Overall confidence:** HIGH for technical implementation; MEDIUM for feature/design decisions that depend on Vidit's judgment about his audience.

### Gaps to Address

- **Framer Motion v11 API shape:** npm registry was inaccessible during STACK research. Run `npm install framer-motion@latest` and verify version at install time. Confirm `LazyMotion` / `m.div` API has not changed from v11.
- **`vidit.vc` domain availability:** `.vc` TLD signals strong intent to VC audience but may be expensive or unavailable. Confirm before planning deployment phase.
- **PDF resume policy:** FEATURES.md recommends against PDF resume download; validate this with Vidit — some Indian VC firms still request PDF during screening process.
- **"We/the fund" attribution framing:** All investment language in FundSection and KilrrSection must use collective framing. Confirm exact language boundaries with Vidit before writing copy in Phase 3.
- **Portfolio logo IP/stealth status:** Logo grid cannot go live with all 25 companies until Vidit confirms which are non-stealth and have approved logo usage.
- **LinkedIn post selection:** Writing & Media section requires Vidit to identify 6–8 best posts; placeholder cards can be built but section is blocked on this asset delivery.
- **Real headshot:** Circular placeholder acceptable for build; must be swapped before launch. Source file should be < 1MB JPEG.
- **Safari CSS filter verification:** Pitfall 9 (grayscale filter on SVG in Safari) is MEDIUM confidence — must be tested on macOS Safari during Phase 3, not deferred to Phase 5.

---

## Sources

### Primary (HIGH confidence)
- Next.js Installation docs: https://nextjs.org/docs/app/getting-started/installation (version 16.1.7, 2026-03-16)
- Next.js Font Optimization: https://nextjs.org/docs/app/getting-started/fonts (version 16.1.7, 2026-03-16)
- Next.js Server and Client Components: https://nextjs.org/docs/app/getting-started/server-and-client-components (version 16.1.7, 2026-03-16)
- Next.js Image Optimization: https://nextjs.org/docs/app/getting-started/images (version 16.1.7, 2026-03-16)
- Next.js Metadata and OG images: https://nextjs.org/docs/app/getting-started/metadata-and-og-images (version 16.1.7, 2026-03-16)
- Next.js Lazy Loading: https://nextjs.org/docs/app/guides/lazy-loading (version 16.1.7, 2026-03-16)
- Next.js Images config (remotePatterns): https://nextjs.org/docs/app/api-reference/config/next-config-js/images (version 16.1.7, 2026-03-16)
- Tailwind CSS v4 upgrade guide: https://tailwindcss.com/docs/upgrade-guide
- Tailwind CSS Next.js framework guide: https://tailwindcss.com/docs/installation/framework-guides/nextjs

### Secondary (MEDIUM confidence)
- Framer Motion LazyMotion / whileInView / useInView patterns — training data (August 2025 cutoff); verify bundle sizes against current v11+ release notes before implementation
- VC hiring norms and finance professional branding — training knowledge; direct analysis of PROJECT.md requirements
- CSS filter / Safari SVG behavior — known browser compat issue; verify in target browser during Phase 3

### Tertiary (LOW confidence)
- CSS Grid masonry (`grid-template-rows: masonry`) browser support in 2026 — check MDN before using; safe fallback is CSS columns for photo gallery

---
*Research completed: 2026-03-18*
*Ready for roadmap: yes*
