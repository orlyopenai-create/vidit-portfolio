# Phase 4: Media Section - Research

**Researched:** 2026-03-20
**Domain:** Next.js App Router — Lightbox, photo gallery, LinkedIn post cards, Cloudflare CDN images
**Confidence:** HIGH (stack verified against Next.js 16.2 official docs; Framer Motion 12 confirmed from installed package; Tailwind v4 line-clamp verified from official docs)

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| MEDIA-01 | Writing & Media section with two-column masonry-style editorial grid (not Instagram-like) | CSS `columns-2` (Tailwind) — no JS masonry library needed for a curated 6–8 item grid |
| MEDIA-02 | LinkedIn post cards: truncated excerpt, date, "read more →" link — placeholder-first, real posts = data file change | `line-clamp-3` (Tailwind v4 built-in, no plugin), `LinkedInPost` type already defined in lib/types.ts |
| MEDIA-03 | Photo gallery with lightbox (click to expand) — images from Cloudflare, placeholder state when empty | next/image with remotePatterns; AnimatePresence + createPortal for lightbox; placeholder cards when photos array is empty |
| MEDIA-04 | Hover on photos: dark overlay with caption | CSS absolute overlay + Tailwind group-hover; no JS needed |
| MEDIA-05 | Lightbox keyboard navigation: Escape closes, arrow keys navigate | useEffect with window.addEventListener('keydown') in 'use client' lightbox component — runs inside useEffect, cleaned up on unmount |
| MEDIA-06 | Images lazy-loaded — no eager loading for off-screen gallery images | next/image defaults to `loading="lazy"` — no extra configuration needed for gallery images |
</phase_requirements>

---

## Summary

Phase 4 builds the Writing & Media section, inserting it between the Kilrr case study and the Career Timeline in page.tsx. The section has two sub-components: LinkedIn post cards (static data, truncated text, external links) and a photo gallery with a full-screen lightbox.

All five research questions have clear, verified answers. The standard stack is already installed (Framer Motion 12, Next.js 16.2, Tailwind v4) — no new npm packages are needed. The one configuration change required is adding `remotePatterns` to next.config.ts to authorize the Cloudflare CDN hostname for next/image optimization. The lightbox is best implemented as a `'use client'` component using `AnimatePresence` for fade transitions and `createPortal` to mount it on `document.body`, with `useEffect` for keyboard events. Placeholder states for both the post cards and gallery are trivial — render empty-state divs when the data arrays are empty.

**Primary recommendation:** Build three components — `MediaSection` (server, shell), `MediaAnimations` (client, card animations + section fade), and `Lightbox` (client, portal + keyboard + AnimatePresence). Wire `MediaSection` into page.tsx between `KilrrSection` and `TimelineSection`.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| framer-motion | 12.38.0 (installed) | AnimatePresence for lightbox fade, whileInView for section reveal | Already at root via LazyMotion; `m.*` pattern enforced |
| next/image | bundled with Next.js 16.2 | Lazy-loaded, optimized Cloudflare photos | Handles srcset, lazy loading, CLS prevention automatically |
| react-dom createPortal | bundled with React 19.2.4 | Mount lightbox overlay on document.body | Prevents z-index and overflow:hidden clipping from parent sections |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| tailwindcss line-clamp | built-in to v4 (no plugin) | Clamp LinkedIn post excerpt to 3 lines | Always — CSS is correct approach, JS truncation is wrong |
| CSS columns | native CSS, Tailwind `columns-*` | Two-column masonry grid | For a curated 6–8 item list; no JS masonry library needed |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| createPortal + AnimatePresence | react-spring, @radix-ui/dialog | Project has zero non-Framer Motion animation deps; adding Radix violates "no new packages" constraint |
| CSS columns masonry | react-masonry-css | CSS columns is sufficient for a fixed small grid; JS masonry adds a package and layout shift risk |
| line-clamp-3 | JS substring truncation | CSS line-clamp preserves full text in DOM (good for SEO, accessible), truncates visually only |

**Installation:**
```bash
# No new packages required — all dependencies already installed
```

---

## Architecture Patterns

### Recommended Project Structure
```
components/
├── media/
│   ├── LinkedInCard.tsx       # Presentational, server-safe (no 'use client')
│   ├── GalleryGrid.tsx        # Server-safe grid wrapper
│   ├── GalleryItem.tsx        # Individual photo with hover overlay — 'use client' for onClick
│   ├── Lightbox.tsx           # 'use client' — portal, keyboard, AnimatePresence
│   └── MediaAnimations.tsx    # 'use client' — section fade-in wrapper
├── sections/
│   └── MediaSection.tsx       # Server component shell (no 'use client')
```

### Pattern 1: Server Shell + Client Animation Wrapper (established project pattern)
**What:** MediaSection is a pure server component. It imports data from lib/data/media.ts, passes it as props to MediaAnimations and GalleryGrid.
**When to use:** Always — matches every other section in this project (HeroSection, KilrrSection, etc.)
**Example:**
```typescript
// components/sections/MediaSection.tsx
// NO 'use client' — server component
import { linkedInPosts, photos } from '@/lib/data/media'
import { MediaAnimations } from '@/components/media/MediaAnimations'
import { GalleryGrid } from '@/components/media/GalleryGrid'

export function MediaSection() {
  return (
    <section id="media" className="py-24 px-6 max-w-5xl mx-auto">
      <MediaAnimations posts={linkedInPosts} />
      <GalleryGrid photos={photos} />
    </section>
  )
}
```

### Pattern 2: AnimatePresence Lightbox with createPortal
**What:** Lightbox mounts on document.body via createPortal to escape any parent overflow or z-index stacking context. AnimatePresence wraps the portal content so it fades in on open and fades out on close.
**When to use:** Any full-screen overlay in a Next.js App Router page where parent sections may have overflow:hidden or position context.

**Key detail — LazyMotion compatibility:** The project uses LazyMotion at app root with domAnimation feature bundle. `AnimatePresence` from `framer-motion` works with LazyMotion — it does not need `m.*` syntax itself, only the animated elements inside it use `m.*`.

**Example:**
```typescript
// components/media/Lightbox.tsx
'use client'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, m } from 'framer-motion'
import Image from 'next/image'
import type { Photo } from '@/lib/types'

interface LightboxProps {
  photos: Photo[]
  activeIndex: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}

export function Lightbox({ photos, activeIndex, onClose, onNavigate }: LightboxProps) {
  const isOpen = activeIndex !== null
  const photo = isOpen ? photos[activeIndex] : null

  useEffect(() => {
    if (!isOpen) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight' && activeIndex !== null) {
        onNavigate(Math.min(activeIndex + 1, photos.length - 1))
      }
      if (e.key === 'ArrowLeft' && activeIndex !== null) {
        onNavigate(Math.max(activeIndex - 1, 0))
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, activeIndex, onClose, onNavigate, photos.length])

  // Body scroll lock while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return createPortal(
    <AnimatePresence>
      {isOpen && photo && (
        <m.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={onClose}
        >
          <m.div
            initial={{ scale: 0.96 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.96 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[90vh] w-full"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              className="object-contain max-h-[85vh] w-auto mx-auto"
              unoptimized={false}
            />
            <p className="text-center text-sm text-white/80 mt-3 font-body">{photo.caption}</p>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
```

### Pattern 3: Hover Overlay with Caption (CSS-only, no JS)
**What:** Absolute-positioned dark overlay that appears on hover via Tailwind `group` + `group-hover`.
**When to use:** Gallery item hover state — pure CSS, no state needed.
**Example:**
```typescript
// Inside GalleryItem.tsx
<div className="relative overflow-hidden group cursor-pointer" onClick={() => onOpen(index)}>
  <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height}
    className="object-cover w-full transition-transform duration-300 group-hover:scale-105"
    loading="lazy"
  />
  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
    <p className="font-body text-sm text-white">{photo.caption}</p>
  </div>
</div>
```

### Pattern 4: LinkedIn Card with line-clamp
**What:** CSS `line-clamp-3` on the excerpt — no JS truncation.
**Example:**
```typescript
// Inside LinkedInCard.tsx — NO 'use client' needed (purely presentational)
<article className="bg-surface border border-foreground/10 p-6 flex flex-col gap-4">
  <p className="font-body text-sm text-foreground line-clamp-3 leading-relaxed">
    {post.excerpt}
  </p>
  <div className="flex items-center justify-between mt-auto">
    <time className="font-mono text-xs text-muted">{post.date}</time>
    <a href={post.url} target="_blank" rel="noopener noreferrer"
       className="font-body text-xs text-accent hover:text-accent-hover transition-colors">
      read more →
    </a>
  </div>
</article>
```

### Pattern 5: Placeholder States (empty arrays)
**What:** When `linkedInPosts` is empty, render placeholder cards. When `photos` is empty, render placeholder grid items labelled `[Photo — Vidit to supply]`.
**Why:** Required by MEDIA-02 and MEDIA-03 — site must look intentional even before real content is provided.
**Example:**
```typescript
// Conditional in MediaAnimations or GalleryGrid
const PLACEHOLDER_POSTS = 4  // number of skeleton cards to show
{posts.length === 0
  ? Array.from({ length: PLACEHOLDER_POSTS }).map((_, i) => (
      <PlaceholderCard key={i} label="[LinkedIn post — Vidit to supply]" />
    ))
  : posts.map(post => <LinkedInCard key={post.id} post={post} />)
}
```

### Anti-Patterns to Avoid
- **`motion.*` instead of `m.*`:** LazyMotion at root requires `m.*` — using `motion.*` will import the full bundle and break the optimisation. Verified: existing codebase uses `m.*` throughout.
- **`document.body` in SSR context:** `createPortal(content, document.body)` will throw during SSR. Must only call inside a `useEffect` or gate with `typeof document !== 'undefined'`. The cleanest approach: render null on server, portal on client. Since the Lightbox is `'use client'` and only rendered when `activeIndex !== null`, this is naturally handled — but ensure the initial render returns null before hydration.
- **Eager loading all gallery images:** Do not set `loading="eager"` or the Next.js `preload` prop on gallery images — they are below the fold and should stay lazy (the default).
- **JS substring truncation for LinkedIn excerpts:** Using `excerpt.substring(0, 120) + '...'` is brittle (breaks on emoji, mid-word) and removes text from the DOM. Use `line-clamp-3` instead.
- **Inline `style` for z-index on lightbox:** The lightbox must use Tailwind `z-50` (or `z-[9999]` if needed) — not inline styles, which bypass Tailwind's purging and are harder to reason about.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image lazy loading | IntersectionObserver + state | `next/image` default (`loading="lazy"`) | next/image handles lazy loading, srcset, WebP conversion, CLS prevention automatically |
| Text truncation | JS substring/slice | `line-clamp-3` CSS utility | CSS is reliable, preserves full text in DOM, works with any content length |
| Full-screen modal mount point | Custom DOM append logic | `createPortal(content, document.body)` | Portal is the React-idiomatic pattern; handles event propagation correctly |
| Keyboard event cleanup | Manual removeEventListener tracking | `useEffect` return cleanup function | Standard React pattern; avoids memory leaks on unmount |
| Image optimization for Cloudflare CDN | Custom `<img>` with manual srcset | `next/image` with `remotePatterns` | Automatic WebP, responsive srcset, blur placeholder support |

**Key insight:** The entire media section can be built with zero new dependencies — every required capability exists in the installed stack.

---

## Common Pitfalls

### Pitfall 1: remotePatterns Not Configured — next/image Throws 400 Error
**What goes wrong:** Using `next/image` with an absolute external URL (e.g. `https://your-cloudflare.example.com/photo.jpg`) without adding `remotePatterns` to next.config.ts causes a `400 Bad Request` from the Next.js image optimization API.
**Why it happens:** Next.js blocks external image URLs by default for security. Every external hostname must be explicitly whitelisted.
**How to avoid:** Add `remotePatterns` to next.config.ts before using any Cloudflare photos. Use a wildcard hostname pattern to handle the unknown subdomain:
```typescript
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.r2.dev',        // Cloudflare R2 public URL pattern
      },
      {
        protocol: 'https',
        hostname: '**.workers.dev',   // Cloudflare Workers URL pattern
      },
      // If using a custom domain on Cloudflare:
      // { protocol: 'https', hostname: 'your-specific-domain.com' }
    ],
  },
}
export default nextConfig
```
**Warning sign:** `Error: Invalid src prop ... hostname ... is not configured under images.remotePatterns`
**Fallback strategy:** If the real Cloudflare hostname is unknown at dev time, add `unoptimized: true` to the specific `<Image>` components serving Cloudflare photos until the real domain is confirmed.

### Pitfall 2: AnimatePresence With LazyMotion — Import Order Matters
**What goes wrong:** Importing `AnimatePresence` from `framer-motion` in a `'use client'` component works fine, but the child `m.*` elements must be `m.*` (not `motion.*`) since the app root uses LazyMotion.
**Why it happens:** LazyMotion tree-shakes Framer Motion features globally. Using `motion.div` inside a LazyMotion tree falls outside the feature bundle and may not animate or may throw.
**How to avoid:** Always `import { m } from 'framer-motion'` — never `import { motion }`. This is already the established pattern throughout the project.

### Pitfall 3: Lightbox SSR Crash via document.body
**What goes wrong:** `createPortal(content, document.body)` executes on the server during SSR where `document` is undefined, causing a ReferenceError.
**Why it happens:** Next.js App Router server-renders all components by default; `'use client'` components are still pre-rendered on the server.
**How to avoid:** The Lightbox component should only call `createPortal` when `isOpen` is true. Since it starts as `null` (not open), the initial render returns nothing. Confirm the Lightbox never renders open on first mount — the `activeIndex` state lives in the parent `GalleryGrid` which initialises to `null`.

### Pitfall 4: Body Scroll Not Restored After Lightbox Close
**What goes wrong:** Setting `document.body.style.overflow = 'hidden'` when lightbox opens but failing to restore it leaves the page permanently unscrollable after close.
**How to avoid:** Always restore in the `useEffect` cleanup function (as shown in the Lightbox pattern above). Add `return () => { document.body.style.overflow = '' }` as the cleanup.

### Pitfall 5: Cloudflare URL Construction — Trailing Slash
**What goes wrong:** `${NEXT_PUBLIC_CLOUDFLARE_URL}/${photo.slug}` produces `https://example.com//photo.jpg` if the env var has a trailing slash.
**How to avoid:** Strip trailing slash when constructing URLs: `` `${process.env.NEXT_PUBLIC_CLOUDFLARE_URL?.replace(/\/$/, '')}/${photo.slug}` `` — or document the env var format clearly in .env.example as "no trailing slash".

### Pitfall 6: GalleryItem onClick Requires 'use client'
**What goes wrong:** Gallery items need an `onClick` handler to open the lightbox, but `onClick` cannot be passed to a server component.
**Why it happens:** Event handlers require client-side JavaScript.
**How to avoid:** `GalleryItem.tsx` must be `'use client'`. The parent `GalleryGrid` can be either — if it receives the `onOpen` callback as a prop, it must also be client. The cleanest solution: make `GalleryGrid` a `'use client'` component that owns the `activeIndex` state and renders `GalleryItem` children and `Lightbox`.

---

## Code Examples

Verified patterns from official sources:

### next/image with Cloudflare remotePatterns (Next.js 16.2 official docs)
```typescript
// next.config.ts — TypeScript syntax confirmed for Next.js 16.2
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.r2.dev',  // Cloudflare R2 public bucket wildcard
      },
    ],
  },
}

export default nextConfig
```

### next/image Loading Defaults (Next.js 16.2 official docs)
```typescript
// loading defaults to "lazy" — no prop needed for gallery images
<Image
  src={photo.src}
  alt={photo.alt}
  width={photo.width}
  height={photo.height}
  // loading="lazy" is the default — omit it, it's already lazy
/>

// Only add loading="eager" for above-the-fold images
// The gallery is below-fold — default lazy is correct
```

### AnimatePresence Props (verified from framer-motion 12 source)
```typescript
// AnimatePresence key props:
// - children: React nodes to animate
// - mode: "sync" (default) | "wait" | "popLayout"
//   "wait" mode: old child exits before new child enters (good for lightbox nav)
// - initial: boolean (default true) — whether to animate on first render
// - onExitComplete: () => void — fires when all exit animations complete

<AnimatePresence mode="wait">
  {isOpen && (
    <m.div key={activeIndex} /* key change triggers exit+enter */ >
      {/* lightbox content */}
    </m.div>
  )}
</AnimatePresence>
```

### CSS Masonry Grid with Tailwind v4 columns
```typescript
// Two-column masonry — CSS columns, no JS
<div className="columns-1 md:columns-2 gap-6">
  {items.map(item => (
    <div key={item.id} className="break-inside-avoid mb-6">
      {/* card content */}
    </div>
  ))}
</div>
```

### line-clamp (Tailwind v4 — built-in, no plugin required)
```typescript
// Tailwind v4 includes line-clamp natively — no @tailwindcss/line-clamp plugin needed
<p className="line-clamp-3 font-body text-sm text-foreground leading-relaxed">
  {post.excerpt}
</p>
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `@tailwindcss/line-clamp` plugin | Built-in `line-clamp-*` | Tailwind v3.3+ (v4 continues) | No plugin install needed |
| `motion.div` + full Framer Motion bundle | `m.div` + `LazyMotion` | Framer Motion 4+ | ~30KB JS saving; project already uses this |
| `priority` prop on next/image | `preload` prop (deprecated `priority` in Next.js 16) | Next.js 16 | Do not use `priority` — use `preload={true}` for hero images, omit for gallery |
| `remotePatterns` as object array | Supports both `new URL()` syntax and object array | Next.js 14+ | Both syntaxes work in Next.js 16.2 |
| `AnimatePresence` children must have `key` | Still required | Always | Without `key`, React can't distinguish same-type elements for exit animation |

**Deprecated/outdated:**
- `priority` prop on next/image: deprecated in Next.js 16 — use `preload` instead. Do not use `priority` in Phase 4.
- `@tailwindcss/line-clamp` plugin: no longer needed in Tailwind v4 — remove if listed anywhere.
- `onLoadingComplete` on next/image: deprecated since Next.js 14 — use `onLoad` instead.

---

## Cloudflare URL Pattern — Definitive Answer

The `NEXT_PUBLIC_CLOUDFLARE_URL` env var stores the base CDN URL (e.g. `https://pub-abc123.r2.dev`). Image src in `lib/data/media.ts` will store slugs/filenames, and the full URL is constructed in the component:

```typescript
// In GalleryItem.tsx
const baseUrl = process.env.NEXT_PUBLIC_CLOUDFLARE_URL?.replace(/\/$/, '') ?? ''
const src = `${baseUrl}/${photo.src}`  // photo.src = 'barbershop-podcast.jpg'
```

**remotePatterns must be configured** before any photos can be optimized through next/image. Since the real Cloudflare subdomain is unknown until Vidit provides it, configure with a broad wildcard:

```typescript
remotePatterns: [
  { protocol: 'https', hostname: '**.r2.dev' },           // R2 public buckets
  { protocol: 'https', hostname: '**.cloudflare.com' },   // Cloudflare CDN
]
```

If using a custom domain (e.g. `media.vidit.vc`), add the specific hostname when known.

---

## Open Questions

1. **Cloudflare hostname specifics**
   - What we know: env var is `NEXT_PUBLIC_CLOUDFLARE_URL=https://your-cloudflare-subdomain.example.com` (placeholder)
   - What's unclear: whether it will be an R2 public bucket URL (`pub-xxx.r2.dev`), a Cloudflare Workers URL, or a custom domain
   - Recommendation: configure `remotePatterns` with wildcard `**.r2.dev` and `**.cloudflare.com` now; narrow it when the real URL is known

2. **Two-column layout: mixed LinkedIn cards + photos vs. separate sub-sections**
   - What we know: PRD says "two-column masonry-style grid — mix of LinkedIn post cards and photos"
   - What's unclear: whether to truly interleave posts and photos in one grid, or show two separate sub-sections (LinkedIn cards above, gallery below) — the latter is much simpler to implement and update
   - Recommendation: implement as two clearly labelled sub-sections (Writing + Photos) stacked vertically, both in the same MediaSection. This matches the PRD's sub-section A/B structure and is far easier for Vidit to update. A fully interleaved mixed grid requires complex ordering logic and makes data management harder.

3. **Number of placeholder post cards**
   - What we know: PRD recommends 6–8 posts
   - What's unclear: how many placeholder cards to render while waiting for real content
   - Recommendation: render 4 placeholder cards (enough to show the layout, not so many it looks broken)

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None detected in project |
| Config file | None — Wave 0 gap |
| Quick run command | N/A |
| Full suite command | N/A |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| MEDIA-01 | Two-column grid renders | visual/manual | Manual browser check at 1280px | N/A |
| MEDIA-02 | LinkedIn card shows truncated text, date, link | manual-only | Visual check — CSS line-clamp is not unit-testable | N/A |
| MEDIA-03 | Gallery shows placeholder when photos array empty | manual-only | Verify photos array empty, check placeholder renders | N/A |
| MEDIA-04 | Hover overlay appears on photo hover | manual-only | Manual browser hover check | N/A |
| MEDIA-05 | Escape closes lightbox; arrow keys navigate | manual-only | Manual keyboard test after lightbox open | N/A |
| MEDIA-06 | Off-screen images not loaded on initial page load | manual-only | Network tab — confirm gallery images not loaded on page load | N/A |

**Note:** This project has no testing infrastructure (no jest, vitest, playwright, or cypress config found). All MEDIA requirements are UI/interaction requirements best verified manually. No Wave 0 test setup is warranted — Phase 5 (Performance) covers Lighthouse and responsive verification.

### Wave 0 Gaps
None — no testing framework is configured in this project, and all MEDIA requirements are interaction/visual requirements not suitable for unit tests without significant infrastructure investment. Manual verification is the correct approach for this phase.

---

## Sources

### Primary (HIGH confidence)
- `https://nextjs.org/docs/app/api-reference/components/image` (version 16.2.0, lastUpdated 2026-03-10) — remotePatterns syntax, loading defaults, priority deprecation, fill prop
- `https://nextjs.org/docs/app/api-reference/config/next-config-js/images` (version 16.2.0) — Cloudflare loader pattern, remotePatterns wildcard syntax
- `https://tailwindcss.com/docs/line-clamp` — Tailwind v4 built-in line-clamp, no plugin required
- `https://github.com/motiondivision/motion` (AnimatePresence source) — props: mode, initial, onExitComplete, propagate
- `https://react.dev/reference/react-dom/createPortal` — createPortal syntax, document.body as target, event propagation behavior
- Installed package.json — framer-motion@12.38.0, next@16.2.0, react@19.2.4, tailwindcss@4 confirmed

### Secondary (MEDIUM confidence)
- Training knowledge on Framer Motion AnimatePresence patterns (keyboard event useEffect pattern, body scroll lock) — consistent with source code inspection

### Tertiary (LOW confidence)
- None

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all packages verified from package.json; no new installs needed
- Architecture: HIGH — pattern follows established project conventions (KilrrAnimations, StatCountUp as reference); lightbox pattern verified from official React and Framer Motion sources
- Pitfalls: HIGH — remotePatterns behavior verified from Next.js 16.2 official docs; SSR/portal issue is well-documented React pattern
- Cloudflare URL: MEDIUM — wildcard pattern correct; specific hostname unknown until Vidit provides real URL

**Research date:** 2026-03-20
**Valid until:** 2026-06-20 (stable stack; Tailwind v4, Next.js 16, Framer Motion 12 are not fast-moving at patch level)
