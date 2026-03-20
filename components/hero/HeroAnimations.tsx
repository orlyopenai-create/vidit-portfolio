'use client'

import { useRef } from 'react'
import { m, useScroll, useTransform } from 'framer-motion'
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
  const heroRef = useRef<HTMLDivElement>(null)

  // Track scroll progress within this section (0 = top of section at viewport top, 1 = bottom)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  // Background drifts upward slowly — creates depth separation
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -40])

  // Content holds still until 45% through, then rises + fades out by 85%
  const contentY       = useTransform(scrollYProgress, [0, 0.85], [0, -80])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45, 0.85], [1, 1, 0])

  // Scroll hint disappears as soon as user starts scrolling
  const hintOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0])

  // Split "Investor · Operator · Builder" into individual words
  const descriptorWords = identity.descriptor.split(' · ')

  return (
    // Outer: 180vh on desktop creates scroll space for the cinematic exit
    // Mobile stays min-h-screen (single viewport, no extra scroll space)
    <div ref={heroRef} className="relative min-h-screen md:h-[180vh]">

      {/* Inner: sticky on desktop — stays pinned at top while user scrolls through 180vh */}
      <div className="md:sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-6 pb-16 pt-20 text-center">

        {/* Parallax background layer — moves at 0.25x scroll speed */}
        <m.div
          style={{ y: bgY }}
          className="absolute inset-0 pointer-events-none"
          aria-hidden
        />

        {/* Content layer — fades and rises as user scrolls away from hero */}
        <m.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="relative z-10 flex flex-col items-center"
        >

          {/* Headshot */}
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

          {/* Name */}
          <m.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut', delay: 0.1 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tight mb-4"
          >
            {identity.name}
          </m.h1>

          {/* Descriptor — kinetic word-by-word staggered reveal */}
          <p className="font-body text-lg md:text-xl text-accent mb-3">
            {descriptorWords.map((word, i) => (
              <span key={word} className="inline">
                <m.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: 0.22 + i * 0.16 }}
                  className="inline-block"
                >
                  {word}
                </m.span>
                {i < descriptorWords.length - 1 && (
                  <m.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ duration: 0.3, delay: 0.32 + i * 0.16 }}
                    className="inline-block mx-2"
                  >
                    ·
                  </m.span>
                )}
              </span>
            ))}
          </p>

          {/* Subline */}
          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.72 }}
            className="font-body text-sm text-foreground/70 mb-10 max-w-md leading-relaxed"
          >
            {identity.subline}
          </m.p>

          {/* Accent hairline */}
          <m.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.8 }}
            style={{ originX: 0.5 }}
            className="w-10 border-t border-accent/40 mb-10"
          />

          {/* Career chapter pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-6 max-w-lg">
            {chapters.map((chapter, i) => (
              <m.span
                key={chapter.label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: 0.85 + i * 0.07 }}
                className="font-body text-[11px] uppercase tracking-[0.15em] text-foreground/50 border border-foreground/20 px-3 py-1.5 rounded-sm"
              >
                {chapter.label}
              </m.span>
            ))}
          </div>

          {/* Cities — letter-spacing expands from tight to wide on entrance */}
          <m.p
            initial={{ opacity: 0, letterSpacing: '0.08em' }}
            animate={{ opacity: 1, letterSpacing: '0.25em' }}
            transition={{ duration: 1.1, ease: 'easeOut', delay: 1.2 }}
            className="font-body text-[11px] text-foreground/40 uppercase"
          >
            {cities.join(' · ')}
          </m.p>

        </m.div>

        {/* Scroll hint — fades immediately when user scrolls */}
        <m.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="font-body text-[10px] text-foreground/30 uppercase tracking-widest">
            Scroll
          </span>
          <m.div
            className="w-px h-8 bg-foreground/20"
            animate={{ scaleY: [1, 1.3, 1], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ originY: 'top' }}
          />
        </m.div>

      </div>
    </div>
  )
}
