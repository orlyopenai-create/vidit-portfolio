'use client'

import { m } from 'framer-motion'
import type { BridgeEpisode } from '@/lib/data/barbershop'

export function BridgeAnimations({ episodes }: { episodes: BridgeEpisode[] }) {
  return (
    <div>
      <m.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <p className="font-body text-xs uppercase tracking-[0.15em] text-foreground/50 mb-3">
          The Barbershop with Shantanu
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
          The Bridge
        </h2>
        <p className="font-body text-sm text-foreground/60 max-w-xl mb-12 leading-relaxed">
          An IP I launched on India's leading entrepreneurship podcast — 2 CEOs vs 2 Gen Zs,
          debating the questions Indian professionals are actually asking. I managed the show,
          booked the guests, and appeared on it.
        </p>
      </m.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {episodes.map((ep, i) => (
          <m.a
            key={ep.episode}
            href={ep.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.1 }}
            whileHover={{ y: -2 }}
            className="group block bg-surface rounded-xl overflow-hidden"
          >
            {/* Thumbnail */}
            <div className="relative w-full aspect-video overflow-hidden">
              <img
                src={ep.thumbnail}
                alt={ep.title}
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
              />
              {/* Play overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300">
                <div className="w-10 h-10 rounded-full bg-background/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-4 h-4 text-foreground ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-[10px] text-accent/70 uppercase tracking-widest">
                  {ep.episode}
                </span>
                <span className="font-mono text-[10px] text-foreground/25">·</span>
                <span className="font-mono text-[10px] text-foreground/40 uppercase tracking-widest">
                  {ep.topic}
                </span>
              </div>
              <p className="font-body text-sm font-medium text-foreground leading-snug line-clamp-2">
                {ep.title}
              </p>
            </div>
          </m.a>
        ))}
      </div>
    </div>
  )
}
