# HANDOFF — Vidit Dugar Portfolio Website

> Paste this file into any new Claude context to resume instantly.

---

## What We're Building

Single-page scrolling portfolio website for **Vidit Dugar** — targeting VC partners at early-stage, consumer-focused Indian funds. Goal: communicate investment track record, philosophy, and operator background within 90 seconds of scrolling.

**PRD:** `vidit_dugar_portfolio_PRD.md` (in project root)

---

## Current Status

**Phase:** Post-launch — v1 live, iterating on presentation
**Last action:** Career Timeline replaced with interactive world map (`components/journey/WorldMap.tsx`). Four gold pins — Mumbai, Kolkata, Delhi, London — with click-to-reveal tooltip cards. Uses `react-simple-maps` + world-atlas topojson served locally from `public/world-110m.json`.
**Next discussion:** Continue page-length/presentation rework — more sections may benefit from condensing.

**Live URL:** `https://vidit-portfolio-vert.vercel.app`
**GitHub:** `https://github.com/orlyopenai-create/vidit-portfolio` (auto-deploys on push to master)

---

## Roadmap (5 Phases — All Complete)

| # | Phase | Status | Completed |
|---|-------|--------|-----------|
| 1 | Foundation | ✓ Complete | 2026-03-19 |
| 2 | Hero Section | ✓ Complete | 2026-03-19 |
| 3 | Core Sections | ✓ Complete | 2026-03-20 |
| 4 | Media Section | ✓ Complete | 2026-03-20 |
| 5 | Performance & Deploy | ✓ Complete | 2026-03-20 |

Lighthouse 90+ verified on production (mobile). TypeScript strict. robots.txt + sitemap.xml live.

---

## Site Sections (current scroll order)

1. **Hero** — Circular headshot, name, descriptor, subline, career chapter pills, cities
2. **About / The Story** — ~250-word narrative prose + pull quote
3. **Investment Philosophy** — 3 numbered pillars
4. **The Barbershop Fund** — Fund stats, standout investments table (5 co's), 25-company logo grid
5. **Featured Investment: Kilrr** — ~300-word case study, "we/the fund" framing
6. **Writing** — Horizontal snap slider, 7 post cards with photos, ← → nav
7. **The Journey** — Interactive world map, 4 city pins (Mumbai/Kolkata/Delhi/London), click to reveal tooltip
8. **Beyond Work** — Story of My Life + interests
9. **Contact / Footer** — Email, LinkedIn, closing line, no contact form

---

## Design Spec (Warm Sand Palette — locked)

| Token | Value |
|-------|-------|
| Background | `#F5EFE6` |
| Surface | `#EDE4D8` |
| Text | `#241E18` |
| Accent (gold) | `#A6701A` |
| Heading font | Playfair Display |
| Body font | DM Sans |
| Numbers font | DM Mono |
| Style | Warm editorial. NO dark bg, NO gradients, NO SaaS look |

---

## Critical Constraints

- **"We/the fund" framing** in all investment copy — never "I" for investment decisions
- **No contact form** — email mailto link only
- **No dark/light toggle** — warm sand light theme only
- **`m.*` not `motion.*`** — LazyMotion at root requires this everywhere
- **Logo IP** — stealth portfolio companies not yet confirmed for public

---

## Media Section — Current State

**Slider** (`components/media/MediaAnimations.tsx`):
- Horizontal snap carousel, `overflow-x-auto snap-x snap-mandatory`
- ← → arrow buttons, drag/swipe on mobile
- 7 cards at `w-72` each

**Cards** (`components/media/LinkedInCard.tsx`):
- `imageSrc` at top (4:3 aspect ratio) when present, text + date + link below
- `line-clamp-5` on excerpt

**Photo mapping** (`lib/data/media.ts`):

| Post ID | Photo file | Source |
|---------|-----------|--------|
| orly-times | `/1773132723912.jpg` | Likely Orly Times post (Mar 2026) |
| community-retail-tarot | `/1765796182897.jpg` | Exact match — Tarot event |
| culture-community-gully-labs | `/1759404720052.jpg` | Thematic — Zero In podcast |
| standing-on-shoulders | `/1748432293369.jpg` | Thematic — Tale of Three Cities |
| body-of-work | `/1750088418964.jpg` | Exact match — last day at BSC |
| wanderlooms-twice | `/1748348328010.jpg` | Exact match — Wanderlooms post |
| bridge-launch | `/1749125527528.jpg` | Exact match — The Bridge launch |

**Unused photos** in `public/` (not wired to any post):
- `1745479670359.jpg` — BSC × First Coffee
- `1748432293406.jpg` — Tale of Three Cities (duplicate angle)
- `1748946735535.jpg` — BSC razors in Postcard Hotel
- `1751273222681.jpg` — "Superpower / looking into future" post

---

## Portfolio Logos — Current State

All 25 logos extracted from `Barbershop Fund - Investment summary_Q3 FY26 (1).pdf` using PyMuPDF. Served locally from `public/logos/`. No CDN dependency.

**Files:** `public/logos/{slug}.png` or `.jpeg` for all 25 companies in `lib/data/fund.ts`.

`LogoGrid.tsx` uses plain `<img>` (not `next/image`) — `onError` hides broken images silently.

---

## Pending / Open Items

- [ ] **Page length rework** — Career Timeline replaced with interactive world map (done). Continue condensing other sections.
- [ ] **World map tooltip positioning** — On mobile, tooltip may clip at edges; can fine-tune `left` clamping logic in `WorldMap.tsx` if needed.
- [ ] **Domain** — `vidit.vc` vs `viditdugar.com`. When confirmed, update `metadataBase` in `app/layout.tsx`.
- [ ] **Logo IP** — confirm stealth portfolio companies before sharing URL publicly.
- [ ] **Post URLs** — all 7 LinkedIn posts currently link to `https://www.linkedin.com/in/viditdugar/` (profile). Update to direct post URLs when available.
- [ ] **Photo swaps** — 3 of 7 photos are thematic matches, not exact. Vidit can swap by updating `imageSrc` in `lib/data/media.ts`.

---

## Key Files

| File | Purpose |
|------|---------|
| `lib/data/hero.ts` | Name, descriptor, subline, career pills, cities |
| `lib/data/philosophy.ts` | 3 investment pillars |
| `lib/data/fund.ts` | Fund stats, 5 standout investments, 25 portfolio companies + logos |
| `lib/data/timeline.ts` | 5 career entries (no longer rendered — kept for reference/CV) |
| `lib/data/journey.ts` | 4 city pins for world map (period, role, one-liner) |
| `components/journey/WorldMap.tsx` | Interactive map component (react-simple-maps, client-only) |
| `public/world-110m.json` | World atlas topojson, served locally |
| `lib/data/media.ts` | 7 LinkedIn posts with imageSrc paths |
| `app/layout.tsx` | SEO metadata, fonts, metadataBase |
| `app/globals.css` | Palette CSS vars, background set before JS hydration |
| `public/logos/` | 25 local logo files (png/jpeg) |
| `public/*.jpg` | 11 photos from LinkedIn export |

---

## Tech Stack

- Next.js 16.2.0 App Router + TypeScript strict
- Tailwind CSS v4
- Framer Motion via `LazyMotion + domAnimation` — always `m.*` not `motion.*`
- `next/font/google`: Playfair Display, DM Sans, DM Mono
- Vercel (auto-deploy on push to master)

---

## How to Resume

```bash
# Check what's live
open https://vidit-portfolio-vert.vercel.app

# Discuss page rework
# "The page is too long — let's talk about format options"

# Make a content edit
# Edit the relevant lib/data/*.ts file, build confirms, push to deploy
npm run build
git add . && git commit -m "content: ..."
git push
```

*Last updated: 2026-03-20 — Career Timeline replaced with interactive world map (react-simple-maps), 4 city pins with click tooltips.*
