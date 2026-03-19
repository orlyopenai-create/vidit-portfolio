import { timelineEntries } from '@/lib/data/timeline'
import { TimelineAnimations } from '@/components/timeline/TimelineAnimations'

export function TimelineSection() {
  return (
    <section id="timeline" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <TimelineAnimations entries={timelineEntries} />
      </div>
    </section>
  )
}
