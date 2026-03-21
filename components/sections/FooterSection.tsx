'use client'

import { m } from 'framer-motion'

const LANDO_EASE = [0.65, 0.05, 0, 1] as const

export function FooterSection() {
  return (
    <footer id="contact" className="py-24 md:py-36 px-6 bg-surface">
      <div className="max-w-6xl mx-auto md:px-6">

        {/* CTA */}
        <div className="text-center mb-16">
          <div className="overflow-hidden mb-8">
            <m.h2
              className="font-display text-[clamp(3rem,8vw,6rem)] font-normal leading-[1.0] tracking-[-0.02em] text-foreground"
              initial={{ y: '105%', opacity: 0 }}
              whileInView={{ y: '0%', opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: LANDO_EASE }}
            >
              Let&rsquo;s talk.
            </m.h2>
          </div>

          <m.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: LANDO_EASE, delay: 0.2 }}
            className="flex flex-col items-center gap-3"
          >
            <a
              href="mailto:viditdugar@gmail.com"
              className="font-body text-[1.1rem] text-foreground/70 hover:text-[#A6701A] transition-colors duration-200"
            >
              viditdugar@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/viditdugar"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-[1.1rem] text-foreground/70 hover:text-[#A6701A] transition-colors duration-200"
            >
              LinkedIn ↗
            </a>
          </m.div>
        </div>

        {/* Divider */}
        <m.div
          className="h-px bg-foreground/10 mb-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ originX: 0 }}
        />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="font-body text-sm text-foreground/40">
            &copy; Vidit Dugar 2026
          </p>
          <p className="font-body text-sm text-foreground/50 md:text-right">
            Third-generation builder from Kolkata.
          </p>
        </div>
      </div>
    </footer>
  )
}
