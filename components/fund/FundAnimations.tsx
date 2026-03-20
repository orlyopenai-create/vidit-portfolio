'use client'

import { m } from 'framer-motion'
import { StatCountUp } from '@/components/hero/StatCountUp'
import { BarberPole } from '@/components/ui/BarberPole'
import type { Stat } from '@/lib/types'

const founderTraits = [
  'Deep domain expertise — they know this better than anyone in the room',
  'Irrational conviction — couldn\'t imagine building anything else',
  'Singular focus — this is the only thing on their plate',
  'Would run the business without the funding',
]

const companyTraits = [
  'Brand as a moat, not a marketing line item',
  'Content-led growth — organic community signals something paid spend can\'t fake',
]

interface FundAnimationsProps {
  name: string
  subtitle: string
  stats: Stat[]
}

export function FundAnimations({ name, subtitle, stats }: FundAnimationsProps) {
  return (
    <div>
      {/* Section header */}
      <m.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="flex items-center gap-4 mb-2">
          <BarberPole className="w-3 h-10" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">{name}</h2>
        </div>
        <m.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1], delay: 0.25 }}
          style={{ originX: 0 }}
          className="h-px bg-accent/40 w-10 mb-3"
        />
        <p className="font-body text-sm text-foreground/70 mb-12">{subtitle}</p>
      </m.div>

      {/* Stats strip */}
      <m.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat) => (
            <StatCountUp key={stat.label} stat={stat} />
          ))}
        </div>
      </m.div>

      {/* What I Look For */}
      <m.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
        className="mb-16 border-t border-muted/20 pt-12"
      >
        <h3 className="font-display text-xl font-bold text-foreground mb-3">What I Look For</h3>
        <p className="font-body text-sm text-foreground/65 leading-relaxed mb-8 max-w-2xl">
          Three years at Bombay Shaving Company gave me a front-row seat to what separates
          companies that build something lasting from those that don't. I've carried those
          observations into every investment conversation since.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-accent/60 mb-4">
              In Founders
            </p>
            <div className="space-y-3">
              {founderTraits.map((trait) => (
                <div key={trait} className="flex items-start gap-3">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-accent/40 shrink-0" />
                  <p className="font-body text-sm text-foreground/70 leading-snug">{trait}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-accent/60 mb-4">
              In Companies
            </p>
            <div className="space-y-3">
              {companyTraits.map((trait) => (
                <div key={trait} className="flex items-start gap-3">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-accent/40 shrink-0" />
                  <p className="font-body text-sm text-foreground/70 leading-snug">{trait}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </m.div>
    </div>
  )
}
