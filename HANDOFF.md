# HANDOFF — Vidit Dugar Portfolio Website

> Paste this file into any new Claude context to resume instantly.

---

## What We're Building

Single-page scrolling portfolio website for **Vidit Dugar** — targeting VC partners at early-stage, consumer-focused Indian funds. Goal: communicate investment track record, philosophy, and operator background within 90 seconds of scrolling.

**PRD:** `vidit_dugar_portfolio_PRD.md` (in project root)

---

## Current Status

**Phase:** Post-launch — active iteration
**Last action:** Major narrative rework + Barbershop theme applied. New sections: The Intersection (Venn diagram), The Bridge (podcast IP). Removed: Kilrr case study, standalone Philosophy section, BeyondWork section. Added: flight path animations on world map, heading underline animations, marquee strip, barber pole motif.

**Live URL:** `https://vidit-portfolio-vert.vercel.app`
**GitHub:** `https://github.com/orlyopenai-create/vidit-portfolio` (auto-deploys on push to master)

---

## Site Sections (current scroll order)

1. **Hero** — Circular headshot, name, descriptor, subline, career chapter pills, cities
2. **About / The Story** — ~250-word narrative prose + pull quote
3. **The Journey** — Interactive world map, 4 city pins with animated flight paths (Mumbai→London→Delhi→Kolkata), click to reveal tooltip
4. **The Intersection** — Venn diagram: Investing × Operating × Content → "Operator-Investor". Circles converge on scroll. Mobile: stacked cards.
5. **The Bridge** — IP launched on The Barbershop with Shantanu. 3 episode cards with YouTube thumbnails + play hover. Diagonal stripe section background.
6. **Marquee Strip** — Perpetual scrolling ticker: fund stats + "Operator-Investor" + identity text
7. **The Barbershop Fund** — Stats strip + "What I Look For" (founder traits + company traits from BSC) + sectored logo grid (8 buckets, editorial layout). Barber pole accent on heading.
8. **Writing** — Horizontal snap slider, 10 post cards with photos, ← → nav, right-edge fade
9. **Footer** — Email, LinkedIn, closing line

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

**Barbershop theme elements:**
- Barber pole: diagonal gold/cream stripe, appears next to Fund heading (`components/ui/BarberPole.tsx`)
- Marquee: perpetual ticker (`components/ui/MarqueeStrip.tsx`), CSS `marquee-scroll` keyframe in globals.css
- Diagonal stripe: Bridge section background (CSS `repeating-linear-gradient`)
- Razor underlines: all heading underlines animate at 0.18s with sharp cubic-bezier easing

---

## Critical Constraints

- **"We/the fund" framing** in all investment copy — never "I" for investment decisions
- **No contact form** — email mailto link only
- **No dark/light toggle** — warm sand light theme only
- **`m.*` not `motion.*`** — LazyMotion at root requires this everywhere
- **Logo IP** — stealth portfolio companies not yet confirmed for public
- **Operator-Investor positioning** — NOT "consumer VC" (too senior). Humble, pattern-recognition framing.
- **Investment thesis** — uses "What I Look For" (learned at BSC) not a GP-style mandate

---

## The Intersection Section

Three overlapping circles (desktop Venn / mobile cards):
- **Investing**: 5 yrs IB, Barbershop Fund, 25 cos, 1.8x MOIC
- **Operating**: Chief of Staff BSC, Head of Business Orly, Brands/Teams/P&L
- **Content**: Built The Bridge IP, Barbershop w/ Shantanu, The Orly Times

Payoff: `= Operator-Investor`

---

## The Bridge Section

**Format:** 2 CEOs vs 2 Gen Zs — Vidit built the IP, managed the show, appeared in all 3 episodes
**Episodes** (`lib/data/barbershop.ts`):
| Episode | URL |
|---------|-----|
| S1E1 — Is Hustle Culture Killing India's Next Generation? | youtube.com/watch?v=jVax4DCqKT4 |
| S1E4 — Is Entrepreneurship in India Still Worth It? | youtube.com/watch?v=ejaUoA4ZnW0 |
| S1E9 — Is Corporate India Addressing Gen Z's Mental Health? | youtube.com/watch?v=RbCmw5k4dho |

---

## Fund Section — What I Look For

**Source framing:** "Three years at Bombay Shaving Company gave me a front-row seat..."

**In Founders:** Deep domain expertise · Irrational conviction · Singular focus · Would build without funding

**In Companies:** Brand as a moat · Content-led growth

---

## Portfolio Logo Grid — Sector Buckets

| Sector | Companies |
|--------|-----------|
| Food & Beverage | Go Zero, Anveshan, Kilrr, Fishmongers, Better Nutrition, Basil |
| Fashion & Lifestyle | Wanderlooms, Woodsmen, Fiona Diamonds, Absolut Pet, ReplyAll |
| Fintech | SBNRI, RocketPay, Crest Wealth, Done Deal |
| Health & Wellness | Epithera, BetterPlace Health, Yuomo |
| Climate & Mobility | EVeez, Kritsnam, Mekr |
| Consumer Durables | OctoLife |
| Home & Furniture | Relso |
| AI & Tech | Kookar.AI |
| Education | Anandi School |

5 companies have investment detail popouts: Go Zero (12x), Kilrr (5x), Fishmongers (5x), Anveshan (2.5x), Mekr (2x)

---

## Writing — 10 Posts

All in `lib/data/media.ts`. Photos mapped from LinkedIn export (`public/*.jpg`).

---

## Media Section — Current State

**Slider** (`components/media/MediaAnimations.tsx`):
- Horizontal snap carousel, right-edge fade gradient
- ← → arrow buttons, drag/swipe on mobile

---

## Pending / Open Items

- [ ] **Post URLs** — all LinkedIn posts link to profile. Update to direct post URLs when available.
- [ ] **Domain** — `vidit.vc` vs `viditdugar.com`. Update `metadataBase` in `app/layout.tsx`.
- [ ] **Logo IP** — confirm stealth portfolio companies before sharing URL publicly.
- [ ] **Photo swaps** — some writing card photos are thematic matches. Vidit can swap in `lib/data/media.ts`.

---

## Key Files

| File | Purpose |
|------|---------|
| `lib/data/hero.ts` | Name, descriptor, subline, career pills, cities |
| `lib/data/journey.ts` | 4 city pins for world map |
| `lib/data/barbershop.ts` | 3 Bridge episode cards |
| `lib/data/fund.ts` | Fund stats, 25 portfolio companies + sectors + investment details |
| `lib/data/media.ts` | 10 LinkedIn posts with imageSrc paths |
| `components/journey/WorldMap.tsx` | Interactive map + animated flight paths |
| `components/intersection/IntersectionAnimations.tsx` | Venn diagram section |
| `components/barbershop/BridgeAnimations.tsx` | The Bridge episode cards |
| `components/fund/FundAnimations.tsx` | Stats + What I Look For |
| `components/fund/LogoGrid.tsx` | Sectored logo grid + click popout |
| `components/ui/BarberPole.tsx` | Diagonal stripe accent graphic |
| `components/ui/MarqueeStrip.tsx` | Perpetual scrolling ticker |
| `app/globals.css` | Palette CSS vars + marquee-scroll keyframe |
| `app/layout.tsx` | SEO metadata, fonts, metadataBase |
| `public/logos/` | 25 local logo files |
| `public/*.jpg` | Photos from LinkedIn export |

---

## Tech Stack

- Next.js 16.2.0 App Router + TypeScript strict
- Tailwind CSS v4
- Framer Motion via `LazyMotion + domAnimation` — always `m.*` not `motion.*`
- `next/font/google`: Playfair Display, DM Sans, DM Mono
- `react-simple-maps` v3 + world-atlas topojson
- Vercel (auto-deploy on push to master)

---

*Last updated: 2026-03-20 — Major narrative rework, Barbershop theme, animated flight paths, Intersection + Bridge sections, 10 writing posts.*
