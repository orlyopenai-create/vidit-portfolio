import { linkedInPosts, photos } from '@/lib/data/media'
import { MediaAnimations } from '@/components/media/MediaAnimations'
import { GalleryGrid } from '@/components/media/GalleryGrid'

export function MediaSection() {
  return (
    <section id="media" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <MediaAnimations posts={linkedInPosts} />
        <GalleryGrid photos={photos} />
      </div>
    </section>
  )
}
