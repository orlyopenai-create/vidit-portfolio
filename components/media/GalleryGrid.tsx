'use client'
import { useState } from 'react'
import { m } from 'framer-motion'
import Image from 'next/image'
import type { Photo } from '@/lib/types'
import { Lightbox } from '@/components/media/Lightbox'

export function GalleryGrid({ photos }: { photos: Photo[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const baseUrl = process.env.NEXT_PUBLIC_CLOUDFLARE_URL?.replace(/\/$/, '') ?? ''

  return (
    <div>
      <m.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h3 className="font-body text-xs uppercase tracking-[0.15em] text-accent mb-8 mt-16">Gallery</h3>
      </m.div>

      {photos.length === 0 ? (
        <div className="columns-1 md:columns-2 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="break-inside-avoid mb-6 bg-surface border border-foreground/10 border-dashed aspect-[4/3] flex items-center justify-center"
            >
              <p className="font-body text-sm text-muted italic">Photo -- Vidit to supply</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="columns-1 md:columns-2 gap-6">
          {photos.map((photo, i) => (
            <m.div
              key={photo.id}
              className="break-inside-avoid mb-6 relative overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.06 }}
              onClick={() => setActiveIndex(i)}
            >
              <Image
                src={`${baseUrl}/${photo.src}`}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                className="object-cover w-full transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="font-body text-sm text-white">{photo.caption}</p>
              </div>
            </m.div>
          ))}
        </div>
      )}

      <Lightbox
        photos={photos.map(p => ({ ...p, src: `${baseUrl}/${p.src}` }))}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </div>
  )
}
