# Domain Pitfalls

**Domain:** Next.js 14 App Router portfolio site with Framer Motion, Google Fonts, dark theme, Tailwind CSS, Vercel deployment
**Researched:** 2026-03-18
**Confidence:** HIGH (official Next.js docs verified; Framer Motion training knowledge HIGH confidence for SSR patterns)

---

## Critical Pitfalls

Mistakes that cause broken pages, Lighthouse failures, or full rewrites.

---

### Pitfall 1: Framer Motion Components Used in Server Components Without 'use client'

**What goes wrong:** Framer Motion's `motion.*` components use React hooks internally (`useReducedMotion`, animation state, layout effects). Importing them in a Server Component causes a build error or silent runtime failure: "useState can only be used in a Client Component." The entire animated section fails to render.

**Why it happens:** Next.js App Router defaults every component to a Server Component. Developers new to App Router forget that animation libraries are inherently client-side. Framer Motion does not ship `"use client"` in its own package exports (as of v11), so the directive must be on the consuming component.

**Consequences:** Build error or hydration crash on every animated section. If an animated wrapper wraps the full page, the entire page breaks.

**Prevention:**
- Any component file that imports from `framer-motion` MUST have `"use client"` at the top.
- Create thin wrapper components (`AnimatedSection`, `FadeIn`, `CountUp`) that are `"use client"` and import Framer Motion. Static content can remain as Server Components and be passed as `children` props into these wrappers.
- Pattern: `<AnimatedSection>` (client) wraps `<SectionContent>` (server) via the `children` slot — this keeps server rendering for text content while animations hydrate on client.

**Detection:** Build-time error "You're importing a component that needs useState / useEffect". Alternatively, `next build` warning mentioning a specific animation component.

**Phase:** Foundation / Component build (Phase 1 or 2)

---

### Pitfall 2: Framer Motion `useInView` / `useScroll` Causes Hydration Mismatch

**What goes wrong:** Scroll-triggered animations that check `window`, viewport dimensions, or scroll position during SSR produce HTML that differs from the client's first render. React throws a hydration mismatch warning, and in strict mode, the component tree unmounts and remounts — causing a visible flash or layout jump visible to the VC visitor.

**Why it happens:** The server renders elements in their "pre-animation" state (e.g., `opacity: 0, y: 20`). If initial values are computed from browser APIs not available on the server, or if `AnimatePresence` triggers on mount, the server HTML and client HTML diverge.

**Consequences:** Console hydration errors, potential visual flash on first load, React tree re-mounting which cancels pending animations.

**Prevention:**
- Always define explicit `initial` and `animate` props on `motion.*` components. Do not derive initial state from `window` or scroll position.
- Use Framer Motion's `whileInView` prop (which uses IntersectionObserver, client-only) inside components already marked `"use client"`. Do not use it in Server Components.
- For components that must render differently on server vs. client (e.g., a stat counter starting at 0), use `suppressHydrationWarning` on the specific element only — not on the whole component.
- Alternative: Use `useIsClient()` hook pattern — set `isMounted` to true in `useEffect`, render placeholder on server, animate on client.

**Detection:** Browser console: "Warning: Prop `style` did not match. Server: ... Client: ...". Network tab showing page load with flash before settling.

**Phase:** Foundation / Animation system (Phase 1-2)

---

### Pitfall 3: Google Fonts Loaded via `<link>` Tag Instead of `next/font`

**What goes wrong:** Developers who copy-paste the Google Fonts `<link>` embed from fonts.google.com into `layout.tsx` or `_document.tsx` bypass Next.js's font optimization entirely. This causes:
- A DNS lookup + TLS handshake + font file download from Google's servers on every page load
- FOUT (Flash of Unstyled Text): text renders in the fallback font, then jumps to Playfair Display / DM Sans once fonts load — this is a direct CLS hit
- Privacy: browser sends user IP to Google on every visit

**Why it happens:** Google Fonts documentation shows `<link>` tags. Developers unfamiliar with `next/font` use those instructions directly.

**Consequences:** CLS score degradation (target < 0.1 for "Good", font swap can cause 0.15–0.3 CLS). Lighthouse Performance score drops 5–15 points. Extra render-blocking network request.

**Prevention:**
- Use `next/font/google` exclusively. Import `Playfair_Display`, `DM_Sans`, and `DM_Mono` from `next/font/google` in `app/layout.tsx`. Next.js self-hosts the font files at build time — no external request, no CLS.
- For non-variable fonts (Playfair Display), specify each weight explicitly: `weight: ['400', '500', '700']`. Missing weight declarations cause browser to synthesize bold/italic — visually degraded.
- Pass `display: 'swap'` (fallback) only if fallback font metrics are similar. For Playfair Display, consider `display: 'optional'` to avoid any layout shift if font is slow to load.
- Apply fonts via CSS variables for Tailwind integration: `variable: '--font-playfair'` then use in `tailwind.config.js`.

**Detection:** Lighthouse CLS > 0.1. Network tab showing requests to `fonts.gstatic.com`. DevTools Coverage tab showing external font fetch.

**Phase:** Foundation / layout setup (Phase 1)

---

### Pitfall 4: Dark Theme Flash (FOUC) on Page Load

**What goes wrong:** Even though this project uses a single dark theme (no toggle), the `#0D0D0D` background can flash as white for ~50–200ms on initial page load when CSS takes time to apply. More critically: if any theme class or CSS variable is applied via JavaScript (e.g., a ThemeProvider), the page renders in the browser's default white background before hydration completes.

**Why it happens:** The browser renders the HTML shell instantly. If `background-color: #0D0D0D` is set via a Tailwind class on `<body>` that's in a CSS file loaded asynchronously, or via a `className` applied by a Client Component, there is a brief window where the body has no background.

**Consequences:** Visible white flash on load — especially noticeable on slower connections or Lighthouse throttled tests. Looks broken to a VC opening the site on mobile.

**Prevention:**
- Set `background-color: #0D0D0D` directly in `globals.css` on the `html` and `body` elements — not just via Tailwind class. This ensures the color is applied by the browser's CSS parser before any JS runs.
- Set `color-scheme: dark` in the `<html>` tag's `style` attribute in `layout.tsx` to prevent browser-rendered form elements from flashing white.
- Do NOT use a ThemeProvider Client Component for a single-theme site. Wrap nothing in a theme context — just apply dark classes statically.
- Tailwind's `darkMode: 'class'` config is irrelevant here (single theme) — do not add it, it adds unnecessary complexity.

**Detection:** Lighthouse "First Contentful Paint" filmstrip showing white frame before content. Chrome DevTools Performance recording showing white background at frame 0.

**Phase:** Foundation / global styles (Phase 1)

---

### Pitfall 5: Logo Grid External Images Breaking Without `remotePatterns` Config

**What goes wrong:** The 25-company portfolio logo grid pulls SVG or PNG logos from external sources (company websites, CDNs, or a Vercel Blob store). Using `next/image` with an external `src` URL without adding the domain to `remotePatterns` in `next.config.js` throws a runtime error: "hostname not configured under images.remotePatterns". The entire logo grid fails to render.

**Why it happens:** Next.js Image Optimization rejects unwhitelisted external domains as a security measure. Developers miss this requirement when initially building with placeholder images (which are local) and only discover the error after adding real logo URLs.

**Consequences:** Runtime 500 error or broken image in production. Local dev may work with local files but production breaks.

**Prevention:**
- Decision: store all logos as files in `/public/logos/` during V1. This eliminates the external domain problem entirely, is simplest to maintain, and allows the CSS `filter` (grayscale → color on hover) to work reliably without CORS issues.
- If external logos are used later, add specific `remotePatterns` entries — not a wildcard `hostname: '**'` (which is a security hole).
- For logos using raw `<img>` tags with CSS filter grayscale, no `remotePatterns` config is needed (Next.js Image optimization only applies to `next/image`). But you lose lazy loading and size optimization.
- Recommended approach: download all 25 logos to `/public/logos/[slug].svg` at build time. Simplest, most reliable, no runtime config needed.

**Detection:** Console error: "Error: Invalid src prop ... hostname ... is not configured under images.remotePatterns". Only appears in production or when using external URLs.

**Phase:** Portfolio section build (Phase 2-3)

---

### Pitfall 6: Stat Count-Up Animation Running on Server / Before Scroll Viewport Entry

**What goes wrong:** The animated stat counters (16 investments, 1.8x MOIC, ₹20Cr deployed, 50%+ follow-on) use a number interpolation animation. Two failure modes:
1. The animation runs immediately on page load instead of waiting until the hero section enters viewport — defeating the "scroll reveal" intent.
2. The animation runs on the server and produces a static intermediate value in the SSR HTML (e.g., "8" instead of "16"), causing a hydration mismatch when the client starts from 0.

**Why it happens:** Developers wire up `useMotionValue` or `useSpring` without wrapping in `useInView` or `whileInView`. Or they initialize the animated value on the server side.

**Consequences:** Hydration mismatch warnings. Stats visible mid-animation on first paint (ugly). Animation plays off-screen and is missed entirely by the user.

**Prevention:**
- Use Framer Motion's `useInView` hook (from `framer-motion`) with `once: true` so the counter triggers exactly once when the stat enters the viewport.
- Initialize the count at 0 in all states. Server renders "0" → client hydrates with "0" → animation plays to target value only after `inView` becomes true. No hydration mismatch.
- Use `useMotionValue` + `useTransform` for the interpolation, and `animate()` the motion value to the target when `inView` becomes true.
- Wrap the entire stats component in `"use client"` — it is inherently interactive.
- Consider `prefers-reduced-motion`: check `useReducedMotion()` from Framer Motion and skip the count animation, showing final value immediately.

**Detection:** Console hydration warning on stat numbers. Visual: counter starts mid-value on page load. Behavior: counter plays but hero is already scrolled past.

**Phase:** Hero section build (Phase 2)

---

## Moderate Pitfalls

---

### Pitfall 7: Masonry Logo Grid Implemented with CSS Columns — Column Order Instead of Row Order

**What goes wrong:** CSS `columns: 5` (multi-column layout) arranges items top-to-bottom in each column, not left-to-right in rows. For a portfolio logo grid, this means logos are ordered: column 1 top → column 1 bottom → column 2 top → etc. Visually it "looks like a grid" but the logical reading order is wrong — important logos may end up buried in later columns.

**Why it happens:** CSS `columns` is the easiest way to achieve a masonry-like grid. Developers use it without realizing the flow direction differs from CSS Grid.

**Consequences:** Wrong visual ordering of logos. For a VC portfolio where the top 5 "standout" companies should appear prominently, this matters.

**Prevention:**
- For a logo grid with equal-size logos (all monochrome, same container), CSS Grid is correct: `grid-template-columns: repeat(5, 1fr)` with `auto` rows. Row-major order is maintained.
- True masonry (varying heights) is not needed for logos — all logos fit in consistent bounding boxes with `object-fit: contain`. Use CSS Grid, not CSS Columns.
- If genuine masonry is needed for photo gallery: use CSS Grid with `grid-template-rows: masonry` (experimental, limited browser support as of 2026) or a JS-based solution. For V1, a fixed grid is safer.

**Detection:** Manually inspect DOM order vs. visual order. Items in column 1 should be the first 5 items in markup; if they are items 1, 6, 11, 16, 21, you have CSS columns.

**Phase:** Portfolio section build (Phase 2-3)

---

### Pitfall 8: Framer Motion Imported in Full — Bundle Bloat Killing Lighthouse JS Score

**What goes wrong:** `import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'` imports the full Framer Motion bundle (roughly 100–150KB minified). For a static portfolio site aiming for Lighthouse 90+, this is the single largest JS cost. If unused Framer Motion features are included, the Total Blocking Time (TBT) and Time to Interactive (TTI) degrade significantly.

**Why it happens:** Default import pulls in the entire library. Tree-shaking works on function-level exports but Framer Motion's internal dependencies (popmotion, style-value-types) bundle together.

**Consequences:** Lighthouse Performance drops below 90. JS bundle size exceeds 200KB for a site that should be < 150KB total.

**Prevention:**
- Import only what is used. Do not use barrel imports.
- Use `LazyMotion` + `domAnimation` (or `domMax`) feature set from Framer Motion. `LazyMotion` with `domAnimation` reduces the bundle from ~150KB to ~18KB for common animations. This is the most impactful single optimization.
  ```tsx
  import { LazyMotion, domAnimation, m } from 'framer-motion'
  // Use <m.div> instead of <motion.div>
  ```
- `domMax` (~30KB) adds drag and layout animations — only include if needed (likely not for this portfolio).
- Place `<LazyMotion features={domAnimation}>` at the root layout level.

**Detection:** Lighthouse "Reduce unused JavaScript" warning listing `framer-motion`. Bundle analyzer (`@next/bundle-analyzer`) showing large chunk.

**Phase:** Foundation / animation system (Phase 1)

---

### Pitfall 9: CSS `filter: grayscale(1)` on Portfolio Logos Breaking in Safari

**What goes wrong:** The monochrome logo effect uses `filter: grayscale(1)` with a transition to `filter: grayscale(0)` on hover. In some Safari versions, CSS filter transitions on SVG elements can cause the element to disappear briefly, render with incorrect blending, or fail to transition smoothly.

**Why it happens:** Safari's rendering engine handles SVG filter compositing differently from Chrome/Firefox. `transition: filter` is well-supported but edge cases exist with SVGs that have embedded styles or `<use>` elements.

**Consequences:** Broken hover effect for Safari users (a significant portion of macOS/iPhone users — relevant given the VC audience likely on Apple devices).

**Prevention:**
- Use `img` tags (not `<Image>` component) for SVG logos to avoid Next.js image optimization interfering with SVG rendering.
- Apply the CSS filter via a wrapping `<div>` with `transition: filter 0.3s ease`, not on the `<img>` directly — this avoids Safari's SVG compositing edge case.
- Test in Safari during development (BrowserStack or local macOS Safari).
- Alternative: preprocess all logos to grayscale versions and swap `src` on hover via CSS background-image or React state — no CSS filter required. More reliable but more setup.

**Detection:** Test in Safari. Logo hover shows flicker or incorrect color. DevTools in Safari showing filter rendering artifacts.

**Phase:** Portfolio section build (Phase 2-3)

---

### Pitfall 10: `next/image` Used for SVG Logos — Optimization Disabled, CORS Errors

**What goes wrong:** `next/image` disables optimization for SVG files by default (SVGs cannot be safely resized without executing their content). Developers may see a console warning "SVG in next/image is disabled by default for security". If SVG logos are served from external sources, CORS headers may block them when Next.js Image optimization tries to proxy them.

**Why it happens:** Developers default to `next/image` for all images. SVGs are a special case.

**Consequences:** Runtime errors, broken logos, or silent fallback to unoptimized serving.

**Prevention:**
- Use standard `<img>` tags for SVG logos: `<img src="/logos/company.svg" alt="Company" className="..." />`.
- Store all logos in `/public/logos/` (local) — eliminates CORS entirely.
- Apply Tailwind classes directly on the `<img>` for sizing and the CSS filter.

**Detection:** Console warning: "SVG in next/image is disabled". Build warning about unoptimized images.

**Phase:** Portfolio section build (Phase 2-3)

---

### Pitfall 11: Lighthouse Score Degraded by Unoptimized Hero Headshot / Gallery Photos

**What goes wrong:** A large uncompressed JPEG headshot (e.g., 3MB from iPhone) used directly as the hero image devastates LCP (Largest Contentful Paint). The hero image IS the LCP element — it's above the fold, large, and typically the biggest image on the page.

**Why it happens:** Placeholder images are small during development. When the real headshot is dropped in, the developer doesn't optimize it.

**Consequences:** LCP > 4 seconds on mobile (throttled), Lighthouse Performance drops to 60–70. Fails the 90+ target.

**Prevention:**
- Use `next/image` with `priority={true}` for the hero headshot. `priority` adds a `<link rel="preload">` for the image and disables lazy loading — critical for LCP elements.
- Specify `width` and `height` to prevent CLS.
- Add `sizes` prop for responsive sizing: `sizes="(max-width: 768px) 100vw, 400px"`.
- For the circular crop: use Tailwind `rounded-full` with `overflow-hidden` on a containing div, not a CSS clip on the `next/image` component.
- Deliver WebP from the source: `next/image` handles conversion automatically, but the source file should still be < 1MB JPEG.

**Detection:** Lighthouse "Largest Contentful Paint" showing image element. Network tab showing large image payload. Filmstrip showing long wait before hero renders.

**Phase:** Hero section / asset handoff (Phase 2)

---

### Pitfall 12: Scroll-Triggered Animations Causing Layout Reflow (TBT / CLS)

**What goes wrong:** Animations that modify `height`, `width`, `padding`, `margin`, `top`, or `left` during scroll trigger browser layout recalculations (reflow) on every animation frame. This blocks the main thread, degrades Total Blocking Time, and can cause Cumulative Layout Shift if surrounding elements move.

**Why it happens:** Developers animate visible layout properties instead of composited-only properties.

**Consequences:** Janky animations on lower-powered devices (mobile, older laptops). Lighthouse Performance and CLS scores drop. Animations that should feel elegant feel broken.

**Prevention:**
- Animate only `transform` (translate, scale, rotate) and `opacity` — these run on the GPU compositor thread, not the main thread.
- For the standard "fade in from below" entrance: use `initial={{ opacity: 0, y: 20 }}` animate to `{{ opacity: 1, y: 0 }}`. The `y` property in Framer Motion maps to `transform: translateY()`, not `margin-top` — this is composited.
- Never animate `height` for reveal effects. Use `scaleY` or `clipPath` instead.
- Set `will-change: transform, opacity` via Framer Motion's `style` prop on elements that will animate — but only on elements that actually animate (overuse of `will-change` wastes GPU memory).

**Detection:** Chrome DevTools Performance tab showing long purple "Layout" tasks during scroll. Lighthouse flagging "Avoid large layout shifts" or "Reduce JavaScript execution time".

**Phase:** Animation system (Phase 1-2)

---

## Minor Pitfalls

---

### Pitfall 13: Career Timeline Using Absolute Positioning — Breaks on Mobile

**What goes wrong:** Vertical timelines are commonly built with absolutely positioned elements (line, dots, and content blocks). On mobile, the fixed `left` offsets and hardcoded `width` values cause overflow and misalignment.

**Prevention:** Build the timeline using CSS Grid or Flexbox with the decorative line as a pseudo-element or SVG. Test at 375px viewport width during development.

**Phase:** Career/About section build (Phase 3)

---

### Pitfall 14: `AnimatePresence` Wrapping Page-Level Components Causing Double Render on Navigation

**What goes wrong:** Wrapping `{children}` in `layout.tsx` with `<AnimatePresence>` for page transitions causes the outgoing page and incoming page to render simultaneously during transition. This can double-fetch data, trigger duplicate effects, and looks broken if sections are not properly z-indexed.

**Prevention:** For a single-page scrolling site, page transitions via `AnimatePresence` are irrelevant — there is only one page. Do not add `AnimatePresence` at the layout level. Use it only for modals or lightbox overlays (photo gallery lightbox).

**Phase:** Foundation / layout (Phase 1)

---

### Pitfall 15: Tailwind `prose` Class Applied to Non-Article Content

**What goes wrong:** Using Tailwind Typography's `prose` class on narrative sections (About, Investment Philosophy) applies opinionated base styles (link underlines, heading margins, code block styles) that fight the custom dark editorial design. Colors and spacing must be overridden extensively, which defeats the purpose.

**Prevention:** Write custom Tailwind utilities for the narrative prose sections. Reserve `prose` for actual markdown-rendered content only (which this V1 project has none of — all content is static JSX).

**Phase:** Content sections build (Phase 2-3)

---

### Pitfall 16: Vercel Deployment Failing Due to Type Errors Not Caught Locally

**What goes wrong:** Vercel runs `next build` which runs TypeScript type checking. Local development with `next dev` does not fail on type errors — it only warns. Developers can have a working local dev environment with broken TypeScript that fails on first Vercel deploy.

**Prevention:**
- Run `next build` locally before the first Vercel push, not just `next dev`.
- Add `"typecheck": "tsc --noEmit"` to `package.json` scripts and run it before deployment.
- Set strict TypeScript: `"strict": true` in `tsconfig.json` from project start.

**Detection:** Vercel build log showing "Type error: ..." with exit code 1.

**Phase:** Deployment setup (Phase 4)

---

### Pitfall 17: LinkedIn Post Cards with Hardcoded Images Showing Broken Images After Platform Updates

**What goes wrong:** The Writing & Media section displays LinkedIn post cards. If these embed LinkedIn's CDN thumbnail URLs directly, those URLs expire (LinkedIn uses short-lived signed CDN URLs). Post cards break within days of deployment.

**Prevention:** Download all LinkedIn post thumbnails to `/public/writing/` at content ingestion time. Reference local paths, not LinkedIn CDN URLs. All content is static in V1 anyway — this is consistent with that constraint.

**Phase:** Writing/Media section build (Phase 3)

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Foundation / layout setup | Google Fonts loaded via `<link>` instead of `next/font` | Use `next/font/google` for all three fonts in `app/layout.tsx` from day one |
| Foundation / animation system | Framer Motion not tree-shaken via `LazyMotion` | Set up `LazyMotion` + `domAnimation` wrapper in root layout before writing any animation code |
| Foundation / global styles | Dark background flash on load | Set `background-color: #0D0D0D` in `globals.css` on `html, body` — not just Tailwind class |
| Hero section | Stat counters running on server or mid-animation on paint | Initialize all counts at 0; trigger only on `useInView` |
| Hero section | Missing `priority` on headshot image | Add `priority` to hero image `next/image` call |
| Portfolio section | Logo images using `next/image` for SVGs | Use standard `<img>` tags; store logos in `/public/logos/` |
| Portfolio section | Logo hover effect broken in Safari | Apply CSS filter to wrapper div, not directly to SVG img |
| Portfolio section | CSS columns producing wrong logo order | Use CSS Grid, not `columns` |
| Animation system (all sections) | Animating layout-triggering properties | Only animate `transform` and `opacity` |
| Photo gallery / lightbox | `AnimatePresence` on layout level | Only use `AnimatePresence` for the lightbox overlay, not page-level |
| Deployment | TypeScript errors not caught in dev | Run `next build` locally before first push |

---

## Sources

- Next.js official docs — Font optimization: https://nextjs.org/docs/app/getting-started/fonts (verified 2026-03-16, version 16.1.7)
- Next.js official docs — Image optimization: https://nextjs.org/docs/app/getting-started/images (verified 2026-03-16)
- Next.js official docs — Server and Client Components: https://nextjs.org/docs/app/getting-started/server-and-client-components (verified 2026-03-16)
- Next.js official docs — Lazy loading: https://nextjs.org/docs/app/guides/lazy-loading (verified 2026-03-16)
- Next.js official docs — Metadata and OG images: https://nextjs.org/docs/app/getting-started/metadata-and-og-images (verified 2026-03-16)
- Next.js official docs — Images config (remotePatterns): https://nextjs.org/docs/app/api-reference/config/next-config-js/images (verified 2026-03-16)
- Framer Motion `LazyMotion` API: MEDIUM confidence (training data, Framer Motion docs blocked during research session — verify bundle sizes against current framer-motion v11+ release notes before implementation)
- CSS filter / Safari SVG behavior: MEDIUM confidence (training data, known browser compat issue — verify in target browser during Phase 2)
- CSS Grid masonry (`grid-template-rows: masonry`): LOW confidence on browser support as of 2026 — check MDN before using; safe fallback is fixed-height grid
