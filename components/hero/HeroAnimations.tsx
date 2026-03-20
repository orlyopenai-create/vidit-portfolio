'use client'

import { m } from 'framer-motion'
import Image from 'next/image'

interface Chapter {
  label: string
}

interface HeroAnimationsProps {
  identity: { name: string; descriptor: string; subline: string }
  headshot: string
  chapters: Chapter[]
  cities: string[]
}

export function HeroAnimations({ identity, headshot, chapters, cities }: HeroAnimationsProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 pb-16 pt-20 text-center">

      {/* Circle headshot — fill inside relative wrapper for reliable crop */}
      <m.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="mb-8 relative w-40 h-40 rounded-full overflow-hidden border-2 border-surface flex-shrink-0 shadow-sm"
      >
        <Image
          src={headshot}
          alt="Vidit Dugar"
          fill
          className="object-cover object-[50%_12%]"
          priority
        />
      </m.div>

      {/* Name — title case, more personal */}
      <m.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: 'easeOut', delay: 0.1 }}
        className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tight mb-4"
      >
        {identity.name}
      </m.h1>

      {/* Descriptor — warm gold, no uppercase drill-sergeant vibe */}
      <m.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut', delay: 0.22 }}
        className="font-body text-lg md:text-xl text-accent mb-3"
      >
        {identity.descriptor}
      </m.p>

      {/* Subline */}
      <m.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.55, ease: 'easeOut', delay: 0.32 }}
        className="font-body text-sm text-foreground/70 mb-10 max-w-md leading-relaxed"
      >
        {identity.subline}
      </m.p>

      {/* Accent hairline */}
      <m.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.42 }}
        style={{ originX: 0.5 }}
        className="w-10 border-t border-accent/40 mb-10"
      />

      {/* Career chapter pills — rounded, slightly warmer */}
      <div className="flex flex-wrap justify-center gap-2 mb-6 max-w-lg">
        {chapters.map((chapter, i) => (
          <m.span
            key={chapter.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.5 + i * 0.07 }}
            className="font-body text-[11px] uppercase tracking-[0.15em] text-foreground/50 border border-foreground/20 px-3 py-1.5 rounded-sm"
          >
            {chapter.label}
          </m.span>
        ))}
      </div>

      {/* Cities */}
      <m.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.9 }}
        className="font-body text-[11px] text-foreground/40 tracking-[0.25em] uppercase"
      >
        {cities.join(' · ')}
      </m.p>

    </div>
  )
}
