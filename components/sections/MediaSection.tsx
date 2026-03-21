import { linkedInPosts } from '@/lib/data/media'
import { MediaAnimations } from '@/components/media/MediaAnimations'

export function MediaSection() {
  return (
    <section id="writing" className="py-24 md:py-36 lg:py-48 px-6 bg-background">
      <div className="max-w-6xl mx-auto md:px-6">
        <MediaAnimations posts={linkedInPosts} />
      </div>
    </section>
  )
}
