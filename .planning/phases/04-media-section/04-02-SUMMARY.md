---
phase: 04-media-section
plan: 02
subsystem: media
tags: [gallery, lightbox, framer-motion, next-image, client-component, portal]
dependency_graph:
  requires: [04-01]
  provides: [GalleryGrid, Lightbox, MediaSection-complete]
  affects: [components/sections/MediaSection.tsx, components/media/GalleryGrid.tsx, components/media/Lightbox.tsx]
tech_stack:
  added: []
  patterns: [createPortal-SSR-guard, useState-mounted-pattern, AnimatePresence-m.div, GalleryGrid-owns-URL-construction]
key_files:
  created:
    - components/media/Lightbox.tsx
    - components/media/GalleryGrid.tsx
  modified:
    - components/sections/MediaSection.tsx
decisions:
  - "Lightbox uses mounted useState guard (not typeof document check) to prevent createPortal SSR crash — cleaner React pattern"
  - "GalleryGrid is sole owner of NEXT_PUBLIC_CLOUDFLARE_URL construction; Lightbox receives fully-qualified URLs via photos prop"
  - "AnimatePresence mode=wait used for lightbox nav so old photo exits before new enters"
metrics:
  duration_min: 3
  completed_date: "2026-03-20"
  tasks_completed: 2
  files_changed: 3
---

# Phase 04 Plan 02: Gallery Grid and Lightbox Summary

**One-liner:** Photo gallery grid with hover overlays and full-screen lightbox portal (Escape/arrow nav, body scroll lock, AnimatePresence) wired into MediaSection server shell.

## Tasks Completed

| # | Task | Commit | Key Files |
|---|------|--------|-----------|
| 1 | Build Lightbox and GalleryGrid client components | 18761fe | components/media/Lightbox.tsx, components/media/GalleryGrid.tsx |
| 2 | Wire GalleryGrid into MediaSection and verify full build | c9560d1 | components/sections/MediaSection.tsx, components/media/Lightbox.tsx |

## Decisions Made

1. **Mounted guard pattern for SSR**: Used `useState(false)` + `useEffect(() => setMounted(true), [])` to guard `createPortal` — returns `null` on server pre-render, only renders portal after client hydration. This is cleaner than `typeof document !== 'undefined'` because it works correctly with React 19's concurrent hydration.

2. **GalleryGrid owns URL construction**: GalleryGrid prepends `NEXT_PUBLIC_CLOUDFLARE_URL` to every photo src before passing to Lightbox. Lightbox receives fully-qualified URLs and never touches the env var. Single point of URL construction simplifies future changes (e.g. switching CDN).

3. **AnimatePresence mode="wait"**: Used `mode="wait"` so the exiting photo fully fades out before the next photo fades in during keyboard navigation — prevents visual overlap between photos.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed createPortal SSR crash — document is not defined**
- **Found during:** Task 2 verification (npm run build)
- **Issue:** `createPortal(content, document.body)` throws `ReferenceError: document is not defined` during Next.js static page generation (SSR pre-render), even though Lightbox has `'use client'` directive — Next.js still server-pre-renders client components
- **Fix:** Added `const [mounted, setMounted] = useState(false)` + `useEffect(() => setMounted(true), [])`. Added `if (!mounted) return null` guard before `createPortal` call. This returns null during SSR and on initial hydration, then renders the portal after client mount.
- **Files modified:** components/media/Lightbox.tsx
- **Commit:** c9560d1

## Verification Results

- TypeScript: `npx tsc --noEmit` exits 0 (after Task 1)
- Production build: `npm run build` exits 0 (after Task 2 fix)
- All acceptance criteria verified via grep checks

## Self-Check

### Files created/modified
- [x] components/media/Lightbox.tsx — FOUND (contains use client, createPortal, AnimatePresence, m.div, keydown, Escape, ArrowLeft, ArrowRight, document.body.style.overflow, photo.src, NO NEXT_PUBLIC_CLOUDFLARE_URL)
- [x] components/media/GalleryGrid.tsx — FOUND (contains use client, useState, group-hover:opacity-100, group-hover:scale-105, bg-black/60, columns-1 md:columns-2, Vidit to supply, Lightbox, NEXT_PUBLIC_CLOUDFLARE_URL, NO loading=eager)
- [x] components/sections/MediaSection.tsx — FOUND (contains GalleryGrid, import GalleryGrid, GalleryGrid photos={photos}, NO use client, NO Plan 02 comment)

### Commits
- [x] 18761fe — feat(04-02): build Lightbox and GalleryGrid client components
- [x] c9560d1 — feat(04-02): wire GalleryGrid into MediaSection and fix SSR portal crash

## Self-Check: PASSED
