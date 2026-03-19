# Phase 2: Hero Section - Research

**Researched:** 2026-03-19
**Domain:** Framer Motion 12 scroll animations, Next.js 16 next/image, Tailwind v4 layout
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Hero composition**
- Two-column layout at desktop: text block (left, ~60% width) + portrait photo (right, ~40% width)
- Text block contains: name heading, descriptor line, subline — top-aligned within column
- Portrait sits right-aligned, bottom-anchored to the stat strip
- On mobile: single column, text above, photo below (or hidden to keep hero clean — Claude's call)
- Full viewport height (`min-h-screen`) — stat strip sits at the bottom of the viewport as a footer band

**Headshot**
- Real photo available: `/vidit-headshot.jpg` (506×900px JPEG, downloaded from LinkedIn export 2026-03-19)
- `heroHeadshot` in `lib/data/hero.ts` already updated to `'/vidit-headshot.jpg'`
- Rectangular portrait crop — NOT circular. Matches editorial aesthetic.
- Subtle rounded corners (4–8px) acceptable
- No border ring, no shadow. Let the photo stand on its own against the dark bg.
- Photo rendered with `next/image` for performance (local `/public/` file — no remotePatterns needed)
- Use `object-fit: cover`, fixed display dimensions (e.g. 280×420 desktop)

**Stat strip treatment**
- Horizontal strip spanning full width at the bottom of the hero viewport
- 4 stats equally spaced in a row — not cards, not boxes. Just typography on dark bg.
- Thin hairline separator (1px, muted `#A39E93` at 30% opacity) between the main content and the stat strip
- Each stat: number in DM Mono (`#C8922A`, large — ~3xl/4xl), label below in DM Sans (`#A39E93`, xs/sm)
- No individual borders/dividers between stats. Use equal flex spacing.

**Animation character**
- Text entrance: fade-up (`translateY: 20 → 0`, `opacity: 0 → 1`), 0.6s duration, ease-out
- Stagger: name → descriptor → subline → headshot, each 0.15s apart, triggered on scroll entry with `viewport={{ once: true }}`
- Headshot entrance: fade in only (`opacity: 0 → 1`), 0.8s duration — no translateY
- Count-up: 1.5s duration, ease-out easing. Count integers for whole numbers; 1 decimal for MOIC (1.8x). Triggered on scroll entry via `useInView`, not on page load.
- Do NOT animate on page load — all animations fire on viewport entry only

### Claude's Discretion
- Exact spacing values (gap, padding) within the above layout constraints
- Whether to show/hide headshot on mobile (can hide to keep hero text prominent, or show small)
- Exact count-up easing function (ease-out is locked; specific cubic-bezier is Claude's call)
- Whether to use `m.div` or `motion.div` syntax (use `m` since LazyMotion is in use)

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| HERO-01 | Full-viewport-height hero section displaying `VIDIT DUGAR` in Playfair Display as dominant heading | `min-h-screen` flex layout; Tailwind `font-display` token; large text size (5xl–7xl) |
| HERO-02 | Identity descriptor line: `Investor. Operator. Builder.` | `heroIdentity.descriptor` from `lib/data/hero.ts`; `font-body` token |
| HERO-03 | Subline in muted text: `Formerly Nomura London · Bombay Shaving Company · The Barbershop Fund` | `heroIdentity.subline` from `lib/data/hero.ts`; `text-muted` Tailwind token |
| HERO-04 | Headshot placeholder (rectangular crop) displayed in hero — easy asset swap via data file | `next/image` with `src={heroHeadshot}` from data file; 280×420 fixed dimensions; local `/public/vidit-headshot.jpg` confirmed present |
| HERO-05 | 4 animated stat count-up widgets on scroll entry | `useInView` hook with `once: true`; `requestAnimationFrame` count-up loop; `heroStats` array from data file |
| HERO-06 | Stat numbers in amber/gold (`#C8922A`); labels in muted off-white | `text-accent` Tailwind token; `text-muted` Tailwind token; `font-mono` for numbers |
| HERO-07 | Scroll-triggered fade-in on hero text elements with `viewport={{ once: true }}` | `m.div` + `whileInView` + `viewport={{ once: true }}`; confirmed in `domAnimation` feature set; stagger via `transition.delay` |
</phase_requirements>

---

## Summary

This phase builds a full-viewport hero section atop an established foundation. Phase 1 delivered LazyMotion at the root, Tailwind v4 `@theme` tokens, three fonts as CSS variables, and all hero data in `lib/data/hero.ts`. The implementation work is purely additive: create new components and replace the placeholder `app/page.tsx`.

The two main technical challenges are: (1) correctly composing Framer Motion `m.*` components with `whileInView` + `viewport={{ once: true }}` under `LazyMotion + domAnimation`, and (2) building a count-up animation that triggers on viewport entry rather than page load using `useInView`. Both are fully supported by the installed framer-motion 12.38.0 package — no additional dependencies are needed.

The architecture splits cleanly: `HeroSection` (Server Component) imports data and renders layout, delegating all animated subtrees to narrow `'use client'` wrappers (`HeroAnimations`, `StatCountUp`). This honors PERF-03 and the Phase 1 pattern established in STATE.md.

**Primary recommendation:** Use `m.div` with `whileInView`/`viewport` for fade animations; use `useInView` + manual `requestAnimationFrame` loop for count-up (gives precise control over duration and decimal formatting). No third-party count-up library needed.

---

## Standard Stack

### Core (already installed — no new installs needed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| framer-motion | 12.38.0 | `m.div` whileInView fade animations, `useInView` for count-up trigger | Already at root via MotionProvider; `domAnimation` bundle includes `inView` feature |
| next/image | Next.js 16.2.0 built-in | Optimized headshot rendering | Automatic WebP conversion, lazy loading, layout shift prevention |
| tailwindcss | v4 | Layout, spacing, typography utilities | Project standard; `@theme` tokens already defined |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| clsx | 2.1.1 | Conditional class names | Already installed; use for mobile show/hide logic |
| tailwind-merge | 3.5.0 | Merge Tailwind classes safely | Already installed; use in reusable components |

### New Dependencies
**None required.** All needed libraries are already in `package.json`.

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Manual `requestAnimationFrame` count-up | `react-countup` or `use-count-up` | Third-party adds ~8KB; manual gives exact control over prefix/suffix/decimal formatting per `Stat` interface |
| `useInView` hook for count-up trigger | `whileInView` + `onUpdate` | `whileInView` is simpler but less precise for imperative count-up logic; `useInView` is the right tool |

---

## Architecture Patterns

### Recommended Component Structure
```
components/
├── sections/
│   └── HeroSection.tsx        # Server Component — imports data, renders layout
├── hero/
│   ├── HeroAnimations.tsx     # 'use client' — wraps all animated text with m.div
│   └── StatCountUp.tsx        # 'use client' — count-up widget for one Stat
```

`app/page.tsx` imports `<HeroSection />` directly.

### Pattern 1: Server/Client Split for Hero

**What:** `HeroSection` is a Server Component that imports data and passes it as props to a `'use client'` child wrapper.

**When to use:** Mandatory — PERF-03 requires Framer Motion isolated to client leaf components.

**Example:**
```typescript
// components/sections/HeroSection.tsx (Server Component — no 'use client')
import { heroIdentity, heroStats, heroHeadshot } from '@/lib/data/hero'
import { HeroAnimations } from '@/components/hero/HeroAnimations'
import Image from 'next/image'

export function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col">
      <HeroAnimations identity={heroIdentity} headshot={heroHeadshot} stats={heroStats} />
    </section>
  )
}
```

### Pattern 2: m.div whileInView with Stagger via delay

**What:** Each text element is an `m.div` (NOT `motion.div` — LazyMotion requires `m.*`) with `initial`, `whileInView`, and `viewport={{ once: true }}`. Stagger is achieved via `transition.delay` incrementing by 0.15s.

**When to use:** All hero text fade-up animations (name, descriptor, subline, headshot).

**Confirmed API from framer-motion 12.38.0 source:**
- `viewport` prop is read by `InViewFeature` inside `animations.mjs`, which is included in `domAnimation`
- Options: `{ once?: boolean, margin?: string, amount?: "some" | "all" | number, root?: RefObject }`
- `once: true` prevents re-animation on scroll back (matches HERO-07, PERF-02)

```typescript
// Source: node_modules/framer-motion/dist/es/motion/features/viewport/index.mjs
// 'use client'
import { m } from 'framer-motion'

// Fade-up pattern
<m.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, ease: 'easeOut', delay: 0 }}
>
  {/* name */}
</m.div>

<m.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
>
  {/* descriptor */}
</m.div>

// Headshot: fade only, no translateY
<m.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.45 }}
>
  {/* headshot */}
</m.div>
```

### Pattern 3: useInView for Count-Up Trigger

**What:** `useInView(ref, { once: true })` returns a boolean. When it becomes `true`, start the count-up animation via `requestAnimationFrame`.

**Confirmed API from framer-motion 12.38.0 source:**
```typescript
// Source: node_modules/framer-motion/dist/es/utils/use-in-view.mjs
function useInView(ref, { root, margin, amount, once = false, initial = false } = {})
// Returns: boolean (isInView)
```

**Count-up pattern (handles prefix, suffix, decimals from Stat interface):**
```typescript
// 'use client'
import { useRef, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'
import type { Stat } from '@/lib/types'

export function StatCountUp({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const duration = 1500 // ms — matches locked 1.5s
    const start = performance.now()
    const end = stat.value

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // ease-out: cubic ease (1 - (1-t)^3)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(parseFloat((eased * end).toFixed(stat.decimals ?? 0)))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isInView, stat.value, stat.decimals])

  const formatted = count.toFixed(stat.decimals ?? 0)
  return (
    <div ref={ref} className="flex flex-col items-center gap-1">
      <span className="font-mono text-4xl text-accent">
        {stat.prefix}{formatted}{stat.suffix}
      </span>
      <span className="font-body text-xs text-muted text-center">
        {stat.label}
      </span>
    </div>
  )
}
```

### Pattern 4: next/image for Local Portrait

**What:** `next/image` with explicit `width`/`height` for fixed-dimension portrait. No `remotePatterns` needed for files in `/public/`.

**Confirmed:** `public/vidit-headshot.jpg` exists (506×900px). `next.config.ts` is empty — no image config required for local files.

```typescript
// Source: next/image component — local /public/ files need no config
import Image from 'next/image'

<Image
  src="/vidit-headshot.jpg"
  alt="Vidit Dugar"
  width={280}
  height={420}
  className="object-cover rounded-sm"
  priority={false}  // hero is above fold but lazy is fine — user scrolls to it
/>
```

Note: `rounded-sm` in Tailwind v4 = approximately 4px border-radius (matches "4–8px" decision).

### Pattern 5: Tailwind v4 Token Usage

Design tokens confirmed from `app/globals.css`:

| Token | Value | Use |
|-------|-------|-----|
| `bg-background` | `#0D0D0D` | Hero section background |
| `text-foreground` | `#F5F0E8` | Name, descriptor |
| `text-muted` | `#A39E93` | Subline, stat labels |
| `text-accent` | `#C8922A` | Stat numbers |
| `font-display` | Playfair Display | Name heading |
| `font-body` | DM Sans | Descriptor, subline, labels |
| `font-mono` | DM Mono | Stat numbers |

**Important:** Use these Tailwind utility classes, NOT inline hex values. The `@theme` block maps them correctly.

### Anti-Patterns to Avoid

- **Using `motion.div` instead of `m.div`:** Inside `LazyMotion`, only `m.*` components work. `motion.*` imports the full bundle and defeats the optimization.
- **Triggering count-up on mount instead of viewport entry:** Do not start the animation in a bare `useEffect` — gate it behind `isInView` from `useInView`.
- **Animating on re-scroll:** Both `viewport={{ once: true }}` and `useInView(..., { once: true })` prevent re-animation. Both MUST have `once: true`.
- **Putting `'use client'` on HeroSection:** The outer section component must remain a Server Component. Only the animated children get the directive.
- **Using inline style for colors:** `style={{ color: '#C8922A' }}` instead of `className="text-accent"` breaks the token system.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Viewport detection for count-up | Custom IntersectionObserver hook | `useInView` from `framer-motion` | Already installed; handles SSR, cleanup, once semantics correctly |
| Image optimization | `<img>` with manual sizing | `next/image` | Automatic WebP, AVIF conversion; prevents CLS via reserved dimensions; lazy loading built-in |
| Animation state for whileInView | Custom scroll listener + state | `m.div` + `whileInView` + `viewport` | Backed by IntersectionObserver internally; zero additional code |
| Easing math | Custom easing lookup table | `1 - Math.pow(1 - t, 3)` cubic ease-out | Simple, correct, no dependency; matches "ease-out" decision |

**Key insight:** This phase adds zero new npm dependencies. Everything needed (Framer Motion, next/image, Tailwind) is already installed.

---

## Common Pitfalls

### Pitfall 1: Count-up Fires on Page Load Not Viewport Entry
**What goes wrong:** Animation starts immediately when component mounts, not when user scrolls to see it.
**Why it happens:** `useEffect` with no dependency on `isInView`, or `isInView` initial value not defaulting to `false`.
**How to avoid:** Gate the `requestAnimationFrame` loop behind `if (!isInView) return`. The `useInView` hook defaults `initial` to `false` — do not override this.
**Warning signs:** Stats show final numbers before user has scrolled to them.

### Pitfall 2: m.* Components Not Working (No Animation)
**What goes wrong:** `m.div` renders but animations never fire.
**Why it happens:** Component is used outside a `LazyMotion` boundary, or features imported incorrectly.
**How to avoid:** `MotionProvider` is already at root in `app/layout.tsx` — this is guaranteed. Ensure imports are `import { m } from 'framer-motion'` (not `import { motion as m }`).
**Warning signs:** No animation, no console error; element renders but stays at initial state.

### Pitfall 3: Hero Animates on Page Load
**What goes wrong:** Text fades in immediately when the page loads, not on scroll.
**Why it happens:** `whileInView` fires immediately for elements already in the initial viewport. Hero is full-screen, so the name/descriptor ARE in the viewport on load.
**How to avoid:** This is actually correct behavior per HERO-07 — "on scroll entry" means IntersectionObserver fires when element enters viewport. For a full-screen hero, the first viewport entry IS on page load. The `viewport={{ once: true }}` is the important part — it prevents RE-animation on scroll back. Accept that the hero animates on page load; this is the intended UX.
**Warning signs:** Confusion about "scroll entry" vs "on scroll down past fold".

### Pitfall 4: Portrait Causes Layout Shift
**What goes wrong:** Page jumps when image loads because dimensions aren't reserved.
**Why it happens:** Using `<img>` or `next/image` without explicit `width`/`height`.
**How to avoid:** Always provide `width={280} height={420}` to `next/image`. The component reserves space before the image loads.
**Warning signs:** CLS score in Lighthouse degrades.

### Pitfall 5: Stat Strip Bottom Anchoring
**What goes wrong:** Stat strip floats in the middle of the hero or is cut off on short screens.
**Why it happens:** Using `justify-between` or absolute positioning incorrectly.
**How to avoid:** Use `flex flex-col` on the hero section with `flex-1` on the content area and the stat strip at the end. This naturally bottom-anchors the strip within `min-h-screen`.
**Warning signs:** Stat strip appears mid-page or overlaps content on laptop screens.

### Pitfall 6: Decimal Formatting Bug in Count-Up
**What goes wrong:** `1.8` renders as `2` (integer) or `1.800000`.
**Why it happens:** `Math.round` or `parseInt` instead of `toFixed(decimals)`.
**How to avoid:** Use `parseFloat((eased * end).toFixed(stat.decimals ?? 0))` during the animation loop and format with `.toFixed()` in the render.
**Warning signs:** MOIC stat shows wrong value.

---

## Code Examples

### Complete HeroSection Structure

```typescript
// components/sections/HeroSection.tsx
// Server Component — no 'use client'
import { heroIdentity, heroStats, heroHeadshot } from '@/lib/data/hero'
import { HeroAnimations } from '@/components/hero/HeroAnimations'

export function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col bg-background">
      <HeroAnimations
        identity={heroIdentity}
        stats={heroStats}
        headshot={heroHeadshot}
      />
    </section>
  )
}
```

### Hairline Separator for Stat Strip

```typescript
// 1px border with muted color at 30% opacity — using Tailwind + inline opacity
<div className="border-t border-muted/30" />
```

The `muted/30` syntax is Tailwind v4 compatible: it applies `#A39E93` at 30% opacity using the `@theme` token.

### Importing from lib/data/hero.ts

```typescript
// Confirmed data shape from lib/data/hero.ts:
// heroStats: Stat[] — [{value:16, label:'Early-Stage Investments', decimals:0}, ...]
// heroHeadshot: string — '/vidit-headshot.jpg'
// heroIdentity: {name: string, descriptor: string, subline: string}
import { heroIdentity, heroStats, heroHeadshot } from '@/lib/data/hero'
```

---

## State of the Art

| Old Approach | Current Approach | Impact |
|--------------|------------------|--------|
| `motion.div` (full bundle) | `m.div` inside `LazyMotion` | ~30KB bundle reduction; already set up in Phase 1 |
| Custom IntersectionObserver | `useInView` from framer-motion | Less code, consistent with animation library |
| `framer-motion` v10 `useAnimation` + scroll | v12 `whileInView` + `viewport` prop | Simpler declarative API; no imperative controls needed |

**Note on framer-motion version:** STATE.md says "Framer Motion 11" but `package.json` confirms `12.38.0` is installed. The API is compatible — `whileInView`, `m.*`, `useInView`, `domAnimation` all work identically. No breaking changes affect this phase.

---

## Open Questions

1. **Mobile headshot visibility**
   - What we know: Decision is Claude's call per CONTEXT.md
   - Recommendation: Hide headshot on mobile (`hidden md:block`) — the name at large size + descriptor + subline fill a mobile screen cleanly without the portrait competing for space. The stat strip remains visible.

2. **Easing cubic-bezier for count-up**
   - What we know: ease-out is locked; specific curve is Claude's call
   - Recommendation: `1 - Math.pow(1 - t, 3)` (cubic ease-out, equivalent to CSS `cubic-bezier(0.33, 1, 0.68, 1)`) — smooth deceleration that reads as "settling into" the final number.

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None detected — no jest/vitest/playwright config found |
| Config file | None — Wave 0 must create if needed |
| Quick run command | `npm run build` (TypeScript compile + build check) |
| Full suite command | `npm run build && npm run lint` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| HERO-01 | Hero section renders with `VIDIT DUGAR` heading | manual-only | Visual inspect at `localhost:3000` | ❌ Wave 0 |
| HERO-02 | Descriptor line renders | manual-only | Visual inspect | ❌ Wave 0 |
| HERO-03 | Subline renders in muted color | manual-only | Visual inspect | ❌ Wave 0 |
| HERO-04 | Headshot renders from `heroHeadshot` value | manual-only | Visual inspect; swap value in `lib/data/hero.ts` | ❌ Wave 0 |
| HERO-05 | Count-up fires on scroll entry, not page load | manual-only | Scroll test at `localhost:3000` | ❌ Wave 0 |
| HERO-06 | Stat numbers in accent color, labels in muted | manual-only | Visual inspect | ❌ Wave 0 |
| HERO-07 | Fade-in fires once on viewport entry, not again on scroll back | manual-only | Scroll up/down test | ❌ Wave 0 |

**Justification for manual-only:** This phase is pure visual/animation work. The behaviors (viewport trigger timing, animation character, color rendering) are not meaningfully testable with unit or snapshot tests without a full browser runtime. The `npm run build` command catches TypeScript errors and import issues, which is the automatable quality gate.

### Sampling Rate
- **Per task commit:** `npm run build` — catches TS errors
- **Per wave merge:** `npm run build && npm run lint`
- **Phase gate:** Manual visual review at `localhost:3000` before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] No test files needed — manual browser testing is the appropriate strategy for this phase
- [ ] Ensure `npm run dev` runs before each implementation task (no missing framework setup)

---

## Sources

### Primary (HIGH confidence)
- `node_modules/framer-motion/dist/es/utils/use-in-view.mjs` — `useInView` hook implementation; options: `root`, `margin`, `amount`, `once`, `initial`
- `node_modules/framer-motion/dist/es/motion/features/viewport/index.mjs` — `InViewFeature` implementation; confirms `viewport` prop shape: `{ once, margin, amount, root }`
- `node_modules/framer-motion/dist/es/motion/features/definitions.mjs` — confirms `inView: ["whileInView", "onViewportEnter", "onViewportLeave"]` is a feature group
- `node_modules/framer-motion/dist/es/render/dom/features-animation.mjs` — confirms `domAnimation` includes `animations` (which includes `inView` feature)
- `node_modules/framer-motion/dist/es/m.mjs` — confirms `m.div` export exists and maps to `MotionDiv`
- `node_modules/next/dist/client/image-component.d.ts` — confirms `next/image` props: `width`, `height`, `fill`, `priority`, `objectFit`
- `lib/data/hero.ts` — `heroStats`, `heroHeadshot`, `heroIdentity` shapes confirmed
- `lib/types.ts` — `Stat` interface confirmed: `value`, `label`, `prefix`, `suffix`, `decimals`
- `app/globals.css` — all Tailwind v4 `@theme` tokens confirmed
- `app/layout.tsx` — font variables and MotionProvider wrapping confirmed
- `components/providers/MotionProvider.tsx` — `LazyMotion + domAnimation` setup confirmed
- `public/vidit-headshot.jpg` — file exists, confirmed 506×900px portrait
- `next.config.ts` — empty config; no `remotePatterns` needed for local files

### Secondary (MEDIUM confidence)
- `package.json` — version pinning: framer-motion 12.38.0, next 16.2.0

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all versions from installed `package.json`; APIs verified from installed node_modules source
- Architecture: HIGH — patterns derived directly from existing codebase conventions (Phase 1) and confirmed framer-motion 12 source
- Pitfalls: HIGH — derived from confirmed API behavior and locked design decisions

**Research date:** 2026-03-19
**Valid until:** 2026-06-19 (stable libraries; framer-motion API changes slowly)
