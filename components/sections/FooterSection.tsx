'use client'

import { m } from 'framer-motion'

const LANDO_EASE = [0.65, 0.05, 0, 1] as const

// D — Section nav links
const NAV_LINKS = [
  { label: 'The Journey',       href: '#journey' },
  { label: 'The Intersection',  href: '#intersection' },
  { label: 'The Fund',          href: '#fund' },
  { label: 'The Bridge',        href: '#bridge' },
  { label: 'Writing',           href: '#writing' },
]

export function FooterSection() {
  return (
    <footer id="contact" className="py-24 md:py-36 px-6 bg-surface">
      <div className="max-w-6xl mx-auto md:px-6">

        {/* Main grid — nav left, CTA right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">

          {/* D — Section nav */}
          <m.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: LANDO_EASE }}
          >
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-foreground/35 mb-6">
              On this page
            </p>
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-display text-[1.4rem] font-normal text-foreground/50 hover:text-foreground transition-colors duration-200 leading-tight w-fit"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </m.div>

          {/* CTA right */}
          <div className="flex flex-col justify-center">
            <div className="overflow-hidden mb-4">
              <m.h2
                className="font-display text-[clamp(3rem,7vw,5.5rem)] font-normal leading-[1.0] tracking-[-0.02em] text-foreground"
                initial={{ y: '105%', opacity: 0 }}
                whileInView={{ y: '0%', opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, ease: LANDO_EASE }}
              >
                Let&rsquo;s talk.
              </m.h2>
            </div>

            {/* E — Availability badge */}
            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: LANDO_EASE, delay: 0.15 }}
              className="flex items-center gap-2.5 mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="font-body text-sm text-foreground/45">Open to conversations</span>
            </m.div>

            <m.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: LANDO_EASE, delay: 0.25 }}
              className="flex flex-col gap-3"
            >
              <a
                href="mailto:dugarvidit@gmail.com"
                className="font-body text-[1.1rem] text-foreground/70 hover:text-[#A6701A] transition-colors duration-200 w-fit"
              >
                dugarvidit@gmail.com
              </a>
              <a
                href="tel:+919831991034"
                className="font-body text-[1.1rem] text-foreground/70 hover:text-[#A6701A] transition-colors duration-200 w-fit"
              >
                +91 98319 91034
              </a>
              <a
                href="https://www.linkedin.com/in/viditdugar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-body text-[1.1rem] text-foreground/70 hover:text-[#A6701A] transition-colors duration-200 w-fit"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn ↗
              </a>
            </m.div>
          </div>
        </div>

        {/* F — Pull quote */}
        <m.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: LANDO_EASE, delay: 0.1 }}
          className="font-subheading italic text-[1.15rem] text-foreground/35 text-center mb-10 max-w-xl mx-auto leading-relaxed"
        >
          &ldquo;The best investments begin with a conversation.&rdquo;
        </m.p>

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
          <p className="font-body text-sm text-foreground/40">
            Built with intention.
          </p>
        </div>

      </div>
    </footer>
  )
}
