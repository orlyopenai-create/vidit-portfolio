'use client'

import Link from 'next/link'
import { m } from 'framer-motion'
import type { Memo } from '@/lib/data/memos'

const LANDO_EASE = [0.65, 0.05, 0, 1] as const

export function MemoStrip({ memos }: { memos: Memo[] }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: LANDO_EASE, delay: 0.1 }}
      className="border-t border-[#F2EAE0]/8 pt-10"
    >
      <p className="font-subheading italic text-[1.3rem] text-[#F2EAE0]/70 mb-7">
        How I think about a deal.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {memos.map((memo, i) => (
          <m.div
            key={memo.slug}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: LANDO_EASE, delay: 0.05 + i * 0.07 }}
          >
            <Link
              href={`/memo/${memo.slug}`}
              className="group block rounded-xl bg-[#161210] border border-transparent hover:border-[#C4832A]/25 p-5 transition-colors duration-300 cursor-pointer h-full focus:outline-none focus:ring-2 focus:ring-[#C4832A]/50 focus:ring-offset-2 focus:ring-offset-[#080604]"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className="font-display text-[1.05rem] text-[#F2EAE0] group-hover:text-[#C4832A] transition-colors duration-200">
                  {memo.company}
                </span>
                <span className="font-mono text-[0.65rem] uppercase tracking-widest text-[#F2EAE0]/25 shrink-0 mt-1">
                  {memo.stage}
                </span>
              </div>
              <p className="font-mono text-[0.65rem] text-[#C4832A]/55 uppercase tracking-widest mb-3">
                {memo.sector}
              </p>
              <p className="font-body text-[0.85rem] text-[#F2EAE0]/50 leading-snug mb-4">
                {memo.oneLiner}
              </p>
              <span className="font-mono text-[0.65rem] uppercase tracking-widest text-[#C4832A]/60 group-hover:text-[#C4832A] transition-colors duration-200">
                Read memo ↗
              </span>
            </Link>
          </m.div>
        ))}
      </div>
    </m.div>
  )
}
