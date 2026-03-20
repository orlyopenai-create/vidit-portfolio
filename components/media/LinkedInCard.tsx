import type { LinkedInPost } from '@/lib/types'

export function LinkedInCard({ post }: { post: LinkedInPost }) {
  return (
    <article className="flex flex-col bg-surface border border-foreground/8 h-full">
      {post.imageSrc && (
        <div className="aspect-[4/3] overflow-hidden bg-foreground/5 flex-none">
          <img
            src={post.imageSrc}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}
      <div className="flex flex-col flex-1 p-6 gap-4">
        <p className="font-body text-sm text-foreground leading-relaxed line-clamp-5">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-foreground/8">
          <time className="font-mono text-xs text-foreground/50">{post.date}</time>
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs text-foreground/60 hover:text-foreground transition-colors"
          >
            read on LinkedIn →
          </a>
        </div>
      </div>
    </article>
  )
}
