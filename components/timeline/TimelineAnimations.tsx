'use client'
import { m } from 'framer-motion'
import type { TimelineEntry } from '@/lib/types'

export function TimelineAnimations({ entries }: { entries: TimelineEntry[] }) {
  return (
    <div>
      <m.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12">Career</h2>
      </m.div>

      <div className="space-y-0">
        {entries.map((entry, i) => (
          <m.div
            key={entry.organization}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.08 }}
            className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-2 md:gap-8 py-6 border-b border-muted/15"
          >
            <div className="font-mono text-xs text-muted md:text-right pt-1">
              {entry.period}
            </div>
            <div>
              <p className="font-display text-lg font-bold text-foreground">{entry.role}</p>
              <p className="font-body text-sm text-accent mb-2">{entry.organization}</p>
              <p className="font-body text-sm text-muted leading-relaxed whitespace-pre-line">{entry.description}</p>
            </div>
          </m.div>
        ))}
      </div>
    </div>
  )
}
