import { motion, useReducedMotion } from 'framer-motion'
import { Bot, Briefcase, ChevronRight, Clock, Users } from 'lucide-react'
import { experience } from '../data/site.js'
import GlassCard from './GlassCard.jsx'
import SectionHeading from './SectionHeading.jsx'

const cardSpring = { type: 'spring', stiffness: 380, damping: 28 }

const projectIconById = {
  hrms: Users,
  'time-flow': Clock,
  'enterprise-chatbot': Bot,
}

function HighlightList({ id, items }) {
  return (
    <ul className="mt-5 space-y-3 border-t border-zinc-800/70 pt-5">
      {items.map((line, i) => (
        <li
          key={`${id}-${i}`}
          className="group/line flex gap-3 text-sm text-zinc-400 transition-colors duration-200 hover:text-zinc-200"
        >
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-zinc-800 bg-zinc-900/50 text-emerald-500/70 transition-colors group-hover:border-emerald-500/25 group-hover:text-emerald-400/90 group-hover/line:border-emerald-500/30">
            <ChevronRight className="h-3 w-3" aria-hidden />
          </span>
          <span className="leading-relaxed [text-wrap:pretty]">{line}</span>
        </li>
      ))}
    </ul>
  )
}

function RoleHeader({ job, index }) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
      <div className="flex min-w-0 flex-1 gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-zinc-700/80 bg-zinc-900/70 text-emerald-400 shadow-inner transition-all duration-300 group-hover:scale-105 group-hover:border-emerald-500/40 group-hover:text-emerald-300 group-hover:shadow-[0_0_24px_-4px_rgba(16,185,129,0.35)]">
          <Briefcase className="h-5 w-5" aria-hidden />
        </span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-500/70">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
          <h3 className="mt-1 flex flex-col gap-1 font-serif text-lg font-semibold leading-snug tracking-tight text-white sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-0 sm:text-xl md:text-2xl">
            <span>{job.role}</span>
            <span className="hidden font-sans font-normal text-zinc-500 sm:inline sm:px-1">
              —
            </span>
            <span className="text-emerald-400/95">{job.company}</span>
          </h3>
        </div>
      </div>

      <div className="shrink-0 sm:pt-1">
        <span className="inline-flex items-center rounded-full border border-zinc-700/80 bg-zinc-950/60 px-3 py-1.5 font-mono text-[11px] text-zinc-400 transition-colors duration-300 group-hover:border-emerald-500/30 group-hover:text-emerald-200/90 sm:text-xs">
          {job.period}
        </span>
      </div>
    </div>
  )
}

function CardChrome() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </>
  )
}

export default function Experience() {
  const reduce = useReducedMotion()
  const cardHover = reduce
    ? undefined
    : { y: -8, scale: 1.008, transition: cardSpring }

  return (
    <section id="experience" className="w-full py-16 sm:py-20">
      <div className="page-container">
        <SectionHeading
          eyebrow="Experience"
          title="Where I’ve shipped AI"
          description="AI engineering at Rigved, plus internships in software development and analytics."
        />

        <div className="relative">
          <div
            className="absolute left-[19px] top-3 bottom-3 hidden w-px overflow-hidden sm:block md:left-[22px]"
            aria-hidden
          >
            <div className="h-full w-full bg-gradient-to-b from-emerald-500/60 via-emerald-500/20 to-transparent" />
          </div>

          <ul className="relative space-y-8 md:space-y-10">
            {experience.map((job, index) => {
              const hasProjects = Boolean(job.projects?.length)

              return (
                <motion.li
                  key={job.id}
                  className="relative pl-0 sm:pl-2 md:pl-0"
                  initial={reduce ? false : { opacity: 0, y: 48 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10% 0px -6% 0px', amount: 0.12 }}
                  transition={{
                    duration: 0.52,
                    delay: index * 0.08,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  <span
                    className="absolute left-0 top-7 z-10 hidden h-4 w-4 rounded-full border-2 border-emerald-400 bg-[#0a0a0a] shadow-[0_0_20px_rgba(52,211,153,0.55)] sm:flex sm:items-center sm:justify-center md:left-[14px] md:top-8"
                    aria-hidden
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>

                  <div className="sm:ml-10 md:ml-14">
                    {hasProjects ? (
                      <div className="space-y-4">
                        <motion.div
                          className="group"
                          whileHover={cardHover}
                          style={{ transformOrigin: 'center top' }}
                        >
                          <GlassCard className="relative overflow-hidden border-zinc-800/80 p-0 transition-colors duration-300 group-hover:border-emerald-500/35 group-hover:shadow-[0_24px_60px_-20px_rgba(16,185,129,0.18)]">
                            <CardChrome />
                            <div className="relative p-6 sm:p-8">
                              <RoleHeader job={job} index={index} />
                            </div>
                          </GlassCard>
                        </motion.div>

                        <div className="grid gap-4">
                          {job.projects.map((project) => {
                            const ProjectIcon = projectIconById[project.id] ?? Briefcase
                            return (
                              <motion.article
                                key={project.id}
                                className="group h-full"
                                whileHover={cardHover}
                                style={{ transformOrigin: 'center top' }}
                              >
                                <GlassCard className="relative flex h-full flex-col overflow-hidden border-zinc-800/80 p-0 transition-colors duration-300 group-hover:border-emerald-500/35 group-hover:shadow-[0_24px_60px_-20px_rgba(16,185,129,0.18)]">
                                  <CardChrome />
                                  <div className="relative flex h-full flex-col p-5 sm:p-6">
                                    <div className="flex items-center gap-3">
                                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-zinc-700/80 bg-zinc-900/70 text-emerald-400 shadow-inner transition-all duration-300 group-hover:scale-105 group-hover:border-emerald-500/40 group-hover:text-emerald-300 group-hover:shadow-[0_0_24px_-4px_rgba(16,185,129,0.35)]">
                                        <ProjectIcon className="h-5 w-5" aria-hidden />
                                      </span>
                                      <h4 className="font-serif text-lg font-semibold leading-snug tracking-tight text-white sm:text-xl">
                                        {project.title}
                                      </h4>
                                    </div>
                                    <HighlightList id={project.id} items={project.highlights} />
                                  </div>
                                </GlassCard>
                              </motion.article>
                            )
                          })}
                        </div>
                      </div>
                    ) : (
                      <motion.div
                        className="group"
                        whileHover={cardHover}
                        style={{ transformOrigin: 'center top' }}
                      >
                        <GlassCard className="relative overflow-hidden border-zinc-800/80 p-0 transition-colors duration-300 group-hover:border-emerald-500/35 group-hover:shadow-[0_24px_60px_-20px_rgba(16,185,129,0.18)]">
                          <CardChrome />
                          <div className="relative p-6 sm:p-8">
                            <RoleHeader job={job} index={index} />
                            {job.highlights?.length ? (
                              <HighlightList id={job.id} items={job.highlights} />
                            ) : null}
                          </div>
                        </GlassCard>
                      </motion.div>
                    )}
                  </div>
                </motion.li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
