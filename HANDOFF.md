# HANDOFF — Vidit Dugar Portfolio Website

> Paste this file into any new Claude context to resume instantly.
> Keep this file open and update it after each major step.

---

## What We're Building

Single-page scrolling portfolio website for **Vidit Dugar** — targeting VC partners at early-stage, consumer-focused Indian funds. Goal: communicate investment track record, philosophy, and operator background within 90 seconds of scrolling.

**PRD:** `vidit_dugar_portfolio_PRD.md` (in project root) — fully detailed, read this for all copy/design specs.

---

## Current Status

**Phase:** Phase 5 — Performance & Deploy (planned, ready to execute)
**Last action:** Phase 5 planned. 2 plans in 2 waves. Wave 1 (auto): contrast fixes + SEO metadata. Wave 2 (human checkpoint): Lighthouse + responsive verification on production.
**Next step:** `/gsd:execute-phase 5`

**Live URL:** `https://vidit-portfolio-vert.vercel.app`
**GitHub:** `https://github.com/orlyopenai-create/vidit-portfolio` (auto-deploys on push to master)

---

## Roadmap (5 Phases)

| # | Phase | Status | Requirements |
|---|-------|--------|--------------|
| 1 | Foundation | ✓ Complete (2026-03-19) | FOUND-01–08: Next.js scaffold, fonts, MotionProvider, data files |
| 2 | Hero Section | ✓ Complete (2026-03-19) | HERO-01–07: Full-viewport hero, circular photo, career pills, palette |
| 3 | Core Sections | ✓ Complete (2026-03-20) | NARR/PHIL/TRACK/CASE/TIME/PERS/FOOT (29 reqs): All narrative + credibility sections |
| 4 | Media Section | ✓ Complete (2026-03-20) | MEDIA-01–06: LinkedIn post cards, photo gallery, lightbox |
| 5 | Performance & Deploy | ⬜ Not started | PERF-01–06: Lighthouse 90+, responsive, TypeScript strict, production |

---

## What Phase 1 Built

- Next.js 16.2.0 App Router + TypeScript strict + Tailwind CSS v4
- Fonts via `next/font/google`: Playfair Display (headings), DM Sans (body), DM Mono (numbers) — exposed as CSS variables
- `LazyMotion + domAnimation` provider at app root (`components/providers/MotionProvider.tsx`)
- All 8 TypeScript interfaces in `lib/types.ts`
- All 5 content data files scaffolded with real/placeholder content:
  - `lib/data/hero.ts` — identity, stats (fund metrics, for fund section), chapters, cities
  - `lib/data/philosophy.ts` — 3 pillars
  - `lib/data/fund.ts` — fund stats, 5 standout investments, 25 portfolio company scaffolds
  - `lib/data/timeline.ts` — 5 career entries
  - `lib/data/media.ts` — empty arrays (pending Vidit assets)
- `public/logos/.gitkeep` — logos directory tracked
- `.env.example` committed with `NEXT_PUBLIC_CLOUDFLARE_URL` placeholder
- Vercel CI/CD: project linked, `NEXT_PUBLIC_CLOUDFLARE_URL` env var set

---

## What Phase 2 Built (+ Post-Execution Refinements)

**Components:**
- `components/hero/StatCountUp.tsx` — RAF count-up with cubic ease-out, useInView(once:true). Kept for fund section.
- `components/hero/HeroAnimations.tsx` — Centered editorial masthead: circular photo (fill + object-[50%_12%]), staggered animate (not whileInView — above-fold fix), career chapter pills, cities
- `components/sections/HeroSection.tsx` — Server component; passes identity, headshot, chapters, cities
- `app/page.tsx` — Entry point; renders HeroSection

**Hero content (`lib/data/hero.ts`):**
- `heroIdentity`: name `'Vidit Dugar'` (title case), descriptor `'Investor · Operator · Builder'`, subline `'Orly · Nomura · Bombay Shaving Company · The Barbershop Fund · The Barbershop with Shantanu'`
- `heroChapters`: Investment Banking, Venture Capital, Operator, Content & Media, Chief of Staff (5 pills — Founder removed)
- `heroCities`: London, Kolkata, Delhi, Mumbai
- `heroStats`: kept in data file for use in Barbershop Fund section (not shown in hero)

**Key animation decision:** Hero uses `animate` (not `whileInView`) — elements are above-fold so intersection observer never fires; `whileInView` left everything at opacity:0.

---

## Design Spec (Finalised — Warm Sand Palette)

| Token | Value |
|-------|-------|
| Background | `#F5EFE6` |
| Surface | `#EDE4D8` |
| Text | `#241E18` |
| Muted | `#8A7E74` |
| Accent (gold) | `#A6701A` |
| Accent hover | `#B8841E` |
| Heading font | Playfair Display |
| Body font | DM Sans |
| Numbers font | DM Mono |
| Style | Warm editorial — approachable, personal. NO dark bg, NO gradients, NO SaaS look |
| color-scheme | `light` |

---

## Site Sections (in scroll order)

1. **Hero** ✓ — Circular headshot, name, descriptor, subline, career chapter pills, cities
2. **About / The Story** — ~250-word narrative prose + pull quote
3. **Investment Philosophy** — 3 numbered pillars
4. **The Barbershop Fund** — Fund stats (heroStats), standout investments table (5 co's), 25-company logo grid
5. **Featured Investment: Kilrr** — ~300-word case study, "we/the fund" framing throughout
6. **Writing & Media** — LinkedIn post cards + photo gallery (placeholder-first)
7. **Career Timeline** — 5 entries reverse chronological
8. **Beyond Work** — Story of My Life + interests
9. **Contact / Footer** — Email, LinkedIn, closing line, no contact form

---

## Critical Constraints

- **"We/the fund" framing** in all investment copy — never "I" for investment decisions (Shantanu Deshpande was final decision-maker at Barbershop Fund)
- **Fund metrics belong in the Barbershop Fund section** — not the hero. Hero leads with career diversity.
- **No contact form** — email mailto link only
- **No dark/light toggle** — committed to Warm Sand light theme
- **Headshot** — `public/vidit-headshot.jpg` (506×900px portrait). Circular crop via `fill` + `object-[50%_12%]` inside `relative w-40 h-40 rounded-full overflow-hidden` wrapper
- **Lighthouse 90+** — architecture decisions (SSR, LazyMotion, next/font) all serve this goal
- **Logo IP** — confirm stealth companies with Vidit before live
- **`m.*` not `motion.*`** — LazyMotion at root requires this everywhere

---

## Pending Content Assets (Vidit to Supply)

- [x] Headshot — `public/vidit-headshot.jpg`
- [x] LinkedIn posts — 7 posts populated from Rich_Media.csv export
- [x] Photos — 9 gallery photos populated from Rich_Media.csv (LinkedIn CDN, expire ~May 2026 — move to Cloudflare R2 for permanence)
- [ ] Fund deck PDF — for logo extraction
- [ ] Logo IP confirmation for stealth portfolio companies
- [ ] Domain preference: `vidit.vc` vs `viditdugar.com`

---

## GSD Planning Files

All in `.planning/`:
- `PROJECT.md` — full project context
- `config.json` — YOLO mode, standard granularity, parallel execution, balanced models
- `REQUIREMENTS.md` — 56 v1 requirements with REQ-IDs
- `ROADMAP.md` — 5-phase roadmap with success criteria
- `STATE.md` — GSD state (phase 4 complete, phase 5 next)
- `phases/01-foundation/` — 3 plans + 3 summaries + VERIFICATION.md
- `phases/02-hero-section/` — CONTEXT, RESEARCH, PLAN, SUMMARY, VALIDATION, VERIFICATION
- `phases/03-core-sections/` — RESEARCH, VALIDATION, 4 plans + 4 summaries, VERIFICATION
- `phases/04-media-section/` — RESEARCH, VALIDATION, 2 plans + 2 summaries, VERIFICATION
- `research/` — STACK.md, FEATURES.md, ARCHITECTURE.md, PITFALLS.md, SUMMARY.md

---

## How to Resume

```
# Phase 5 — Performance & Deploy (plan next):
/gsd:plan-phase 5

# Check overall status:
/gsd:progress
```

---

## What Phase 3 Plan 03 Built

**Plan 03 — Kilrr Investment Story + Career Timeline:**
- `lib/data/timeline.ts` — All 5 placeholder descriptions replaced with real PRD copy; role titles corrected (Head of Business, Chief of Staff & Head of Investments, Investment Banking Associate — EMEA M&A, Investment Banking Analyst — CEEMEA & Corporate DCM, BSc Economics)
- `components/kilrr/KilrrAnimations.tsx` — `'use client'`, staggered paragraph fade-in via `m.p` with `delay: i * 0.06`
- `components/sections/KilrrSection.tsx` — server component, `bg-surface` background, full 5-paragraph Kilrr case study, we/us/our framing throughout
- `components/timeline/TimelineAnimations.tsx` — `'use client'`, `grid-cols-1 md:grid-cols-[160px_1fr]`, `whitespace-pre-line`, stagger `delay: i * 0.08`
- `components/sections/TimelineSection.tsx` — server component, imports `timelineEntries`

---

## What Phase 3 Plans 01-02 Built

**Plan 01 — About + Philosophy sections:**
- `components/sections/AboutSection.tsx` — server component
- `components/about/AboutAnimations.tsx` — prose paragraphs staggered fade-in via `.split('\n\n')`
- `components/sections/PhilosophySection.tsx` — server component
- `components/philosophy/PhilosophyAnimations.tsx` — 3 numbered pillars with stagger, pull quote as `m.blockquote` with `border-l-2 border-accent`

**Plan 02 — Barbershop Fund section:**
- `lib/data/fund.ts` — 5 standout investments with real valuations (Go Zero ~12x, Kilrr ~5x, Fishmongers ~5x, Anveshan ~2.5x, Mekr ~2x), 25 named portfolio companies (16 Brandfetch CDN + 9 local SVG)
- `components/fund/FundAnimations.tsx` — stats strip (reuses StatCountUp), investments table with overflow-x-auto
- `components/fund/LogoGrid.tsx` — 3/4/5-col grid, grayscale-to-color hover, CDN fallback
- `components/sections/FundSection.tsx` — server component

---

---

## What Phase 3 Plan 04 Built

**Plan 04 — Beyond Work + Footer + Full Page Wiring:**
- `components/beyondwork/BeyondWorkAnimations.tsx` — `'use client'`, `grid-cols-1 md:grid-cols-2`, staggered whileInView for Story of My Life and Interests sub-sections
- `components/sections/BeyondWorkSection.tsx` — server component, Story of My Life (5 editions, 32 speakers, 500+ attendees, ~600K YouTube views), interests as middot-separated inline text
- `components/sections/FooterSection.tsx` — server component, `bg-surface`, mailto link, LinkedIn new tab (`rel="noopener noreferrer"`), closing line, copyright, no contact form
- `app/page.tsx` — updated to import and render all 8 sections in scroll order (20 lines clean)

---

---

## What Phase 4 Built

**Plan 01 — LinkedIn Post Cards:**
- `components/media/LinkedInCard.tsx` — presentational card (excerpt + date + read more link), no use client
- `components/media/MediaAnimations.tsx` — `'use client'`, staggered whileInView fade-in, 4 placeholder cards when posts array empty, section heading
- `components/sections/MediaSection.tsx` — server component shell, imports linkedInPosts + photos, renders MediaAnimations

**Plan 02 — Gallery Grid and Lightbox:**
- `components/media/GalleryGrid.tsx` — `'use client'`, useState for activeIndex, CSS columns masonry, group-hover overlay, 6 placeholder items, sole owner of NEXT_PUBLIC_CLOUDFLARE_URL construction
- `components/media/Lightbox.tsx` — `'use client'`, createPortal on document.body, AnimatePresence fade, m.div nav arrows, keyboard nav (Escape/ArrowLeft/ArrowRight), body scroll lock, mounted guard for SSR safety
- `components/sections/MediaSection.tsx` — updated to render both MediaAnimations and GalleryGrid

*Last updated: 2026-03-20 — Phase 5 PLANNED. 2 plans: (1) contrast fixes + SEO metadata, (2) Lighthouse + responsive verification. Next: `/gsd:execute-phase 5`.*
