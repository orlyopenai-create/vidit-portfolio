'use client'
import { m } from 'framer-motion'

interface KilrrAnimationsProps {
  title: string
  paragraphs: string[]
}

export function KilrrAnimations({ title, paragraphs }: KilrrAnimationsProps) {
  return (
    <div>
      <m.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <p className="font-body text-xs uppercase tracking-[0.15em] text-accent mb-4">Investment Story</p>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">{title}</h2>
      </m.div>

      {paragraphs.map((p, i) => (
        <m.p
          key={i}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.06 }}
          className="font-body text-base text-muted leading-relaxed mb-6"
        >
          {p}
        </m.p>
      ))}
    </div>
  )
}
