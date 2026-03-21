'use client'

import { useRef } from 'react'
import { m, useScroll, useTransform } from 'framer-motion'

const LANDO_EASE = [0.65, 0.05, 0, 1] as const

export function HeroAnimations() {
  const heroRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5, 0.9], [1, 1, 0])
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])

  return (
    <div ref={heroRef} className="relative min-h-screen md:h-[140vh]">
      <div className="md:sticky top-0 h-screen flex flex-col overflow-hidden px-6 md:px-12">

        {/* VD Monogram — top left */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="absolute top-8 left-8 md:top-10 md:left-12 z-20"
        >
          <span className="font-body text-sm font-semibold tracking-[0.12em] text-[#A6701A]">
            VD
          </span>
        </m.div>

        {/* Main content */}
        <m.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="relative z-10 flex flex-col justify-center h-full pt-16 pb-20"
        >
          {/* Headline lines */}
          <div className="mb-8">
            {/* Line 1 */}
            <div className="overflow-hidden">
              <m.h1
                className="font-display font-bold text-[clamp(3rem,7vw,8rem)] leading-[0.95] tracking-[-0.02em] text-foreground"
                initial={{ y: '105%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.75, ease: LANDO_EASE, delay: 0.3 }}
              >
                Third-generation builder.
              </m.h1>
            </div>

            {/* Line 2 */}
            <div className="overflow-hidden">
              <m.h1
                className="font-display font-bold text-[clamp(3rem,7vw,8rem)] leading-[0.95] tracking-[-0.02em] text-foreground"
                initial={{ y: '105%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.75, ease: LANDO_EASE, delay: 0.45 }}
              >
                First-generation investor.
              </m.h1>
            </div>

            {/* Lines 3-4 italic, smaller */}
            <div className="overflow-hidden mt-3">
              <m.div
                initial={{ y: '105%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.75, ease: LANDO_EASE, delay: 0.65 }}
              >
                <p className="font-display font-normal italic text-[clamp(2rem,5vw,5.5rem)] leading-[1.1] text-foreground">
                  The thread connecting them
                </p>
                <p className="font-display font-normal italic text-[clamp(2rem,5vw,5.5rem)] leading-[1.1] text-foreground">
                  has always been story.
                </p>
              </m.div>
            </div>
          </div>

          {/* Name + location — bottom left */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.0 }}
            className="absolute bottom-16 left-6 md:left-12"
          >
            <p className="font-body text-[0.9rem] font-medium text-[#A6701A] tracking-wide">
              Vidit Dugar
            </p>
            <p className="font-body text-[0.8rem] text-foreground/50 mt-0.5">
              Kolkata, India
            </p>
          </m.div>
        </m.div>

        {/* Scroll hint — bottom right */}
        <m.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-14 right-8 md:right-12 flex flex-col items-center gap-2 pointer-events-none"
        >
          <m.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              animationPlayState: 'var(--motion-play-state, running)',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-foreground/30">
              <path d="M10 4v12M5 11l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </m.div>
          <m.span
            className="font-body text-[0.65rem] text-foreground/30 uppercase tracking-[0.2em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            scroll
          </m.span>
        </m.div>

      </div>
    </div>
  )
}
