# Feature Landscape

**Domain:** Personal portfolio website — finance/VC professional targeting early-stage Indian VC funds
**Subject:** Vidit Dugar (IB → micro-VC fund manager → podcast operator → business owner)
**Target Audience:** VC partners, principals, and talent leads at consumer-focused early-stage Indian funds
**Researched:** 2026-03-18
**Confidence:** MEDIUM — no external tool access; findings drawn from training knowledge of VC ecosystem norms, professional personal branding, and the detailed PROJECT.md context. Marked where confidence varies.

---

## Table Stakes

Features a VC-audience viewer expects to find. Missing any of these and the site feels incomplete, amateurish, or untrustworthy.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Clear identity statement above the fold | VC partners give <10 seconds before bouncing; they need to know who this is and why it's relevant immediately | Low | Hero must answer: who, what, why care — before any scroll |
| Headshot / real photo | Trust signal; personal sites without a photo feel evasive or placeholder-quality | Low | Circular or editorial crop; must be professional but not corporate — editorial dark treatment works |
| Career timeline / professional history | VC partners verify background before reading further; they want to see the arc quickly | Medium | Reverse chronological; include firm names, roles, notable callouts |
| Quantified track record | Finance/VC audience is numerically literate — qualitative claims without numbers feel unsubstantiated | Medium | Stats need to be prominent: deployments, MOIC, portfolio count, follow-on rate |
| Investment philosophy | Distinguishes operator-investor from a generic finance background; expected at any serious VC | Medium | Not a bullet list of buzzwords — short, clear, personal convictions with reasoning |
| Portfolio company list | Any fund manager site without this looks like they have something to hide | Medium | Logo grid or table; some detail per company (stage, thesis fit) is better than names only |
| Contact path | Even if minimal — an email or LinkedIn — the viewer must have somewhere to go | Low | Email link + LinkedIn icon is sufficient; no form needed |
| Mobile responsiveness | VC partners frequently view links on mobile (forwarded links, quick reference) | Medium | Not a nice-to-have for this audience in 2026 |
| Consistent, professional design | Dark, editorial, or minimal — design signals taste and attention to detail, which VC firms care about | Medium | Design must match the content's ambition; generic templates undercut credibility |
| Fast load time | Slow sites signal poor execution regardless of content; partners won't wait | Medium | Lighthouse 90+ is the right target; image optimization is the main risk |

---

## Differentiators

Features that are not expected but create a memorable, high-signal impression for the VC audience.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Animated stat count-up on scroll | Makes quantified achievements feel earned rather than static; creates a "wow" moment on key numbers | Medium | Framer Motion counter; must be subtle — aggressive animation reads as amateur |
| Prose narrative "The Story" section | Most finance profiles are bullet-point CVs; long-form prose about the journey signals self-awareness and communication ability — both prized at VC firms | Low (content) / Low (engineering) | ~250 words, first-person, narrative arc — unusual for finance profiles and therefore memorable |
| Featured investment deep-dive (case study) | Demonstrates actual investment thinking, not just that investments happened; rare on personal sites | Medium | Kilrr case study: thesis, what was seen, what was learned; "we/the fund" framing throughout |
| Investment philosophy as numbered pillars with rationale | Goes beyond buzzwords; shows the thinking framework — investors evaluate other investors on frameworks | Low | Three clear pillars with 2–3 sentence rationale each is the right depth |
| Monochrome logo grid with hover color reveal | Interaction design that rewards curiosity; keeps the dark aesthetic intact while showing off portfolio breadth | Medium | CSS filter approach; hover reveal creates a small delight moment without being gimmicky |
| Pull quote styled differently from body text | Typography hierarchy signals design literacy; a well-chosen quote can anchor the narrative section and make it shareable | Low | Single standout line from the narrative, styled in Playfair Display at large size |
| Career section as visual timeline (not just list) | A timeline communicates non-linearity and deliberate career choices better than a list; makes the unusual path legible | Medium | Vertical timeline, reverse chronological, with short callouts per role |
| Writing & media section (LinkedIn posts + photos) | Signals active voice in the ecosystem; most portfolio sites are passive credential lists | Medium | Requires curated content selection — 6–8 best LinkedIn posts, not everything. Photos add human dimension |
| "Beyond work" / personal section | VC hiring is relationship-based; investors want to know the person, not just the CV | Low | Short, specific, not generic ("I love traveling") — references Story of My Life podcast specifically |
| Editorial dark aesthetic with amber/gold accent | Most finance sites use blue/grey corporate palettes; a considered dark editorial aesthetic signals taste and confidence | High (design) / Low (code) | Playfair Display + DM Sans + DM Mono is the right typographic system for this positioning |
| Domain choice (`vidit.vc`) | A `.vc` domain signals VC-specific intent and domain literacy; memorable and differentiated | Low | Worth acquiring if available; `.vc` is a stronger signal than `.com` for this audience |

---

## Anti-Features

Features to deliberately NOT build. These either signal the wrong thing to a VC audience, add friction, or distract from the story.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Contact form | Signals SaaS/job-seeker mindset; VC partners don't fill out forms to reach someone; creates friction for high-value relationships | Email link + LinkedIn only |
| Blog with infrequent posts | An empty or sparse blog signals started-but-abandoned; worse than no blog. VC partners notice when the last post is 18 months old | Defer entirely to V2 when there is real published writing to show |
| Skills progress bars / skill ratings | A "JavaScript: 85%" bar is a developer portfolio trope that reads as juvenile in a finance/investment context | State experience in prose or context ("built X using Y") |
| Dark/light mode toggle | Adds implementation complexity, fragment the design system, and the editorial dark aesthetic is a deliberate positioning choice — offering an escape from it dilutes it | Single dark theme, committed |
| Hard CTA ("Hire Me" / "Book a Call") | Aggressive CTA language reads as desperate to a VC audience; the relationship should feel like discovery, not sales | Let the work speak; soft signal via email in footer |
| Social proof widgets (Twitter follow count, etc.) | Vanity metrics distract from substantive credentials; if the numbers are low, they actively hurt | Omit entirely; LinkedIn link is sufficient |
| Stock photo illustrations | The editorial dark aesthetic is ruined by generic Unsplash/iStock imagery | Use real photos (Vidit's actual photos) or no imagery beyond the headshot |
| Purple gradients / "fintech blue" color scheme | This aesthetic signals consumer fintech app or generic SaaS startup, not thoughtful investment professional | Amber/gold on near-black is the committed direction |
| CMS / dynamic content in V1 | Adds deployment complexity, potential CORS/latency issues, and maintenance burden for a site whose content changes rarely | Static content in code; V2 can introduce CMS if content velocity increases |
| Multi-page site architecture | Breaks the narrative scroll; VC partners read sequentially — a single scroll keeps momentum and prevents navigation dead-ends | Single-page scroll with anchor navigation |
| Excessive micro-animations | Animation fatigue; if everything moves, nothing stands out. Aggressive animation also hurts Lighthouse scores | Scroll-triggered fade-in for sections + count-up for stats only; nothing else animated |
| "Open to opportunities" banner / badge | Signals desperation rather than selectivity; VC hiring is relationship-based and the candidate should appear sought-after, not available | Omit; the site itself is the signal of intentionality |
| LinkedIn embed / widget | Breaks visual consistency of the site; redirects attention off-site prematurely | Curate LinkedIn posts as static cards — copy the content into the site's design system |
| PDF resume download | The site IS the resume; offering a PDF as a fallback undermines the site's purpose and often leads to a worse-formatted version being circulated | No PDF; the site should be the canonical representation |
| Analytics dashboard or "X visitors this month" display | Public traffic stats are irrelevant to VC hiring decisions and signal the wrong priorities | Analytics can be added privately (Vercel Analytics) post-deployment; never surface publicly |

---

## Feature Dependencies

```
Headshot (real photo) → Hero section completeness
  Real headshot required for hero to look finished; placeholder is acceptable for build but not launch

Quantified stats (16 investments, 1.8x MOIC, ₹20Cr, 50%+ follow-on) → Hero animated stats + Fund track record section
  Both sections draw from the same data; must be consistent

Portfolio company logos (confirmed, non-stealth) → Logo grid
  Logo grid cannot go live until IP/stealth confirmation from Vidit; build with placeholder logos

LinkedIn posts (6–8 selected) → Writing & Media section
  Section cannot be completed without Vidit supplying actual posts; cards should be built with placeholder content

Photos (podcast, Orly, Nomura, Story of My Life) → Photo gallery with lightbox
  Photo gallery requires actual photo assets; lightbox component can be built before assets arrive

Investment philosophy pillars → Featured investment case study
  Philosophy pillars provide the "why we invested" framing that the Kilrr case study expands on; philosophy should come first in the scroll order

Career timeline content → Career Timeline section
  All role details (dates, firms, titles) must be confirmed accurate; especially Nomura Mumbai/London distinction

"We" framing confirmation → Barbershop Fund section + Kilrr case study
  All investment language must use "we/the fund" — attribution constraint affects copy writing throughout both sections
```

---

## MVP Recommendation

The minimum site that achieves the 90-second VC comprehension goal:

**Must ship in V1:**
1. Hero with identity + animated stats (quantified track record first, everything else second)
2. The Story / narrative section (most differentiating; lowest engineering effort)
3. Investment philosophy pillars (frames the track record)
4. Barbershop Fund track record + portfolio logo grid (credibility evidence)
5. Kilrr case study (proof of investment thinking depth)
6. Career timeline (background verification)
7. Footer with email + LinkedIn (contact path)

**Can ship in V1 without real assets (placeholder-first):**
- Headshot (circular placeholder with initials)
- Photo gallery (empty state; component built, gallery hidden until photos supplied)
- Writing & Media cards (placeholder cards with lorem ipsum)
- Logo grid (placeholder shapes; real logos inserted when confirmed)

**Defer to V2:**
- Blog / long-form writing section (defer until Vidit has published pieces)
- Password-protected deal memo pages (adds auth complexity not warranted in V1)
- CMS integration (static is faster to ship and sufficient for V1 content velocity)
- Beyond Work section (nice-to-have; deprioritize if launch timeline is tight)

**Never build:**
- Contact form
- Blog with placeholder/empty posts
- Dark/light mode toggle
- Skills bars or ratings
- Any hard CTA language

---

## Sources

**Confidence note:** All external research tools (WebSearch, WebFetch, Context7) were unavailable in this environment. The findings above are drawn from:

- Training knowledge of VC hiring norms, finance professional branding, and personal portfolio conventions (MEDIUM confidence — 6-18 month lag possible)
- Direct analysis of the PROJECT.md requirements and constraints (HIGH confidence — primary source)
- Domain knowledge of what signals competence vs. desperation to a sophisticated financial audience (MEDIUM confidence)

**Flags for validation:**
- Confirm `.vc` domain availability and pricing (may be expensive; `.com` is the fallback)
- Validate "no PDF resume" recommendation with Vidit — some VC firms still request PDF during screening
- Confirm the anti-features list against what Vidit has seen on portfolio sites he admires
- The 90-second comprehension goal should be tested with a real VC reader before launch
