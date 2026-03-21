'use client'

import { useRef, useState, useEffect } from 'react'
import { m, useScroll, useTransform, AnimatePresence } from 'framer-motion'

const LANDO_EASE = [0.65, 0.05, 0, 1] as const

export function HeroAnimations() {
  const heroRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)
  const [started, setStarted] = useState(false)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5, 0.9], [1, 1, 0])
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onPlay = () => setStarted(true)
    v.addEventListener('play', onPlay)
    return () => v.removeEventListener('play', onPlay)
  }, [])

  function unmute() {
    if (!videoRef.current) return
    videoRef.current.muted = false
    setMuted(false)
  }

  function toggleMute() {
    if (!videoRef.current) return
    videoRef.current.muted = !videoRef.current.muted
    setMuted(videoRef.current.muted)
  }

  return (
    <div
      ref={heroRef}
      className="relative h-auto md:h-[140vh]"
      style={{
        background: 'radial-gradient(ellipse 85% 90% at 28% 55%, #1A1410 0%, #0D0B09 65%)',
      }}
    >
      {/* Grain texture overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      <div className="md:sticky top-0 md:h-screen flex flex-col md:flex-row md:items-center overflow-hidden px-6 md:px-12 md:gap-12">

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

        {/* Left: text content */}
        <m.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="relative z-10 flex flex-col justify-center pt-20 pb-8 md:py-0 md:flex-1"
        >
          {/* Headline lines */}
          <div className="mb-8">
            {/* Decorative rule */}
            <m.div
              className="w-10 h-[1.5px] bg-accent mb-5"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              style={{ originX: 0 }}
              transition={{ duration: 0.5, ease: LANDO_EASE, delay: 0.15 }}
            />

            {/* Line 1 */}
            <div className="overflow-hidden">
              <m.h1
                className="font-display font-bold text-[clamp(2.5rem,5vw,6.5rem)] leading-[0.95] tracking-[-0.02em] text-foreground"
                initial={{ y: '105%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.75, ease: LANDO_EASE, delay: 0.3 }}
              >
                Kolkata. London. Delhi.
              </m.h1>
            </div>

            {/* Line 2 */}
            <div className="overflow-hidden">
              <m.h1
                className="font-display font-bold text-[clamp(2.5rem,5vw,6.5rem)] leading-[0.95] tracking-[-0.02em] text-foreground"
                initial={{ y: '105%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.75, ease: LANDO_EASE, delay: 0.45 }}
              >
                Operating, Finance, Investing.
              </m.h1>
            </div>

            {/* Lines 3–4 italic, smaller */}
            <div className="overflow-hidden mt-3">
              <m.div
                initial={{ y: '105%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.75, ease: LANDO_EASE, delay: 0.65 }}
              >
                <p className="font-display font-normal italic text-[clamp(1.6rem,3.5vw,4rem)] leading-[1.1] text-foreground">
                  All roads
                </p>
                <p className="font-display font-normal italic text-[clamp(1.6rem,3.5vw,4rem)] leading-[1.1] text-foreground">
                  led back to founders.
                </p>
              </m.div>
            </div>
          </div>

          {/* Name + location */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.0 }}
          >
            <p className="font-body text-[0.9rem] font-medium text-[#A6701A] tracking-wide">
              Vidit Dugar
            </p>
            <p className="font-body text-[0.8rem] text-foreground/50 mt-0.5">
              Kolkata, India
            </p>
          </m.div>
        </m.div>

        {/* Portrait video — right column on desktop, below text on mobile */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: LANDO_EASE, delay: 0.7 }}
          className="relative z-10 flex justify-center items-center pb-10 md:pb-0 md:flex-shrink-0 md:py-8"
        >
          <div
            className="relative rounded-2xl overflow-hidden bg-[#0F0C09] w-[220px] md:w-auto md:h-[75vh]"
            style={{
              aspectRatio: '9/16',
              boxShadow: '0 48px 120px rgba(28, 20, 16, 0.22), 0 12px 40px rgba(28, 20, 16, 0.14), 0 0 0 1px rgba(166, 112, 26, 0.12)',
            }}
          >
            <video
              ref={videoRef}
              src="/intro.mp4"
              autoPlay
              muted
              playsInline
              loop
              preload="auto"
              className="w-full h-full object-cover"
              poster="/intro-poster.jpg"
            />

            {/* Unmute prompt */}
            <AnimatePresence>
              {muted && started && (
                <m.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  onClick={unmute}
                  className="absolute inset-0 flex flex-col items-center justify-end pb-8 cursor-pointer"
                  aria-label="Unmute video"
                >
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(15,12,9,0.6) 0%, transparent 50%)' }}
                  />
                  <div className="relative flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm">
                    <svg className="w-3.5 h-3.5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                    <span className="font-body text-xs text-white/80 tracking-wide">Tap to unmute</span>
                  </div>
                </m.button>
              )}
            </AnimatePresence>

            {/* Mute toggle */}
            {!muted && (
              <button
                onClick={toggleMute}
                className="absolute bottom-3 right-3 flex items-center justify-center w-11 h-11 rounded-full bg-black/40 backdrop-blur-sm border border-white/15 text-white/60 hover:text-white/90 transition-colors"
                aria-label="Mute video"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M12 6v12m-6.414-3H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              </button>
            )}
          </div>
        </m.div>

        {/* Scroll hint — bottom right */}
        <m.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <m.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
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
