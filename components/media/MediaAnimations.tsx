'use client'

import { useRef } from 'react'
import { m } from 'framer-motion'
import { LinkedInCard } from '@/components/media/LinkedInCard'
import type { LinkedInPost } from '@/lib/types'

export function MediaAnimations({ posts }: { posts: LinkedInPost[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir === 'left' ? -340 : 340, behavior: 'smooth' })
  }

  return (
    <div>
      <m.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex items-end justify-between mb-10"
      >
        <div>
          <h3 className="font-body text-xs uppercase tracking-[0.15em] text-foreground/60 mb-3">
            Thoughts &amp; Writing
          </h3>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Writing
          </h2>
        </div>
        <div className="flex gap-2 pb-1">
          <button
            onClick={() => scroll('left')}
            aria-label="Previous posts"
            className="w-9 h-9 flex items-center justify-center border border-foreground/20 text-foreground/60 hover:text-foreground hover:border-foreground/40 transition-colors"
          >
            ←
          </button>
          <button
            onClick={() => scroll('right')}
            aria-label="Next posts"
            className="w-9 h-9 flex items-center justify-center border border-foreground/20 text-foreground/60 hover:text-foreground hover:border-foreground/40 transition-colors"
          >
            →
          </button>
        </div>
      </m.div>

      <m.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
      >
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex-none w-72 snap-start"
            >
              <LinkedInCard post={post} />
            </div>
          ))}
        </div>
      </m.div>
    </div>
  )
}
