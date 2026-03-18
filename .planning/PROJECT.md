# Vidit Dugar — VC Portfolio Website

## What This Is

A personal portfolio website for Vidit Dugar targeting partners, principals, and talent leads at early-stage, consumer-focused VC funds in India. The site tells the story of a rare profile — investment banker → micro-VC fund manager → podcast operator → business owner — all before 30. Single-page scrolling site built in Next.js with a refined editorial dark aesthetic.

## Core Value

A VC partner who lands on it understands Vidit's investment track record, philosophy, and operator background within 90 seconds of scrolling — feeling meaningfully different from a LinkedIn profile or PDF CV.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Hero section with name, identity descriptor, and 4 animated key stats (16 investments, 1.8x MOIC, ₹20Cr deployed, 50%+ follow-on)
- [ ] Headshot placeholder (circular/rectangular crop) until Vidit supplies photo
- [ ] About / The Story section — long-form narrative prose (~250 words) with pull quote
- [ ] Investment Philosophy section — 3 numbered pillars (Founder First, Retention Is the Edge, Operator Alpha)
- [ ] The Barbershop Fund track record — fund stats, standout investments table (5 companies), full 25-company portfolio logo grid
- [ ] Featured Investment story — Kilrr case study (~300 words), "we" framing throughout
- [ ] Writing & Media section — LinkedIn post cards + curated photo gallery with lightbox
- [ ] Career Timeline — vertical timeline, reverse chronological (Orly, BSC/Barbershop Fund, Nomura London, Nomura Mumbai, NMIMS)
- [ ] Beyond Work section — Story of My Life + interests
- [ ] Contact / Footer — email, LinkedIn, one-line closing statement, no contact form
- [ ] Fully responsive (mobile + desktop)
- [ ] Scroll-triggered fade-in animations via Framer Motion
- [ ] Animated stat count-up on scroll entry
- [ ] Portfolio logos in white/monochrome (CSS filter); reveal color on hover
- [ ] Lighthouse score 90+

### Out of Scope

- Blog or long-form writing section — defer to V2 once Vidit has publicly published pieces
- Full deal memo pages — can be password-protected V2 section
- Dark/light mode toggle — single dark theme only
- Multi-language support — English only
- CMS integration — all content static in V1
- Contact form — email link only, no form
- Analytics setup — Vidit to add post-deployment

## Context

- **Target audience:** VC fund partners, principals, and talent leads at consumer-focused early-stage Indian funds; secondary: co-investors and founders who look Vidit up
- **Primary CTA:** Read and explore — no hard CTA, no contact form pressure
- **Design:** Refined editorial dark — `#0D0D0D` background, warm off-white text, deep amber/gold accent (`#C8922A`). Playfair Display headings, DM Sans body, DM Mono for stats/numbers
- **Do NOT use:** Purple gradients, Inter font, generic "fintech blue" schemes, stock photo illustrations, SaaS landing page aesthetics
- **Tech stack:** Next.js 14+ (App Router), Tailwind CSS, Framer Motion, Google Fonts
- **Deployment:** Vercel; domain TBD (`viditdugar.com` or `vidit.vc`)
- **Content assets pending from Vidit:** Headshot, LinkedIn posts (6–8 best), photos (podcast/Orly/Nomura/Story of My Life), fund deck PDF for logo extraction, logo usage confirmation for stealth companies
- **Attribution note:** All Barbershop Fund investment decisions were collective with Shantanu Deshpande as final decision-maker. Use "we" and "the fund" — never "I" — for investment decisions

## Constraints

- **Content:** Several assets not yet available (headshot, photos, LinkedIn posts) — site must be fully buildable with placeholders and easy to swap in real content
- **Attribution:** Investment decisions attributed to team/fund, never Vidit individually
- **Logo IP:** Portfolio company logos must be displayed in monochrome; hover reveals color. Some companies may be in stealth — confirm with Vidit before going live
- **Performance:** Lighthouse 90+ — animations must not degrade performance

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js 14 App Router | Standard 2025 stack, Vercel-native, good for static + future dynamic features | — Pending |
| Single-page scroll vs multi-page | Story flows better as a scroll; VC audience reads top-to-bottom | — Pending |
| No contact form | Let the work speak; email link is sufficient and avoids spam | — Pending |
| Monochrome logos with hover color reveal | Visual consistency on dark bg; delight interaction | — Pending |
| Static content in V1 | Fastest to build and deploy; CMS adds complexity not needed for launch | — Pending |

---
*Last updated: 2026-03-18 after initialization*
