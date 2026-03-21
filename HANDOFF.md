# HANDOFF — Vidit Dugar Portfolio Website

> Paste this file into any new Claude context to resume instantly.

---

## What We're Building

Single-page scrolling portfolio website for **Vidit Dugar** — personal brand site for VC partners who want to understand who Vidit is, and founders who want to know if he's someone worth knowing.

**PRD:** `vidit_dugar_portfolio_PRD.md`
**Visual Spec:** `VISUAL-SPEC.md` (source of truth for all design decisions)

---

## Current Status

**Phase:** Full visual layer rewrite complete (2026-03-20)
**Last action:** Complete rebuild of all components and styles per VISUAL-SPEC.md. New "The Storyteller" concept — Lenis smooth scroll, ClipReveal animations, dark Fund section, honest copy framing, no headshot in hero.

**Live URL:** `https://vidit-portfolio-vert.vercel.app`
**GitHub:** `https://github.com/orlyopenai-create/vidit-portfolio` (auto-deploys on push to master)

**Build status:** Passing (`npm run build` — 0 TypeScript errors, 0 warnings)

---

## Site Sections (current scroll order)

1. **Hero** — Full-viewport, text-only. "VD" monogram top-left. Four headline lines in Playfair Display (up to 8rem) clip-up on load. Lines 3–4 italic, smaller. Name + location bottom-left in DM Sans gold. Scroll hint bottom-right.
2. **The Story** — `bg-surface`. SectionLabel "THE STORY". Pull quote in Playfair italic. 5-paragraph prose across 2 columns. Timeline pills: Mumbai/London/Delhi+Kolkata.
3. **The Journey** — `bg-background`. SectionLabel "THE JOURNEY". Title "Four cities. One thread." World map with animated flight paths. Kolkata pin gold (special). Click popout card with honest city descriptions.
4. **The Intersection** — `bg-surface`. SectionLabel "THE INTERSECTION". Title "Three worlds. One lens." SVG Venn: outline circles, labels outside. Finance/Operations/Content. "Operator-Investor" in gold at centre. Mobile: stacked cards.
5. **The Bridge** — `bg-surface`. SectionLabel "THE BRIDGE". Title "The Bridge" 5rem Playfair. 3 episode cards, 16:9 thumbnails, topic pill, play overlay on hover. No diagonal stripe.
6. **The Barbershop Fund** — `bg-[#1C1410]` (DARK). SectionLabel "THE BARBERSHOP FUND" (gold, dark=true). Honest intro copy attributing fund to Shantanu. Stats: 25 companies / 1.8x MOIC (FUND) / 5 Shark Tank alumni. "What I Look For" section. Logo grid (dark tiles). Click popout with valuation bar + spring animation.
7. **Writing** — `bg-background`. SectionLabel "WRITING". Title "Thinking out loud." italic. 18K subtitle. Horizontal snap carousel with bigger cards (w-80), arrow nav, right fade gradient.
8. **Footer** — `bg-surface`. Large "Let's talk." Playfair. Email + LinkedIn links. Gold on hover. Divider. "Third-generation builder from Kolkata." emotional signature.

---

## Design Spec (Warm Sand Palette — locked)

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#F5EFE6` | Page bg, hero, journey, writing sections |
| Surface | `#EDE4D8` | Story, intersection, bridge, footer sections |
| Text | `#241E18` | All body text |
| Accent gold | `#A6701A` | Labels, stat numbers, Kolkata pin, centre Venn text |
| Dark bg | `#1C1410` | Fund section only |
| Dark surface | `#2A1F14` | Fund logo tiles, fund modal |
| Dark text | `#F0E8DC` | Text in Fund section |

**Typography:**
- Hero display: Playfair Display `clamp(3rem,7vw,8rem)` bold
- Section title: Playfair Display `clamp(2.5rem,5vw,5rem)` normal
- Section italic: Playfair Display `clamp(2rem,5vw,5.5rem)` normal italic
- Section label: DM Sans 0.7rem 600 tracking-[0.2em] uppercase gold
- Stat numbers: DM Mono `clamp(2.5rem,5vw,5rem)` gold
- Body: DM Sans 1.05rem leading-[1.75]

---

## Motion System

- **Lenis smooth scroll** — `LenisProvider.tsx` wraps app, 1.2s duration
- **Lando easing** — `[0.65, 0.05, 0, 1]` on all primary reveals
- **ClipReveal** — `components/ui/ClipReveal.tsx`: overflow-hidden wrapper + y: 105%→0% reveal
- **SectionLabel** — fade in + scaleX rule 0→40px
- **Hero clip-up** — staggered: 0.3s / 0.45s / 0.65s / 1.0s / 1.3s
- **Hero parallax** — 140vh sticky zone, content fades + rises on scroll
- **Count-up stats** — `FundAnimations.tsx` local impl, ease-out cubic 1500ms
- **Valuation bars** — spring physics (stiffness 60, damping 20) in LogoGrid modal
- **Map flight paths** — strokeDashoffset animate 1.0s sequential
- **prefers-reduced-motion** — CSS global disables all animations

---

## Critical Constraints

- **NO headshot in hero** — text-only
- **NO "seeking VC roles"** — not a job application, personal brand
- **Honest attribution** — £6Bn M&A = Nomura's deals. 1.8x = Fund MOIC not personal. 400K = Shantanu's channel.
- **`m.*` not `motion.*`** — LazyMotion at root
- **One dark section only** — Fund section (`#1C1410`)
- **Data layer untouched** — `lib/data/*.ts` never modified

---

## The Intersection Section

SVG Venn diagram (desktop), mobile stacked cards:
- **Finance** (left): Nomura London, Large-cap M&A, Sovereign Green Samurai bond
- **Operations** (right): Chief of Staff BSC, Head of Business Orly, P&L/teams/brands
- **Content** (top): The Bridge IP, The Orly Times, 18K LinkedIn
- Centre: "Operator-Investor" in Playfair italic gold

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

## Fund Section — Honest Framing

**CRITICAL:** Barbershop Fund is Shantanu Deshpande's fund. Vidit was sole investment professional.
- Stats labeled "MOIC (FUND)" not personal track record
- Intro copy explicit: "built by Shantanu Deshpande, founder of Bombay Shaving Company"
- "What I Look For" framed as learnings, not GP mandate

**What I Look For:**
- In Founders: Deep domain expertise · Irrational conviction · Would build without funding
- In Companies: Brand as a moat · Content-led growth · Category creation

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

**Logo failures:** `onError` now shows company name as text fallback (not hidden tile)
**Modal a11y:** Escape key handler added, `aria-label` on close button

---

## Key Files

| File | Purpose |
|------|---------|
| `lib/data/hero.ts` | Name, descriptor, subline, career pills, cities, fund stats (untouched) |
| `lib/data/journey.ts` | 4 city pins for world map (untouched) |
| `lib/data/barbershop.ts` | 3 Bridge episode cards (untouched) |
| `lib/data/fund.ts` | Fund stats, 25 portfolio companies (untouched) |
| `lib/data/media.ts` | 10 LinkedIn posts (untouched) |
| `components/ui/LenisProvider.tsx` | Lenis smooth scroll wrapper (NEW) |
| `components/ui/SectionLabel.tsx` | Gold uppercase label + animated rule (NEW) |
| `components/ui/ClipReveal.tsx` | Clip-up text reveal animation (NEW) |
| `components/hero/HeroAnimations.tsx` | Full-viewport text-only hero, clip-up lines |
| `components/sections/StorySection.tsx` | Story section with pull quote + prose (NEW) |
| `components/journey/WorldMap.tsx` | Map + gold Kolkata pin + redesigned popouts |
| `components/intersection/IntersectionAnimations.tsx` | SVG Venn, labels outside circles |
| `components/barbershop/BridgeAnimations.tsx` | Bridge episode cards (clean, no stripe) |
| `components/fund/FundAnimations.tsx` | Dark section, honest stats, count-up |
| `components/fund/LogoGrid.tsx` | Dark logo grid + text fallback + keyboard a11y |
| `components/media/MediaAnimations.tsx` | Writing carousel with SectionLabel |
| `components/media/LinkedInCard.tsx` | Bigger cards with gold date + hover lift |
| `components/sections/FooterSection.tsx` | "Let's talk." + emotional signature |
| `app/globals.css` | Palette CSS vars + keyframes + reduced-motion guard |
| `app/layout.tsx` | LenisProvider added, updated metadata |
| `app/page.tsx` | New section order, no MarqueeStrip/PhilosophySection etc |
| `public/logos/` | 25 local logo files |
| `public/*.jpg` | Photos from LinkedIn export |

---

## Tech Stack

- Next.js 16.2.0 App Router + TypeScript strict
- Tailwind CSS v4 (CSS vars via @theme block)
- Framer Motion via `LazyMotion + domAnimation` — always `m.*` not `motion.*`
- Lenis smooth scroll (`npm install lenis`)
- `next/font/google`: Playfair Display, DM Sans, DM Mono
- `react-simple-maps` v3 + world-atlas topojson
- Vercel (auto-deploy on push to master)

---

## Pending / Open Items

- [ ] **Domain** — `vidit.vc` vs `viditdugar.com`. Update `metadataBase` in `app/layout.tsx`.
- [ ] **Logo IP** — confirm stealth portfolio companies before sharing URL publicly.
- [ ] **Photo swaps** — some writing card photos are thematic matches. Swap in `lib/data/media.ts`.
- [ ] **LinkedIn post direct URLs** — currently some are profile-level. Update when direct URLs confirmed.
- [ ] **Kolkata location in hero** — currently shows "Kolkata, India" (overrides old "Delhi, India" from data). Confirm this is correct.

---

*Last updated: 2026-03-20 — Full visual layer rebuild per VISUAL-SPEC.md "The Storyteller" concept. All components rewritten. Build passing (0 errors).*
