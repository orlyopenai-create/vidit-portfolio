'use client'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, m } from 'framer-motion'
import Image from 'next/image'
import type { Photo } from '@/lib/types'

interface LightboxProps {
  photos: Photo[]
  activeIndex: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}

export function Lightbox({ photos, activeIndex, onClose, onNavigate }: LightboxProps) {
  const [mounted, setMounted] = useState(false)
  const isOpen = activeIndex !== null
  const photo = isOpen ? photos[activeIndex] : null

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight' && activeIndex !== null) {
        onNavigate(Math.min(activeIndex + 1, photos.length - 1))
      }
      if (e.key === 'ArrowLeft' && activeIndex !== null) {
        onNavigate(Math.max(activeIndex - 1, 0))
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, activeIndex, onClose, onNavigate, photos.length])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && photo && (
        <m.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center cursor-pointer"
          onClick={onClose}
        >
          <m.div
            initial={{ scale: 0.96 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.96 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[90vh] w-full cursor-default"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              className="object-contain max-h-[85vh] w-auto mx-auto"
            />
            <p className="text-center text-sm text-white/80 mt-3 font-body">{photo.caption}</p>

            {activeIndex > 0 && (
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-3xl p-2"
                onClick={(e) => { e.stopPropagation(); onNavigate(Math.max(activeIndex - 1, 0)) }}
                aria-label="Previous photo"
              >
                &#8592;
              </button>
            )}

            {activeIndex < photos.length - 1 && (
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-3xl p-2"
                onClick={(e) => { e.stopPropagation(); onNavigate(Math.min(activeIndex + 1, photos.length - 1)) }}
                aria-label="Next photo"
              >
                &#8594;
              </button>
            )}
          </m.div>
        </m.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
