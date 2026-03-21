import { notFound } from 'next/navigation'
import Link from 'next/link'
import { memos } from '@/lib/data/memos'

export function generateStaticParams() {
  return memos.map((m) => ({ slug: m.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const memo = memos.find((m) => m.slug === slug)
  if (!memo) return {}
  return {
    title: `${memo.company} — Investment Memo · Vidit Dugar`,
    description: memo.oneLiner,
  }
}

export default async function MemoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const memo = memos.find((m) => m.slug === slug)
  if (!memo) notFound()

  return (
    <main className="min-h-screen bg-[#0D0B09] text-[#F2EAE0]">
      <div className="max-w-2xl mx-auto px-6 py-16 md:py-24">

        {/* Back link */}
        <Link
          href="/#fund"
          className="inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[#F2EAE0]/35 hover:text-[#C4832A] transition-colors duration-200 mb-12 py-3 -my-3 focus:outline-none focus:ring-2 focus:ring-[#C4832A]/50 rounded"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to portfolio
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[#C4832A]">
              {memo.sector}
            </span>
            <span className="font-mono text-[0.65rem] text-[#F2EAE0]/20">·</span>
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[#F2EAE0]/35 border border-[#F2EAE0]/15 px-2 py-0.5 rounded-full">
              {memo.stage}
            </span>
          </div>
          <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] font-normal leading-[1.05] tracking-[-0.01em] text-[#F2EAE0] mb-4">
            {memo.company}
          </h1>
          <p className="font-subheading italic text-[1.2rem] text-[#F2EAE0]/55 leading-relaxed">
            {memo.oneLiner}
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#F2EAE0]/8 mb-10" />

        {/* Summary */}
        <section className="mb-10">
          <h2 className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[#C4832A]/70 mb-4">
            The Opportunity
          </h2>
          <p className="font-body text-[1rem] text-[#F2EAE0]/70 leading-[1.75]">
            {memo.summary}
          </p>
        </section>

        <div className="h-px bg-[#F2EAE0]/8 mb-10" />

        {/* Why Excited */}
        <section className="mb-10">
          <h2 className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[#C4832A]/70 mb-6">
            Why We&rsquo;re Excited
          </h2>
          <div className="space-y-6">
            {memo.whyExcited.map((item) => (
              <div key={item.heading}>
                <p className="font-body text-[1rem] font-semibold text-[#F2EAE0]/90 mb-1.5">
                  {item.heading}
                </p>
                <p className="font-body text-[1rem] text-[#F2EAE0]/55 leading-[1.75]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="h-px bg-[#F2EAE0]/8 mb-10" />

        {/* Pre-parade + Pre-mortem */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          <section>
            <h2 className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[#C4832A]/70 mb-5">
              Best Case
            </h2>
            <ul className="space-y-3">
              {memo.preParade.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-[0.5rem] w-1 h-1 rounded-full bg-[#C4832A]/50 shrink-0" />
                  <p className="font-body text-[1rem] text-[#F2EAE0]/55 leading-[1.7]">{item}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[#C4832A]/70 mb-5">
              Key Risks
            </h2>
            <ul className="space-y-3">
              {memo.preMortem.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-[0.5rem] w-1 h-1 rounded-full bg-[#F2EAE0]/20 shrink-0" />
                  <p className="font-body text-[1rem] text-[#F2EAE0]/55 leading-[1.7]">{item}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="h-px bg-[#F2EAE0]/8 mb-10" />

        {/* Final Thoughts */}
        <section className="mb-10">
          <h2 className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[#C4832A]/70 mb-4">
            Final Thoughts
          </h2>
          <p className="font-subheading italic text-[1.1rem] text-[#F2EAE0]/65 leading-[1.75]">
            {memo.finalThoughts}
          </p>
        </section>

        <div className="h-px bg-[#F2EAE0]/8 mb-10" />

        {/* Notable investors */}
        <section className="mb-16">
          <h2 className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[#C4832A]/70 mb-3">
            Notable Co-investors
          </h2>
          <p className="font-body text-[0.9rem] text-[#F2EAE0]/45">
            {memo.notableInvestors}
          </p>
        </section>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-[#F2EAE0]/8 pt-8">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-[#F2EAE0]/20">
            Vidit Dugar · Investment Memo
          </p>
          <Link
            href="/#fund"
            className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[#F2EAE0]/35 hover:text-[#C4832A] transition-colors duration-200 py-3 -my-3 focus:outline-none focus:ring-2 focus:ring-[#C4832A]/50 rounded"
          >
            ← Back
          </Link>
        </div>

      </div>
    </main>
  )
}
