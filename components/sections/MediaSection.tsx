import { linkedInPosts, photos } from '@/lib/data/media'
import { MediaAnimations } from '@/components/media/MediaAnimations'

export function MediaSection() {
  return (
    <section id="media" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <MediaAnimations posts={linkedInPosts} />
        {/* GalleryGrid will be added in Plan 02 */}
      </div>
    </section>
  )
}
