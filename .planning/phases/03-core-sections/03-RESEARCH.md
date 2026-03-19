# Phase 3: Core Sections - Research

**Researched:** 2026-03-19
**Domain:** Next.js App Router section components, Framer Motion whileInView, Tailwind v4 layout, CSS filter tricks, responsive table/grid patterns
**Confidence:** HIGH

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| NARR-01 | About / The Story section with ~250-word narrative prose (investment banking → BSC/Barbershop Fund → Orly arc) | Full copy present in PRD Section 4.2; slot into `lib/data/` or inline in component |
| NARR-02 | Pull quote "Running a company taught me things no pitch deck ever could." in large Playfair Display | Blockquote pattern with `font-display` token; PRD confirms exact wording |
| NARR-03 | Section fade-in on scroll entry | `m.div whileInView viewport={{ once: true }}` — Phase 2 established pattern |
| PHIL-01 | Investment Philosophy section with 3 numbered pillars | `philosophyPillars` array already scaffolded in `lib/data/philosophy.ts`; bodies are placeholders |
| PHIL-02 | Each pillar displays full paragraph copy from PRD — no truncation | PRD Section 4.3 has all three body paragraphs verbatim |
| PHIL-03 | Clean numbered layout — not bullets, not cards; editorial typographic treatment | Numbered section approach using large `font-mono` numerals + Playfair pillar titles |
| TRACK-01 | Section header "The Barbershop Fund" with subtitle "₹25Cr Category-I AIF · 80 LPs · 2023–2025" | `fundData.name` + `fundData.subtitle` from `lib/data/fund.ts` |
| TRACK-02 | 4 fund summary animated stats using `fundStats` | `StatCountUp` component already built in Phase 2 — reuse directly |
| TRACK-03 | Standout investments table: 5 rows, 6 columns | `standoutInvestments` array in `lib/data/fund.ts`; all 5 rows have placeholder values — real data in PRD Section 4.4 |
| TRACK-04 | Full portfolio logo grid — 25 companies, 4–5 column layout | `portfolioCompanies` array (25 placeholders) in `lib/data/fund.ts`; logos in `/public/logos/` |
| TRACK-05 | Logos rendered white/monochrome via CSS `filter: brightness(0) invert(1)` | Pure CSS; no library needed; confirmed in PRD |
| TRACK-06 | Hover on logo reveals original color | CSS `hover:filter-none` or Tailwind `group-hover` toggle |
| TRACK-07 | Logos sourced via Brandfetch CDN where available; fallback to `/public/logos/` | Brandfetch CDN pattern: `https://cdn.brandfetch.io/[domain]/w/400/h/400/logo`; 25-company domain map in PRD |
| TRACK-08 | "We/the fund" framing throughout — no first-person singular for investment decisions | Copy discipline; no technical component needed |
| CASE-01 | Kilrr case study (~300 words) labelled "Investment Story" | Full copy in PRD Section 4.5 |
| CASE-02 | Section uses subtle background fill or left border accent | `bg-surface` (#EDE4D8) or `border-l-2 border-accent` — both available via Tailwind tokens |
| CASE-03 | "We/the fund" framing throughout | Copy discipline |
| TIME-01 | Vertical career timeline, right-aligned dates, left-aligned role/description | Two-column CSS grid layout |
| TIME-02 | 5 entries as specified — Orly, BSC/Barbershop Fund, Nomura London, Nomura Mumbai, NMIMS | `timelineEntries` array in `lib/data/timeline.ts`; descriptions are placeholders — full copy in PRD Section 4.6 |
| TIME-03 | Each entry includes full description copy from PRD — not truncated | PRD Section 4.6 has all 5 descriptions verbatim |
| TIME-04 | Timeline collapses to single column on mobile | `grid-cols-1 md:grid-cols-[auto_1fr]` or similar responsive grid |
| TIME-05 | Scroll-triggered reveal animation per timeline entry | `m.div whileInView` with staggered delay per entry |
| PERS-01 | "Beyond Work" section with two sub-sections: Story of My Life + Interests | Side-by-side on desktop, stacked on mobile |
| PERS-02 | Story of My Life paragraph: 5 editions, 32 speakers, 500+ attendees, ~600K YouTube views | Full paragraph in PRD Section 4.7 |
| PERS-03 | Interests as inline text: `Badminton · Vipassana Meditation · Formula 1 · Bachata · Techno & House Music · Travel (30+ countries) · Board Games` | Plain text with middot separator; no bullets |
| FOOT-01 | Dark footer with centered content: name, email (mailto), LinkedIn (new tab) | Surface background (`#EDE4D8`) or slightly darker; email: `dugarvidit@gmail.com`; LinkedIn: `linkedin.com/in/viditdugar` |
| FOOT-02 | Closing line: "Open to conversations about early-stage consumer investing in India." | Inline text; PRD Section 4.8 confirms exact wording |
| FOOT-03 | Copyright: "© 2026 Vidit Dugar" | Static text |
| FOOT-04 | No contact form — email link only | Confirmed out-of-scope in REQUIREMENTS.md |
</phase_requirements>

---

## Summary

Phase 3 is the largest phase by section count: seven distinct sections (About, Philosophy, Fund, Kilrr, Timeline, Beyond Work, Footer) must be built as server-component shells with narrow client animation wrappers, all wired sequentially into `app/page.tsx`. The Phase 2 server/client split pattern is the established template — replicate it for every section.

All copy is available verbatim in `vidit_dugar_portfolio_PRD.md`. All data structures are already scaffolded in `lib/data/*.ts` files with placeholder bodies — this phase fills in the real copy and builds the rendering components. The only new technical challenge beyond the established Phase 2 patterns is the logo grid with CSS filter/hover trick, the investment table (responsive overflow), and the two-column timeline collapsing to single-column on mobile.

The palette is **Warm Sand light theme** — NOT the dark theme described in the original PRD. This was decided post-Phase 2 and is locked: `bg-background #F5EFE6`, `text-foreground #241E18`, `text-muted #8A7E74`, `text-accent #A6701A`. The footer should use `bg-surface #EDE4D8` to provide subtle differentiation from the main content background. All Tailwind token names (`bg-background`, `bg-surface`, `text-muted`, `text-accent`, `font-display`, `font-body`, `font-mono`) are confirmed active in `globals.css`.

**Primary recommendation:** One server-component Section wrapper per section, each with one or two narrow `'use client'` animation leaves. Reuse `StatCountUp` from `components/hero/` for the fund stats. All copy goes into the data files (not hardcoded in JSX) to keep components portable and content-swappable.

---

## Standard Stack

### Core (already installed — zero new installs needed)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| framer-motion | 12.38.0 | `m.div whileInView` scroll reveals, stagger via `transition.delay` | Phase 2 established; `domAnimation` bundle includes `inView` feature |
| tailwindcss | v4 | Layout, spacing, responsive grid, color tokens | Project standard; `@theme` tokens active in `globals.css` |
| next | 16.2.0 | App Router, server components, `next/image` | Project standard |
| clsx | 2.1.1 | Conditional class names | Already installed |
| tailwind-merge | 3.5.0 | Safe class merging in shared components | Already installed |

### No New Dependencies Required

Every pattern in this phase is achievable with installed libraries. The logo filter trick is pure CSS. The investment table is plain HTML `<table>`. The StatCountUp is already built.

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| CSS `filter: brightness(0) invert(1)` for logo monochrome | SVG `currentColor` recoloring | Brandfetch CDN returns PNG/JPEG; CSS filter works on any image format |
| `overflow-x-auto` wrapper on table | Horizontal scroll via JS | Pure CSS; simpler; accessible |
| `whileInView` per timeline entry | `AnimatePresence` | whileInView is simpler; AnimatePresence adds complexity with no benefit here |

---

## Architecture Patterns

### Recommended Component Structure

```
components/
├── sections/
│   ├── HeroSection.tsx            # (exists — Phase 2)
│   ├── AboutSection.tsx           # Phase 3: server component
│   ├── PhilosophySection.tsx      # Phase 3: server component
│   ├── FundSection.tsx            # Phase 3: server component
│   ├── KilrrSection.tsx           # Phase 3: server component
│   ├── TimelineSection.tsx        # Phase 3: server component
│   ├── BeyondWorkSection.tsx      # Phase 3: server component
│   └── FooterSection.tsx          # Phase 3: server component
├── about/
│   └── AboutAnimations.tsx        # 'use client' — fade-in wrapper
├── philosophy/
│   └── PhilosophyAnimations.tsx   # 'use client' — staggered pillar reveals
├── fund/
│   ├── FundAnimations.tsx         # 'use client' — stat strip wrapper
│   └── LogoGrid.tsx               # 'use client' — logo hover effects (or pure CSS)
├── timeline/
│   └── TimelineAnimations.tsx     # 'use client' — per-entry staggered reveal
├── hero/
│   ├── StatCountUp.tsx            # (exists — Phase 2, REUSE)
│   └── HeroAnimations.tsx         # (exists — Phase 2)
└── providers/
    └── MotionProvider.tsx         # (exists — Phase 1)
```

`app/page.tsx` grows to import all 8 sections in scroll order.

### Pattern 1: Server/Client Split (Established in Phase 2)

**What:** Section component is a Server Component (no `'use client'`). It imports static data and passes it as props to a narrow `'use client'` animation wrapper child.

**When to use:** Every section in this phase. PERF-03 requires Framer Motion isolated to client leaf components only.

**Example:**
```typescript
// components/sections/PhilosophySection.tsx — no 'use client'
import { philosophyPillars } from '@/lib/data/philosophy'
import { PhilosophyAnimations } from '@/components/philosophy/PhilosophyAnimations'

export function PhilosophySection() {
  return (
    <section className="py-24 px-6 max-w-3xl mx-auto">
      <PhilosophyAnimations pillars={philosophyPillars} />
    </section>
  )
}
```

### Pattern 2: whileInView Stagger for Section Reveals

**What:** Each major element (section heading, pull quote, pillars, timeline entries) uses `m.div` with `whileInView` + `viewport={{ once: true }}`. Stagger achieved via incrementing `transition.delay`.

**When to use:** All animated section content in this phase.

```typescript
// 'use client'
import { m } from 'framer-motion'

// Fade-up reveal — matches Phase 2 established motion character
<m.div
  initial={{ opacity: 0, y: 16 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, ease: 'easeOut', delay: 0 }}
>
  {/* section heading */}
</m.div>

// Staggered timeline entries — delay increases per entry
{entries.map((entry, i) => (
  <m.div
    key={entry.organization}
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.1 }}
  >
    {/* timeline entry */}
  </m.div>
))}
```

### Pattern 3: StatCountUp Reuse for Fund Stats

**What:** `StatCountUp` from `components/hero/StatCountUp.tsx` is already built and accepts `Stat` props. The fund stats section uses the same component with `fundStats` array from `lib/data/fund.ts`.

**When to use:** TRACK-02 — 4 fund summary stats in The Barbershop Fund section.

```typescript
// Server Component passes fundStats to client strip
import { fundStats } from '@/lib/data/fund'
import { StatCountUp } from '@/components/hero/StatCountUp'

// In a 'use client' wrapper:
<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
  {fundStats.map(stat => (
    <StatCountUp key={stat.label} stat={stat} />
  ))}
</div>
```

### Pattern 4: Logo Grid with CSS Filter Monochrome + Hover Color Reveal

**What:** Logo images rendered through CSS `filter: brightness(0) invert(1)` for monochrome appearance. Hover removes the filter to reveal the original color.

**When to use:** TRACK-05 and TRACK-06 — 25-company logo grid.

**Why this approach:** Brandfetch CDN returns color PNG/JPG images. CSS filter works on any raster or SVG — no post-processing required. This is the approach specified in PRD Section 4.4.

**Important note on Warm Sand palette:** The original PRD specified white logos on dark background. With the actual Warm Sand light theme, the `brightness(0) invert(1)` filter produces BLACK logos (not white), which is correct for a light background — dark/black logos on warm sand is the right visual treatment. Do NOT invert to white on a light background.

**Revised approach for Warm Sand theme:**
```typescript
// On a light background — render logos in their natural color
// but desaturated/darkened for visual consistency
// Option A: grayscale + darken
// filter: grayscale(1) brightness(0.4)  → dark grey logos
// Option B: just grayscale(1) → grey logos
// On hover: remove filter → full color reveal

// In Tailwind v4 (note: Tailwind v4 supports arbitrary CSS via square bracket syntax):
<img
  src={company.logoPath}
  alt={company.name}
  className="h-8 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
/>
```

**CRITICAL:** The Phase 2 research referenced `bg-background: #0D0D0D` (dark). The ACTUAL implemented palette is `bg-background: #F5EFE6` (warm sand light). Confirm the correct filter approach — `grayscale` + `opacity` is appropriate for light backgrounds.

### Pattern 5: Responsive Investment Table

**What:** Plain HTML `<table>` wrapped in `overflow-x-auto` for horizontal scroll on mobile. No JS needed.

**When to use:** TRACK-03 — standout investments table (5 rows × 6 columns).

```typescript
// Works as a server component — no 'use client' needed for a table
<div className="overflow-x-auto -mx-6 px-6">
  <table className="w-full text-sm font-body border-collapse">
    <thead>
      <tr className="border-b border-muted/20">
        <th className="text-left py-3 pr-6 font-semibold text-foreground">Company</th>
        <th className="text-left py-3 pr-6 font-semibold text-foreground">Sector</th>
        <th className="text-left py-3 pr-6 font-semibold text-foreground">Entry Val.</th>
        <th className="text-left py-3 pr-6 font-semibold text-foreground">Latest Val.</th>
        <th className="text-left py-3 pr-6 font-semibold text-foreground text-accent">Multiple</th>
        <th className="text-left py-3 font-semibold text-foreground">Co-investors</th>
      </tr>
    </thead>
    <tbody>
      {standoutInvestments.map((inv) => (
        <tr key={inv.company} className="border-b border-muted/10 hover:bg-surface/50 transition-colors">
          <td className="py-3 pr-6 font-semibold">{inv.company}</td>
          {/* ... */}
        </tr>
      ))}
    </tbody>
  </table>
</div>
```

### Pattern 6: Two-Column Timeline Collapsing to Single Column

**What:** CSS grid with two columns on desktop (date column left ~150px, content column right fills remaining space), single column on mobile.

**When to use:** TIME-01 and TIME-04 — career timeline.

```typescript
// Each timeline entry — no 'use client' for the structure; animate with m.div
<div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-2 md:gap-8 py-6 border-b border-muted/15">
  <div className="font-mono text-xs text-muted md:text-right pt-1">
    {entry.period}
  </div>
  <div>
    <p className="font-display text-lg font-bold text-foreground">{entry.role}</p>
    <p className="font-body text-sm text-accent mb-2">{entry.organization}</p>
    <p className="font-body text-sm text-muted leading-relaxed">{entry.description}</p>
  </div>
</div>
```

### Pattern 7: Pull Quote Styling

**What:** Large Playfair Display italic blockquote with accent left border or oversized quotation mark.

**When to use:** NARR-02 — About section pull quote.

```typescript
// Server-renderable — no animation wrapper needed if the parent section fades in
<blockquote className="my-10 pl-6 border-l-2 border-accent">
  <p className="font-display text-2xl md:text-3xl italic text-foreground leading-snug">
    "Running a company taught me things no pitch deck ever could."
  </p>
</blockquote>
```

### Pattern 8: Kilrr Section Visual Differentiation

**What:** Subtle `bg-surface` background fill (`#EDE4D8`) to set the case study apart from white/sand sections above and below.

**When to use:** CASE-02 — Kilrr Investment Story section.

```typescript
<section className="bg-surface py-24 px-6">
  <div className="max-w-3xl mx-auto">
    {/* content */}
  </div>
</section>
```

Alternatively: `border-l-4 border-accent` left-rail treatment — either works with the warm sand palette.

### Anti-Patterns to Avoid

- **`motion.div` instead of `m.div`:** Same constraint as Phase 2 — LazyMotion at root requires `m.*`. All animated elements must import `{ m } from 'framer-motion'`.
- **`whileInView` without `once: true`:** Animations re-fire on every scroll pass, which is distracting and against PERF-02.
- **Putting data/copy inline in JSX:** All copy belongs in `lib/data/*.ts` files. Phase 1 decision: "Content stored in static TypeScript files."
- **Adding `'use client'` to the outer Section components:** These must remain Server Components. Only the animation wrapper children get the directive.
- **Using `motion.div` syntax in HeroAnimations.tsx:** Already using `m.div` — maintain consistency in new components.
- **CSS `filter: brightness(0) invert(1)` on Warm Sand background:** This produces WHITE logos, which are invisible on a light background. Use `grayscale` + `opacity` for Warm Sand theme instead.
- **Hardcoding the footer's dark background:** The site uses Warm Sand — the footer should use `bg-surface` (`#EDE4D8`) for differentiation, or a slightly darker custom value. It should NOT be `#0D0D0D` (the PRD's original dark bg).

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Fund stat count-up animations | New count-up component | `StatCountUp` from `components/hero/StatCountUp.tsx` | Already built and tested in Phase 2; accepts `Stat` interface |
| Viewport detection for section reveals | Custom IntersectionObserver | `m.div whileInView viewport={{ once: true }}` | Framer Motion handles cleanup, SSR, once semantics |
| Logo CDN with fallback | Complex fetch-and-fallback logic | `onError` on `<img>` to switch `src` to `/public/logos/` fallback | Browser-native; simple one-liner |
| Responsive table | JS-based responsive table rewrite | `overflow-x-auto` wrapper on plain `<table>` | Pure CSS; accessible; correct |
| Section background differentiation | Complex theming system | Tailwind `bg-surface` token (`#EDE4D8`) | One class; already in `@theme` |
| Image optimization for logo grid | Manual resize/compress | `next/image` with `width`/`height` | Automatic WebP conversion, lazy loading |

**Key insight:** This phase adds zero new npm dependencies. Every pattern is achievable with the installed stack.

---

## Common Pitfalls

### Pitfall 1: Inverted Logo Colors on Light Background
**What goes wrong:** Logos appear white (invisible) on the Warm Sand background.
**Why it happens:** Applying `filter: brightness(0) invert(1)` — which the PRD specified for a dark background — on the actual warm sand light background.
**How to avoid:** Use `grayscale(1) brightness(0.5)` or Tailwind's `grayscale opacity-50` to produce dark muted logos. On hover, remove the filter for full-color reveal.
**Warning signs:** Logo grid appears empty/blank.

### Pitfall 2: Palette Mismatch — PRD vs Implemented
**What goes wrong:** Copy-pasting color values from the PRD (`#0D0D0D`, `#F5F0E8`, `#C8922A`) instead of using the actual implemented Tailwind tokens.
**Why it happens:** The PRD describes a dark theme that was redesigned post-Phase 2 to Warm Sand. The Phase 2 RESEARCH.md also references the old dark palette.
**How to avoid:** Always use Tailwind token names from `globals.css`: `bg-background` (#F5EFE6), `bg-surface` (#EDE4D8), `text-foreground` (#241E18), `text-muted` (#8A7E74), `text-accent` (#A6701A). Never use inline hex values.
**Warning signs:** Sections have visual inconsistency with the hero; colours feel off.

### Pitfall 3: Fund Stats Shown in Hero (They Were Moved)
**What goes wrong:** `heroStats` from `lib/data/hero.ts` used in the hero section instead of the fund section.
**Why it happens:** The data file is named `hero.ts` but the stats were explicitly moved to the Barbershop Fund section in Phase 2 refinements (per HANDOFF.md: "heroStats: kept in data file for use in Barbershop Fund section — not shown in hero").
**How to avoid:** Import `fundStats` from `lib/data/fund.ts` for the fund section. The `heroStats` export in `hero.ts` is an alias for the same data — use `fundStats` from `fund.ts` for semantic clarity.
**Warning signs:** Stats appear in both hero and fund sections.

### Pitfall 4: Brandfetch CDN Images Failing
**What goes wrong:** Some company logos 404 from Brandfetch CDN.
**Why it happens:** Not all 25 companies are indexed on Brandfetch — PRD identifies which ones need fallback to `/public/logos/`.
**How to avoid:** Add `onError` handler on each logo `<img>` that switches to the local `/public/logos/` path. Pre-populate `/public/logos/` with placeholder SVGs for all 25 so fallback never returns a broken image.
**Warning signs:** Broken image icons in logo grid.

### Pitfall 5: Timeline Description Placeholders Left In
**What goes wrong:** Phase 3 ships with `[Placeholder — Orly role description to be inserted in Phase 3]` text visible on the live site.
**Why it happens:** `lib/data/timeline.ts` has placeholder descriptions; the task needs to replace them with real PRD copy.
**How to avoid:** Update `lib/data/timeline.ts` as part of Phase 3 (not just build the component). Same applies to `lib/data/philosophy.ts` pillar bodies.
**Warning signs:** Bracketed placeholder text visible in timeline section.

### Pitfall 6: standoutInvestments Data Still Has Placeholders
**What goes wrong:** Investment table shows `[Sector]`, `[Entry]`, `[Multiple]` etc.
**Why it happens:** `lib/data/fund.ts` has placeholder values — real data is in PRD Section 4.4.
**How to avoid:** Update `lib/data/fund.ts` with real values from the PRD as part of the plan.
**Warning signs:** Table renders but shows bracket placeholders.

### Pitfall 7: Page Becomes a Monolith
**What goes wrong:** `app/page.tsx` imports 8 sections and becomes 200+ lines of JSX.
**Why it happens:** Lack of section component decomposition.
**How to avoid:** Each section is a separate file in `components/sections/`. `app/page.tsx` remains a clean list of 8 section imports.
**Warning signs:** `app/page.tsx` growing beyond ~20 lines.

### Pitfall 8: Logo Grid Causes Reflow/CLS
**What goes wrong:** Logo grid shifts layout as images load because no dimensions are reserved.
**Why it happens:** Using `<img>` without width/height, or `next/image` without dimensions.
**How to avoid:** Use fixed-height containers (`h-8 w-auto` or similar) on each logo. The grid cell holds space even before the image loads.
**Warning signs:** CLS score degrades in Lighthouse.

---

## Copy Reference (verbatim from PRD — use in data files)

### About Narrative (NARR-01)

```
I've spent my career building toward a single conviction: the best early-stage investors are the ones who've lived the problems they're backing.

I started in investment banking at Nomura — first in Mumbai on DCM, then in London on EMEA M&A, advising on transactions ranging from a €300M consumer deal to a £6Bn renewable energy acquisition that won Global M&A Deal of the Year. I learned rigour, pattern recognition, and how capital really moves.

But I wanted to get closer to the building. In 2023, I joined Bombay Shaving Company as Chief of Staff to the CEO, Shantanu Deshpande — and that role turned into something I couldn't have designed. I ran a ₹25Cr venture fund (The Barbershop Fund), helped grow one of India's most-watched entrepreneurship podcasts to 400K+ subscribers and 100M+ views, and worked inside a consumer brand navigating real operational problems. Three completely different lenses on the same ecosystem, all at once.

Then I went even deeper. I took over my family's ethnic wear business, Orly — built the D2C channel from scratch, launched cross-border wholesale into UAE and Bangladesh, and drove 40% YoY revenue growth. Running a company taught me things no pitch deck ever could.

That journey — from structuring M&A in London to arguing with a tailor in Kolkata — is what I bring to every investment conversation.
```

**Pull quote:** "Running a company taught me things no pitch deck ever could."

### Philosophy Pillar Bodies (PHIL-02)

**01 — Founder First, Always:**
```
Every investment decision has to be founder-led. Pitch decks are a starting point, not a signal. What I'm really evaluating is: does this person understand their customer deeply? Do they know the terrain? Have they earned the right to build this?

I've evaluated over 100 founders — some who understood their market instinctively, others who understood their Excel model. The difference is obvious in person. It's rarely obvious on paper. The best founders I've backed — whether it's a first-time founder who lived the problem personally, or a repeat founder who's done this before — all share one thing: they know their consumer better than anyone in the room.
```

**02 — Tailwinds Are Table Stakes; Retention Is the Edge:**
```
India has real structural tailwinds right now — quick commerce, the better-for-you wave, premiumisation, D2C infrastructure. Every fund sees these. What separates the winners isn't riding the wave — it's building something customers actually come back to.

Too many D2C brands confuse performance marketing spend with consumer love. They're measuring trials, not repeats. They spend on Meta and Google, hit great top-line numbers, and stop asking whether the unit economics make any sense. The companies that will survive are the ones who understand that a channel is just a channel — what they're really selling is product trust.
```

**03 — Operator Alpha Is Real:**
```
The Barbershop Fund had an unfair advantage: it was led by an operator, and that gave us access to founders that purely financial investors couldn't get. Being an operator in the consumer space — having worked around so many people for so many years — gives you an unfair advantage in getting access to deals, in valuing them properly, and in being able to help by connecting founders to the right people.

I've sat across from 100+ early-stage founders as an investor, met hundreds more as a podcast producer, and run a business myself. That Venn diagram — early-stage deal access, late-stage pattern recognition, operating experience — is what I believe makes a genuinely useful early-stage investor.
```

### Standout Investments Real Data (TRACK-03)

| Company | Sector | Entry Valuation | Latest Valuation | Multiple | Notable Co-investors |
|---------|--------|----------------|-----------------|----------|---------------------|
| Go Zero | Healthier F&B | ₹25Cr | ₹324Cr | ~12x | — |
| Kilrr | D2C Spices | ₹17Cr | ₹85Cr | ~5x | Anupam Mittal |
| Fishmongers | Seafood Tech | ₹31Cr | ₹150Cr | ~5x | Rainmatter, Wavemaker, EIC Japan |
| Anveshan | Natural Foods | ₹160Cr | ₹400Cr | ~2.5x | Wipro Consumer Care Ventures, DSGCP |
| Mekr | Contract Manufacturing | ₹100Cr | ₹210Cr | ~2x | Titan Capital |

### Timeline Entry Descriptions (TIME-02, TIME-03)

**Orly (Jul 2025–Present):**
```
Joined the family men's ethnic wear business to modernise operations from the ground up. Launched a D2C fulfilment channel, added tailoring as a new revenue vertical, and built data-driven inventory systems. Drove 40% average YoY monthly revenue growth; expanded cross-border into UAE and Bangladesh with 3 wholesale accounts; grew Google rating from 3.5 → 4.6 stars.
```

**BSC/Barbershop Fund (Nov 2023–Jul 2025):**
```
Three-pillar role reporting directly to CEO Shantanu Deshpande.

Venture Investing: Lead investment professional on a ₹25Cr Cat-I AIF with 80 LPs. Sourced, evaluated and closed 16 investments; fund at 1.8x MOIC on ₹20Cr deployed; 50%+ portfolio companies raised follow-on rounds from marquee investors.

Content & Monetisation: Headed The Barbershop with Shantanu — grew YouTube from 242K to 400K+ and Instagram from 180K to 400K+, accumulating 100M+ total views; drove ₹1Cr+ in brand integration revenue.

Strategy & Operations: Board presentations, D2C logistics optimisation, Trimmers category strategy, brand collaborations, hospitality vertical development.
```

**Nomura London (Jul 2021–Sep 2023):**
```
Advised corporates and PE investors on strategic exits, competitive sale processes and public market transactions across the UK and Europe. Played a key role in establishing Nomura's Secondary Advisory platform. Rating: 5/5 (Highest).

Select transactions: Sale of Vrumona (2nd largest Dutch soft drinks co.) by Heineken to Royal Unibrew | €300M (2023); Acquisition of 7IM (~£21Bn AUM) by OTPP | ~£450M (2023); Acquisition of 50% stake in Hornsea 2 (World's largest offshore windfarm) | £6Bn | Global M&A Deal of the Year 2022.
```

**Nomura Mumbai (May 2019–Jun 2021):**
```
Investment Banking Analyst — CEEMEA & Corporate DCM. Executed >€25Bn in total new issuance across 15 issuers and 5 currencies. One of 3 analysts selected (out of ~50) for front office transfer to London. Rating: 5/5 (Highest).
```

**NMIMS (2016–2019):**
```
BSc Economics, Finance Specialisation. GPA 3.7/4.0 · Dean's List · President, Debate & Quiz Society.
```

### Beyond Work — Story of My Life (PERS-02)

```
In 2019, while still a student, I co-founded Story of My Life — a live storytelling event featuring entrepreneurs, activists, and public figures sharing personal turning points. Across 5 editions, we hosted 32 speakers, drew 500+ attendees, and accumulated ~600K YouTube views. It was my first taste of building something from zero — and the first time I realised that the most compelling stories are almost never the ones that begin with success.
```

### Interests (PERS-03)

```
Badminton · Vipassana Meditation · Formula 1 · Bachata · Techno & House Music · Travel (30+ countries) · Board Games
```

### Footer (FOOT-01 through FOOT-04)

- Email: `dugarvidit@gmail.com` (mailto link)
- LinkedIn: `https://www.linkedin.com/in/viditdugar` (target="_blank" rel="noopener noreferrer")
- Closing: `Open to conversations about early-stage consumer investing in India.`
- Copyright: `© 2026 Vidit Dugar`

---

## Brandfetch Logo CDN Reference (TRACK-07)

CDN pattern: `https://cdn.brandfetch.io/{domain}/w/400/h/400/logo`

| Company | Domain | CDN Available |
|---------|--------|---------------|
| Go Zero | letsgozero.in | Check |
| Anveshan | anveshan.farm | Check |
| Kilrr | kilrr.com | Check |
| Mekr | mekr.in | Check |
| EVeez | eveez.in | Check |
| Fiona Diamonds | fionadiamonds.com | Check |
| RocketPay | rocketpay.in | Check |
| Kritsnam | kritsnam.com | Check |
| SBNRI | sbnri.com | Check |
| Better Nutrition | betternutrition.in | Check |
| Wanderlooms | wanderlooms.com | Check |
| Woodsmen (Ginglani) | woodsmenwhiskey.com | Check |
| Kookar.AI | kookar.ai | Check |
| Epithera | epithera.com | Check |
| Absolut Pet | absolutpet.in | Check |
| Relso | relso.com | Check |
| Fishmongers | — | Fallback to /public/logos/ |
| Basil | — | Fallback to /public/logos/ |
| Done Deal | — | Fallback to /public/logos/ |
| OctoLife | — | Fallback to /public/logos/ |
| Yuomo | — | Fallback to /public/logos/ |
| Anandi School | — | Fallback to /public/logos/ |
| ReplyAll | — | Fallback to /public/logos/ |
| Crest Wealth | — | Fallback to /public/logos/ |
| BetterPlace Health | — | Fallback to /public/logos/ |

**Implementation:** Update `portfolioCompanies` array in `lib/data/fund.ts` to replace `logoPath` placeholders with either the Brandfetch CDN URL or a `/public/logos/{name}.svg` path. Pre-populate `/public/logos/` with placeholder SVG files for the 9 non-CDN companies so the `onError` fallback always resolves.

---

## Code Examples

### About Section (Server Component)

```typescript
// components/sections/AboutSection.tsx — no 'use client'
import { AboutAnimations } from '@/components/about/AboutAnimations'

const aboutProse = `I've spent my career building toward a single conviction...` // full copy
const pullQuote = `Running a company taught me things no pitch deck ever could.`

export function AboutSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <AboutAnimations prose={aboutProse} pullQuote={pullQuote} />
      </div>
    </section>
  )
}
```

### Kilrr Section with Surface Background

```typescript
// components/sections/KilrrSection.tsx — no 'use client'
export function KilrrSection() {
  return (
    <section className="bg-surface py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="font-body text-xs uppercase tracking-[0.15em] text-accent mb-4">
          Investment Story
        </p>
        {/* KilrrAnimations client wrapper for fade-in */}
      </div>
    </section>
  )
}
```

### Logo Grid (Client Component for Hover Effects)

```typescript
// components/fund/LogoGrid.tsx — 'use client'
'use client'
import type { Company } from '@/lib/types'

export function LogoGrid({ companies }: { companies: Company[] }) {
  return (
    <div className="grid grid-cols-4 md:grid-cols-5 gap-6 mt-10">
      {companies.map((company) => (
        <div key={company.slug} className="flex items-center justify-center p-3 rounded">
          <img
            src={company.logoPath}
            alt={company.name}
            className="h-8 w-auto object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            onError={(e) => {
              // Fallback to local path if CDN fails
              const target = e.currentTarget
              if (!target.src.includes('/logos/')) {
                target.src = `/logos/${company.slug}.svg`
              }
            }}
          />
        </div>
      ))}
    </div>
  )
}
```

### Philosophy Pillars (Client Animation Wrapper)

```typescript
// components/philosophy/PhilosophyAnimations.tsx — 'use client'
'use client'
import { m } from 'framer-motion'
import type { PhilosophyPillar } from '@/lib/types'

export function PhilosophyAnimations({ pillars }: { pillars: PhilosophyPillar[] }) {
  return (
    <div className="space-y-16">
      {pillars.map((pillar, i) => (
        <m.div
          key={pillar.number}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.1 }}
        >
          <span className="font-mono text-4xl text-accent/30 block mb-2">
            {pillar.number}
          </span>
          <h3 className="font-display text-xl font-bold text-foreground mb-4">
            {pillar.title}
          </h3>
          <p className="font-body text-base text-muted leading-relaxed whitespace-pre-line">
            {pillar.body}
          </p>
        </m.div>
      ))}
    </div>
  )
}
```

### Updated page.tsx (End State)

```typescript
// app/page.tsx — Server Component, stays clean
import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { PhilosophySection } from '@/components/sections/PhilosophySection'
import { FundSection } from '@/components/sections/FundSection'
import { KilrrSection } from '@/components/sections/KilrrSection'
import { TimelineSection } from '@/components/sections/TimelineSection'
import { BeyondWorkSection } from '@/components/sections/BeyondWorkSection'
import { FooterSection } from '@/components/sections/FooterSection'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <PhilosophySection />
      <FundSection />
      <KilrrSection />
      <TimelineSection />
      <BeyondWorkSection />
      <FooterSection />
    </main>
  )
}
```

---

## Data File Updates Required in Phase 3

This phase must update existing data files with real content — not just build new components:

| File | What to Update |
|------|---------------|
| `lib/data/philosophy.ts` | Replace 3 placeholder `body` strings with real PRD copy |
| `lib/data/timeline.ts` | Replace 5 placeholder `description` strings with real PRD copy |
| `lib/data/fund.ts` | Replace placeholder Investment table values (sector, valuations, multiples, co-investors) with real PRD data; update `portfolioCompanies` array with real names, slugs, and Brandfetch/local logo paths |

---

## State of the Art

| Old Approach | Current Approach | Impact |
|--------------|------------------|--------|
| Dark background (#0D0D0D) — original PRD | Warm Sand light theme (#F5EFE6) — post-Phase-2 decision | Color token names stay the same; all hex values changed; CSS filter approach for logos must be warm-bg-appropriate |
| `motion.div` (full Framer bundle) | `m.div` inside `LazyMotion` | ~30KB bundle reduction; established in Phase 1 |
| Hero uses `whileInView` | Hero uses `animate` (above-fold fix) | Other sections still use `whileInView` — hero was special case; do not copy the hero pattern for below-fold sections |
| Stats in hero | Stats in Barbershop Fund section | `heroStats` export in `hero.ts` is semantically misnamed — use `fundStats` from `fund.ts` |

---

## Open Questions

1. **Logo grid color treatment on Warm Sand background**
   - What we know: PRD specified `filter: brightness(0) invert(1)` for dark bg (produces white logos). Actual bg is warm sand (#F5EFE6), a light color.
   - What's unclear: Does Vidit want grayscale logos that color on hover, or full-color logos from the start?
   - Recommendation: Default to `grayscale opacity-50` → `grayscale-0 opacity-100` on hover. This mirrors the editorial aesthetic: muted by default, alive on engagement. If Vidit prefers full-color always, remove the grayscale utility.

2. **Footer background depth**
   - What we know: `bg-surface` (#EDE4D8) is the only available darker token. PRD called for a "dark footer" which doesn't match the warm sand theme.
   - What's unclear: How much visual separation the footer needs.
   - Recommendation: Use `bg-surface` (#EDE4D8) with a 1px top border in `border-muted/20`. If a stronger separation is needed, a slightly darker custom value (e.g., `#D6CCBE`) can be added to `globals.css @theme`.

3. **Portfolio company names (stealth risk)**
   - What we know: HANDOFF.md flags "confirm stealth companies with Vidit before live."
   - Recommendation: Build the component with all 25 company names from the PRD. Flag in verification that Vidit must confirm no companies are in stealth before the site goes live.

4. **BSC/Fund timeline role title**
   - `lib/data/timeline.ts` has role `'Founder & Fund Manager'` for BSC entry; PRD says `'Chief of Staff & Head of Investments — The Barbershop Fund'`. Update the data file to match PRD.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None installed — same as Phase 2 |
| Config file | None — same as Phase 2 |
| Quick run command | `npm run build` |
| Full suite command | `npm run build && npm run lint` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| NARR-01 | About prose renders | manual-only | Visual inspect at localhost:3000 | ❌ manual |
| NARR-02 | Pull quote in Playfair Display large | manual-only | Visual inspect | ❌ manual |
| NARR-03 | Section fades in on scroll | manual-only | Scroll test | ❌ manual |
| PHIL-01–03 | 3 pillars render with full copy | manual-only | Visual inspect | ❌ manual |
| TRACK-01 | Fund section header + subtitle | manual-only | Visual inspect | ❌ manual |
| TRACK-02 | Fund stats count up on viewport entry | manual-only | Scroll test | ❌ manual |
| TRACK-03 | Investment table 5 rows with real data | build check | `npm run build` — TypeScript validates data shape | ❌ automated partial |
| TRACK-04 | 25 logos in 4–5 column grid | manual-only | Visual inspect | ❌ manual |
| TRACK-05 | Logos monochrome | manual-only | Visual inspect | ❌ manual |
| TRACK-06 | Hover reveals color | manual-only | Hover test in browser | ❌ manual |
| TRACK-07 | Brandfetch CDN + fallback | manual-only | Open DevTools Network tab | ❌ manual |
| CASE-01–03 | Kilrr section 300-word case study | manual-only | Visual inspect | ❌ manual |
| TIME-01–05 | Timeline 5 entries, collapses mobile | manual-only | Visual inspect at 375px | ❌ manual |
| PERS-01–03 | Beyond Work sub-sections | manual-only | Visual inspect | ❌ manual |
| FOOT-01–04 | Footer email/LinkedIn/copyright | build check | `npm run build` + manual link test | ❌ automated partial |
| All sections | No TypeScript errors | smoke | `npm run build` | ✅ via build |

### Sampling Rate
- **Per task commit:** `npm run build` — catches TS errors and import failures
- **Per wave merge:** `npm run build && npm run lint`
- **Phase gate:** Manual visual scroll-through at `localhost:3000` at 1440px and 375px viewports

### Wave 0 Gaps
- [ ] Pre-populate `/public/logos/` with placeholder SVGs for the 9 non-CDN companies (Fishmongers, Basil, Done Deal, OctoLife, Yuomo, Anandi School, ReplyAll, Crest Wealth, BetterPlace Health)
- [ ] No new test framework needed — `npm run build` is the automatable gate; visual testing is appropriate for this UI-only phase

---

## Sources

### Primary (HIGH confidence)
- `vidit_dugar_portfolio_PRD.md` — all section copy, investment table data, footer details
- `HANDOFF.md` — confirmed Warm Sand palette, Phase 2 decisions, circular photo decision, fund stats moved out of hero
- `lib/data/philosophy.ts` — PhilosophyPillar interface confirmed; placeholder bodies confirmed
- `lib/data/fund.ts` — FundData, Investment, Company interfaces confirmed; placeholder data confirmed
- `lib/data/timeline.ts` — TimelineEntry interface confirmed; placeholder descriptions confirmed
- `lib/types.ts` — all TypeScript interfaces confirmed
- `app/globals.css` — Warm Sand Tailwind v4 @theme tokens confirmed (bg #F5EFE6, surface #EDE4D8, foreground #241E18, muted #8A7E74, accent #A6701A)
- `components/hero/StatCountUp.tsx` — reusable count-up component confirmed; accepts `Stat` interface
- `.planning/phases/02-hero-section/02-01-SUMMARY.md` — Phase 2 patterns confirmed (m.* not motion.*, server/client split, `animate` vs `whileInView` above-fold distinction)

### Secondary (MEDIUM confidence)
- `package.json` — confirms framer-motion 12.38.0, next 16.2.0, tailwindcss v4 — no new installs needed
- PRD Section 4.4 — Brandfetch CDN domain list (availability unverified at time of research; `onError` fallback required)

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all from installed package.json and confirmed node_modules
- Architecture: HIGH — server/client pattern established in Phase 2; all patterns are extensions of it
- Copy content: HIGH — verbatim from PRD; no interpretation required
- Logo filter approach: MEDIUM — Warm Sand palette change means PRD's `filter: brightness(0) invert(1)` guidance is incorrect; `grayscale` approach is logically sound but Vidit's preference on full-color vs muted-by-default is unconfirmed
- Brandfetch CDN availability: LOW — 16 of 25 companies listed as "Check Brandfetch" in PRD; real availability untested

**Research date:** 2026-03-19
**Valid until:** 2026-06-19 (stable libraries; copy is static)
