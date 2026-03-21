# HANDOFF — Vidit Dugar Portfolio Website

> Paste this file into any new Claude context to resume instantly.

---

## What We're Building

Single-page scrolling portfolio website for **Vidit Dugar** — personal brand site for VC partners who want to understand who Vidit is, and founders who want to know if he's someone worth knowing. Subtext: Vidit is looking to move into investing full-time. The site signals this without being an overt job application.

**PRD:** `vidit_dugar_portfolio_PRD.md`
**Visual Spec:** `VISUAL-SPEC.md` (source of truth for all design decisions)
**Video Script:** `VIDEO-SCRIPT.md`

---

## Current Status

**Phase:** Session 3 complete (2026-03-21)
**Last action:** All sections reviewed and polished. Writing + Footer enhanced with motion and editorial details.

**Live URL:** `https://vidit-portfolio-vert.vercel.app`
**GitHub:** `https://github.com/orlyopenai-create/vidit-portfolio` (auto-deploys on push to master)

**Build status:** Passing (`npm run build` — 0 TypeScript errors, 0 warnings)

**Section progress:** Hero ✅ Journey ✅ Intersection ✅ Fund ✅ Writing ✅ Footer ✅ | Bridge — pending review

---

## Site Sections (current scroll order)

1. **Hero** — Split layout. Left: word-by-word stagger headline + name/location. Right: portrait video (9:16) with always-visible play/pause + mute controls. Ambient gold orb drifts in background. Cursor spotlight follows mouse. Headline: "Kolkata. London. Delhi. / Operating, Finance, Investing. / All roads led back to founders." Decorative gold rule above headline.
2. **The Journey** — `bg-background`. SectionLabel "THE JOURNEY". Title "Four cities. One thread." World map with animated flight paths (sequential draw). Animated plane circuits Kolkata→Mumbai→London→Delhi→Kolkata continuously after lines draw. City pins pulse. Click popout cards. Map scale 520, centered on India–UK corridor.
3. **The Intersection** — `bg-surface`. SectionLabel "THE INTERSECTION". Title "Three worlds. One lens." Three editorial pillar cards (Finance / Operations / Content) with decorative 01/02/03 numbers. "Operator-Investor" gold badge below with connecting lines.
4. **The Bridge** — `bg-surface`. SectionLabel "THE BRIDGE". Title "The Bridge". 3 episode cards, 16:9 thumbnails, topic pill, play overlay on hover.
5. **The Barbershop Fund** — `bg-[#080604]` (deepest dark). SectionLabel "THE BARBERSHOP FUND". Honest intro copy attributing fund to Shantanu. Stats: 25 companies / 1.8x MOIC (FUND) / 5 Shark Tank alumni. Portfolio highlights cards. "What I Look For" section. Logo constellation (burst + float on scroll). Click popout with valuation bar.
6. **Writing** — `bg-background`. SectionLabel "WRITING". Title "Thinking out loud." italic. Horizontal snap carousel, arrow nav, right fade gradient. Auto-advances every 4s (pauses on hover/touch). Cards stagger in on scroll. Hover reveals gold Cormorant pull-quote overlay.
7. **Footer** — `bg-surface`. Two-column: left = section jump nav (Journey/Intersection/Fund/Bridge/Writing) in Playfair. Right = "Let's talk." + pulsing green availability badge + email/LinkedIn. Cormorant italic pull quote above divider. "Third-generation builder from Kolkata." emotional signature.

---

## Design Spec (Ink Night Palette — locked)

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#0D0B09` | Page bg, hero, journey, writing sections |
| Surface | `#161210` | Intersection, bridge, footer sections |
| Text | `#F2EAE0` | All body text |
| Accent gold | `#C4832A` | Labels, stat numbers, Kolkata pin, badges |
| Dark bg | `#080604` | Fund section (deepest) |
| Dark surface | `#161210` | Fund logo tiles, fund modal, highlight cards |
| Dark text | `#F2EAE0` | Same as main text (whole site is dark) |

**Typography:**
- Hero display: Playfair Display `clamp(2.5rem,5vw,6.5rem)` bold
- Section title: Playfair Display `clamp(2.5rem,5vw,5rem)` normal
- Pull quotes / italic subheadings: **Cormorant Garamond** `font-subheading`
- Section label: Inter 0.7rem 600 tracking-[0.2em] uppercase gold
- Stat numbers: DM Mono `clamp(2.5rem,5vw,5rem)` gold
- Body: **Inter** 1rem leading-[1.75]

**Font variables:**
- `--font-display`: Playfair Display
- `--font-subheading`: Cormorant Garamond (italic moments, pull quotes)
- `--font-body`: Inter
- `--font-mono`: DM Mono

---

## Motion System

- **Lenis smooth scroll** — `LenisProvider.tsx` wraps app, 1.2s duration
- **Lando easing** — `[0.65, 0.05, 0, 1]` on all primary reveals
- **Spring easing** — `[0.16, 1, 0.3, 1]` for entrance reveals (video, etc.)
- **ClipReveal** — `components/ui/ClipReveal.tsx`: overflow-hidden wrapper + y: 105%→0% reveal
- **SectionLabel** — fade in + scaleX rule 0→40px
- **Hero word-stagger** — `WordReveal` component: each word clips up individually, 70ms stagger between words
- **Hero cursor spotlight** — mouse-following radial gradient `rgba(196,131,42,0.055)`
- **Hero ambient orb** — 22s drifting warm glow behind text column
- **Hero parallax** — 140vh sticky zone; text `-80px`, video `-40px` (different rates)
- **Video entrance** — scale `0.88→1` + y `40→0` with spring ease
- **Logo constellation burst** — `useInView` gated, scale 0→1 spring stagger
- **Logo float** — CSS `logo-float` / `logo-float-grid` keyframes
- **Count-up stats** — `FundAnimations.tsx`, ease-out cubic 1500ms
- **Valuation bars** — spring physics (stiffness 60, damping 20) in LogoGrid modal
- **Map flight paths** — strokeDashoffset animate 1.0s sequential, delay 0.5+i*1.0s
- **Map plane** — RAF loop, ease-in-out cubic lerp between waypoints, starts after 5.2s, loops forever
- **prefers-reduced-motion** — CSS global disables all animations

---

## Critical Constraints

- **NO headshot in hero** — text-only (video is the human presence)
- **NOT an overt job application** — intent (move into investing) signalled in video outro + footer CTA. No "open to roles" copy.
- **Honest attribution** — £6Bn M&A = Nomura's deals. 1.8x = Fund MOIC not personal. 400K = Shantanu's channel.
- **`m.*` not `motion.*`** — LazyMotion at root
- **Whole site is dark** — Ink Night palette. No separate "dark section" concept; Fund uses `#080604` (slightly deeper) for contrast.
- **Data layer** — `lib/data/*.ts` editable for content; don't restructure interfaces.

---

## The Intersection Section

Three editorial pillar cards (replaced SVG Venn — text was overlapping):
- **01 Finance**: Nomura London EMEA M&A, Renewable energy/consumer/financial services, India's first sovereign Green Samurai bond
- **02 Operations**: Chief of Staff BSC, P&L/teams/0→1 brands, Head of Business Orly est. 1989
- **03 Content**: The Bridge YouTube IP, The Orly Times newspaper, LinkedIn writing on brands/capital
- Centre badge: "Operator-Investor" in Cormorant italic gold

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
- Portfolio highlights from Q3 FY26 investment update PDF: Go Zero (12x), Kilrr (5x/Shark Tank), Epithera (100% clinical trial), Crest Wealth (₹100Cr commitments)

---

## Portfolio Logo Constellation — Sector Buckets

| Sector | Companies |
|--------|-----------|
| Food & Beverage | Go Zero, Anveshan, Kilrr, Fishmongers, Better Nutrition, Basil |
| Fashion & Lifestyle | Wanderlooms, Woodsmen, Fiona Diamonds, ReplyAll |
| Pet & Lifestyle | Absolut Pet |
| Fintech | SBNRI, RocketPay, Crest Wealth, Done Deal |
| Health & Wellness | Epithera, BetterPlace Health, Yuomo |
| Climate & Mobility | EVeez, Kritsnam, Mekr |
| InsurTech | OctoLife |
| Home & Furniture | Relso |
| AI & Tech | Kookar.AI |
| Education | Anandi School |

5 companies have investment detail popouts: Go Zero (12x), Kilrr (5x), Fishmongers (5x), Anveshan (2.5x), Mekr (2x)

**Center icon:** `/public/logos/barbershop-cover.png`
**Logo rendering:** No mix-blend-mode. Text fallback on onError.
**Positions:** 25 pre-defined scatter positions in 3 rings around center (POSITIONS array in LogoGrid.tsx)

---

## Key Files

| File | Purpose |
|------|---------|
| `lib/data/journey.ts` | 4 city pins + descriptions for world map |
| `lib/data/barbershop.ts` | 3 Bridge episode cards |
| `lib/data/fund.ts` | Fund stats, 25 portfolio companies |
| `lib/data/media.ts` | 10 LinkedIn posts |
| `components/ui/LenisProvider.tsx` | Lenis smooth scroll wrapper |
| `components/ui/SectionLabel.tsx` | Gold uppercase label + animated rule |
| `components/ui/ClipReveal.tsx` | Clip-up text reveal animation |
| `components/hero/HeroAnimations.tsx` | Hero — word stagger, cursor spotlight, ambient orb, split video layout |
| `components/journey/WorldMap.tsx` | Map + flight paths + animated plane circuit + city popouts |
| `components/intersection/IntersectionAnimations.tsx` | Three pillar cards + Operator-Investor badge |
| `components/barbershop/BridgeAnimations.tsx` | Bridge episode cards |
| `components/fund/FundAnimations.tsx` | Fund stats, highlights, What I Look For |
| `components/fund/LogoGrid.tsx` | Logo constellation — burst, float, tooltip, modal |
| `components/media/MediaAnimations.tsx` | Writing carousel |
| `components/sections/FooterSection.tsx` | "Let's talk." + emotional signature |
| `app/globals.css` | Ink Night palette CSS vars + keyframes + reduced-motion |
| `app/layout.tsx` | Fonts: Playfair + Cormorant Garamond + Inter + DM Mono |
| `app/page.tsx` | Section order: Hero→Journey→Intersection→Bridge→Fund→Writing→Footer |
| `public/intro.mp4` | Portrait video (3.8MB, 9:16) |
| `public/intro-poster.jpg` | Video poster (105KB) |
| `public/logos/` | 25 local logo files + barbershop-cover.png |

---

## Tech Stack

- Next.js 16.2.0 App Router + TypeScript strict
- Tailwind CSS v4 (CSS vars via @theme block)
- Framer Motion via `LazyMotion + domAnimation` — always `m.*` not `motion.*`
- Lenis smooth scroll (`npm install lenis`)
- `next/font/google`: Playfair Display, Cormorant Garamond, Inter, DM Mono
- `react-simple-maps` v3 + world-atlas topojson
- Vercel (auto-deploy on push to master)

---

## Pending / Open Items

- [ ] **Bridge** — section review still pending (last section)
- [ ] **Domain** — `viditdugar.orlyfashion.com`. Update `metadataBase` in `app/layout.tsx` when ready.
- [ ] **Logo IP** — confirm stealth portfolio companies before sharing URL publicly.
- [ ] **Other logos** — check remaining logos for visibility issues. Use `tileBg` or `logoFilter` fields, or fetch from company websites.

---

*Last updated: 2026-03-21 — Session 3 complete: map fixed (projection, plane great-circle, Africa clip), Intersection copy reworked from CV, Fund section moved before Bridge, portfolio data populated from Q3 FY26 PDF, logo fixes, Writing carousel enhanced (auto-advance + pull-quote overlay + staggered entrance), Footer rebuilt (nav col + availability badge + pull quote).*
