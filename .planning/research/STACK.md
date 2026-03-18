# Technology Stack

**Project:** Vidit Dugar — VC Portfolio Website
**Researched:** 2026-03-18
**Sources:** Next.js official docs (v16.1.7, updated 2026-03-16), Tailwind CSS official upgrade guide, Next.js 15 release notes

---

## Critical Version Alert

The project brief says "Next.js 14+". The current stable version is **Next.js 16.1.7**. This stack targets the current version. Next.js 16 is Vercel-native, ships Turbopack as the default bundler, and is fully stable. There is no reason to target v14 for a greenfield project in 2026.

---

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js | 16.x (`latest`) | Framework + routing | Current stable. App Router is now mature. Turbopack is the default bundler (no config needed). Vercel-native — zero-config deploys. Server Components reduce JS shipped to client, directly benefiting Lighthouse score. |
| React | 19.x (`latest`) | UI rendering | Ships with Next.js 16. Required for App Router's Server Components model. |
| TypeScript | 5.x | Type safety | Included by default in `create-next-app`. Catches prop/data shape bugs at compile time — critical for a site with structured content (portfolio tables, stats, timeline). |

### Styling

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Tailwind CSS | 4.x (`latest`) | Utility-first CSS | Current stable. v4 is a significant rewrite — faster, lighter, CSS-native (uses `@import` not `@tailwind` directives). No `tailwind.config.js` needed for most cases; tokens defined in CSS. Ships with `create-next-app` defaults. |
| `@tailwindcss/postcss` | 4.x | PostCSS integration | The v4 PostCSS plugin. Replaces the old `tailwindcss` PostCSS plugin. Required for Next.js (which uses PostCSS). |

**Tailwind v4 install for Next.js:**
```bash
npm install tailwindcss @tailwindcss/postcss postcss
```

`postcss.config.mjs`:
```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

`app/globals.css`:
```css
@import "tailwindcss";

/* Custom design tokens */
@theme {
  --color-background: #0D0D0D;
  --color-text: #F5F0E8;
  --color-accent: #C8922A;
  --font-display: "Playfair Display", serif;
  --font-body: "DM Sans", sans-serif;
  --font-mono: "DM Mono", monospace;
}
```

### Fonts

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `next/font/google` | (built into Next.js) | Playfair Display, DM Sans, DM Mono | Next.js self-hosts Google Fonts at build time — no runtime requests to Google, zero CLS (layout shift), no external network dependency. This is the only correct approach for Lighthouse 90+. Do NOT use `<link>` tags or `@import url(fonts.google.com)` in CSS. |

**Font setup in `app/layout.tsx`:**
```tsx
import { Playfair_Display, DM_Sans, DM_Mono } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const dmMono = DM_Mono({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})
```

Note: Playfair Display is not a variable font — you must specify weights. DM Sans and DM Mono have variable font variants. Prefer variable fonts for performance (single file serves all weights).

### Animation

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `framer-motion` | 11.x | Scroll-triggered animations, count-up stats, fade-ins | Industry standard for React animation. `whileInView` prop handles scroll-triggered reveal with no IntersectionObserver boilerplate. `useMotionValue` + `useTransform` handles count-up stats. Well-maintained, React 19 compatible. |

**Critical gotcha — App Router SSR incompatibility:**

Framer Motion components use browser APIs (`window`, `matchMedia`) and React hooks (`useState`, `useEffect`). They cannot run as Server Components. Every component that uses `motion.*` primitives must be a Client Component.

Correct pattern:
```tsx
// components/AnimatedSection.tsx
'use client'

import { motion } from 'framer-motion'

export function AnimatedSection({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  )
}
```

The parent page (`app/page.tsx`) can remain a Server Component and pass static content as children into Client Component wrappers. Do NOT mark the entire page or layout as `'use client'` — that collapses Server Component benefits and will tank Lighthouse scores.

**Bundle size strategy:**

Framer Motion adds ~30-50kB gzipped to the client bundle. For a portfolio site this is acceptable. To minimize:
- Import only from `framer-motion` (not sub-paths unless specifically needed)
- Use `viewport={{ once: true }}` on all `whileInView` animations — prevents re-triggering and removes the active observer after first fire
- Do NOT use `LazyMotion` + `domAnimation` unless bundle size becomes a measured problem — the split API adds complexity without meaningful benefit for a single-page site

### Infrastructure

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Vercel | — | Hosting + CDN | Zero-config deployment from GitHub. Automatic preview deployments per branch. Edge network for global CDN. next/image optimization is free on Vercel (no sharp install needed). next/font self-hosting works without any config. |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `clsx` | 2.x | Conditional className composition | Use when merging Tailwind classes conditionally (e.g. animated states). Lighter than `classnames`. |
| `tailwind-merge` | 3.x | Merge Tailwind classes without conflicts | Use with `clsx` when a component accepts className overrides. Pattern: `cn(baseClasses, props.className)`. |

Utility wrapper (create `lib/utils.ts`):
```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

## What NOT to Use

| Rejected Option | Why Not |
|-----------------|---------|
| `<link rel="stylesheet">` for Google Fonts | Causes external request to Google, hurts privacy score, risks CLS, and fails Lighthouse network audit. Use `next/font/google` exclusively. |
| `@import url(fonts.googleapis.com)` in CSS | Same problem as above — external request at render time. |
| Styled Components / Emotion / CSS-in-JS | Runtime CSS injection conflicts with React Server Components (no JS context at render time). Will cause hydration errors. Tailwind is the correct choice. |
| `next/dynamic` with `ssr: false` for Framer Motion | Only needed if a component actually breaks on server — which animated `motion.*` components do NOT (they just need `'use client'`). `ssr: false` suppresses the component from initial HTML entirely, which hurts LCP. Use `'use client'` instead. |
| GSAP / Anime.js / AOS | Framer Motion is better integrated with React state and lifecycle. AOS is jQuery-era. GSAP is overkill for a static portfolio. |
| Sass / Less | Tailwind v4 does not support Sass/Less. Not needed. |
| `tailwindcss` PostCSS plugin (v3 config) | v4 uses `@tailwindcss/postcss`. Installing the old package will not work with v4. |
| `tailwind.config.js` | Not needed for v4 — design tokens defined in CSS `@theme` block instead. If any v3-era guides recommend it, they are outdated. |
| React Compiler (experimental) | Available in Next.js 16 but slows build times (Babel plugin). For a static portfolio site, it adds complexity without measurable benefit. |
| Turbopack `next dev --turbo` flag | No longer needed — Turbopack is the default since Next.js 16. `next dev` already uses Turbopack. |

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Framework | Next.js 16 | Astro, Remix, Vite + React | Next.js is Vercel-native, has best-in-class `next/font` and `next/image`, and team already specified it. Astro would be marginally better for purely static but adds migration risk. |
| Styling | Tailwind CSS v4 | CSS Modules, Styled Components | CSS Modules is viable but verbose for responsive dark theme work. Styled Components is incompatible with RSC. |
| Animation | framer-motion 11 | GSAP, React Spring, CSS animations | GSAP is overkill and requires license for commercial use. React Spring has steeper API for scroll-triggered work. Pure CSS can handle simple fades but cannot do count-up stats. Framer Motion does all required features in one library. |
| Font loading | next/font/google | Google Fonts CDN link | next/font is objectively superior for performance — self-hosted, zero CLS, no external requests. |

---

## Installation

```bash
# Bootstrap project (includes TypeScript, Tailwind, ESLint, App Router, Turbopack)
npx create-next-app@latest vidit-portfolio --yes

cd vidit-portfolio

# Animation library
npm install framer-motion

# Class name utilities
npm install clsx tailwind-merge

# Tailwind v4 PostCSS setup (if not already included by create-next-app)
npm install @tailwindcss/postcss postcss
```

**Verify versions after install:**
```bash
npx next --version          # Should be 16.x
npm list framer-motion      # Should be 11.x
npm list tailwindcss        # Should be 4.x
```

---

## Key Configuration Files

### `next.config.ts`
```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Turbopack is default — no config needed
  // Images: all images are local (headshot, logos in /public)
  // No remote image patterns needed for V1
}

export default nextConfig
```

### `tsconfig.json` (path alias)
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### `postcss.config.mjs`
```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

---

## Performance Implications for Lighthouse 90+

| Concern | Solution | Confidence |
|---------|----------|------------|
| Font CLS (layout shift) | `next/font` with `display: 'swap'` and `variable` mode | HIGH — official Next.js docs confirm zero CLS |
| Image CLS | `next/image` with explicit `width`/`height` or `fill` + sized container | HIGH — official docs |
| Animation performance | `will-change: transform` implied by Framer Motion's hardware-accelerated transforms; `viewport={{ once: true }}` removes observers after first fire | MEDIUM — Framer Motion defaults, confirmed in docs |
| JS bundle size | Keep animated components as thin wrappers; static content stays in Server Components | HIGH — confirmed RSC architecture |
| LCP (largest contentful paint) | Headshot image: use `priority` prop on `<Image>` to preload | HIGH — official docs |
| Render-blocking resources | No external font CDN links; `next/font` inlines critical CSS | HIGH — official docs |

---

## Confidence Assessment

| Area | Confidence | Source |
|------|------------|--------|
| Next.js version (16.1.7) | HIGH | nextjs.org official docs, version field in docs response |
| next/font Google Fonts setup | HIGH | Official Next.js font optimization docs (updated 2026-03-16) |
| Tailwind v4 install for Next.js | HIGH | Official Tailwind framework guide for Next.js |
| Tailwind v4 breaking changes | HIGH | Official Tailwind upgrade guide |
| Turbopack as default bundler | HIGH | Official Next.js installation docs + Next.js 16 changelog |
| RSC + Framer Motion `'use client'` pattern | HIGH | Official Next.js Client Components docs + known Framer Motion requirement |
| framer-motion v11 | MEDIUM | Training data (August 2025 cutoff) — npm page was inaccessible. Use `npm install framer-motion@latest` and verify version at install time. |
| `clsx` + `tailwind-merge` versions | MEDIUM | Standard ecosystem packages; versions should be verified at install time |

---

## Sources

- Next.js Installation docs: https://nextjs.org/docs/app/getting-started/installation (version 16.1.7, 2026-03-16)
- Next.js Font Optimization docs: https://nextjs.org/docs/app/getting-started/fonts (version 16.1.7, 2026-03-16)
- Next.js Server and Client Components: https://nextjs.org/docs/app/getting-started/server-and-client-components (version 16.1.7, 2026-03-16)
- Next.js Image Optimization: https://nextjs.org/docs/app/getting-started/images (version 16.1.7, 2026-03-16)
- Next.js Lazy Loading: https://nextjs.org/docs/app/guides/lazy-loading (version 16.1.7, 2026-03-16)
- Next.js Metadata API: https://nextjs.org/docs/app/getting-started/metadata-and-og-images (version 16.1.7, 2026-03-16)
- Next.js Turbopack config: https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopack (version 16.1.7, 2026-03-16)
- Next.js 15 release blog: https://nextjs.org/blog/next-15
- Tailwind CSS v4 upgrade guide: https://tailwindcss.com/docs/upgrade-guide
- Tailwind CSS Next.js framework guide: https://tailwindcss.com/docs/installation/framework-guides/nextjs
