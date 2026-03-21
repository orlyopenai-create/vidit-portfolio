# Visual Spec — Vidit Dugar Portfolio
> Version 2.0 — "The Storyteller" concept
> Last updated: 2026-03-20

---

## Concept

**"Third-generation builder. First-generation investor. The thread connecting them has always been story."**

Vidit is a storyteller who can read a balance sheet. His first job was creating physical storytelling events in Mumbai. Everything since — the IB deals, supporting the Barbershop Fund, the content IP, returning to Orly — has been the same instinct at different scales. The website tells that story. It doesn't announce impressiveness. It reveals it, section by section, like turning pages of a beautifully made book.

**Emotional goal:** Reader finishes scrolling and thinks *"I want to be the one who backs this person."*

**What this site is NOT:** A job application. It's a personal brand — for VC partners who want to understand who Vidit is, and founders who want to know if he's someone worth knowing.

**Tone:** Warm, honest, specific. Facts do the bragging. No big claims.

**Energy:** Lando Norris website (bold, cinematic, alive) — but in warm sand, not dark green.

---

## Palette (locked)

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#F5EFE6` | Page background |
| `--surface` | `#EDE4D8` | Section alternates, cards |
| `--text` | `#241E18` | All body text |
| `--accent` | `#A6701A` | Gold — section labels, stat numbers, pull quote marks, horizontal rules |
| `--dark-bg` | `#1C1410` | Fund section background only |
| `--dark-text` | `#F0E8DC` | Text on dark section |
| `--dark-surface` | `#2A1F14` | Cards/surfaces within dark section |

---

## Typography System

| Role | Font | Size | Weight | Leading | Tracking |
|------|------|------|--------|---------|----------|
| Hero display | Playfair Display | clamp(4rem, 9vw, 9rem) | 700 | 0.95 | -0.02em |
| Section title | Playfair Display | clamp(2.5rem, 5vw, 5rem) | 400 | 1.1 | -0.01em |
| Section title italic | Playfair Display | clamp(2rem, 4vw, 4rem) | 400 italic | 1.15 | 0 |
| Pull quote | Playfair Display | clamp(1.5rem, 2.5vw, 2.5rem) | 400 italic | 1.4 | 0 |
| Lead / intro | DM Sans | clamp(1.1rem, 1.5vw, 1.4rem) | 400 | 1.7 | 0 |
| Body | DM Sans | 1.05rem | 400 | 1.75 | 0 |
| Section label / eyebrow | DM Sans | 0.7rem | 600 | 1 | 0.2em |
| Stat number | DM Mono | clamp(2.5rem, 5vw, 5rem) | 400 | 1 | -0.02em |
| Stat label | DM Sans | 0.75rem | 500 | 1.3 | 0.1em |
| Caption | DM Sans | 0.8rem | 400 | 1.5 | 0 |

**Section label treatment (used on every section):**
```
THE STORY        ← DM Sans 0.7rem 600 tracking-[0.2em] uppercase text-[--accent]
────────         ← 2px gold horizontal rule, 40px wide, animates in width 0→40px
```

---

## Spacing System

| Token | Value |
|-------|-------|
| Section vertical padding | `py-24 md:py-36 lg:py-48` |
| Container max-width | `max-w-6xl mx-auto px-6 md:px-12` |
| Hero bottom padding | `pb-16` |
| Between section label and title | `mt-4` |
| Between title and body | `mt-8 md:mt-12` |

---

## Motion System

**The "Lando Easing":** `cubic-bezier(0.65, 0.05, 0, 1)` — used for ALL primary reveals. Dramatic deceleration that snaps into place.

**Smooth scroll:** Lenis (to be added as new dependency). Replaces default browser scroll. Makes everything feel expensive.

| Animation type | Duration | Easing | Notes |
|----------------|----------|--------|-------|
| Clip-up reveal (headline lines) | 0.75s | `cubic-bezier(0.65, 0.05, 0, 1)` | Lines clip up from y:60, clipPath |
| Word stagger | 0.6s per word | same | 80ms between words |
| Section element entry | 0.5s | same | y:30→0 + opacity |
| Gold rule expand | 0.5s | `ease-out` | width 0→40px |
| Stat count-up | 1.5s | ease-out cubic | triggers on inView |
| Valuation bar fill | 1.2s | spring (stiffness 60, damping 20) | overshoots slightly |
| Card hover | 0.2s | `ease` | y: 0→-4px |
| Map path draw | 0.8s per arc | `ease-in-out` | sequential, not parallel |
| Modal open | 0.4s | `cubic-bezier(0.65, 0.05, 0, 1)` | clip-path inset |

**prefers-reduced-motion:** All animations reduce to simple opacity fade (0.3s) with no transforms.

---

## 1. HERO SECTION

**Layout:** Full viewport (`min-h-screen`). Text-only, no headshot.

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                   │
│  VD                                              [nav hidden]     │
│                                                                   │
│                                                                   │
│                                                                   │
│         Third-generation builder.                                 │
│         First-generation investor.                                │  ← 7-9rem Playfair 700
│         The thread connecting them                                │
│         has always been story.                                    │
│                                                                   │
│                                                                   │
│  Vidit Dugar                                                      │  ← DM Sans 0.9rem, gold
│  Delhi, India                                                     │
│                                                                   │
│                                      ↓ scroll                     │
└─────────────────────────────────────────────────────────────────┘
```

**Headline treatment:** "Third-generation builder." and "First-generation investor." are the big lines. "The thread connecting them / has always been story." is slightly smaller (70% size) in italic.

**Load sequence:**
1. `0ms` — BG loads, VD monogram appears (opacity 0→1, 0.4s)
2. `300ms` — Line 1 clips up (0.75s)
3. `450ms` — Line 2 clips up (0.75s)
4. `700ms` — Lines 3–4 (italic, smaller) clip up (0.6s)
5. `1000ms` — Name + location fades in (0.4s)
6. `1300ms` — Scroll hint pulses in

**Clip-up technique:**
```css
/* Each line wrapped in overflow-hidden div */
.line-wrapper { overflow: hidden; }
.line { transform: translateY(60px); opacity: 0; }
/* Animated to: transform: translateY(0); opacity: 1; */
```

**Scroll behavior:** On scroll, hero content parallaxes at 0.15x rate. Scroll hint fades out at 10% scroll progress.

---

## 2. THE STORY

**Section label:** THE STORY (gold)
**Title:** *"Both sides of the table — and the room in between."* (Playfair italic, 3.5rem)

**Pull quote (first, large):**
> *"I went from modelling billion-pound deals in London to backing ice cream brands from inside a startup. The lens didn't change — only the table."*

**Prose:** Two columns on desktop (each max 60ch), single column mobile. ~250 words. Reveals paragraph by paragraph on scroll.

**Timeline pills (bottom):**
Three horizontal pills with year ranges — `Mumbai · 2018–2019`, `London · 2019–2023`, `Delhi/Kolkata · 2023–now`. Each has a subtle icon or dot.

**Background:** `--surface` (#EDE4D8) — differentiated from hero.

---

## 3. THE JOURNEY

**Section label:** THE JOURNEY
**Title:** "Four cities. One thread." (Playfair, 4rem)
**Subtitle:** "Mumbai to London to Delhi, and back to where it started." (DM Sans italic)

**Map:** Full-width, 65vh height. Warm sand background tones. Minimal geography — just enough landmass to show the journey.

**City sequence (animated in order on scroll entry):**
1. Mumbai — "Where I learned to tell stories"
2. London — "Where I learned rigour"
3. Delhi — "Where I learned to build"
4. Kolkata — "Home. Third-generation. Returning with new eyes." ← **special treatment: pin is gold, not the standard colour**

**City popout card (click):**
```
┌─────────────────────┐
│ LONDON              │  ← DM Sans uppercase tracking
│ ─────               │  ← gold rule
│ 2019 – 2023         │  ← DM Mono
│                     │
│ Investment Banking  │  ← DM Sans 1rem
│ Nomura              │
│                     │
│ "Every number       │  ← Playfair italic, small
│  checked twice."    │
└─────────────────────┘
```

**Flight path animation:** SVG `stroke-dashoffset` draws each arc sequentially with 400ms delay between cities. Arcs are curved, not straight lines.

---

## 4. THE INTERSECTION

**Section label:** THE INTERSECTION
**Title:** "Three worlds. One lens." (Playfair, 4rem)

**Venn diagram redesign:**
- Three circles — outlines only, very light fill (10% opacity of accent/surface)
- Labels OUTSIDE circles in bold DM Sans (not inside)
- Left circle: **Finance** | Right circle: **Operations** | Top circle: **Content**
- Below each label: 2–3 proof points in small text
- Centre intersection: **"Operator-Investor"** in Playfair Display italic, gold, revealed last

**Animation sequence on scroll:**
1. Left circle draws in (scale 0→1, 0.5s)
2. Right circle draws in (200ms delay)
3. Top circle draws in (400ms delay)
4. Labels fly in from their directions (600ms delay, 80ms stagger each)
5. Centre text fades in with slight scale (0.9→1.0, 800ms delay)

**Below diagram:** Three proof-point cards, one per world:
- Finance: "£6Bn in M&A deals advised. World's first Sovereign Green Samurai bond."
- Operations: "Chief of Staff, Bombay Shaving Company. P&L, teams, 0→1 brand building."
- Content: "Built The Bridge IP. 400K YouTube subscribers. ₹65L in brand revenue."

---

## 5. THE BRIDGE

**Section label:** THE BRIDGE
**Title:** "The Bridge" (Playfair Display, 5rem)
**Subtitle:** "2 CEOs vs 2 Gen Zs. An IP Vidit built, produced, and appeared in." (DM Sans, italic)

**Background:** `--surface` (#EDE4D8)

**Episode cards (3):** Large, almost film-poster proportions (16:9 thumbnail + metadata below)
- Thumbnail takes full card width
- On hover: thumbnail scales 1.0→1.03, play icon overlays (opacity 0→1)
- Below thumbnail: episode title (Playfair, 1.1rem), view count (DM Mono gold), duration

**Layout:** Three cards in a row on desktop, stacked on mobile. Cards appear with y:40→0 stagger on scroll.

**No diagonal stripe background.** Clean surface section instead.

---

## 6. THE BARBERSHOP FUND ← DARK SECTION

**Framing (critical):** This is Shantanu's fund — the Barbershop Fund — where Vidit was the sole investment professional supporting the founder. The copy must reflect this honestly. Vidit found, evaluated, and managed the portfolio relationships. He did not raise the fund or act as GP.

**Correct framing:** *"As the sole investment professional at The Barbershop Fund, I helped source, evaluate, and support 25 early-stage companies from 2023–2025."*

**Incorrect framing to avoid:** "I ran a fund", "my portfolio", "my investments", "1.8x MOIC" as a personal stat.

**Background:** `--dark-bg` (`#1C1410`) — the only dark section on the page.
**Text:** `--dark-text` (`#F0E8DC`)
**Accent in this section:** Same gold (#A6701A) — works beautifully on dark bg.

**Section label:** THE BARBERSHOP FUND (gold, on dark)
**Barber pole accent:** Appears next to the heading, subtle diagonal stripe in gold/cream.

### Section intro (honest, specific)
*"The Barbershop Fund is a ₹25Cr Category-I AIF built by Shantanu Deshpande, founder of Bombay Shaving Company. As the fund's sole investment professional, I ran deal flow, built the evaluation framework, and worked closely with every founder in the portfolio."*

### Stats Strip (fund-level stats, not personal claims)
Three DM Mono numbers in gold:

```
   25              1.8x            5
COMPANIES          MOIC        SHARK TANK
  BACKED         (FUND)         ALUMNI
```
Each number is `clamp(3rem, 6vw, 5.5rem)`. Count-up animation triggers on scroll entry. Note: "MOIC (FUND)" label is explicit that this is the fund's performance, not a personal track record.

### What I Look For
Framed as: *"Three years evaluating 200+ pitches gave me a clear sense of what separates the ones that break out."*
Two-column editorial on desktop:
- **In Founders:** Deep domain expertise · Irrational conviction · Singular focus · Would build without funding
- **In Companies:** Brand as a moat · Content-led growth · Category creation potential

### Portfolio Grid
- Sector labels: DM Sans 0.8rem 600 tracking-wide, gold on dark, above each group
- Logo tiles: dark surface bg (`--dark-surface`), logo in lighter tone
- Hover: tile brightens slightly, cursor pointer
- Click → popout modal

### Popout Modal
Clip-path reveal (inset 100%→0%). Dark surface background. Contains:
- Company name (Playfair, 2rem)
- Sector pill
- Entry/latest/multiple stats
- Animated valuation bar (spring physics, 1.2s, slight overshoot)
- Close button with Escape key handler + aria-label

---

## 7. WRITING

**Section label:** WRITING
**Title:** "Thinking out loud." (Playfair italic, 3.5rem)
**Subtitle:** "18K followers. Opinions on brands, capital, and building." (DM Sans)

**Carousel:** Horizontal snap scroll, 10 cards.
- Card: photo (top 55%), title in Playfair (1.1rem), date in DM Mono (0.8rem gold), 1-line excerpt
- Card hover: y: 0→-6px, subtle shadow increase, 0.2s ease
- Left/right arrow nav
- Right-edge fade gradient
- Drag/swipe on mobile

**Background:** `--bg` (#F5EFE6)

---

## 8. FOOTER

**Background:** `--surface` (#EDE4D8)

**Layout:**
```
                    Let's talk.               ← Playfair Display 5rem, centered

             viditdugar@gmail.com             ← DM Sans 1.1rem, clickable, gold on hover
                   LinkedIn ↗                 ← same size

──────────────────────────────────────────────

© Vidit Dugar 2026          Third-generation builder from Kolkata.
```

The closing line "Third-generation builder from Kolkata." is the emotional signature of the whole site — small, DM Sans, bottom right. Grounded. Human. Real.

**Footer CTA framing:** "Let's talk." — not "get in touch about opportunities" or any job-seeking language. This is a personal brand site, not a CV. The invite is open-ended: collaborate, connect, discuss ideas.

---

## New Components Required

| Component | Purpose | Notes |
|-----------|---------|-------|
| `LenisProvider` | Smooth scroll wrapper | New dependency: `lenis` |
| `ClipReveal` | Lines clip up on scroll entry | Reusable, accepts `delay` prop |
| `SplitWords` | Word-by-word stagger entrance | Takes `children` string, splits on spaces |
| `SectionLabel` | Gold uppercase label + animated rule | Used on every section |
| `StatStrip` | Hero bottom stat row | DM Mono, count-up on mount |
| `CityPopout` | Map city detail card | Redesigned from current tooltip |
| `DarkSection` | Wrapper for Fund section dark bg | Handles text colour flip |

---

## What Changes vs Current Site

| Area | Current | New |
|------|---------|-----|
| Hero | Headshot + name + descriptor pills | Text-only, 7-9rem type, clip-up reveal |
| Font scale | Max ~3rem headings | Up to 9rem display type |
| Animations | Fade + slide | Clip-up + split word + Lando easing |
| Scroll | Default browser | Lenis smooth scroll |
| Gold usage | Subtle underlines | Bold stats, labels, rules, pull quote marks |
| Fund section | Warm sand | Dark warm brown |
| Section labels | None | Gold uppercase tracking on every section |
| Venn | Filled circles, labels inside | Outline circles, labels outside, gold centre |
| Footer | Minimal | Large "Let's talk." + emotional sign-off |

---

## Build Strategy

**Keep (data layer intact):**
- `lib/data/*.ts` — all data files unchanged
- `next.config.ts`, `postcss.config.mjs`, fonts setup
- `app/layout.tsx` — add LenisProvider, update globals

**Rewrite (visual layer):**
- All components in `components/` — redesigned from scratch
- `app/globals.css` — updated tokens + new keyframes
- `app/page.tsx` — new section order

**New dependencies to add:**
- `lenis` — smooth scroll
- No other new deps needed

---

*This spec is the source of truth. All implementation follows this document.*
