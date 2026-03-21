import type { LinkedInPost } from '@/lib/types'

// Derive a pull quote — first 1-2 sentences, capped at 150 chars
function getPullQuote(excerpt: string): string {
  const sentences = excerpt.split(/(?<=[.!?])\s+/)
  let quote = sentences[0]
  if (quote.length < 70 && sentences[1]) quote += ' ' + sentences[1]
  return quote.length > 155 ? quote.slice(0, 152) + '…' : quote
}

export function LinkedInCard({ post }: { post: LinkedInPost }) {
  const pullQuote = getPullQuote(post.excerpt)

  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col bg-surface transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg rounded-xl overflow-hidden h-full cursor-pointer"
    >
      {/* Photo */}
      {post.imageSrc && (
        <div className="w-full overflow-hidden flex-none" style={{ aspectRatio: '4/3', maxHeight: '55%' }}>
          <img
            src={post.imageSrc}
            alt=""
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
      )}

      <div className="flex flex-col flex-1 p-5 gap-3">
        <time className="font-mono text-[0.75rem] text-[#A6701A]">{post.date}</time>
        <p className="font-body text-sm text-foreground leading-relaxed line-clamp-4 flex-1">
          {post.excerpt}
        </p>
        <span className="font-body text-xs text-foreground/40 group-hover:text-foreground/70 transition-colors mt-auto">
          Read on LinkedIn →
        </span>
      </div>

      {/* B — Pull-quote overlay on hover */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: 'rgba(13,11,9,0.88)', backdropFilter: 'blur(2px)' }}
      >
        <span
          className="font-subheading italic text-[1.15rem] leading-relaxed text-center"
          style={{ color: '#C4832A' }}
        >
          &ldquo;{pullQuote}&rdquo;
        </span>
        <span className="font-body text-xs text-foreground/40 mt-5 tracking-wide">
          Read on LinkedIn →
        </span>
      </div>
    </a>
  )
}
