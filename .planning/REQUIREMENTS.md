# Requirements: Vidit Dugar — VC Portfolio Website

**Defined:** 2026-03-18
**Core Value:** A VC partner understands Vidit's investment track record, philosophy, and operator background within 90 seconds of scrolling — feeling meaningfully different from a LinkedIn profile or PDF CV.

---

## v1 Requirements

### Foundation

- [x] **FOUND-01**: Next.js 16 App Router project scaffolded with TypeScript, Tailwind CSS v4, and Turbopack
- [x] **FOUND-02**: `next/font/google` configured with Playfair Display (display/headings), DM Sans (body), and DM Mono (numbers/stats) as CSS variables — no external font requests at runtime
- [x] **FOUND-03**: Global dark background (`#0D0D0D`) applied on `html, body` in `globals.css` before JavaScript hydration (prevents dark theme flash)
- [ ] **FOUND-04**: Framer Motion `LazyMotion` + `domAnimation` provider configured at app root — no full Framer Motion bundle shipped
- [ ] **FOUND-05**: All content stored in `lib/data/*.ts` static TypeScript files — no CMS, no database, no runtime fetches
- [ ] **FOUND-06**: Project deployed to Vercel with CI on main branch
- [ ] **FOUND-07**: Cloudflare used for media asset hosting (photos, videos) — not stored in `/public/`
- [ ] **FOUND-08**: Portfolio company logos stored in `/public/logos/` as local SVG/PNG files — no `next/image` remotePatterns for logo grid

### Hero

- [ ] **HERO-01**: Full-viewport-height hero section displaying `VIDIT DUGAR` in Playfair Display as dominant heading
- [ ] **HERO-02**: Identity descriptor line: `Investor. Operator. Builder.`
- [ ] **HERO-03**: Subline in muted text: `Formerly Nomura London · Bombay Shaving Company · The Barbershop Fund`
- [ ] **HERO-04**: Headshot placeholder (circular/rectangular crop, labelled `[Photo — Vidit to upload]`) displayed in hero — easy asset swap via data file
- [ ] **HERO-05**: 4 animated stat count-up widgets displayed in horizontal strip on scroll entry: 16 (Early-Stage Investments), 1.8x (Fund MOIC), ₹20Cr (Capital Deployed), 50%+ (Portfolio with Follow-on Rounds)
- [ ] **HERO-06**: Stat numbers rendered in amber/gold accent (`#C8922A`); labels in muted off-white
- [ ] **HERO-07**: Scroll-triggered fade-in animation on hero text elements (not on load — on scroll entry with `viewport={{ once: true }}`)

### Narrative (About / The Story)

- [ ] **NARR-01**: "About / The Story" section with the full ~250-word narrative prose as specified in the PRD (investment banking → BSC/Barbershop Fund → Orly arc)
- [ ] **NARR-02**: Pull quote displayed prominently: *"Running a company taught me things no pitch deck ever could."* — styled in Playfair Display at large size
- [ ] **NARR-03**: Section fade-in on scroll entry

### Philosophy

- [ ] **PHIL-01**: Investment Philosophy section with 3 numbered pillars: `01 — Founder First, Always`, `02 — Tailwinds Are Table Stakes; Retention Is the Edge`, `03 — Operator Alpha Is Real`
- [ ] **PHIL-02**: Each pillar displays the full paragraph copy from the PRD — no truncation, no icons
- [ ] **PHIL-03**: Clean numbered layout — not a bullet list, not cards; editorial editorial typographic treatment

### Track Record (Barbershop Fund)

- [ ] **TRACK-01**: Section header `The Barbershop Fund` with subtitle `₹25Cr Category-I AIF · 80 LPs · 2023–2025`
- [ ] **TRACK-02**: 4 fund summary animated stats: 1.8x (MOIC on ₹20Cr Deployed), 16 (Investments Made), 50%+ (Portfolio with Follow-on Rounds), 5 (Companies Featured on Shark Tank India)
- [ ] **TRACK-03**: Standout investments table with 5 rows: Go Zero, Kilrr, Fishmongers, Anveshan, Mekr — columns: Company, Sector, Entry Valuation, Latest Valuation, Multiple, Notable Co-investors
- [ ] **TRACK-04**: Full portfolio logo grid showing all 25 companies in 4–5 column grid
- [ ] **TRACK-05**: All logos rendered in white/monochrome via CSS `filter: brightness(0) invert(1)` on dark background
- [ ] **TRACK-06**: Hover on logo reveals original color logo as a delight interaction
- [ ] **TRACK-07**: Logos sourced via Brandfetch CDN where available; fallback to local `/public/logos/` files for unavailable brands
- [ ] **TRACK-08**: "We/the fund" framing used throughout — no first-person singular for investment decisions

### Case Study (Kilrr)

- [ ] **CASE-01**: Featured investment section clearly labelled `Investment Story` — Kilrr case study (~300 words) as specified in PRD
- [ ] **CASE-02**: Section uses subtle background fill or left border accent to visually distinguish from surrounding sections
- [ ] **CASE-03**: "We/the fund" framing throughout — never "I" for investment decisions

### Writing & Media

- [ ] **MEDIA-01**: Writing & Media section with two-column masonry-style editorial grid (not Instagram-like)
- [ ] **MEDIA-02**: LinkedIn post cards displaying: first 2–3 lines truncated, date, "read more →" link to original post — built with placeholder content, real posts swapped in by Vidit
- [ ] **MEDIA-03**: Photo gallery with lightbox (click to expand) — images loaded from Cloudflare; placeholder state shown until photos supplied
- [ ] **MEDIA-04**: Hover on photos shows subtle dark overlay with caption
- [ ] **MEDIA-05**: Lightbox supports keyboard navigation (Escape to close, arrow keys between photos)
- [ ] **MEDIA-06**: Images lazy-loaded — no eager loading for off-screen gallery images

### Career Timeline

- [ ] **TIME-01**: Vertical career timeline in reverse chronological order with right-aligned dates and left-aligned role/description
- [ ] **TIME-02**: 5 entries as specified in PRD: Orly (Jul 2025–Present), BSC/Barbershop Fund (Nov 2023–Jul 2025), Nomura London (Jul 2021–Sep 2023), Nomura Mumbai (May 2019–Jun 2021), NMIMS (2016–2019)
- [ ] **TIME-03**: Each entry includes full description copy from the PRD — not truncated
- [ ] **TIME-04**: Timeline collapses to single column on mobile
- [ ] **TIME-05**: Scroll-triggered reveal animation per timeline entry

### Beyond Work

- [ ] **PERS-01**: "Beyond Work" section with two sub-sections: Story of My Life narrative + Interests
- [ ] **PERS-02**: Story of My Life: short paragraph about the live storytelling event (5 editions, 32 speakers, 500+ attendees, ~600K YouTube views)
- [ ] **PERS-03**: Interests displayed as inline text (not bullet points): `Badminton · Vipassana Meditation · Formula 1 · Bachata · Techno & House Music · Travel (30+ countries) · Board Games`

### Contact / Footer

- [ ] **FOOT-01**: Dark footer with centered content: name, email (mailto link), LinkedIn (opens new tab)
- [ ] **FOOT-02**: One-line closing: `Open to conversations about early-stage consumer investing in India.`
- [ ] **FOOT-03**: Copyright: `© 2026 Vidit Dugar`
- [ ] **FOOT-04**: No contact form — email link only

### Performance & Quality

- [ ] **PERF-01**: Lighthouse score 90+ on Performance, Accessibility, Best Practices, SEO
- [ ] **PERF-02**: All Framer Motion `whileInView` animations use `viewport={{ once: true }}` — no ongoing scroll observation
- [ ] **PERF-03**: All section components are Server Components; Framer Motion isolated to narrow `'use client'` leaf wrappers only
- [ ] **PERF-04**: Site fully responsive — hero, timeline, and grid all collapse gracefully on mobile
- [ ] **PERF-05**: No dark theme flash on load — background set in CSS before JS hydrates
- [ ] **PERF-06**: No CLS from font loading — `next/font/google` self-hosts at build time

---

## v2 Requirements

### Writing

- **WRITE-01**: Blog or long-form writing section — defer until Vidit has published pieces
- **WRITE-02**: Password-protected deal memo pages — adds auth complexity not warranted in V1

### CMS

- **CMS-01**: CMS integration for content updates without code changes — static is sufficient for V1

### Analytics

- **ANAL-01**: Plausible or Vercel Analytics integration — add post-deployment privately

---

## Out of Scope

| Feature | Reason |
|---------|--------|
| Contact form | Wrong positioning for VC audience; email link is sufficient |
| Dark/light mode toggle | Committed editorial dark aesthetic; toggle dilutes it |
| PDF resume download | The site IS the resume; PDF undermines it |
| Hard CTA ("Hire Me") | Signals desperation; VC audience prefers discovery |
| Skills progress bars | Developer trope; inappropriate for finance/investment context |
| Social proof widgets (follower counts) | Vanity metrics distract from substantive credentials |
| Stock photo illustrations | Breaks editorial aesthetic; real photos only |
| Multi-page architecture | Breaks narrative scroll momentum |
| "Open to opportunities" banner | Signals desperation rather than selectivity |
| Phone number in footer | Sensitive; email + LinkedIn sufficient |

---

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01–08 | Phase 1: Foundation | Pending |
| HERO-01–07 | Phase 2: Hero Section | Pending |
| NARR-01–03 | Phase 3: Core Sections | Pending |
| PHIL-01–03 | Phase 3: Core Sections | Pending |
| TRACK-01–08 | Phase 3: Core Sections | Pending |
| CASE-01–03 | Phase 3: Core Sections | Pending |
| TIME-01–05 | Phase 3: Core Sections | Pending |
| PERS-01–03 | Phase 3: Core Sections | Pending |
| FOOT-01–04 | Phase 3: Core Sections | Pending |
| MEDIA-01–06 | Phase 4: Media Section | Pending |
| PERF-01–06 | Phase 5: Performance and Deployment | Pending |

**Coverage:**
- v1 requirements: 56 total (FOUND×8, HERO×7, NARR×3, PHIL×3, TRACK×8, CASE×3, MEDIA×6, TIME×5, PERS×3, FOOT×4, PERF×6)
- Mapped to phases: 56
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-18*
*Last updated: 2026-03-18 after roadmap creation (corrected count from 53 to 56)*
