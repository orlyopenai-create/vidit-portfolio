'use client'
import { m, useInView } from 'framer-motion'
import { useRef } from 'react'

const LANDO_EASE = [0.65, 0.05, 0, 1] as const

interface ClipRevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div' | 'span'
  triggerOnce?: boolean
  inViewMargin?: `${number}%` | `${number}px` | `${number}% ${number}px` | `${number}px ${number}%` | `${number}% ${number}%` | `${number}px ${number}px`
}

export function ClipReveal({ children, delay = 0, className = '', as: Tag = 'div', triggerOnce = true, inViewMargin = '-5% 0px' }: ClipRevealProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: triggerOnce, margin: inViewMargin })
  return (
    <div ref={ref} className="overflow-hidden pb-[0.15em] mb-[-0.15em]">
      <m.div
        initial={{ y: '105%', opacity: 0 }}
        animate={inView ? { y: '0%', opacity: 1 } : {}}
        transition={{ duration: 0.75, ease: LANDO_EASE, delay }}
      >
        <Tag className={className}>{children}</Tag>
      </m.div>
    </div>
  )
}
