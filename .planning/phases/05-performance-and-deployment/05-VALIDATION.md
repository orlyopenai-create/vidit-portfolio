---
phase: 5
slug: performance-and-deployment
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-20
---

# Phase 5 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Next.js build (TypeScript compiler + ESLint) |
| **Config file** | `tsconfig.json`, `next.config.ts` |
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
| 5-01-01 | 01 | 1 | PERF-04 | build | `npm run build` | ✅ | ⬜ pending |
| 5-01-02 | 01 | 1 | PERF-04 | manual | Lighthouse production audit | N/A | ⬜ pending |
| 5-01-03 | 01 | 1 | PERF-04 | manual | Contrast checker (WebAIM) | N/A | ⬜ pending |
| 5-02-01 | 02 | 2 | PERF-01 | manual | Lighthouse SEO score ≥ 90 | N/A | ⬜ pending |
| 5-02-02 | 02 | 2 | PERF-01 | build | `npm run build` | ✅ | ⬜ pending |
| 5-02-03 | 02 | 2 | PERF-02 | manual | 375px viewport test | N/A | ⬜ pending |
| 5-02-04 | 02 | 2 | PERF-05 | manual | No FOUT on hard reload | N/A | ⬜ pending |
| 5-02-05 | 02 | 2 | PERF-06 | build | `npm run build` strict | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements — `npm run build` is the primary automated gate.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Lighthouse ≥ 90 all categories | PERF-01 | Requires live production URL + real browser run | Open Chrome DevTools → Lighthouse → run on https://vidit-portfolio-vert.vercel.app |
| No white flash on hard reload | PERF-03 | Visual, timing-dependent | Hard reload (Cmd/Ctrl+Shift+R) in Chrome, Firefox, Safari — check for background flash |
| Layout correct at 375px | PERF-02 | Visual layout check | DevTools → 375×812 (iPhone SE) — verify hero, timeline, logo grid reflow without horizontal scroll |
| No FOUT after initial paint | PERF-05 | Visual, timing-dependent | Throttle network to Fast 3G, hard reload — check for font swap reflow |
| WCAG AA contrast for small text | PERF-04 | Requires visual + tooling | Use axe DevTools or WebAIM contrast checker on updated muted/accent colors |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
