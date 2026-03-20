import type { LinkedInPost } from '@/lib/types'

export function LinkedInCard({ post }: { post: LinkedInPost }) {
  return (
    <article className="bg-surface border border-foreground/10 p-6 flex flex-col gap-4 break-inside-avoid">
      <p className="font-body text-sm text-foreground line-clamp-3 leading-relaxed">
        {post.excerpt}
      </p>
      <div className="flex items-center justify-between mt-auto">
        <time className="font-mono text-xs text-muted">{post.date}</time>
        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-xs text-accent hover:text-accent/80 transition-colors"
        >
          read more →
        </a>
      </div>
    </article>
  )
}
