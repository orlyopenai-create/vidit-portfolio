import { IntersectionAnimations } from '@/components/intersection/IntersectionAnimations'

export function IntersectionSection() {
  return (
    <section id="intersection" className="py-16 md:py-24 px-6 bg-surface">
      <div className="max-w-6xl mx-auto md:px-6">
        <IntersectionAnimations />
      </div>
    </section>
  )
}
