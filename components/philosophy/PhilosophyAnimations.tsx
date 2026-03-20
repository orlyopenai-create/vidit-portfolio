'use client'

import { m } from 'framer-motion'
import type { PhilosophyPillar } from '@/lib/types'

export function PhilosophyAnimations({ pillars }: { pillars: PhilosophyPillar[] }) {
  return (
    <div>
      <m.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-16">
          Investment Philosophy
        </h2>
      </m.div>

      <div className="space-y-16">
        {pillars.map((pillar, i) => (
          <m.div
            key={pillar.number}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.1 }}
          >
            <span className="font-mono text-4xl text-accent/30 block mb-2">
              {pillar.number}
            </span>
            <h3 className="font-display text-xl font-bold text-foreground mb-4">
              {pillar.title}
            </h3>
            <p className="font-body text-base text-foreground/75 leading-relaxed whitespace-pre-line">
              {pillar.body}
            </p>
          </m.div>
        ))}
      </div>
    </div>
  )
}
