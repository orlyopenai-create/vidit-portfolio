# Phase 2: Hero Section - Context

**Gathered:** 2026-03-19
**Status:** Ready for planning

<domain>
## Phase Boundary

Full-viewport hero section: name heading, identity descriptor, subline, portrait headshot, and 4 animated stat count-up widgets that trigger on scroll entry. No nav, no CTA button, no other sections.

</domain>

<decisions>
## Implementation Decisions

### Hero composition
- Two-column layout at desktop: text block (left, ~60% width) + portrait photo (right, ~40% width)
- Text block contains: name heading, descriptor line, subline — top-aligned within column
- Portrait sits right-aligned, bottom-anchored to the stat strip
- On mobile: single column, text above, photo below (or hidden to keep hero clean — Claude's call)
- Full viewport height (`min-h-screen`) — stat strip sits at the bottom of the viewport as a footer band

### Headshot
- Real photo available: `/vidit-headshot.jpg` (506×900px JPEG, downloaded from LinkedIn export 2026-03-19)
- `heroHeadshot` in `lib/data/hero.ts` already updated to `'/vidit-headshot.jpg'`
- Rectangular portrait crop — NOT circular. Matches editorial aesthetic.
- Subtle rounded corners (4–8px) acceptable
- No border ring, no shadow. Let the photo stand on its own against the dark bg.
- Photo should be rendered with `next/image` for performance (local `/public/` file — no remotePatterns needed)
- Use `object-fit: cover`, fixed display dimensions (e.g. 280×420 desktop)

### Stat strip treatment
- Horizontal strip spanning full width at the bottom of the hero viewport
- 4 stats equally spaced in a row — not cards, not boxes. Just typography on dark bg.
- Thin hairline separator (1px, muted `#A39E93` at 30% opacity) between the main content and the stat strip
- Each stat: number in DM Mono (`#C8922A`, large — ~3xl/4xl), label below in DM Sans (`#A39E93`, xs/sm)
- No individual borders/dividers between stats. Use equal flex spacing.

### Animation character
- Text entrance: fade-up (`translateY: 20 → 0`, `opacity: 0 → 1`), 0.6s duration, ease-out
- Stagger: name → descriptor → subline → headshot, each 0.15s apart, triggered on scroll entry with `viewport={{ once: true }}`
- Headshot entrance: fade in only (`opacity: 0 → 1`), 0.8s duration — no translateY (keeps portrait stable)
- Count-up: 1.5s duration, ease-out easing. Count integers for whole numbers; 1 decimal for MOIC (1.8x). Triggered on scroll entry via `useInView`, not on page load.
- Do NOT animate on page load — all animations fire on viewport entry only

### Claude's Discretion
- Exact spacing values (gap, padding) within the above layout constraints
- Whether to show/hide headshot on mobile (can hide to keep hero text prominent, or show small)
- Exact count-up easing function (ease-out is locked; specific cubic-bezier is Claude's call)
- Whether to use `m.div` or `motion.div` syntax (use `m` since LazyMotion is in use)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements
- `.planning/REQUIREMENTS.md` — HERO-01 through HERO-07 (7 requirements for this phase); PERF-02, PERF-03 (animation and component architecture rules)

### Design tokens
- `app/globals.css` — All CSS custom properties: `--color-background`, `--color-foreground`, `--color-muted`, `--color-accent`; font variables
- `app/layout.tsx` — Font variable class names applied to `<html>`: `playfair.variable`, `dmSans.variable`, `dmMono.variable`

### Data
- `lib/data/hero.ts` — `heroStats` (4 stats with prefix/suffix/decimals), `heroHeadshot` (now `'/vidit-headshot.jpg'`), `heroIdentity` (name, descriptor, subline)
- `lib/types.ts` — `Stat` interface definition

### Animation infrastructure
- `components/providers/MotionProvider.tsx` — `LazyMotion + domAnimation` at app root; use `m.*` (not `motion.*`) in client components
- Phase 1 decision (STATE.md): All section components are Server Components; Framer Motion isolated to narrow `'use client'` leaf wrappers only

### Entry point
- `app/page.tsx` — Current placeholder; Hero section replaces/extends this

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `components/providers/MotionProvider.tsx`: LazyMotion provider already at root — animated components just need `'use client'` + `m.*` components
- `lib/data/hero.ts`: All hero data already structured and ready to import
- `lib/types.ts` `Stat` interface: has `value`, `label`, `prefix`, `suffix`, `decimals` — count-up component should consume this shape

### Established Patterns
- Tailwind v4 `@theme` tokens in `app/globals.css` — use `text-accent`, `text-muted`, `text-foreground`, `bg-background` etc. (no inline hex values)
- `font-display` = Playfair Display, `font-body` = DM Sans, `font-mono` = DM Mono (CSS variables set in layout.tsx)
- `app/page.tsx` currently has a placeholder — Hero component should be imported here

### Integration Points
- `app/page.tsx` is the entry: create a `<HeroSection>` server component that imports data and renders a `<HeroAnimations>` client wrapper for the animated parts
- Portrait image at `public/vidit-headshot.jpg` — use `next/image` with `src="/vidit-headshot.jpg"` (local public file)

</code_context>

<specifics>
## Specific Ideas

- Headshot is 506×900px — portrait orientation. Display at roughly 280×420px on desktop (natural 9:16 feel, not cropped square). Taller than wide.
- "VIDIT DUGAR" in Playfair Display should be the dominant visual element — likely 5xl–7xl, bold, `tracking-tight` or default tracking
- The identity line "Investor. Operator. Builder." should feel like a professional title — not a slogan. Medium weight, not all-caps.
- Subline "Formerly Nomura London · Bombay Shaving Company · The Barbershop Fund" is secondary — smaller, muted.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 02-hero-section*
*Context gathered: 2026-03-19*
