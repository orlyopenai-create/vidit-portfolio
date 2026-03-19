'use client'

import { useRef, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'
import type { Stat } from '@/lib/types'

export function StatCountUp({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const duration = 1500
    const start = performance.now()
    const end = stat.value

    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(parseFloat((eased * end).toFixed(stat.decimals ?? 0)))
      if (progress < 1) {
        requestAnimationFrame(tick)
      }
    }

    requestAnimationFrame(tick)
  }, [isInView, stat.value, stat.decimals])

  return (
    <div ref={ref} className="flex flex-col items-center gap-1">
      <span className="font-mono text-3xl md:text-4xl text-accent">
        {stat.prefix}{count.toFixed(stat.decimals ?? 0)}{stat.suffix}
      </span>
      <span className="font-body text-xs text-muted text-center">
        {stat.label}
      </span>
    </div>
  )
}
