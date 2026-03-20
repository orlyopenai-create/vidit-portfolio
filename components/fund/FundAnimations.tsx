'use client'

import { m } from 'framer-motion'
import { StatCountUp } from '@/components/hero/StatCountUp'
import type { Stat } from '@/lib/types'

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
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">{name}</h2>
        <p className="font-body text-sm text-foreground/70 mb-12">{subtitle}</p>
      </m.div>

      {/* Fund stats strip */}
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
    </div>
  )
}
