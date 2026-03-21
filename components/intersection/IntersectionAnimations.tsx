'use client'

import { m } from 'framer-motion'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { ClipReveal } from '@/components/ui/ClipReveal'

const LANDO_EASE = [0.65, 0.05, 0, 1] as const

const pillars = [
  {
    num: '01',
    label: 'Finance',
    points: [
      'Nomura London — EMEA M&A, front office, rated 5/5',
      'Sell-side operating model for Vrumona; process management for Hornsea 2',
      '1 of 3 analysts from Nomura India selected for London front office transfer',
    ],
  },
  {
    num: '02',
    label: 'Operations',
    points: [
      'Chief of Staff at BSC — spanned strategy, venture & content',
      'P&L ownership, cross-functional teams, 0→1 brands',
      'Head of Business at Orly — family brand since 1989',
    ],
  },
  {
    num: '03',
    label: 'Content',
    points: [
      'Headed The Barbershop with Shantanu — grew to 1M+ followers across platforms',
      'Created Talk Kurta to Me for Orly — Instagram series on the craft of kurtas',
      'Co-founded Story of My Life — a live storytelling platform, 5 editions, 500+ attendees',
    ],
  },
]

export function IntersectionAnimations() {
  return (
    <div>
      <SectionLabel text="THE INTERSECTION" />

      <div className="mb-10">
        <ClipReveal>
          <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] font-normal leading-[1.1] tracking-[-0.01em] text-foreground">
            Three worlds. One lens.
          </h2>
        </ClipReveal>
      </div>

      {/* Three pillar cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {pillars.map((pillar, i) => (
          <m.div
            key={pillar.label}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: LANDO_EASE, delay: i * 0.12 }}
            className="relative overflow-hidden rounded-2xl bg-surface border border-foreground/8 p-7"
          >
            {/* Decorative number */}
            <span
              className="absolute top-3 right-4 font-display font-bold text-[5rem] leading-none select-none pointer-events-none"
              style={{ color: 'rgba(166,112,26,0.06)' }}
            >
              {pillar.num}
            </span>

            {/* Label */}
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-accent mb-5">
              {pillar.label}
            </p>

            {/* Points */}
            <div className="space-y-3">
              {pillar.points.map((pt) => (
                <div key={pt} className="flex items-start gap-2.5">
                  <span className="w-1 h-1 rounded-full bg-accent/40 mt-[0.45rem] shrink-0" />
                  <p className="font-body text-[0.9rem] text-foreground/70 leading-snug">{pt}</p>
                </div>
              ))}
            </div>
          </m.div>
        ))}
      </div>

      {/* Convergence badge */}
      <m.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: LANDO_EASE, delay: 0.4 }}
        className="flex flex-col items-center gap-4 mb-10"
      >
        {/* Connecting lines on desktop */}
        <div className="hidden md:flex w-full items-center justify-center gap-0 relative h-8">
          <div className="absolute inset-x-[17%] top-0 h-px bg-foreground/10" />
          <div className="absolute left-[17%] top-0 w-px h-full bg-foreground/10" />
          <div className="absolute right-[17%] top-0 w-px h-full bg-foreground/10" />
          <div className="absolute left-1/2 top-0 w-px h-full bg-foreground/10 -translate-x-px" />
        </div>

        <div className="inline-flex items-center gap-3 px-6 py-3 border border-accent/30 rounded-full bg-background">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span className="font-subheading italic text-[1.15rem] text-accent tracking-wide">Operator-Investor</span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
        </div>
      </m.div>

      {/* Payoff */}
      <m.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: LANDO_EASE, delay: 0.5 }}
        className="font-body text-[1rem] text-foreground/60 leading-relaxed max-w-2xl"
      >
        Most people have one of these worlds. Having all three means walking into every room having been on both sides of the table — as the person who built, and as the person who backed.
      </m.p>
    </div>
  )
}
