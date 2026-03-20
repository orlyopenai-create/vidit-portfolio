---
phase: 4
slug: media-section
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-20
---

# Phase 4 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Next.js build + TypeScript check |
| **Config file** | none — no automated test suite configured |
| **Quick run command** | `npx tsc --noEmit` |
| **Full suite command** | `npm run build && npm run lint` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx tsc --noEmit`
- **After every plan wave:** Run `npm run build && npm run lint`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 4-01-01 | 04-01 | 1 | MEDIA-01, MEDIA-02 | build | `npx tsc --noEmit` | ✅ | ⬜ pending |
| 4-01-02 | 04-01 | 1 | MEDIA-03, MEDIA-04, MEDIA-05, MEDIA-06 | build | `npm run build` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

*Existing infrastructure covers all phase requirements. No new test framework install needed — build + TypeScript check pipeline is sufficient.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Escape closes lightbox | MEDIA-03 | Browser keyboard event — not testable via build | Open gallery, click photo, press Escape, confirm lightbox closes |
| Arrow keys navigate lightbox | MEDIA-03 | Browser keyboard event — not testable via build | Open lightbox, press ArrowLeft/ArrowRight, confirm photo changes |
| Dark overlay + caption appears on hover | MEDIA-04 | CSS hover state — visual check | Hover a gallery item, confirm dark overlay and caption visible |
| Body scroll locked while lightbox open | MEDIA-03 | Browser behavior — not testable via build | Open lightbox, attempt to scroll page, confirm scroll locked |
| Lazy loading — only near-viewport images load | MEDIA-05 | Network tab check | Open DevTools Network, load page, confirm only above-fold images request immediately |
| Placeholder states render when data arrays empty | MEDIA-01, MEDIA-02 | Visual check with empty data | Clear media.ts arrays, load page, confirm graceful placeholder UI |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
