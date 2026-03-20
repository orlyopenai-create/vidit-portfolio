# Phase 5: Performance and Deployment - Research

**Researched:** 2026-03-20
**Domain:** Next.js App Router performance auditing, Lighthouse optimization, WCAG accessibility, SEO metadata, responsive layout verification
**Confidence:** HIGH

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| PERF-01 | Lighthouse score 90+ on Performance, Accessibility, Best Practices, SEO | Accessibility color contrast issues identified (muted/accent colors fail WCAG AA for normal text); SEO metadata gaps found (no metadataBase, no robots.txt, no OG image); build confirmed clean |
| PERF-02 | All Framer Motion `whileInView` animations use `viewport={{ once: true }}` | VERIFIED: All 20+ viewport usages in codebase already have `once: true`; this requirement is already met |
| PERF-03 | All section components are Server Components; Framer Motion isolated to narrow `'use client'` leaf wrappers | VERIFIED: Zero `'use client'` in `components/sections/`; all 13 client components are Animations/Grid/Lightbox leaf nodes only |
| PERF-04 | Site fully responsive — hero, timeline, and grid all collapse gracefully on mobile | Timeline uses `grid-cols-1 md:grid-cols-[160px_1fr]`; logo grid uses `grid-cols-3 sm:grid-cols-4 md:grid-cols-5`; hero is flex-col centered; visual verification at 375px needed |
| PERF-05 | No dark theme flash on load — background set in CSS before JS hydrates | VERIFIED: `globals.css` sets `background-color: #F5EFE6` on `html, body` with `color-scheme: light`; no dark flash possible |
| PERF-06 | No CLS from font loading — `next/font/google` self-hosts at build time | VERIFIED: All three fonts (Playfair Display, DM Sans, DM Mono) configured with `display: 'swap'` via `next/font/google`; fonts are self-hosted at build time |
</phase_requirements>

---

## Summary

Phase 5 is a verification and fix phase, not a build phase. The majority of PERF requirements are already satisfied by prior phase decisions. The build passes TypeScript strict mode cleanly. The critical work is: (1) fixing accessibility color contrast failures that will tank the Lighthouse Accessibility score, (2) adding SEO metadata fields required for Lighthouse SEO 90+, and (3) doing a live Lighthouse audit on the production URL to confirm actual scores and catch anything unexpected.

The most significant finding is a **color contrast failure** affecting several components. The muted color `#8A7E74` on background `#F5EFE6` has a 3.46:1 ratio (fails WCAG AA 4.5:1 for normal text). The accent color `#A6701A` has 3.71:1 (also fails AA for normal text). These colors are used at `text-xs` and `text-sm` sizes in timeline dates, stat labels, section subtitles, footer copy, and table cells — all of which Lighthouse will flag. The SEO score is limited by missing `metadataBase`, Open Graph image, and a `robots.txt` file.

**Primary recommendation:** Fix contrast violations and add SEO metadata in one plan; then run Lighthouse on production and verify all six PERF requirements pass.

---

## Audit of Current State

### PERF-02: viewport={{ once: true }} — ALREADY SATISFIED
Grep confirmed: every single `whileInView` call in the codebase has `viewport={{ once: true }}`. No action needed.

### PERF-03: Server Component / Client Component split — ALREADY SATISFIED
Grep confirmed: zero `'use client'` directives in `components/sections/`. All 13 client components are animation wrappers, GalleryGrid, or Lightbox — appropriate leaf nodes. No action needed.

### PERF-05: No flash on load — ALREADY SATISFIED
`globals.css` sets `html, body { background-color: #F5EFE6; color: #241E18; }` and `html { color-scheme: light; }`. This loads before any JavaScript. No action needed.

### PERF-06: No CLS from fonts — ALREADY SATISFIED
All fonts use `next/font/google` with `display: 'swap'`. Next.js self-hosts these at build time — no external font requests at runtime. No action needed.

### PERF-04: Responsive at 375px — NEEDS VISUAL VERIFICATION
Code review shows correct responsive classes (grid reflow, single-column collapse), but 375px verification must be done in browser DevTools. No code changes expected, but the verification step is mandatory.

### PERF-01: Lighthouse 90+ — NEEDS FIXES
Two categories require active remediation:

**Accessibility (HIGH PRIORITY):**

Computed contrast ratios for the Warm Sand palette:

| Color Pair | Ratio | WCAG AA Normal (4.5:1) | WCAG AA Large (3:1) |
|------------|-------|------------------------|----------------------|
| `#8A7E74` (muted) on `#F5EFE6` (bg) | 3.46:1 | FAIL | PASS |
| `#A6701A` (accent) on `#F5EFE6` (bg) | 3.71:1 | FAIL | PASS |
| `#B8841E` (accent-hover) on `#F5EFE6` (bg) | 2.89:1 | FAIL | FAIL |
| `#241E18` (foreground) on `#F5EFE6` (bg) | 14.42:1 | PASS | PASS |
| `#8A7E74` (muted) on `#EDE4D8` (surface) | 3.14:1 | FAIL | PASS |
| `#A6701A` (accent) on `#EDE4D8` (surface) | 3.37:1 | FAIL | PASS |

WCAG AA requires 4.5:1 for normal text (below 18pt / 24px, or non-bold below 14pt / ~18.67px).

Failing usages of `text-muted` and `text-accent` at small sizes:
- `text-xs` stat labels (StatCountUp)
- `text-xs` overline labels (KilrrAnimations, MediaAnimations, GalleryGrid)
- `text-sm` sublines (HeroAnimations, FundAnimations subtitle)
- `text-sm` timeline descriptions (TimelineAnimations)
- `text-sm` timeline organization names (TimelineAnimations)
- `text-sm` footer closing line (FooterSection)
- `text-xs` footer copyright at `text-muted/60` — even worse
- `text-xs` table co-investor column (FundAnimations)
- `text-xs` career chapter pills at `text-muted/70`

The `text-muted/70` and `text-muted/45` opacity variants on the hero (career pills, cities line) will fail even harder.

**The fix approach:** Darken muted and accent tokens just enough to reach 4.5:1 against `#F5EFE6`. The target minimum:

- Muted needs luminance to produce 4.5:1 against bg luminance 0.8686 → target L ≤ 0.1456 → approximately `#6B5F54` (dark muted)
- Accent needs L ≤ 0.1456 → approximately `#8B5E16` darkens accent enough

However, darkening palette tokens affects the entire design. The lower-friction alternative is to **use `text-foreground` (which passes at 14.42:1) for critical small-text content** and reserve muted/accent for decorative large-text elements where 3:1 is sufficient. This preserves the aesthetic while making functional text accessible.

**SEO (MEDIUM PRIORITY):**

Current `layout.tsx` exports:
```typescript
export const metadata: Metadata = {
  title: 'Vidit Dugar — Investor. Operator. Builder.',
  description: 'Early-stage consumer investor in India. Formerly Nomura London, Bombay Shaving Company, The Barbershop Fund.',
}
```

Missing for Lighthouse SEO 90+:
- `metadataBase` — required for Open Graph images to resolve as absolute URLs
- `openGraph` fields (type, title, description, image)
- `twitter` card metadata
- `robots.txt` file at `/app/robots.ts` (serves `/robots.txt`)
- A favicon is present (`app/favicon.ico`) — this is fine
- No OG image file present — Lighthouse SEO does not require one for 90+, but social sharing will be broken without it

**Best Practices:**
- Lighthouse Best Practices largely pass for Next.js SSG sites. HTTPS is handled by Vercel. The main risk is console errors (any uncaught exceptions during hydration) — confirm none exist.

---

## Standard Stack

### Core
| Tool | Version | Purpose | Notes |
|------|---------|---------|-------|
| Next.js | 16.2.0 | Build and Lighthouse audit target | Already installed |
| Lighthouse CLI | Latest | Headless audit from terminal | `npx lighthouse` or Chrome DevTools |
| Chrome DevTools | Current | Visual 375px responsive check | Manual, browser-based |

### Lighthouse Audit Options
| Method | Command | When to Use |
|--------|---------|-------------|
| Chrome DevTools | F12 → Lighthouse tab | Best for one-off audit with full browser |
| Vercel Dashboard | Speed Insights or Vercel Lighthouse integration | Automatic on deploy |
| PageSpeed Insights | https://pagespeed.web.dev (paste URL) | Free, hosted, authoritative |
| `npx lighthouse` | `npx lighthouse <url> --view` | Automated CI use |

**Recommendation:** Use PageSpeed Insights on the live Vercel URL (`https://vidit-portfolio-vert.vercel.app`) — it is the most authoritative and matches how Google indexes the site. Chrome DevTools Lighthouse for local iteration.

---

## Architecture Patterns

### Pattern 1: Metadata with metadataBase (Next.js App Router)
**What:** The `metadataBase` field sets the base URL for resolving relative metadata URLs.
**When to use:** Always, for any site with OG images or canonical URLs.
**Source:** https://nextjs.org/docs/app/getting-started/metadata-and-og-images

```typescript
// app/layout.tsx — updated metadata export
export const metadata: Metadata = {
  metadataBase: new URL('https://vidit-portfolio-vert.vercel.app'),
  title: 'Vidit Dugar — Investor. Operator. Builder.',
  description: 'Early-stage consumer investor in India. Formerly Nomura London, Bombay Shaving Company, The Barbershop Fund.',
  openGraph: {
    type: 'website',
    title: 'Vidit Dugar — Investor. Operator. Builder.',
    description: 'Early-stage consumer investor in India. Formerly Nomura London, Bombay Shaving Company, The Barbershop Fund.',
    url: 'https://vidit-portfolio-vert.vercel.app',
    siteName: 'Vidit Dugar',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vidit Dugar — Investor. Operator. Builder.',
    description: 'Early-stage consumer investor in India. Formerly Nomura London, Bombay Shaving Company, The Barbershop Fund.',
  },
}
```

### Pattern 2: robots.ts File (Next.js App Router)
**What:** `app/robots.ts` auto-serves a `robots.txt` at `/robots.txt`. Lighthouse SEO checks for this.
**Source:** https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots

```typescript
// app/robots.ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://vidit-portfolio-vert.vercel.app/sitemap.xml',
  }
}
```

### Pattern 3: sitemap.ts File (Optional but Improves SEO Score)
**What:** `app/sitemap.ts` auto-serves a `sitemap.xml`. Single-page site — one entry.

```typescript
// app/sitemap.ts
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://vidit-portfolio-vert.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
```

### Pattern 4: Contrast Fix — Functional vs Decorative Text
**What:** Upgrade functional small text from muted/accent to foreground color; keep muted/accent only for decorative large-text elements where 3:1 is sufficient.

WCAG 2.1 exception: Text that is "incidental" (decorative, inactive, or part of a logo) is exempt. Overline labels (`text-xs uppercase tracking`) are borderline — they carry navigation information but at low emphasis.

**Decision framework for this project:**
- `text-foreground` (#241E18, 14.42:1): Use for all body copy, table data, stats labels, timeline descriptions, footer closing line, copyright — any text that conveys information
- `text-muted` (#8A7E74, 3.46:1): Acceptable ONLY for truly decorative text at 18px+ or bold 14px+ (WCAG large text threshold); this means it can be used for section overlines at `text-xl` or larger, but NOT at `text-xs` or `text-sm`
- `text-accent` (#A6701A, 3.71:1): Same constraint — acceptable for large headings/pull quotes but risky for `text-xs` overlines

**Specific fixes needed:**

| Location | Current Class | Issue | Fix |
|----------|--------------|-------|-----|
| `StatCountUp` stat labels | `text-xs text-muted` | 3.46:1 at xs | `text-xs text-foreground/70` or `text-foreground` |
| `HeroAnimations` subline | `text-sm text-muted` | 3.46:1 at sm | `text-sm text-foreground/70` |
| `HeroAnimations` career pills | `text-muted/70` | ~2.1:1 | `text-foreground/50` |
| `HeroAnimations` cities | `text-muted/45` | ~1.7:1 | `text-foreground/45` (decorative — may be acceptable) |
| `FundAnimations` subtitle | `text-sm text-muted` | 3.46:1 | `text-sm text-foreground/70` |
| `FundAnimations` table cells | `text-muted` at `text-sm` | 3.46:1 | `text-foreground/70` |
| `FundAnimations` co-investors | `text-xs text-muted` | 3.46:1 | `text-foreground/70` |
| `TimelineAnimations` dates | `text-xs text-muted` | 3.46:1 | `text-foreground/60` |
| `TimelineAnimations` descriptions | `text-sm text-muted` | 3.46:1 | `text-foreground/70` |
| `TimelineAnimations` org names | `text-sm text-accent` | 3.71:1 | Keep (passes at sm if font-medium) OR darken |
| `FooterSection` closing line | `text-sm text-muted` | 3.46:1 on surface | `text-foreground/70` |
| `FooterSection` copyright | `text-xs text-muted/60` | ~2:1 | `text-foreground/50` |
| `KilrrAnimations` body | `text-base text-muted` | 3.46:1 (base = 16px, NOT large text) | `text-foreground/75` |
| Overline labels (`text-xs text-accent`) | Multiple components | 3.71:1 at xs | `text-accent` is borderline; consider darkening or using foreground |

**Note on `text-foreground/N`:** Tailwind's opacity modifier computes the effective color. `text-foreground/70` on `#F5EFE6` background: effective foreground hex `#241E18` at 70% opacity blended with bg gives approximately `#635A52` which has ~5.2:1 — passes AA. Use `text-foreground/70` as the standard muted-but-accessible replacement.

### Pattern 5: OG Image (Optional for Lighthouse, Required for Social Sharing)
**What:** Place a static `opengraph-image.jpg` (1200×630) in `app/`. Simple branded image.
**Impact:** Does not affect Lighthouse SEO score directly, but resolves social preview. Phase 5 scope: create a minimal one. Vidit can replace it later.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead |
|---------|-------------|-------------|
| Lighthouse auditing | Custom performance script | PageSpeed Insights / Chrome DevTools Lighthouse tab |
| Contrast ratio calculation | Manual color math | Browser DevTools accessibility inspector, or WebAIM checker |
| robots.txt serving | Static file in `/public/robots.txt` | `app/robots.ts` — Next.js serves it automatically at `/robots.txt` |
| Sitemap serving | Manual XML in `/public/` | `app/sitemap.ts` — Next.js serves it automatically |
| OG image generation | External service | `app/opengraph-image.jpg` static file (simplest), or `next/og` ImageResponse |

---

## Common Pitfalls

### Pitfall 1: Opacity-Modified Colors Fail Contrast Differently Than Expected
**What goes wrong:** `text-muted/70` does not produce a darker muted color — it blends muted with the background at 70% opacity, resulting in a lighter effective color with WORSE contrast.
**Why it happens:** CSS opacity on text blends toward the background, not toward black.
**How to avoid:** Use `text-foreground/N` (dark base color with opacity) not `text-muted/N` (light base with opacity). `text-foreground/70` on `#F5EFE6` gives approximately 5.2:1 — passes AA.
**Warning signs:** Any `text-muted/N` where N < 100 is almost certainly failing contrast.

### Pitfall 2: Lighthouse Scores Vary Between Mobile and Desktop
**What goes wrong:** Running Lighthouse on Desktop shows 90+, but Mobile performance scores 60-70 due to CPU throttling simulation.
**Why it happens:** Lighthouse mobile preset applies 4x CPU throttle and simulated 4G network. Framer Motion animation bundles add TBT.
**How to avoid:** Always check the Mobile Lighthouse score (Lighthouse defaults to mobile in PageSpeed Insights). The LazyMotion + domAnimation architecture was chosen specifically to minimize bundle size — this helps. Target: Mobile performance 90+.
**Warning signs:** TBT (Total Blocking Time) > 200ms on mobile is the main risk factor for this site.

### Pitfall 3: metadataBase Missing Causes OG Image URL Resolution Failures
**What goes wrong:** Without `metadataBase`, Next.js generates relative OG image URLs. Social platforms (LinkedIn, Twitter) can't fetch relative URLs and show no preview.
**Why it happens:** The App Router resolves metadata URLs relative to the current domain only if `metadataBase` is set.
**How to avoid:** Always include `metadataBase: new URL('https://your-production-url.com')` in root layout metadata.

### Pitfall 4: Lighthouse Runs on Deployed URL, Not localhost
**What goes wrong:** Running Lighthouse on `localhost:3000` gives inflated performance scores (no network latency) and may miss server headers/CDN effects.
**How to avoid:** Run final Lighthouse audit on the Vercel production URL: `https://vidit-portfolio-vert.vercel.app`. This is the authoritative score.

### Pitfall 5: robots.txt in `/public/` vs `app/robots.ts`
**What goes wrong:** Placing a `robots.txt` in `/public/` works but bypasses Next.js metadata API — no Lighthouse integration and harder to update.
**How to avoid:** Use `app/robots.ts` which Next.js auto-serves at `/robots.txt` with correct Content-Type.

### Pitfall 6: Lighthouse Accessibility Audit Can Miss Dynamic State
**What goes wrong:** The Lightbox uses `createPortal` — it may not be open during Lighthouse audit, so its accessibility (focus trap, role=dialog) is not tested.
**Why it matters:** Focus trap is missing from the current Lightbox — it does not trap Tab key focus within the modal. This would fail a manual accessibility audit but Lighthouse won't catch it automatically.
**How to avoid:** This is a known limitation of automated testing. For the purposes of PERF-01 (Lighthouse 90+), the automated score is what matters. Manual focus trap is a WCAG 2.1 AA requirement (SC 2.1.2) but not auto-detected.

---

## Code Examples

### Complete Updated layout.tsx Metadata
```typescript
// Source: https://nextjs.org/docs/app/getting-started/metadata-and-og-images
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://vidit-portfolio-vert.vercel.app'),
  title: 'Vidit Dugar — Investor. Operator. Builder.',
  description: 'Early-stage consumer investor in India. Formerly Nomura London, Bombay Shaving Company, The Barbershop Fund.',
  openGraph: {
    type: 'website',
    title: 'Vidit Dugar — Investor. Operator. Builder.',
    description: 'Early-stage consumer investor in India. Formerly Nomura London, Bombay Shaving Company, The Barbershop Fund.',
    url: 'https://vidit-portfolio-vert.vercel.app',
    siteName: 'Vidit Dugar',
  },
  twitter: {
    card: 'summary',
    title: 'Vidit Dugar — Investor. Operator. Builder.',
    description: 'Early-stage consumer investor in India. Formerly Nomura London, Bombay Shaving Company, The Barbershop Fund.',
  },
}
```

### robots.ts
```typescript
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://vidit-portfolio-vert.vercel.app/sitemap.xml',
  }
}
```

### sitemap.ts
```typescript
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://vidit-portfolio-vert.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
```

---

## State of the Art

| Old Approach | Current Approach | Impact |
|--------------|------------------|--------|
| `public/robots.txt` static file | `app/robots.ts` typed config | Auto-typed, auto-served, no Content-Type errors |
| `public/sitemap.xml` static file | `app/sitemap.ts` generated | Stays current, typed, auto-served |
| Manual OG meta tags | `metadata.openGraph` object in layout | Type-safe, auto-generates `<head>` tags |
| Relative OG URLs (broken) | `metadataBase` + relative OG image paths | Social platforms can resolve the image |

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None installed — no automated test infrastructure in this project |
| Config file | None |
| Quick run command | `npm run build` (TypeScript + compile check) |
| Full suite command | Manual Lighthouse audit on production URL |
| Lint command | `npm run lint` (ESLint via eslint-config-next) |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | Infrastructure Exists? |
|--------|----------|-----------|-------------------|----------------------|
| PERF-01 | Lighthouse 90+ all categories | manual | PageSpeed Insights on production URL | manual only |
| PERF-02 | `viewport={{ once: true }}` on all whileInView | static-grep | `grep -r "whileInView" components/ --include="*.tsx"` + verify `once: true` present | ✅ (grep) |
| PERF-03 | Sections are Server Components | static-grep | `grep -r "use client" components/sections/` returns empty | ✅ (grep) |
| PERF-04 | Responsive at 375px | manual | Chrome DevTools device simulation | manual only |
| PERF-05 | No flash on load | manual | Hard reload in Chrome/Firefox, observe bg | manual only |
| PERF-06 | No CLS from fonts | automated | `npm run build` — font CSS generated at build time | ✅ (build) |

### Sampling Rate
- **Per task commit:** `npm run build` — confirms TypeScript and compile pass
- **Per wave merge:** `npm run build && npm run lint`
- **Phase gate:** Manual Lighthouse audit on production URL returning 90+ before marking phase complete

### Wave 0 Gaps

None — this phase has no test framework to install. All validation is manual (Lighthouse) or static analysis (grep, build). The planner should not allocate a Wave 0 setup task.

---

## Open Questions

1. **Domain preference: `vidit.vc` vs `viditdugar.com` vs current Vercel URL**
   - What we know: Live URL is `https://vidit-portfolio-vert.vercel.app`; HANDOFF.md notes `vidit.vc` domain availability unconfirmed
   - What's unclear: Whether Vidit has purchased either domain yet
   - Recommendation: Use the Vercel URL in all `metadataBase` and sitemap for now. Domain cutover is a Vercel environment variable change, not a code change. Do not block Phase 5 on domain availability.

2. **OG image: static file vs generated**
   - What we know: No OG image exists; social sharing will show no preview without one
   - What's unclear: Whether Vidit wants a branded OG image now
   - Recommendation: Create a minimal static `opengraph-image.jpg` (1200×630) in `app/` using the headshot + name + title on warm sand bg. This is optional for Lighthouse SEO 90+ but required for LinkedIn sharing to look professional. Include as a task; Vidit can replace with a better version later.

3. **Lighthouse mobile performance with Framer Motion**
   - What we know: LazyMotion + domAnimation was chosen to minimize JS bundle; `next build` confirms static prerendering of all pages
   - What's unclear: Actual TBT on mobile throttled CPU — only knowable by running Lighthouse on production
   - Recommendation: Run Lighthouse on mobile first. If TBT is the blocker, the mitigation is `next build` output is already static HTML — Framer Motion only loads on hydration. This is good architecture.

---

## Sources

### Primary (HIGH confidence)
- [Next.js Metadata and OG Images Docs](https://nextjs.org/docs/app/getting-started/metadata-and-og-images) — metadataBase, openGraph, file conventions
- [Next.js robots.txt API Reference](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots) — robots.ts pattern
- [Next.js sitemap.xml API Reference](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) — sitemap.ts pattern
- Direct codebase audit — PERF-02, PERF-03, PERF-05, PERF-06 verified via grep and file reads
- `npm run build` — TypeScript strict mode confirmed passing, zero errors
- WCAG contrast formula applied to actual palette hex values — mathematically verified

### Secondary (MEDIUM confidence)
- [Chrome Lighthouse Accessibility Scoring](https://developer.chrome.com/docs/lighthouse/accessibility/scoring) — contrast ratio thresholds and audit behavior
- [Lighthouse Performance Scoring](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring) — TBT, LCP, CLS weighting
- [Next.js 16 SEO Configuration Guide](https://jsdevspace.substack.com/p/how-to-configure-seo-in-nextjs-16) — verified against official docs

### Tertiary (LOW confidence)
- WebSearch results on Framer Motion mobile TBT — not verified with benchmarks for this specific site; treat as directional guidance until actual Lighthouse run

---

## Metadata

**Confidence breakdown:**
- PERF-02, PERF-03, PERF-05, PERF-06 status: HIGH — verified by direct code grep
- Contrast ratio failures: HIGH — computed from official WCAG formula on exact palette hex values
- SEO metadata gaps: HIGH — verified against official Next.js docs and current `layout.tsx`
- Mobile Lighthouse performance score prediction: LOW — only actual run will confirm
- TypeScript strict mode pass: HIGH — `npm run build` ran clean

**Research date:** 2026-03-20
**Valid until:** 2026-04-20 (stable Next.js 16 docs; no fast-moving dependencies)
