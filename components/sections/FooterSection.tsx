export function FooterSection() {
  return (
    <footer id="contact" className="bg-surface py-16 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-display text-2xl font-bold text-foreground mb-4">Vidit Dugar</h2>

        <div className="flex items-center justify-center gap-6 mb-6">
          <a
            href="mailto:dugarvidit@gmail.com"
            className="font-body text-sm text-accent hover:text-accent-hover transition-colors"
          >
            dugarvidit@gmail.com
          </a>
          <a
            href="https://www.linkedin.com/in/viditdugar"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm text-accent hover:text-accent-hover transition-colors"
          >
            LinkedIn
          </a>
        </div>

        <p className="font-body text-sm text-muted mb-8">
          Open to conversations about early-stage consumer investing in India.
        </p>

        <p className="font-body text-xs text-muted/60">
          &copy; 2026 Vidit Dugar
        </p>
      </div>
    </footer>
  )
}
