# Phase 1: Foundation - Context

**Gathered:** 2026-03-18
**Status:** Ready for planning

<domain>
## Phase Boundary

Scaffold the Next.js project with correct toolchain, design tokens, typography system, dark background (no flash), Framer Motion provider, and all content data files with placeholders. No visible UI output — just the plumbing every subsequent phase depends on.

</domain>

<decisions>
## Implementation Decisions

### Toolchain
- Next.js 16 App Router with TypeScript
- Tailwind CSS v4 — `@import "tailwindcss"` + `@theme {}` in CSS; NO `tailwind.config.js`
- Framer Motion latest — verify package name at install (`framer-motion` vs `motion`)
- `LazyMotion` + `domAnimation` configured at app root — never full bundle
- Turbopack is default in Next.js 16 — no extra flags needed

### Typography
- `next/font/google` only — never `<link>` tags (causes CLS)
- Playfair Display: explicit weights (400, 700) — not a variable font
- DM Sans: variable font — load as variable
- DM Mono: variable font — load as variable
- Expose all three as CSS variables for use in `@theme {}`

### Design Tokens (Tailwind @theme)
- Background: `#0D0D0D`
- Accent gold: `#C8922A`
- Text primary: warm off-white (`#F5F0E8` or similar)
- Text muted: subdued off-white for labels/sublines
- Font families mapped to CSS variables from `next/font`

### Dark Theme
- `background-color: #0D0D0D` applied on `html, body` in `globals.css` — must be pre-JS to prevent flash
- No dark/light toggle — single dark theme only

### Content Data Architecture
- One TypeScript file per section: `lib/data/hero.ts`, `lib/data/philosophy.ts`, `lib/data/fund.ts`, etc.
- Each file exports a typed constant — easy for Vidit to swap in real content without touching components
- Types defined in `lib/types.ts` and imported by data files
- Placeholder values clearly labelled (e.g. `headshot: null`, `linkedinPosts: []`)

### Media Assets
- Photos/videos: Cloudflare CDN — base URL configured via `NEXT_PUBLIC_CLOUDFLARE_URL` env var
- Portfolio logos: `/public/logos/` as local SVG/PNG — plain `<img>` tags, no `next/image`
- `next/image` used only for headshot (single optimized image, stored locally until real photo supplied)

### Deployment
- Vercel with CI on main branch — auto-deploy on every push
- Preview deployments on every PR/branch push
- `NEXT_PUBLIC_CLOUDFLARE_URL` set as Vercel environment variable

### Claude's Discretion
- Exact off-white hex value for body text (aim for warm, not pure white)
- Spacing scale in `@theme {}` (standard Tailwind scale is fine)
- Whether to use `clsx` + `tailwind-merge` for class utilities (recommended)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project requirements
- `.planning/REQUIREMENTS.md` — FOUND-01 through FOUND-08 define all Phase 1 deliverables
- `.planning/PROJECT.md` — Design constraints, "Do NOT use" list, tech stack decisions
- `vidit_dugar_portfolio_PRD.md` — Section 5 (Technical Specifications), Section 2 (Design Direction)

### Research findings
- `.planning/research/STACK.md` — Exact stack versions, Tailwind v4 setup, next/font patterns, Framer Motion install gotchas
- `.planning/research/PITFALLS.md` — Pitfalls 1–4, 8, 14 are Foundation-phase concerns (FOUC, font CLS, LazyMotion bundle, 'use client' boundary)
- `.planning/research/ARCHITECTURE.md` — File structure, data flow, Server vs Client component boundary rules

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- None — greenfield project, no existing code

### Established Patterns
- None yet — this phase establishes the patterns all subsequent phases follow

### Integration Points
- This phase produces: `app/layout.tsx`, `app/page.tsx`, `lib/data/*.ts`, `lib/types.ts`, `components/providers/MotionProvider.tsx`, `globals.css`
- Phase 2 (Hero) imports from `lib/data/hero.ts` and uses `MotionProvider`
- All subsequent phases import from their respective `lib/data/` files

</code_context>

<specifics>
## Specific Ideas

- PRD Section 2: "Refined Editorial Dark — The Economist meets a modern investment firm"
- PRD explicitly lists fonts: Playfair Display (display), DM Sans (body), DM Mono (stats/numbers)
- Research confirmed Next.js is at v16.1.7, not 14+ as stated in PRD — use current version
- Research flag: verify whether `framer-motion` or `motion` is the correct package name at install time

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 01-foundation*
*Context gathered: 2026-03-18*
