import { IntersectionAnimations } from '@/components/intersection/IntersectionAnimations'

export function IntersectionSection() {
  return (
    <section id="intersection" className="py-24 md:py-36 lg:py-48 px-6 bg-surface">
      <div className="max-w-6xl mx-auto md:px-6">
        <IntersectionAnimations />
      </div>
    </section>
  )
}
