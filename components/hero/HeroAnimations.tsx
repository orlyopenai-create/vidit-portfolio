'use client'

import { useRef, useState, useEffect } from 'react'
import { m, useScroll, useTransform, AnimatePresence } from 'framer-motion'

const LANDO_EASE = [0.65, 0.05, 0, 1] as const
const SPRING_EASE = [0.16, 1, 0.3, 1] as const

// Word-by-word stagger reveal — each word clips up independently
function WordReveal({
  text,
  startDelay,
  className,
  stagger = 0.07,
}: {
  text: string
  startDelay: number
  className: string
  stagger?: number
}) {
  const words = text.split(' ')
  return (
    <span className={className} style={{ display: 'block' }}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{ display: 'inline-block', overflow: 'hidden', paddingBottom: '0.15em', verticalAlign: 'bottom' }}
        >
          <m.span
            style={{ display: 'inline-block' }}
            initial={{ y: '115%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 0.65, ease: LANDO_EASE, delay: startDelay + i * stagger }}
          >
            {word}
          </m.span>
          {i < words.length - 1 && <span style={{ display: 'inline-block', width: '0.28em' }} />}
        </span>
      ))}
    </span>
  )
}

export function HeroAnimations() {
  const heroRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 })

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5, 0.9], [1, 1, 0])
  const videoY = useTransform(scrollYProgress, [0, 1], [0, -40])
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])

  // Cursor spotlight
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const onMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Attempt autoplay
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false))
    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    v.addEventListener('play', onPlay)
    v.addEventListener('pause', onPause)
    return () => {
      v.removeEventListener('play', onPlay)
      v.removeEventListener('pause', onPause)
    }
  }, [])

  function togglePlay() {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play().then(() => setIsPlaying(true))
    } else {
      v.pause()
      setIsPlaying(false)
    }
  }

  function toggleMute() {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }

  return (
    <div
      ref={heroRef}
      className="relative h-auto md:h-[140vh]"
      style={{ background: '#0D0B09' }}
    >
      {/* Ambient orb — slow drifting warm glow */}
      <m.div
        aria-hidden
        className="pointer-events-none absolute top-[20%] left-[15%] w-[600px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(196,131,42,0.07) 0%, transparent 70%)' }}
        animate={{ x: [0, 40, -25, 0], y: [0, -30, 20, 0], scale: [1, 1.08, 0.94, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Grain texture overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Cursor spotlight — warm gold radial follows mouse */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 transition-none"
        style={{
          background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(196,131,42,0.055), transparent 70%)`,
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
          <span className="font-body text-sm font-semibold tracking-[0.12em] text-accent">
            VD
          </span>
        </m.div>

        {/* Left: text content */}
        <m.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="relative z-10 flex flex-col justify-center pt-20 pb-8 md:py-0 md:flex-1"
        >
          {/* Decorative rule */}
          <m.div
            className="w-10 h-[1.5px] bg-accent mb-5"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            style={{ originX: 0 }}
            transition={{ duration: 0.5, ease: LANDO_EASE, delay: 0.1 }}
          />

          {/* Headline — word-by-word stagger */}
          <div className="mb-8">
            <h1 className="font-display font-bold text-[clamp(2.5rem,5vw,6.5rem)] leading-[1.0] tracking-[-0.02em] text-foreground">
              <WordReveal text="Kolkata. London. Delhi." startDelay={0.25} className="" />
              <WordReveal text="Operating, Finance, Investing." startDelay={0.45} className="mt-[-0.05em]" />
            </h1>

            {/* Italic sublines */}
            <div className="mt-3">
              <WordReveal
                text="All roads led back to founders."
                startDelay={0.7}
                stagger={0.05}
                className="font-display font-normal italic text-[clamp(1.6rem,3.5vw,4rem)] leading-[1.15] text-foreground/70"
              />
            </div>
          </div>

          {/* Name + location */}
          <m.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: LANDO_EASE, delay: 1.1 }}
          >
            <p className="font-body text-[0.9rem] font-medium text-accent tracking-wide">
              Vidit Dugar
            </p>
            <p className="font-body text-[0.8rem] text-foreground/40 mt-0.5">
              Kolkata, India
            </p>
          </m.div>
        </m.div>

        {/* Portrait video — right column */}
        <m.div
          initial={{ opacity: 0, scale: 0.88, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, ease: SPRING_EASE, delay: 0.5 }}
          style={{ y: videoY }}
          className="relative z-10 flex justify-center items-center pb-10 md:pb-0 md:flex-shrink-0 md:py-8"
        >
          <div
            className="relative rounded-2xl overflow-hidden bg-[#080604] w-[220px] md:w-auto md:h-[75vh]"
            style={{
              aspectRatio: '9/16',
              boxShadow: '0 48px 120px rgba(0,0,0,0.6), 0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(196,131,42,0.14)',
            }}
          >
            <video
              ref={videoRef}
              src="/intro.mp4"
              muted
              playsInline
              loop
              preload="metadata"
              className="w-full h-full object-cover"
              poster="/intro-poster.jpg"
            />

            {/* Always-visible control bar */}
            <div
              className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-3"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)' }}
            >
              {/* Play / Pause */}
              <button
                onClick={togglePlay}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/15 text-white/70 hover:text-white transition-all duration-200 cursor-pointer"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isPlaying ? (
                    <m.svg key="pause" className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"
                      initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }}
                      transition={{ duration: 0.15 }}>
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    </m.svg>
                  ) : (
                    <m.svg key="play" className="w-3 h-3 translate-x-[1px]" fill="currentColor" viewBox="0 0 24 24"
                      initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }}
                      transition={{ duration: 0.15 }}>
                      <path d="M8 5v14l11-7z" />
                    </m.svg>
                  )}
                </AnimatePresence>
              </button>

              {/* Mute / Unmute */}
              <button
                onClick={toggleMute}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/15 text-white/70 hover:text-white transition-all duration-200 cursor-pointer"
                aria-label={muted ? 'Unmute video' : 'Mute video'}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {muted ? (
                    <m.svg key="muted" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                      initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }}
                      transition={{ duration: 0.15 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </m.svg>
                  ) : (
                    <m.svg key="unmuted" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                      initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }}
                      transition={{ duration: 0.15 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M12 6v12m-6.414-3H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </m.svg>
                  )}
                </AnimatePresence>
                <span className="font-body text-[10px] tracking-wide">
                  {muted ? 'unmute' : 'mute'}
                </span>
              </button>
            </div>
          </div>
        </m.div>

        {/* Scroll hint — bottom center */}
        <m.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <m.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-foreground/25">
              <path d="M10 4v12M5 11l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </m.div>
          <m.span
            className="font-body text-[0.65rem] text-foreground/25 uppercase tracking-[0.2em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            scroll
          </m.span>
        </m.div>

      </div>
    </div>
  )
}
