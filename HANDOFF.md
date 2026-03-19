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
**Last action:** `/gsd:execute-phase 2` complete. Hero section built — StatCountUp, HeroAnimations, HeroSection, page.tsx wired. All 7 HERO reqs complete. Build passes clean.
**Next step:** `/gsd:plan-phase 3`

**Live URL:** `https://vidit-portfolio-vert.vercel.app`
**GitHub:** `https://github.com/orlyopenai-create/vidit-portfolio` (auto-deploys on push to master)

---

## Roadmap (5 Phases)

| # | Phase | Status | Requirements |
|---|-------|--------|--------------|
| 1 | Foundation | ✓ Complete (2026-03-19) | FOUND-01–08: Next.js scaffold, fonts, dark bg, MotionProvider, data files |
| 2 | Hero Section | ✓ Complete (2026-03-19) | HERO-01–07: Full-viewport hero, animated stat count-ups |
| 3 | Core Sections | ⬜ Not started | NARR/PHIL/TRACK/CASE/TIME/PERS/FOOT (29 reqs): All narrative + credibility sections |
| 4 | Media Section | ⬜ Not started | MEDIA-01–06: LinkedIn post cards, photo gallery, lightbox |
| 5 | Performance & Deploy | ⬜ Not started | PERF-01–06: Lighthouse 90+, responsive, TypeScript strict, production |

---

## What Phase 1 Built

- Next.js 16.2.0 App Router + TypeScript strict + Tailwind CSS v4
- Fonts via `next/font/google`: Playfair Display (headings), DM Sans (body), DM Mono (numbers) — exposed as CSS variables
- Dark background `#0D0D0D` on `html, body` in `globals.css` — pre-JS, no white flash
- `LazyMotion + domAnimation` provider at app root (`components/providers/MotionProvider.tsx`)
- All 8 TypeScript interfaces in `lib/types.ts`
- All 5 content data files scaffolded with real/placeholder content:
  - `lib/data/hero.ts` — 4 stats + identity
  - `lib/data/philosophy.ts` — 3 pillars
  - `lib/data/fund.ts` — fund stats, 5 standout investments, 25 portfolio company scaffolds
  - `lib/data/timeline.ts` — 5 career entries
  - `lib/data/media.ts` — empty arrays (pending Vidit assets)
- `public/logos/.gitkeep` — logos directory tracked
- `.env.example` committed with `NEXT_PUBLIC_CLOUDFLARE_URL` placeholder
- Vercel CI/CD: project linked, `NEXT_PUBLIC_CLOUDFLARE_URL` env var set

---

## Key Technical Decisions

| Decision | Details |
|----------|---------|
| Framework | Next.js 16 App Router + TypeScript + Tailwind CSS v4 + Framer Motion |
| Tailwind | **v4** — `@import "tailwindcss"` + `@theme {}` in CSS. No `tailwind.config.js`. |
| Fonts | `next/font/google` only — never `<link>` tags (causes CLS) |
| Animations | `LazyMotion` + `domAnimation` at app root — never full Framer bundle. All animated components are `'use client'` leaf wrappers only. |
| Dark theme | `background-color: #0D0D0D` on `html, body` in `globals.css` — must be pre-JS to prevent flash |
| Logo images | Stored in `/public/logos/` as local files, rendered with plain `<img>` tags — no `next/image` for logos |
| Media assets | Photos/videos hosted on Cloudflare, not `/public/`. Logo grid: local files. |
| Deployment | Vercel (CI on master branch) |
| Content | All static in `lib/data/*.ts` — no CMS, no database |

---

## Design Spec (Quick Reference)

| Token | Value |
|-------|-------|
| Background | `#0D0D0D` |
| Accent (gold) | `#C8922A` |
| Text | Warm off-white `#F5F0E8` |
| Muted text | `#A39E93` |
| Heading font | Playfair Display |
| Body font | DM Sans |
| Numbers font | DM Mono |
| Style | Refined editorial dark — The Economist × investment firm. NO gradients, NO Inter, NO SaaS look |

---

## Site Sections (in scroll order)

1. **Hero** — Name, `Investor. Operator. Builder.`, subline, headshot placeholder, 4 animated stats
2. **About / The Story** — ~250-word narrative prose + pull quote
3. **Investment Philosophy** — 3 numbered pillars
4. **The Barbershop Fund** — Fund stats, standout investments table (5 co's), 25-company logo grid
5. **Featured Investment: Kilrr** — ~300-word case study, "we/the fund" framing throughout
6. **Writing & Media** — LinkedIn post cards + photo gallery (placeholder-first)
7. **Career Timeline** — 5 entries reverse chronological
8. **Beyond Work** — Story of My Life + interests
9. **Contact / Footer** — Email, LinkedIn, closing line, no contact form

---

## Critical Constraints

- **"We/the fund" framing** in all investment copy — never "I" for investment decisions (Shantanu Deshpande was final decision-maker at Barbershop Fund)
- **No contact form** — email mailto link only
- **No dark/light toggle** — committed dark theme
- **Headshot available** — `public/vidit-headshot.jpg` (506×900px, downloaded from LinkedIn export 2026-03-19). `heroHeadshot` updated in `lib/data/hero.ts`.
- **Lighthouse 90+** — architecture decisions (SSR, LazyMotion, next/font) all serve this goal
- **Logo IP** — 25 portfolio logos displayed in monochrome white; hover reveals color. Confirm stealth companies with Vidit before live

---

## Pending Content Assets (Vidit to Supply)

- [x] Headshot — `public/vidit-headshot.jpg` (506×900px portrait, from LinkedIn export)
- [ ] LinkedIn posts — 6–8 best (text + URL)
- [ ] Photos: Barbershop podcast, Orly/exhibitions, Nomura London, Story of My Life
- [ ] Fund deck PDF (`Barbershop_Fund_-_Investment_summary_Q3_FY26.pdf`) — for logo extraction
- [ ] Logo IP confirmation for any stealth portfolio companies
- [ ] Domain preference: `vidit.vc` vs `viditdugar.com`

---

## GSD Planning Files

All in `.planning/`:
- `PROJECT.md` — full project context
- `config.json` — YOLO mode, standard granularity, parallel execution, balanced models
- `REQUIREMENTS.md` — 56 v1 requirements with REQ-IDs
- `ROADMAP.md` — 5-phase roadmap with success criteria
- `STATE.md` — GSD project state (currently: phase 2, context captured, ready to plan)
- `phases/01-foundation/` — 3 plans + 3 summaries + VERIFICATION.md (all complete)
- `phases/02-hero-section/02-CONTEXT.md` — Hero design decisions captured
- `phases/02-hero-section/02-RESEARCH.md` — Framer Motion 12, count-up, Next.js patterns researched
- `phases/02-hero-section/02-01-PLAN.md` — Single plan: StatCountUp + HeroAnimations + HeroSection + page.tsx wiring
- `phases/02-hero-section/02-VALIDATION.md` — Nyquist validation strategy
- `research/` — STACK.md, FEATURES.md, ARCHITECTURE.md, PITFALLS.md, SUMMARY.md

---

## What Phase 2 Built

- `components/hero/StatCountUp.tsx` — Client component; useInView(once:true) RAF count-up with cubic ease-out; text-accent numbers, text-muted labels
- `components/hero/HeroAnimations.tsx` — Client wrapper; staggered m.h1/m.p fade-ups (0/0.15/0.30s delays), portrait Image (hidden md:block), hairline separator, StatCountUp stat strip
- `components/sections/HeroSection.tsx` — Server component; imports hero data, renders HeroAnimations
- `app/page.tsx` — Entry point replaced with HeroSection import

Key decision: Use `m.*` (not `motion.*`) throughout — LazyMotion at root requires `m.*`. All viewport animations use `once: true`.

---

## How to Resume

```
# Phase 3 — Core Sections (plan next):
/gsd:plan-phase 3

# Check overall status:
/gsd:progress

# Review Phase 2 hero execution:
# cat .planning/phases/02-hero-section/02-01-SUMMARY.md
```

---

*Last updated: 2026-03-19 — Phase 2 complete. Hero section built and wired. All 7 HERO reqs done. Build passes clean. Ready for `/gsd:plan-phase 3`.*
