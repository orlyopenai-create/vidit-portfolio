# HANDOFF — Vidit Dugar Portfolio Website

> Paste this file into any new Claude context to resume instantly.
> Keep this file open and update it after each major step.

---

## What We're Building

Single-page scrolling portfolio website for **Vidit Dugar** — targeting VC partners at early-stage, consumer-focused Indian funds. Goal: communicate investment track record, philosophy, and operator background within 90 seconds of scrolling.

**PRD:** `vidit_dugar_portfolio_PRD.md` (in project root) — fully detailed, read this for all copy/design specs.

---

## Current Status

**Phase:** Phase 1 — COMPLETE (all 3 plans done)
**Last action:** Executed 01-01 (scaffold), 01-02 (MotionProvider + data files), 01-03 (Vercel deployment). All plans complete.
**Next step:** Run `/gsd:execute-phase 2` to begin Phase 2 — Hero Section.

### Phase 1 Complete — Vercel Deployment Live

**Live URL:** https://vidit-portfolio-vert.vercel.app

**What was built:**
- Next.js 16 App Router scaffold with Tailwind v4, Framer Motion 11
- Font configuration: Playfair Display, DM Sans, DM Mono via `next/font/google`
- Dark background `#0D0D0D` on `html, body` in `globals.css` — no white flash
- LazyMotion + domAnimation at app root
- All TypeScript data files scaffolded: `portfolioCompanies` (25 placeholders), `linkedInPosts` (empty), `photos` (empty), `hero`, `fund`, `philosophy`, `timeline`, `about`, `contact`
- `.env.example` committed documenting `NEXT_PUBLIC_CLOUDFLARE_URL`
- Vercel CI/CD: auto-deploys on push to main, confirmed working

---

## Roadmap (5 Phases)

| # | Phase | Status | Requirements |
|---|-------|--------|--------------|
| 1 | Foundation | Complete (3/3 plans) | FOUND-01–08: Next.js scaffold, fonts, dark bg, MotionProvider, data files |
| 2 | Hero Section | ⬜ Not started | HERO-01–07: Full-viewport hero, animated stat count-ups |
| 3 | Core Sections | ⬜ Not started | NARR/PHIL/TRACK/CASE/TIME/PERS/FOOT (29 reqs): All narrative + credibility sections |
| 4 | Media Section | ⬜ Not started | MEDIA-01–06: LinkedIn post cards, photo gallery, lightbox |
| 5 | Performance & Deploy | ⬜ Not started | PERF-01–06: Lighthouse 90+, responsive, TypeScript strict, production |

---

## Key Technical Decisions

| Decision | Details |
|----------|---------|
| Framework | Next.js 16 App Router + TypeScript + Tailwind CSS v4 + Framer Motion |
| Tailwind | **v4** — completely different config: `@import "tailwindcss"` + `@theme {}` in CSS. No `tailwind.config.js`. |
| Fonts | `next/font/google` only — never `<link>` tags (causes CLS). Playfair Display (headings), DM Sans (body), DM Mono (numbers) |
| Animations | `LazyMotion` + `domAnimation` at app root — never full Framer bundle. All animated components are `'use client'` leaf wrappers only. |
| Dark theme | `background-color: #0D0D0D` on `html, body` in `globals.css` — must be pre-JS to prevent flash |
| Logo images | Stored in `/public/logos/` as local files, rendered with plain `<img>` tags — no `next/image` for logos |
| Media assets | Photos/videos hosted on Cloudflare, not `/public/`. Logo grid: local files. |
| Deployment | Vercel (CI on main branch) |
| Content | All static in `lib/data/*.ts` — no CMS, no database |

---

## Design Spec (Quick Reference)

| Token | Value |
|-------|-------|
| Background | `#0D0D0D` |
| Accent (gold) | `#C8922A` |
| Text | Warm off-white |
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
- **Placeholder-first** — site must be fully buildable without real headshot, photos, LinkedIn posts, or logos
- **Lighthouse 90+** — architecture decisions (SSR, LazyMotion, next/font) all serve this goal
- **Logo IP** — 25 portfolio logos displayed in monochrome white; hover reveals color. Confirm stealth companies with Vidit before live

---

## Pending Content Assets (Vidit to Supply)

- [ ] Headshot (800×800px min)
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
- `STATE.md` — GSD project state
- `research/` — STACK.md, FEATURES.md, ARCHITECTURE.md, PITFALLS.md, SUMMARY.md

---

## How to Resume

```
# To execute Phase 1 (next step):
/gsd:execute-phase 1

# To check status:
/gsd:progress

# To review plans before executing:
# cat .planning/phases/01-foundation/01-01-PLAN.md
# cat .planning/phases/01-foundation/01-02-PLAN.md
# cat .planning/phases/01-foundation/01-03-PLAN.md
```

---

*Last updated: 2026-03-19 — Phase 1 complete (all 3 plans). Live at https://vidit-portfolio-vert.vercel.app. Ready for Phase 2.*
