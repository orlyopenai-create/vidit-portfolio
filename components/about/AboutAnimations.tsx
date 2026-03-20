'use client'

import { m } from 'framer-motion'

interface AboutAnimationsProps {
  prose: string
  pullQuote: string
}

export function AboutAnimations({ prose, pullQuote }: AboutAnimationsProps) {
  const paragraphs = prose.split('\n\n')

  return (
    <div>
      <m.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-10">
          The Story
        </h2>
      </m.div>

      {paragraphs.map((p, i) => (
        <m.p
          key={i}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.08 }}
          className="font-body text-base text-foreground/75 leading-relaxed mb-6"
        >
          {p}
        </m.p>
      ))}

      {/* Pull quote — NARR-02 */}
      <m.blockquote
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        className="my-12 pl-6 border-l-2 border-accent"
      >
        <p className="font-display text-2xl md:text-3xl italic text-foreground leading-snug">
          &ldquo;{pullQuote}&rdquo;
        </p>
      </m.blockquote>
    </div>
  )
}
