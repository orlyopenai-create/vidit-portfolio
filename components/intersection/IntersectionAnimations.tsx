'use client'

import { m } from 'framer-motion'

const domains = [
  {
    label: 'Investing',
    points: ['5 yrs Investment Banking', 'Barbershop Fund — 25 cos', '1.8x MOIC'],
    offset: { x: -30, y: 0 },
  },
  {
    label: 'Operating',
    points: ['Chief of Staff, BSC', 'Head of Business, Orly', 'Brands. Teams. P&L.'],
    offset: { x: 0, y: 20 },
  },
  {
    label: 'Content',
    points: ['Built The Bridge IP', 'Barbershop w/ Shantanu', 'The Orly Times'],
    offset: { x: 30, y: 0 },
  },
]

export function IntersectionAnimations() {
  return (
    <div>
      <m.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
          The Intersection
        </h2>
        <m.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
          style={{ originX: 0 }}
          className="h-px bg-accent/40 w-10 mb-4"
        />
        <p className="font-body text-sm text-foreground/60 mb-14">
          Operator. Investor. Storyteller. Three disciplines, one lens.
        </p>
      </m.div>

      {/* Venn — desktop: overlapping circles, mobile: stacked cards */}
      <div className="hidden md:flex items-center justify-center mb-12">
        <div className="relative flex items-center">
          {domains.map((domain, i) => (
            <m.div
              key={domain.label}
              initial={{ opacity: 0, x: domain.offset.x, y: domain.offset.y }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 + i * 0.12 }}
              className="relative flex flex-col items-center justify-center w-52 h-52 rounded-full"
              style={{
                border: '1.5px solid rgba(166,112,26,0.35)',
                marginLeft: i > 0 ? '-52px' : '0',
                zIndex: i === 1 ? 2 : 1,
                background: i === 1
                  ? 'rgba(166,112,26,0.04)'
                  : 'rgba(245,239,230,0.6)',
              }}
            >
              <span className="font-display text-base font-bold text-foreground mb-3 text-center px-6">
                {domain.label}
              </span>
              <div className="space-y-1 px-6 text-center">
                {domain.points.map((pt) => (
                  <p key={pt} className="font-body text-[10px] text-foreground/50 leading-snug">
                    {pt}
                  </p>
                ))}
              </div>
            </m.div>
          ))}
        </div>
      </div>

      {/* Mobile: stacked cards */}
      <div className="flex flex-col gap-4 md:hidden mb-12">
        {domains.map((domain, i) => (
          <m.div
            key={domain.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.1 }}
            className="bg-surface rounded-xl p-5"
          >
            <p className="font-display text-base font-bold text-foreground mb-2">{domain.label}</p>
            <div className="space-y-1">
              {domain.points.map((pt) => (
                <p key={pt} className="font-body text-xs text-foreground/60">{pt}</p>
              ))}
            </div>
          </m.div>
        ))}
      </div>

      {/* Payoff line */}
      <m.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
        className="max-w-xl mx-auto text-center"
      >
        <p className="font-mono text-xs text-accent/60 uppercase tracking-widest mb-3">
          = Operator-Investor
        </p>
        <p className="font-body text-sm text-foreground/65 leading-relaxed">
          Most investors have one of these. Having all three means walking into every conversation
          having been on both sides of the table — as the person who built, and as the person who backed.
        </p>
      </m.div>
    </div>
  )
}
