'use client'

import { m } from 'framer-motion'

interface BeyondWorkAnimationsProps {
  storyOfMyLife: string
  interests: string
}

export function BeyondWorkAnimations({ storyOfMyLife, interests }: BeyondWorkAnimationsProps) {
  return (
    <div>
      <m.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12">Beyond Work</h2>
      </m.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Story of My Life */}
        <m.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
        >
          <h3 className="font-display text-xl font-bold text-foreground mb-4">Story of My Life</h3>
          <p className="font-body text-sm text-foreground/70 leading-relaxed">{storyOfMyLife}</p>
        </m.div>

        {/* Interests */}
        <m.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
        >
          <h3 className="font-display text-xl font-bold text-foreground mb-4">Interests</h3>
          <p className="font-body text-sm text-foreground/70 leading-relaxed">{interests}</p>
        </m.div>
      </div>
    </div>
  )
}
