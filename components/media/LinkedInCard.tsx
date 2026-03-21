import type { LinkedInPost } from '@/lib/types'

export function LinkedInCard({ post }: { post: LinkedInPost }) {
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col bg-surface transition-all duration-200 hover:-translate-y-1.5 hover:shadow-md rounded-xl overflow-hidden h-full"
    >
      {/* Photo — 55% height ratio */}
      {post.imageSrc && (
        <div className="w-full overflow-hidden flex-none" style={{ aspectRatio: '4/3', maxHeight: '55%' }}>
          <img
            src={post.imageSrc}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}

      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Date in DM Mono gold */}
        <time className="font-mono text-[0.75rem] text-[#A6701A]">{post.date}</time>

        {/* Excerpt — Playfair feel via leading */}
        <p className="font-body text-sm text-foreground leading-relaxed line-clamp-4 flex-1">
          {post.excerpt}
        </p>

        <span className="font-body text-xs text-foreground/40 group-hover:text-foreground/70 transition-colors mt-auto">
          Read on LinkedIn →
        </span>
      </div>
    </a>
  )
}
