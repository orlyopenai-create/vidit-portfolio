# HANDOFF — Vidit Dugar Portfolio Website

> Paste this file into any new Claude context to resume instantly.
> Keep this file open and update it after each major step.

---

## What We're Building

Single-page scrolling portfolio website for **Vidit Dugar** — targeting VC partners at early-stage, consumer-focused Indian funds. Goal: communicate investment track record, philosophy, and operator background within 90 seconds of scrolling.

**PRD:** `vidit_dugar_portfolio_PRD.md` (in project root) — fully detailed, read this for all copy/design specs.

---

## Current Status

**Phase:** Phase 3 — Core Sections (not yet planned)
**Last action:** Phase 2 fully shipped. Hero redesigned post-execution: circular photo, centered editorial layout, Warm Sand palette finalised, career chapter pills, content refined.
**Next step:** `/gsd:plan-phase 3`

**Live URL:** `https://vidit-portfolio-vert.vercel.app`
**GitHub:** `https://github.com/orlyopenai-create/vidit-portfolio` (auto-deploys on push to master)

---

## Roadmap (5 Phases)

| # | Phase | Status | Requirements |
|---|-------|--------|--------------|
| 1 | Foundation | ✓ Complete (2026-03-19) | FOUND-01–08: Next.js scaffold, fonts, MotionProvider, data files |
| 2 | Hero Section | ✓ Complete (2026-03-19) | HERO-01–07: Full-viewport hero, circular photo, career pills, palette |
| 3 | Core Sections | ⬜ Not started | NARR/PHIL/TRACK/CASE/TIME/PERS/FOOT (29 reqs): All narrative + credibility sections |
| 4 | Media Section | ⬜ Not started | MEDIA-01–06: LinkedIn post cards, photo gallery, lightbox |
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
- [ ] LinkedIn posts — 6–8 best (text + URL)
- [ ] Photos: Barbershop podcast, Orly/exhibitions, Nomura London, Story of My Life
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
- `STATE.md` — GSD state (phase 2 complete, phase 3 next)
- `phases/01-foundation/` — 3 plans + 3 summaries + VERIFICATION.md
- `phases/02-hero-section/` — CONTEXT, RESEARCH, 02-01-PLAN, 02-01-SUMMARY, VALIDATION, VERIFICATION
- `research/` — STACK.md, FEATURES.md, ARCHITECTURE.md, PITFALLS.md, SUMMARY.md

---

## How to Resume

```
# Phase 3 — Core Sections (plan next):
/gsd:plan-phase 3

# Check overall status:
/gsd:progress
```

---

*Last updated: 2026-03-19 — Phase 2 complete + hero fully refined. Warm Sand palette locked. Circular photo fixed. Career chapters (5 pills). Fund metrics moved to fund section. Ready for `/gsd:plan-phase 3`.*
