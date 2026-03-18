# Architecture Patterns

**Domain:** Single-page scrolling personal portfolio (VC/operator profile)
**Project:** Vidit Dugar — VC Portfolio Website
**Researched:** 2026-03-18
**Confidence:** HIGH (Next.js App Router from official docs 2026-03-16; Framer Motion patterns from training data — MEDIUM confidence)

---

## Recommended Architecture

A single-page scrolling site in Next.js App Router lives entirely at the `/` route. The root `page.tsx` is a **Server Component** that assembles all section components in vertical order. Interactive pieces (animations, lightbox, stat counters) are isolated into narrow **Client Component** leaves — the minimum surface area needed for `'use client'`.

```
app/
  layout.tsx          ← Root layout: fonts, metadata, dark background
  page.tsx            ← Server Component: section assembly, SEO metadata

components/
  sections/           ← One file per visible section (mostly Server Components)
    HeroSection.tsx
    AboutSection.tsx
    PhilosophySection.tsx
    FundSection.tsx
    KilrrSection.tsx
    MediaSection.tsx
    TimelineSection.tsx
    BeyondSection.tsx
    FooterSection.tsx

  ui/                 ← Reusable, dumb UI primitives
    AnimatedStat.tsx          ← 'use client' — count-up on scroll entry
    ScrollFadeIn.tsx          ← 'use client' — whileInView wrapper
    PortfolioLogoGrid.tsx     ← 'use client' — hover color reveal
    MasonryGallery.tsx        ← 'use client' — layout + lightbox
    Lightbox.tsx              ← 'use client' — modal state
    TimelineItem.tsx          ← can be Server Component (no interaction)
    PullQuote.tsx             ← Server Component
    SectionHeading.tsx        ← Server Component
    NavDots.tsx               ← 'use client' — scroll position tracking

  providers/
    MotionProvider.tsx        ← 'use client' — wraps LazyMotion for tree-shaking

lib/
  data/
    portfolio.ts      ← Fund stats, investment table, logo list (static TypeScript)
    timeline.ts       ← Career timeline entries
    philosophy.ts     ← Investment pillars
    media.ts          ← LinkedIn post metadata + photo list
    stats.ts          ← Hero animated stats (values + labels)

  types.ts            ← Shared TypeScript interfaces

public/
  images/
    logos/            ← Portfolio company logos (monochrome SVG/PNG)
    photos/           ← Gallery images (podcast, Orly, travel)
    headshot/         ← Profile photo placeholder → real photo swap
```

---

## Component Boundaries

| Component | Type | Responsibility | Receives From | Passes To |
|-----------|------|----------------|---------------|-----------|
| `app/layout.tsx` | Server | HTML shell, fonts, global CSS vars, metadata | — | All children |
| `app/page.tsx` | Server | Section assembly, page-level SEO | Static data files | Section components as props |
| `HeroSection` | Server | Name, descriptor, headshot slot | `stats[]` from `lib/data/stats.ts` | `AnimatedStat` (client) |
| `AboutSection` | Server | Narrative prose, pull quote | Inline content | `PullQuote` (server), `ScrollFadeIn` (client) |
| `PhilosophySection` | Server | 3 numbered pillars | `philosophy[]` | `ScrollFadeIn` (client) |
| `FundSection` | Server | Fund stats, investment table, logo grid | `portfolio[]` | `PortfolioLogoGrid` (client), `ScrollFadeIn` (client) |
| `KilrrSection` | Server | Case study prose, "we" framing | Inline content | `ScrollFadeIn` (client) |
| `MediaSection` | Server | LinkedIn cards shell, gallery shell | `media[]` from `lib/data/media.ts` | `MasonryGallery` (client) |
| `TimelineSection` | Server | Vertical timeline container | `timeline[]` | `TimelineItem` (server) |
| `BeyondSection` | Server | Interests, Story of My Life copy | Inline content | `ScrollFadeIn` (client) |
| `FooterSection` | Server | Email, LinkedIn, closing line | Inline content | — |
| `AnimatedStat` | Client | Count-up animation on scroll entry | `value`, `label`, `prefix?`, `suffix?` | — |
| `ScrollFadeIn` | Client | `whileInView` fade/slide wrapper | `children`, `delay?`, `direction?` | children |
| `PortfolioLogoGrid` | Client | Monochrome logos, hover color reveal | `logos[]` | `next/image` |
| `MasonryGallery` | Client | CSS columns masonry layout + lightbox trigger | `photos[]` | `Lightbox` |
| `Lightbox` | Client | Modal overlay, keyboard nav, close | `photo`, `isOpen`, `onClose` | — |
| `NavDots` | Client | Fixed-position section indicator dots | section IDs from `lib/data` | — |
| `MotionProvider` | Client | `LazyMotion` + `domAnimation` features | children | — |

---

## Data Flow

All content is **static TypeScript** in `lib/data/`. There is no fetch, no database, no CMS. The data flow is unidirectional and build-time only.

```
lib/data/*.ts
    ↓  (imported at build time)
app/page.tsx  (Server Component)
    ↓  (passed as props)
Section Components  (Server Components)
    ↓  (passed as serializable props)
Client Component leaves  (AnimatedStat, PortfolioLogoGrid, etc.)
```

**Key rule:** Server Components pass only serializable data (strings, numbers, plain objects) to Client Components. No functions, no class instances, no React nodes from server side — except via the `children` slot pattern.

**Content that stays inline** (not in data files): About prose, Kilrr case study copy, Philosophy pillar descriptions, footer text. These are long-form and tied to a single section; extracting to data files adds indirection with no benefit.

**Content that lives in data files** (because it's repeated/iterated): Stats array, timeline entries, portfolio company list, logo list, media list, philosophy pillars (title + body). These are iterated or mapped in the component, so they belong in `lib/data/`.

---

## Patterns to Follow

### Pattern 1: Narrow Client Boundary with `ScrollFadeIn` Wrapper

**What:** A thin client wrapper provides `whileInView` animation without making the parent section a client component.

**When:** Any section that needs scroll-triggered entrance animation. This covers the majority of sections.

**Example:**
```tsx
// components/ui/ScrollFadeIn.tsx
'use client'
import { motion } from 'framer-motion'

interface Props {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'left' | 'right'
}

export function ScrollFadeIn({ children, delay = 0, direction = 'up' }: Props) {
  const yOffset = direction === 'up' ? 24 : 0
  const xOffset = direction === 'left' ? -24 : direction === 'right' ? 24 : 0
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset, x: xOffset }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
```

```tsx
// components/sections/AboutSection.tsx  (Server Component — no 'use client')
import { ScrollFadeIn } from '@/components/ui/ScrollFadeIn'
import { PullQuote } from '@/components/ui/PullQuote'

export function AboutSection() {
  return (
    <section id="about">
      <ScrollFadeIn>
        <p>Long-form narrative...</p>
      </ScrollFadeIn>
      <ScrollFadeIn delay={0.2}>
        <PullQuote text="Before 30..." />
      </ScrollFadeIn>
    </section>
  )
}
```

### Pattern 2: LazyMotion for Bundle Size Control

**What:** Wrap the app in `LazyMotion` with `domAnimation` feature set instead of importing all of Framer Motion. Reduces client JS by ~30KB.

**When:** Always — standard practice for Framer Motion in Next.js App Router.

**Example:**
```tsx
// components/providers/MotionProvider.tsx
'use client'
import { LazyMotion, domAnimation } from 'framer-motion'

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>
}
```

```tsx
// app/layout.tsx  (Server Component wrapping a client provider)
import { MotionProvider } from '@/components/providers/MotionProvider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  )
}
```

When using `LazyMotion`, replace `<motion.div>` with `<m.div>` (imported from `framer-motion`) in all animated components.

### Pattern 3: AnimatedStat with useInView + useMotionValue

**What:** Each stat counts up from 0 to its target value when it enters the viewport. Uses `useInView` ref and `useMotionValue` + `useTransform` + `animate()`.

**When:** Hero section stats and any numeric call-out.

**Example:**
```tsx
// components/ui/AnimatedStat.tsx
'use client'
import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useTransform, animate, m } from 'framer-motion'

interface Props {
  value: number
  label: string
  prefix?: string
  suffix?: string
  decimals?: number
}

export function AnimatedStat({ value, label, prefix = '', suffix = '', decimals = 0 }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const motionValue = useMotionValue(0)

  useEffect(() => {
    if (isInView) {
      animate(motionValue, value, { duration: 1.5, ease: 'easeOut' })
    }
  }, [isInView, value, motionValue])

  // Subscribe motionValue to DOM update via callback
  useEffect(() => {
    return motionValue.on('change', (v) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${v.toFixed(decimals)}${suffix}`
      }
    })
  }, [motionValue, prefix, suffix, decimals])

  return (
    <div>
      <span ref={ref}>{prefix}0{suffix}</span>
      <span>{label}</span>
    </div>
  )
}
```

### Pattern 4: Logo Grid with CSS Filter + Transition

**What:** Portfolio logos rendered in monochrome via `filter: grayscale(1) brightness(1.5)`. On hover, transition removes filter to show color. No JavaScript needed for the effect — pure CSS — but the component is a Client Component because it maps over data and uses `next/image`.

**When:** The 25-company portfolio logo grid in FundSection.

**Note:** Actually this can be a Server Component if there is no client-side state. The hover transition is CSS-only (`group-hover:filter-none` with Tailwind). Keep it a Server Component unless lightbox or interaction is added.

### Pattern 5: Masonry Gallery with CSS Columns

**What:** Use CSS `columns` property for masonry layout — no JavaScript masonry library needed. `column-count: 2` on mobile, `column-count: 3` on desktop. Images have `break-inside: avoid`.

**When:** Writing & Media photo gallery.

**Why CSS columns over JS masonry:** Avoids ResizeObserver complexity, reduces JS, and works with `next/image`. Limitation: items flow top-to-bottom within columns, not true masonry by height. Acceptable for a portfolio gallery.

```tsx
// components/ui/MasonryGallery.tsx
'use client'  // needed for onClick lightbox trigger
import Image from 'next/image'
import { useState } from 'react'
import { Lightbox } from './Lightbox'

export function MasonryGallery({ photos }: { photos: Photo[] }) {
  const [selected, setSelected] = useState<Photo | null>(null)
  return (
    <>
      <div className="columns-2 md:columns-3 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className="break-inside-avoid mb-4 cursor-pointer"
               onClick={() => setSelected(photo)}>
            <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} />
          </div>
        ))}
      </div>
      {selected && <Lightbox photo={selected} onClose={() => setSelected(null)} />}
    </>
  )
}
```

### Pattern 6: Google Fonts via next/font/google

**What:** Import Playfair Display, DM Sans, DM Mono from `next/font/google` in `app/layout.tsx`. Expose them as CSS variables on `<html>`. Reference via Tailwind `fontFamily` config.

**When:** Project setup — must be done before any typography work.

```tsx
// app/layout.tsx
import { Playfair_Display, DM_Sans, DM_Mono } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' })
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans', display: 'swap' })
const dmMono = DM_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-dm-mono', display: 'swap' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

```js
// tailwind.config.js
theme: {
  extend: {
    fontFamily: {
      display: ['var(--font-playfair)', 'Georgia', 'serif'],
      body: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      mono: ['var(--font-dm-mono)', 'monospace'],
    }
  }
}
```

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Making Section Components Client Components

**What:** Adding `'use client'` to `HeroSection`, `AboutSection`, etc. because they contain animated children.

**Why bad:** Sends the entire section's HTML as client JavaScript. For a static portfolio, these sections have no interactivity — their content is fixed at build time. Adding `'use client'` forces hydration of all descendant content, increasing bundle size and reducing FCP.

**Instead:** Keep sections as Server Components. Pass only the interactive leaf nodes as Client Components (`AnimatedStat`, `ScrollFadeIn`). Server Components can import Client Components — the `'use client'` boundary is at the leaf, not the section.

### Anti-Pattern 2: Importing Full Framer Motion Bundle

**What:** `import { motion } from 'framer-motion'` in every animated component without `LazyMotion`.

**Why bad:** Ships the full Framer Motion bundle (~50KB gzipped) to the client even when only a subset of features is used. Fails Lighthouse 90+ target.

**Instead:** Use `LazyMotion` + `domAnimation` in a root provider (see Pattern 2). Use `m.div` instead of `motion.div`.

### Anti-Pattern 3: Storing Content Inline in Server Components When It Should Be Data

**What:** Hard-coding the portfolio logo list or timeline entries as JSX arrays inside section components.

**Why bad:** Content becomes impossible to update without touching component code. The 25-logo grid and 5-entry timeline are data, not structure.

**Instead:** Keep iterated content in `lib/data/*.ts` TypeScript files. Components map over the data. Swapping content = editing one data file.

### Anti-Pattern 4: Using `useEffect` for Scroll Detection Instead of `whileInView`

**What:** Manually attaching scroll event listeners in `useEffect` to trigger animations.

**Why bad:** `IntersectionObserver`-based `whileInView` (Framer Motion) is more performant and does not require cleanup management. Manual scroll listeners can cause memory leaks if not properly cleaned up.

**Instead:** Use `motion`/`m` component's `whileInView` prop with `viewport={{ once: true }}`.

### Anti-Pattern 5: Lightbox as a Route

**What:** Creating a separate route (e.g., `/photo/[id]`) for the lightbox overlay.

**Why bad:** Breaks the single-page scroll experience. The VC audience should not leave the page.

**Instead:** Lightbox is client-side state (`useState`) rendered as a fixed overlay on top of the current page. No routing involved.

---

## File / Folder Structure (Full)

```
vidit-portfolio/
├── app/
│   ├── layout.tsx              ← Root layout: fonts (CSS vars), metadata, bg color, MotionProvider
│   ├── page.tsx                ← Single-page assembly; imports all sections
│   ├── globals.css             ← CSS reset, CSS custom properties (#0D0D0D, #C8922A, etc.)
│   └── favicon.ico
│
├── components/
│   ├── sections/
│   │   ├── HeroSection.tsx     ← Server
│   │   ├── AboutSection.tsx    ← Server
│   │   ├── PhilosophySection.tsx ← Server
│   │   ├── FundSection.tsx     ← Server (contains client leaf: PortfolioLogoGrid)
│   │   ├── KilrrSection.tsx    ← Server
│   │   ├── MediaSection.tsx    ← Server (contains client leaf: MasonryGallery)
│   │   ├── TimelineSection.tsx ← Server
│   │   ├── BeyondSection.tsx   ← Server
│   │   └── FooterSection.tsx   ← Server
│   │
│   ├── ui/
│   │   ├── AnimatedStat.tsx    ← 'use client'
│   │   ├── ScrollFadeIn.tsx    ← 'use client'
│   │   ├── PortfolioLogoGrid.tsx ← Server (CSS hover, no state) OR 'use client' if needed
│   │   ├── MasonryGallery.tsx  ← 'use client' (lightbox state)
│   │   ├── Lightbox.tsx        ← 'use client'
│   │   ├── NavDots.tsx         ← 'use client' (scroll position)
│   │   ├── PullQuote.tsx       ← Server
│   │   ├── SectionHeading.tsx  ← Server
│   │   └── InvestmentTable.tsx ← Server (static data table)
│   │
│   └── providers/
│       └── MotionProvider.tsx  ← 'use client' (LazyMotion wrapper)
│
├── lib/
│   ├── data/
│   │   ├── stats.ts            ← Hero stat values (value, label, prefix, suffix)
│   │   ├── portfolio.ts        ← Fund data, company table rows, logo list
│   │   ├── timeline.ts         ← Career entries (role, org, years, description)
│   │   ├── philosophy.ts       ← 3 pillars (number, title, body)
│   │   └── media.ts            ← LinkedIn post metadata, photo list
│   └── types.ts                ← Stat, Company, TimelineEntry, Photo, etc.
│
├── public/
│   ├── images/
│   │   ├── logos/              ← PNG/SVG portfolio company logos
│   │   ├── photos/             ← Gallery images
│   │   └── headshot/           ← headshot-placeholder.png + real photo
│   └── og-image.png            ← Open Graph image for sharing
│
├── tailwind.config.js
├── next.config.ts
└── tsconfig.json
```

---

## Suggested Build Order

Build in dependency order — foundational pieces first, content-heavy sections last.

### Stage 1: Foundation (no content, just structure)
1. **Project scaffold** — `create-next-app`, TypeScript, Tailwind, Framer Motion install
2. **Global styles** — CSS custom properties (`--color-bg`, `--color-text`, `--color-accent`), dark background, base typography reset
3. **Font setup** — `app/layout.tsx` with `next/font/google` for Playfair Display, DM Sans, DM Mono; Tailwind `fontFamily` config
4. **MotionProvider** — `LazyMotion` wrapper in `app/layout.tsx`
5. **Type definitions** — `lib/types.ts` (all data shapes)
6. **Data files** — `lib/data/*.ts` with real or placeholder content

### Stage 2: Reusable UI Primitives (used by multiple sections)
7. **ScrollFadeIn** — the animation wrapper used everywhere
8. **SectionHeading** — consistent heading typography used in every section
9. **AnimatedStat** — needed by Hero and potentially Fund section
10. **PullQuote** — used in About section

### Stage 3: Sections (top to bottom, by narrative order)
11. **HeroSection** — first visible; validates design direction, font, color palette
12. **FooterSection** — second; closes the page, validates full-page layout
13. **AboutSection** — narrative prose; validates body typography
14. **PhilosophySection** — structured list; validates numbered pillar pattern
15. **TimelineSection** — structured data; validates timeline layout and data binding
16. **FundSection** — most complex; fund stats + InvestmentTable + PortfolioLogoGrid
17. **KilrrSection** — prose case study; similar to About
18. **MediaSection** — most asset-dependent; MasonryGallery + Lightbox

### Stage 4: Polish
19. **NavDots** — scroll-position fixed nav; requires all section IDs to exist
20. **Responsive pass** — mobile layout for all sections
21. **Performance audit** — Lighthouse run, image sizing, font subsetting
22. **Real asset swap** — headshot, real photos, confirmed logos, LinkedIn posts

**Rationale for this order:**
- Hero first validates the design system before building more sections
- Footer second ensures full-page scroll works end-to-end early
- FundSection late because it depends on real logo assets (many placeholders initially)
- MediaSection last because it is most blocked on pending assets (photos, LinkedIn posts)
- NavDots last because it requires all section `id` attributes to be in place

---

## Framer Motion + App Router: Rules

| Concern | Rule |
|---------|------|
| `motion` / `m` components | Must be in files marked `'use client'` |
| `useInView`, `useMotionValue`, `animate()` | Must be in `'use client'` files |
| `whileInView` | Requires client component; use `ScrollFadeIn` wrapper |
| Server Components | Can import Client Components; `children` slot pattern keeps server content server-rendered |
| `LazyMotion` | Wrap at layout level; use `m.div` (not `motion.div`) inside |
| `viewport={{ once: true }}` | Always set `once: true` — re-triggering animations on scroll-up is poor UX for a portfolio |
| `will-change` CSS | Framer Motion sets this automatically; do not manually add `will-change: transform` globally — causes GPU memory waste |

---

## Scalability Considerations

This is a static single-page site. Scalability means maintainability and content updates, not traffic load.

| Concern | V1 Approach | V2 If Needed |
|---------|-------------|--------------|
| Content updates | Edit TypeScript data files, redeploy | Add Sanity or Contentlayer CMS |
| New portfolio company | Add entry to `lib/data/portfolio.ts`, add logo to `public/images/logos/` | Same |
| New gallery photo | Add entry to `lib/data/media.ts`, add image to `public/images/photos/` | Same |
| Deal memo pages | Out of scope | New dynamic route `/work/[slug]` with password protection |
| Blog/writing section | Out of scope | New route `/writing` fed from Markdown files or CMS |
| Analytics | Deferred to post-deploy | Vercel Analytics or Plausible via `<Script>` in layout |

---

## Sources

- Next.js App Router — Layouts and Pages: https://nextjs.org/docs/app/getting-started/layouts-and-pages (official, 2026-03-16) — HIGH confidence
- Next.js Server and Client Components: https://nextjs.org/docs/app/getting-started/server-and-client-components (official, 2026-03-16) — HIGH confidence
- Next.js Image Optimization: https://nextjs.org/docs/app/getting-started/images (official, 2026-03-16) — HIGH confidence
- Next.js Font Optimization: https://nextjs.org/docs/app/getting-started/fonts (official, 2026-03-16) — HIGH confidence
- Framer Motion LazyMotion / whileInView / useInView patterns: training data (August 2025 cutoff) — MEDIUM confidence; verify API shape against current Framer Motion docs before implementation
- CSS Columns masonry pattern: established CSS technique, no library dependency — HIGH confidence
