import { IntersectionAnimations } from '@/components/intersection/IntersectionAnimations'

export function IntersectionSection() {
  return (
    <section id="intersection" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <IntersectionAnimations />
      </div>
    </section>
  )
}
