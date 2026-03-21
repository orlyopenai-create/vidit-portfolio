'use client'

import { useRef, useState, useEffect } from 'react'
import { m, AnimatePresence } from 'framer-motion'

const LANDO_EASE = [0.65, 0.05, 0, 1] as const

export function VideoIntroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [muted, setMuted] = useState(true)
  const [loaded, setLoaded] = useState(false)
  const [started, setStarted] = useState(false)

  // Load video only when section scrolls into view
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && videoRef.current && !loaded) {
          videoRef.current.src = '/intro.mp4'
          videoRef.current.load()
          setLoaded(true)
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [loaded])

  // Mark as started once video begins playing
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
    <section
      ref={containerRef}
      id="story"
      style={{ backgroundColor: '#1C1410' }}
      className="py-16 md:py-24 px-6"
    >
      <div className="max-w-3xl mx-auto">

        {/* Label */}
        <m.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: LANDO_EASE }}
          className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[#A6701A] mb-6"
        >
          In my own words
        </m.p>

        {/* Video container */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: LANDO_EASE, delay: 0.1 }}
          className="relative rounded-2xl overflow-hidden bg-[#0F0C09]"
          style={{ aspectRatio: '16/9' }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            preload="none"
            className="w-full h-full object-cover"
            poster="/intro-poster.jpg"
          />

          {/* Unmute prompt — shown while muted, disappears after unmuting */}
          <AnimatePresence>
            {muted && started && (
              <m.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={unmute}
                className="absolute inset-0 flex flex-col items-center justify-end pb-10 cursor-pointer"
                aria-label="Unmute video"
              >
                {/* Subtle gradient so button text is readable */}
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(15,12,9,0.6) 0%, transparent 50%)' }}
                />
                <div className="relative flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm">
                  <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                  </svg>
                  <span className="font-body text-sm text-white/80 tracking-wide">Tap to unmute</span>
                </div>
              </m.button>
            )}
          </AnimatePresence>

          {/* Mute toggle — shown after unmuting, small, bottom-right */}
          {!muted && (
            <button
              onClick={toggleMute}
              className="absolute bottom-4 right-4 flex items-center justify-center w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/15 text-white/60 hover:text-white/90 transition-colors"
              aria-label="Mute video"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M12 6v12m-6.414-3H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            </button>
          )}
        </m.div>

        {/* Bridge line */}
        <m.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: LANDO_EASE, delay: 0.3 }}
          className="font-subheading italic text-[1.15rem] text-[#F0E8DC]/45 mt-6 text-center leading-relaxed"
        >
          Scroll to see the work.
        </m.p>

      </div>
    </section>
  )
}
