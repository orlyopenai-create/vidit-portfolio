'use client'

import { useState } from 'react'
import { m } from 'framer-motion'
import type { Company } from '@/lib/types'

const SECTOR_ORDER = [
  'Food & Beverage',
  'Fashion & Lifestyle',
  'Fintech',
  'Health & Wellness',
  'Climate & Mobility',
  'Consumer Durables',
  'Home & Furniture',
  'AI & Tech',
  'Education',
]

export function LogoGrid({ companies }: { companies: Company[] }) {
  const [selected, setSelected] = useState<Company | null>(null)

  const grouped = SECTOR_ORDER.reduce<Record<string, Company[]>>((acc, sector) => {
    const items = companies.filter((c) => c.sector === sector)
    if (items.length) acc[sector] = items
    return acc
  }, {})

  return (
    <>
      <m.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <h3 className="font-display text-xl font-bold text-foreground mb-10 mt-16">
          Portfolio Companies
        </h3>

        <div className="space-y-10">
          {Object.entries(grouped).map(([sector, items]) => (
            <div key={sector}>
              <p className="font-mono text-xs text-foreground/40 uppercase tracking-widest mb-4">
                {sector}
              </p>
              <div className="flex flex-wrap gap-4">
                {items.map((company) => (
                  <button
                    key={company.slug}
                    onClick={() => setSelected(company)}
                    className="flex items-center justify-center p-3 h-14 w-28 rounded-lg bg-surface/60 hover:bg-surface transition-colors duration-200 cursor-pointer"
                    title={company.name}
                  >
                    <img
                      src={company.logoPath}
                      alt={company.name}
                      className="h-7 w-auto max-w-full object-contain"
                      style={{ mixBlendMode: 'multiply' }}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.parentElement!.style.display = 'none'
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </m.div>

      {/* Popout modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ backgroundColor: 'rgba(36,30,24,0.4)' }}
          onClick={() => setSelected(null)}
        >
          <m.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="bg-background rounded-2xl p-8 max-w-sm w-full shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-5 font-mono text-lg text-foreground/40 hover:text-foreground transition-colors"
            >
              ×
            </button>

            {/* Logo */}
            <div className="flex items-center justify-center h-16 mb-6">
              <img
                src={selected.logoPath}
                alt={selected.name}
                className="h-10 w-auto max-w-[160px] object-contain"
                style={{ mixBlendMode: 'multiply' }}
              />
            </div>

            {/* Name + sector */}
            <h3 className="font-display text-xl font-bold text-foreground mb-1 text-center">
              {selected.name}
            </h3>
            <p className="font-mono text-xs text-foreground/40 uppercase tracking-widest text-center mb-6">
              {selected.sector}
            </p>

            {/* Investment details — only if available */}
            {selected.multiple && (
              <div className="border-t border-muted/20 pt-5 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-body text-sm text-foreground/60">Entry</span>
                  <span className="font-mono text-sm text-foreground">{selected.entryValuation}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-body text-sm text-foreground/60">Latest</span>
                  <span className="font-mono text-sm text-foreground">{selected.latestValuation}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-body text-sm text-foreground/60">Multiple</span>
                  <span className="font-mono text-sm font-semibold text-accent">{selected.multiple}</span>
                </div>
                {selected.coInvestors && selected.coInvestors !== '—' && (
                  <div className="flex justify-between items-start gap-4">
                    <span className="font-body text-sm text-foreground/60 shrink-0">Co-investors</span>
                    <span className="font-body text-sm text-foreground text-right">{selected.coInvestors}</span>
                  </div>
                )}
              </div>
            )}
          </m.div>
        </div>
      )}
    </>
  )
}
