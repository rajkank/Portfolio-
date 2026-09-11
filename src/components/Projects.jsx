import { ExternalLink } from 'lucide-react'
import { projects } from '../data/site.js'
import { MotionItem, MotionStagger } from './MotionReveal.jsx'
import SectionHeading from './SectionHeading.jsx'

function BulletList({ items }) {
  return (
    <ul className="mt-5 space-y-1 text-sm leading-relaxed text-muted sm:text-[15px]">
      {items.map((line, idx) => (
        <li key={idx} className="group hover-row-accent flex gap-3">
          <span
            className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/80 transition-all duration-200 group-hover:scale-150 group-hover:bg-accent"
            aria-hidden
          />
          <span className="text-balance-wrap min-w-0 flex-1 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-paper">
            {line}
          </span>
        </li>
      ))}
    </ul>
  )
}

export default function Projects() {
  return (
    <section id="projects" lang="en" className="section-bg-navy section-pad w-full">
      <div className="page-container">
        <SectionHeading
          variant="gradient"
          eyebrow="Projects"
          title="Selected work"
          description="Platforms and ML systems built end-to-end — from UX to models and deployment."
        />

        <MotionStagger className="flex flex-col gap-6 sm:gap-8" stagger={0.12}>
          {projects.map((p) => (
            <MotionItem
              key={p.id}
              as="article"
              className="group border border-muted/20 bg-navy-dark/50 p-5 transition-all duration-300 hover:border-accent/35 hover:bg-navy-dark/65 sm:p-6 md:p-8"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                <div className="min-w-0 flex-1">
                  <h3 className="text-balance-wrap font-serif text-base font-semibold leading-snug text-paper transition-colors duration-200 group-hover:text-accent sm:text-lg md:text-xl">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-xs uppercase tracking-[0.16em] text-muted/90 sm:text-sm">
                    {p.period}
                  </p>
                </div>

                {p.liveUrl ? (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] w-full shrink-0 items-center justify-center gap-2 self-stretch border border-muted/25 px-4 py-2.5 text-sm text-paper transition hover:border-accent/40 hover:text-accent sm:w-auto sm:self-start"
                  >
                    See live
                    <ExternalLink className="h-3.5 w-3.5 opacity-80" aria-hidden />
                  </a>
                ) : (
                  <span className="inline-flex shrink-0 items-center gap-2 self-start border border-dashed border-muted/25 px-4 py-2 text-sm text-muted/80">
                    See live
                    <ExternalLink className="h-3.5 w-3.5 opacity-50" aria-hidden />
                  </span>
                )}
              </div>

              <BulletList items={p.bullets} />
            </MotionItem>
          ))}
        </MotionStagger>
      </div>
    </section>
  )
}
