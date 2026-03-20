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

function getBarWidth(multiple: string): number {
  const match = multiple.match(/[\d.]+/)
  if (!match) return 0
  // Normalize: 5x = 100%, anything above 5x also caps at 100%
  return Math.min(parseFloat(match[0]) / 5, 1) * 100
}

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
        <p className="font-mono text-[10px] uppercase tracking-widest text-foreground/35 mb-8 mt-2">
          Portfolio — 25 Companies
        </p>

        <div className="space-y-4">
          {Object.entries(grouped).map(([sector, items], gi) => (
            <m.div
              key={sector}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: gi * 0.04 }}
              className="flex items-start gap-4 md:gap-8"
            >
              {/* Sector label — fixed width, right-aligned */}
              <div className="w-24 md:w-32 shrink-0 pt-3 text-right">
                <p className="font-mono text-[9px] text-foreground/35 uppercase tracking-widest leading-tight">
                  {sector}
                </p>
              </div>

              {/* Logo tiles */}
              <div className="flex flex-wrap gap-2 flex-1">
                {items.map((company) => (
                  <button
                    key={company.slug}
                    onClick={() => setSelected(company)}
                    className="flex items-center justify-center w-20 h-11 rounded-md bg-surface hover:bg-foreground/5 transition-colors duration-200 cursor-pointer"
                    title={company.name}
                  >
                    <img
                      src={company.logoPath}
                      alt={company.name}
                      className="h-6 w-auto max-w-[64px] object-contain"
                      style={{ mixBlendMode: 'multiply' }}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.parentElement!.style.display = 'none'
                      }}
                    />
                  </button>
                ))}
              </div>
            </m.div>
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
            className="relative bg-background rounded-2xl p-8 max-w-sm w-full shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-5 font-mono text-lg text-foreground/40 hover:text-foreground transition-colors"
            >
              ×
            </button>

            <div className="flex items-center justify-center h-14 mb-5">
              <img
                src={selected.logoPath}
                alt={selected.name}
                className="h-9 w-auto max-w-[160px] object-contain"
                style={{ mixBlendMode: 'multiply' }}
              />
            </div>

            <h3 className="font-display text-xl font-bold text-foreground mb-1 text-center">
              {selected.name}
            </h3>
            <p className="font-mono text-[10px] text-foreground/40 uppercase tracking-widest text-center mb-5">
              {selected.sector}
            </p>

            {selected.multiple && (
              <div className="border-t border-muted/20 pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="font-body text-sm text-foreground/55">Entry</span>
                  <span className="font-mono text-sm text-foreground">{selected.entryValuation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-body text-sm text-foreground/55">Latest</span>
                  <span className="font-mono text-sm text-foreground">{selected.latestValuation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-body text-sm text-foreground/55">Multiple</span>
                  <span className="font-mono text-sm font-semibold text-accent">{selected.multiple}</span>
                </div>
                {selected.coInvestors && selected.coInvestors !== '—' && (
                  <div className="flex justify-between items-start gap-4">
                    <span className="font-body text-sm text-foreground/55 shrink-0">Co-investors</span>
                    <span className="font-body text-sm text-foreground text-right">{selected.coInvestors}</span>
                  </div>
                )}

                {/* Valuation growth bar */}
                <div className="pt-1">
                  <div className="h-1 rounded-full overflow-hidden bg-surface">
                    <m.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: 'var(--color-accent)' }}
                      initial={{ width: 0 }}
                      animate={{ width: `${getBarWidth(selected.multiple)}%` }}
                      transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1], delay: 0.15 }}
                    />
                  </div>
                  <p className="font-mono text-[9px] text-foreground/30 mt-1 text-right">
                    {selected.multiple} return
                  </p>
                </div>
              </div>
            )}
          </m.div>
        </div>
      )}
    </>
  )
}
