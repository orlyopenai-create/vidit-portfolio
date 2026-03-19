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

      {/* Circle headshot */}
      <m.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="mb-8"
      >
        <Image
          src={headshot}
          alt="Vidit Dugar"
          width={160}
          height={160}
          className="rounded-full object-cover object-top border border-accent/25"
          style={{ width: '160px', height: '160px' }}
          priority
        />
      </m.div>

      {/* Name */}
      <m.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: 'easeOut', delay: 0.1 }}
        className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tight mb-5"
      >
        {identity.name}
      </m.h1>

      {/* Descriptor */}
      <m.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut', delay: 0.22 }}
        className="font-body text-base md:text-lg text-accent tracking-[0.18em] uppercase mb-3"
      >
        {identity.descriptor}
      </m.p>

      {/* Subline */}
      <m.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.55, ease: 'easeOut', delay: 0.32 }}
        className="font-body text-sm text-muted mb-10 max-w-sm"
      >
        {identity.subline}
      </m.p>

      {/* Accent hairline */}
      <m.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.42 }}
        style={{ originX: 0.5 }}
        className="w-10 border-t border-accent/50 mb-10"
      />

      {/* Career chapter pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-6 max-w-lg">
        {chapters.map((chapter, i) => (
          <m.span
            key={chapter.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.5 + i * 0.07 }}
            className="font-body text-[10px] uppercase tracking-[0.2em] text-muted border border-muted/25 px-3 py-1.5"
          >
            {chapter.label}
          </m.span>
        ))}
      </div>

      {/* Cities */}
      <m.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.98 }}
        className="font-body text-[10px] text-muted/50 tracking-[0.3em] uppercase"
      >
        {cities.join(' · ')}
      </m.p>

    </div>
  )
}
