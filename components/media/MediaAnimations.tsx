'use client'
import { m } from 'framer-motion'
import { LinkedInCard } from '@/components/media/LinkedInCard'
import type { LinkedInPost } from '@/lib/types'

export function MediaAnimations({ posts }: { posts: LinkedInPost[] }) {
  return (
    <div>
      <m.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h3 className="font-body text-xs uppercase tracking-[0.15em] text-accent mb-8">
          Thoughts &amp; Writing
        </h3>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
          Writing &amp; Media
        </h2>
      </m.div>

      <m.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
      >
        <div className="columns-1 md:columns-2 gap-6">
          {posts.length === 0 ? (
            <>
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="break-inside-avoid mb-6 bg-surface border border-foreground/10 border-dashed p-6 flex flex-col gap-4"
                >
                  <p className="font-body text-sm text-muted italic">
                    LinkedIn post -- Vidit to supply
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-mono text-xs text-muted">--</span>
                    <span className="font-body text-xs text-muted">read more →</span>
                  </div>
                </div>
              ))}
            </>
          ) : (
            posts.map((post) => (
              <div className="break-inside-avoid mb-6" key={post.id}>
                <LinkedInCard post={post} />
              </div>
            ))
          )}
        </div>
      </m.div>
    </div>
  )
}
