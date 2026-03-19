---
phase: 2
slug: hero-section
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-19
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest (via Next.js / Playwright for visual) |
| **Config file** | none — Wave 0 installs if needed |
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
| 2-01-01 | 01 | 1 | HERO-01 | build | `npm run build` | ✅ | ⬜ pending |
| 2-01-02 | 01 | 1 | HERO-02 | build | `npm run build` | ✅ | ⬜ pending |
| 2-01-03 | 01 | 1 | HERO-03 | build | `npm run build` | ✅ | ⬜ pending |
| 2-01-04 | 01 | 1 | HERO-04 | build | `npm run build` | ✅ | ⬜ pending |
| 2-02-01 | 02 | 2 | HERO-05 | build | `npm run build` | ✅ | ⬜ pending |
| 2-02-02 | 02 | 2 | HERO-06 | build | `npm run build` | ✅ | ⬜ pending |
| 2-02-03 | 02 | 2 | HERO-07 | build | `npm run build` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

*Existing infrastructure covers all phase requirements — Next.js build + ESLint already configured.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Stat count-up animates on scroll entry only | HERO-05 | Requires visual browser inspection | Open site, scroll to stats, confirm numbers count up; scroll back up and re-enter, confirm they do NOT re-animate |
| Hero text fade-in on scroll entry with viewport once | HERO-06 | Requires visual browser inspection | Open site, scroll into hero, confirm fade-in; scroll away and back, confirm no re-animation |
| Headshot renders at correct aspect ratio | HERO-04 | Requires visual inspection | Verify 506×900 portrait renders without distortion in hero layout |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
