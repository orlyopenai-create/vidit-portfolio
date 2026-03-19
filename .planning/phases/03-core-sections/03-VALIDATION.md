---
phase: 3
slug: core-sections
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-19
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Next.js build + visual browser check |
| **Config file** | none — no automated test suite configured |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && npm run lint` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build && npm run lint`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 3-01-01 | 01 | 1 | NARR-01 | build | `npm run build` | ✅ | ⬜ pending |
| 3-01-02 | 01 | 1 | NARR-02 | build | `npm run build` | ✅ | ⬜ pending |
| 3-01-03 | 01 | 1 | NARR-03 | build | `npm run build` | ✅ | ⬜ pending |
| 3-02-01 | 02 | 1 | PHIL-01 | build | `npm run build` | ✅ | ⬜ pending |
| 3-02-02 | 02 | 1 | PHIL-02 | build | `npm run build` | ✅ | ⬜ pending |
| 3-02-03 | 02 | 1 | PHIL-03 | build | `npm run build` | ✅ | ⬜ pending |
| 3-03-01 | 03 | 1 | TRACK-01 | build | `npm run build` | ✅ | ⬜ pending |
| 3-03-02 | 03 | 1 | TRACK-02 | build | `npm run build` | ✅ | ⬜ pending |
| 3-03-03 | 03 | 1 | TRACK-03 | build | `npm run build` | ✅ | ⬜ pending |
| 3-03-04 | 03 | 1 | TRACK-04 | build | `npm run build` | ✅ | ⬜ pending |
| 3-03-05 | 03 | 1 | TRACK-05 | build | `npm run build` | ✅ | ⬜ pending |
| 3-03-06 | 03 | 2 | TRACK-06 | build | `npm run build` | ✅ | ⬜ pending |
| 3-03-07 | 03 | 2 | TRACK-07 | build | `npm run build` | ✅ | ⬜ pending |
| 3-03-08 | 03 | 2 | TRACK-08 | build | `npm run build` | ✅ | ⬜ pending |
| 3-04-01 | 04 | 2 | CASE-01 | build | `npm run build` | ✅ | ⬜ pending |
| 3-04-02 | 04 | 2 | CASE-02 | build | `npm run build` | ✅ | ⬜ pending |
| 3-04-03 | 04 | 2 | CASE-03 | build | `npm run build` | ✅ | ⬜ pending |
| 3-05-01 | 05 | 2 | TIME-01 | build | `npm run build` | ✅ | ⬜ pending |
| 3-05-02 | 05 | 2 | TIME-02 | build | `npm run build` | ✅ | ⬜ pending |
| 3-05-03 | 05 | 2 | TIME-03 | build | `npm run build` | ✅ | ⬜ pending |
| 3-05-04 | 05 | 2 | TIME-04 | build | `npm run build` | ✅ | ⬜ pending |
| 3-05-05 | 05 | 2 | TIME-05 | build | `npm run build` | ✅ | ⬜ pending |
| 3-06-01 | 06 | 3 | PERS-01 | build | `npm run build` | ✅ | ⬜ pending |
| 3-06-02 | 06 | 3 | PERS-02 | build | `npm run build` | ✅ | ⬜ pending |
| 3-06-03 | 06 | 3 | PERS-03 | build | `npm run build` | ✅ | ⬜ pending |
| 3-07-01 | 07 | 3 | FOOT-01 | build | `npm run build` | ✅ | ⬜ pending |
| 3-07-02 | 07 | 3 | FOOT-02 | build | `npm run build` | ✅ | ⬜ pending |
| 3-07-03 | 07 | 3 | FOOT-03 | build | `npm run build` | ✅ | ⬜ pending |
| 3-07-04 | 07 | 3 | FOOT-04 | build | `npm run build` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

*Existing infrastructure covers all phase requirements. No new test framework install needed — build + lint pipeline is sufficient for a portfolio Next.js project.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Logo hover reveals full color | TRACK-07 | CSS filter transition — no automated screenshot test | Hover each logo in grid, confirm grayscale→color transition |
| Pull quote renders in large Playfair Display | NARR-03 | Typography scale — visual check | Open site, scroll to About section, confirm quote font and size |
| Scroll order correct top-to-bottom | All sections | Layout ordering — visual check | Scroll from hero to footer, confirm order: About→Philosophy→Fund→Kilrr→Timeline→Beyond Work→Footer |
| Career timeline collapses to single column on mobile | TIME-04 | Responsive layout — requires viewport resize | Resize to 375px width, confirm single-column stack |
| Footer email opens mailto client | FOOT-02 | Browser behavior — not testable via build | Click email link, confirm mailto opens |
| LinkedIn opens in new tab | FOOT-03 | Browser behavior — not testable via build | Click LinkedIn link, confirm `target="_blank"` behavior |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
