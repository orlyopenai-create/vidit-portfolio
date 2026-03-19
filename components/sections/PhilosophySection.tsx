import { philosophyPillars } from '@/lib/data/philosophy'
import { PhilosophyAnimations } from '@/components/philosophy/PhilosophyAnimations'

export function PhilosophySection() {
  return (
    <section id="philosophy" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <PhilosophyAnimations pillars={philosophyPillars} />
      </div>
    </section>
  )
}
