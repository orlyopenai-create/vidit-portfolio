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

**Phase:** Session 2 polish complete (2026-03-21)
**Last action:** Video intro section live, logo constellation, Intersection redesign, font upgrade, map route fix, spacing overhaul.

**Live URL:** `https://vidit-portfolio-vert.vercel.app`
**GitHub:** `https://github.com/orlyopenai-create/vidit-portfolio` (auto-deploys on push to master)

**Build status:** Passing (`npm run build` — 0 TypeScript errors, 0 warnings)

---

## Site Sections (current scroll order)

1. **Hero** — Full-viewport, text-only. "VD" monogram top-left. Four headline lines in Playfair Display (up to 8rem) clip-up on load. Lines 3–4 italic, smaller. Name + location bottom-left in Inter gold. Scroll hint bottom-right.
2. **Video Intro** — `bg-[#1C1410]`. SectionLabel "IN MY OWN WORDS". Vidit's 45-sec personal intro video (compressed, 3.8MB). Contained `max-w-3xl`, lazy-loads on scroll, muted autoplay with "Tap to unmute" center overlay. `poster="/intro-poster.jpg"`. Cormorant italic bridge line below: "Scroll to see the work."
3. **The Journey** — `bg-background`. SectionLabel "THE JOURNEY". Title "Four cities. One thread." World map with animated flight paths. Routes: Kolkata→Mumbai→London→Delhi→Kolkata (full circle). Kolkata pin gold (home/special). Click popout card with honest city descriptions. Scale 320.
4. **The Intersection** — `bg-surface`. SectionLabel "THE INTERSECTION". Title "Three worlds. One lens." Three editorial pillar cards (Finance / Operations / Content) with decorative 01/02/03 numbers. "Operator-Investor" gold badge below with connecting lines. No SVG Venn.
5. **The Bridge** — `bg-surface`. SectionLabel "THE BRIDGE". Title "The Bridge". 3 episode cards, 16:9 thumbnails, topic pill, play overlay on hover.
6. **The Barbershop Fund** — `bg-[#1C1410]` (DARK). SectionLabel "THE BARBERSHOP FUND" (gold, dark=true). Honest intro copy attributing fund to Shantanu. Stats: 25 companies / 1.8x MOIC (FUND) / 5 Shark Tank alumni. Portfolio highlights cards (4 standouts from PDF). "What I Look For" section. Logo constellation (burst + float on scroll). Click popout with valuation bar.
7. **Writing** — `bg-background`. SectionLabel "WRITING". Title "Thinking out loud." italic. No follower count. Horizontal snap carousel, arrow nav, right fade gradient.
8. **Footer** — `bg-surface`. Large "Let's talk." Playfair. Email + LinkedIn links. Gold on hover. "Third-generation builder from Kolkata." emotional signature.

---

## Design Spec (Warm Sand Palette — locked)

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#F5EFE6` | Page bg, hero, journey, writing sections |
| Surface | `#EDE4D8` | Intersection, bridge, footer sections |
| Text | `#241E18` | All body text |
| Accent gold | `#A6701A` | Labels, stat numbers, Kolkata pin, badges |
| Dark bg | `#1C1410` | Fund section + Video intro section |
| Dark surface | `#2A1F14` | Fund logo tiles, fund modal, highlight cards |
| Dark text | `#F0E8DC` | Text in dark sections |

**Typography (updated 2026-03-21):**
- Hero display: Playfair Display `clamp(3rem,7vw,8rem)` bold
- Section title: Playfair Display `clamp(2.5rem,5vw,5rem)` normal
- Pull quotes / italic subheadings: **Cormorant Garamond** `font-subheading` — replaces Playfair italic in these contexts
- Section label: Inter 0.7rem 600 tracking-[0.2em] uppercase gold
- Stat numbers: DM Mono `clamp(2.5rem,5vw,5rem)` gold
- Body: **Inter** 1rem leading-[1.75] — replaced DM Sans

**Font variables:**
- `--font-display`: Playfair Display
- `--font-subheading`: Cormorant Garamond (italic moments, pull quotes)
- `--font-body`: Inter
- `--font-mono`: DM Mono

---

## Motion System

- **Lenis smooth scroll** — `LenisProvider.tsx` wraps app, 1.2s duration
- **Lando easing** — `[0.65, 0.05, 0, 1]` on all primary reveals
- **ClipReveal** — `components/ui/ClipReveal.tsx`: overflow-hidden wrapper + y: 105%→0% reveal
- **SectionLabel** — fade in + scaleX rule 0→40px
- **Hero clip-up** — staggered: 0.3s / 0.45s / 0.65s / 1.0s / 1.3s
- **Hero parallax** — 140vh sticky zone, content fades + rises on scroll
- **Logo constellation burst** — `useInView` gated, scale 0→1 spring stagger (delay 0.05s per logo), fires on scroll into view
- **Logo float** — CSS `logo-float` / `logo-float-grid` keyframes, starts 1.8s after burst, unique timing per logo
- **Count-up stats** — `FundAnimations.tsx` local impl, ease-out cubic 1500ms
- **Valuation bars** — spring physics (stiffness 60, damping 20) in LogoGrid modal
- **Map flight paths** — strokeDashoffset animate 1.0s sequential, delay 0.5+i*1.0s
- **prefers-reduced-motion** — CSS global disables all animations

---

## Critical Constraints

- **NO headshot in hero** — text-only
- **NOT an overt job application** — but the intent (move into investing) is signalled clearly in the video outro and footer CTA. Don't add "open to roles" copy anywhere on the page.
- **Honest attribution** — £6Bn M&A = Nomura's deals. 1.8x = Fund MOIC not personal. 400K = Shantanu's channel.
- **`m.*` not `motion.*`** — LazyMotion at root
- **Two dark sections** — Fund section + Video Intro section (both `#1C1410`)
- **Data layer** — `lib/data/*.ts` should not be modified except `fund.ts` for sector corrections

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

**Center icon:** `/public/logos/barbershop-cover.png` — YouTube channel icon for @thebarbershopwithshantanu6670
**Logo rendering:** No mix-blend-mode (removed — was causing B&W). Text fallback on onError.
**Positions:** 25 pre-defined scatter positions in 3 rings around center (POSITIONS array in LogoGrid.tsx)

---

## Key Files

| File | Purpose |
|------|---------|
| `lib/data/hero.ts` | Name, descriptor, subline, career pills, cities, fund stats |
| `lib/data/journey.ts` | 4 city pins for world map |
| `lib/data/barbershop.ts` | 3 Bridge episode cards |
| `lib/data/fund.ts` | Fund stats, 25 portfolio companies (sectors updated) |
| `lib/data/media.ts` | 10 LinkedIn posts |
| `components/ui/LenisProvider.tsx` | Lenis smooth scroll wrapper |
| `components/ui/SectionLabel.tsx` | Gold uppercase label + animated rule |
| `components/ui/ClipReveal.tsx` | Clip-up text reveal animation |
| `components/hero/HeroAnimations.tsx` | Full-viewport text-only hero, clip-up lines |
| `components/sections/VideoIntroSection.tsx` | Video intro — lazy load, muted autoplay, unmute overlay |
| `components/sections/StorySection.tsx` | OLD story section — kept but removed from page.tsx |
| `components/journey/WorldMap.tsx` | Map + 4 routes incl. Kolkata→Mumbai + popouts |
| `components/intersection/IntersectionAnimations.tsx` | Three pillar cards + Operator-Investor badge |
| `components/barbershop/BridgeAnimations.tsx` | Bridge episode cards |
| `components/fund/FundAnimations.tsx` | Dark section, stats, portfolio highlights, What I Look For |
| `components/fund/LogoGrid.tsx` | Logo constellation — burst, float, hover tooltip, modal |
| `components/media/MediaAnimations.tsx` | Writing carousel |
| `components/media/LinkedInCard.tsx` | LinkedIn post cards |
| `components/sections/FooterSection.tsx` | "Let's talk." + emotional signature |
| `app/globals.css` | Palette CSS vars + logo-float keyframes + reduced-motion |
| `app/layout.tsx` | Fonts: Playfair + Cormorant Garamond + Inter + DM Mono |
| `app/page.tsx` | Section order: Hero→Video→Journey→Intersection→Bridge→Fund→Writing→Footer |
| `public/intro.mp4` | Compressed intro video (3.8MB) |
| `public/intro-poster.jpg` | Video poster/thumbnail (105KB) |
| `public/logos/` | 25 local logo files + barbershop-cover.png (center icon) |
| `VIDEO-SCRIPT.md` | Shooting script for video (5 beats, ~110 words, ~45s) |

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

- [ ] **Map city photos** — Vidit adding photos from each location (Mumbai/London/Delhi/Kolkata). Wire into city popout cards on WorldMap.tsx once dropped into `/public`.
- [ ] **Domain** — `vidit.vc` vs `viditdugar.com`. Update `metadataBase` in `app/layout.tsx`.
- [ ] **Logo IP** — confirm stealth portfolio companies before sharing URL publicly.
- [ ] **LinkedIn post direct URLs** — currently some are profile-level. Update in `lib/data/media.ts` when direct URLs confirmed.
- [ ] **Writing card photos** — swap thematic photos in `lib/data/media.ts`.

---

*Last updated: 2026-03-21 — Video intro live, logo constellation with burst+float, Intersection redesigned to 3 pillar cards, font upgrade (Inter body + Cormorant Garamond subheadings), Kolkata→Mumbai map route added, spacing tightened across all sections.*
