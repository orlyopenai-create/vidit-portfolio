'use client'

import { useRef, useState, useEffect } from 'react'
import { m } from 'framer-motion'
import { LinkedInCard } from '@/components/media/LinkedInCard'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { ClipReveal } from '@/components/ui/ClipReveal'
import type { LinkedInPost } from '@/lib/types'

const LANDO_EASE = [0.65, 0.05, 0, 1] as const

export function MediaAnimations({ posts }: { posts: LinkedInPost[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir === 'left' ? -360 : 360, behavior: 'smooth' })
  }

  // A — Auto-advance every 4s, pause on hover/touch
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      const el = scrollRef.current
      if (!el) return
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
        el.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        el.scrollBy({ left: 320, behavior: 'smooth' })
      }
    }, 4000)
    return () => clearInterval(id)
  }, [paused])

  return (
    <div>
      <div className="flex items-end justify-between mb-10">
        <div>
          <SectionLabel text="WRITING" />
          <div className="mt-4">
            <ClipReveal>
              <h2 className="font-display font-normal italic text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] text-foreground">
                Thinking out loud.
              </h2>
            </ClipReveal>
          </div>
          <m.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: LANDO_EASE, delay: 0.2 }}
            className="font-body text-[1.05rem] text-foreground/55 mt-3"
          >
            Opinions on brands, capital, and building.
          </m.p>
        </div>

        {/* Arrow nav */}
        <div className="flex gap-2 pb-1 shrink-0 ml-6">
          <button
            onClick={() => scroll('left')}
            aria-label="Previous posts"
            className="w-9 h-9 flex items-center justify-center border border-foreground/20 text-foreground/50 hover:text-foreground hover:border-foreground/40 transition-colors rounded-sm cursor-pointer"
          >
            ←
          </button>
          <button
            onClick={() => scroll('right')}
            aria-label="Next posts"
            className="w-9 h-9 flex items-center justify-center border border-foreground/20 text-foreground/50 hover:text-foreground hover:border-foreground/40 transition-colors rounded-sm cursor-pointer"
          >
            →
          </button>
        </div>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
        >
          {/* C — Staggered entrance per card */}
          {posts.map((post, i) => (
            <m.div
              key={post.id}
              className="flex-none w-80 snap-start"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px -80px 0px 0px' }}
              transition={{ duration: 0.55, ease: LANDO_EASE, delay: i * 0.07 }}
            >
              <LinkedInCard post={post} />
            </m.div>
          ))}
        </div>

        {/* Right fade gradient */}
        <div
          className="absolute top-0 right-0 h-full w-24 pointer-events-none"
          style={{ background: 'linear-gradient(to right, transparent, #0D0B09)' }}
        />
      </div>
    </div>
  )
}
