'use client'

import { m } from 'framer-motion'
import type { Company } from '@/lib/types'

export function LogoGrid({ companies }: { companies: Company[] }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <h3 className="font-display text-xl font-bold text-foreground mb-8 mt-16">Portfolio Companies</h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6">
        {companies.map((company) => (
          <div
            key={company.slug}
            className="flex items-center justify-center p-4 h-16 rounded"
            title={company.name}
          >
            <img
              src={company.logoPath}
              alt={company.name}
              className="h-8 w-auto max-w-full object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          </div>
        ))}
      </div>
    </m.div>
  )
}
