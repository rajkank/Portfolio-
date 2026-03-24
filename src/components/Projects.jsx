import { motion, useReducedMotion } from 'framer-motion'
import { ExternalLink, Layers } from 'lucide-react'
import { projects } from '../data/site.js'
import GlassCard from './GlassCard.jsx'
import SectionHeading from './SectionHeading.jsx'

const spring = { type: 'spring', stiffness: 380, damping: 28 }

export default function Projects() {
  const reduce = useReducedMotion()
  const cardHover = reduce ? undefined : { y: -6, transition: spring }

  return (
    <section id="projects" lang="en" className="section-bg-teal scroll-mt-24 w-full py-20">
      <div className="page-container">
        <SectionHeading
          variant="gradient"
          eyebrow="Projects"
          title="Selected work"
          description="Platforms and ML systems built end-to-end — from UX to models and deployment."
        />

        <div className="flex flex-col gap-8 md:gap-10">
          {projects.map((p, i) => (
            <motion.article
              key={p.id}
              initial={reduce ? false : { opacity: 0, y: 44 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8% 0px', amount: 0.15 }}
              transition={{ duration: 0.52, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
              className="group relative"
            >
              <div
                className={`flex flex-col gap-5 lg:flex-row lg:gap-10 ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Accent column */}
                <div className="flex shrink-0 items-stretch lg:w-28">
                  <div className="flex w-full flex-row items-center gap-4 lg:flex-col lg:items-start lg:gap-3">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-zinc-700/80 bg-zinc-900/80 font-mono text-sm font-bold text-emerald-400 shadow-inner ring-1 ring-white/5 transition-all duration-300 group-hover:border-emerald-500/40 group-hover:shadow-[0_0_28px_-6px_rgba(16,185,129,0.4)]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="hidden h-px flex-1 bg-gradient-to-r from-emerald-500/40 to-transparent lg:block lg:h-24 lg:w-px lg:bg-gradient-to-b" />
                  </div>
                </div>

                <motion.div className="min-w-0 flex-1" whileHover={cardHover}>
                  <GlassCard className="relative overflow-hidden border-zinc-800/80 p-0 transition-all duration-300 group-hover:border-emerald-500/30 group-hover:shadow-[0_28px_64px_-28px_rgba(16,185,129,0.2)]">
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-emerald-500/80 via-emerald-500/20 to-transparent opacity-70 transition-opacity group-hover:opacity-100" />

                    <div className="relative p-6 sm:p-8 lg:p-9">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                        <div className="flex min-w-0 gap-3">
                          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-zinc-700/80 bg-zinc-900/70 text-emerald-400/90 transition-transform duration-300 group-hover:scale-105 group-hover:border-emerald-500/35">
                            <Layers className="h-4 w-4" aria-hidden />
                          </span>
                          <div className="min-w-0">
                            <h3 className="font-serif text-lg font-semibold leading-snug tracking-tight text-white sm:text-xl lg:text-[1.35rem] lg:leading-tight">
                              {p.title}
                            </h3>
                            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500 sm:text-xs">
                              {p.period}
                            </p>
                          </div>
                        </div>

                        {p.liveUrl ? (
                          <a
                            href={p.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300 transition-all hover:border-emerald-400/60 hover:bg-emerald-500/20 hover:text-white"
                          >
                            See live
                            <ExternalLink className="h-3.5 w-3.5 opacity-80" aria-hidden />
                          </a>
                        ) : (
                          <span
                            className="inline-flex shrink-0 cursor-not-allowed items-center gap-2 self-start rounded-full border border-dashed border-zinc-600 px-4 py-2 text-sm text-zinc-500"
                            title="Add your demo URL as liveUrl in src/data/site.js"
                          >
                            See live
                            <ExternalLink className="h-3.5 w-3.5 opacity-50" aria-hidden />
                          </span>
                        )}
                      </div>

                      <ul className="mt-7 space-y-3 border-t border-zinc-800/80 pt-7">
                        {p.bullets.map((line, idx) => (
                          <li
                            key={`${p.id}-${idx}`}
                            className="flex gap-3 text-sm leading-relaxed text-zinc-400 [text-wrap:pretty] transition-colors hover:text-zinc-200"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500/70 ring-2 ring-emerald-500/20" />
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </GlassCard>
                </motion.div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
