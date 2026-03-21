import { linkedInPosts } from '@/lib/data/media'
import { MediaAnimations } from '@/components/media/MediaAnimations'

export function MediaSection() {
  return (
    <section id="writing" className="py-16 md:py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto md:px-6">
        <MediaAnimations posts={linkedInPosts} />
      </div>
    </section>
  )
}
