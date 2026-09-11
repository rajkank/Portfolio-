import { ArrowDown } from 'lucide-react'
import { experience } from '../data/site.js'
import MotionReveal, { MotionItem, MotionStagger } from './MotionReveal.jsx'

function BulletList({ items }) {
  return (
    <ul className="mt-3 space-y-1 text-sm leading-relaxed text-white/80 sm:text-[15px]">
      {items.map((line, i) => (
        <li key={i} className="group hover-row-light flex gap-3">
          <span
            className="mt-[0.55rem] text-white/45 transition-all duration-200 group-hover:text-white group-hover:translate-x-0.5"
            aria-hidden
          >
            →
          </span>
          <span className="transition-all duration-200 group-hover:text-white group-hover:translate-x-0.5 text-balance-wrap min-w-0 flex-1">
            {line}
          </span>
        </li>
      ))}
    </ul>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="section-pad w-full bg-black text-white">
      <div className="page-container">
        <MotionReveal as="header" className="mb-10 max-w-2xl sm:mb-12">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">Experience</p>
          <h2 className="mt-2 font-serif text-[clamp(1.75rem,4.8vw,2.25rem)] tracking-tight sm:text-4xl">
            Where I&apos;ve shipped AI
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
            AI engineering at Rigved, plus internships in software development and analytics.
          </p>
        </MotionReveal>

        <div className="relative">
          <div
            className="absolute left-[11px] top-2 bottom-2 hidden w-px bg-white/20 sm:block"
            aria-hidden
          />

          <MotionStagger as="ol" className="space-y-0" stagger={0.12}>
            {experience.map((job, index) => {
              const isLast = index === experience.length - 1

              return (
                <MotionItem key={job.id} as="li" className="relative">
                  <article className="group/job relative pb-10 transition-colors duration-300 sm:pb-12 sm:pl-10 sm:hover:pl-11">
                    <span
                      className="absolute left-0 top-1.5 hidden h-[22px] w-[22px] items-center justify-center rounded-full border border-white/35 bg-black transition-all duration-300 group-hover/job:border-white/70 sm:flex"
                      aria-hidden
                    >
                      <span className="h-2 w-2 rounded-full bg-white transition-transform duration-300 group-hover/job:scale-125" />
                    </span>

                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                      <div className="min-w-0">
                        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/45 sm:hidden">
                          {job.period}
                        </p>
                        <h3 className="text-base font-semibold leading-snug sm:text-lg md:text-xl">
                          <span className="block sm:inline">{job.role}</span>
                          <span className="hidden font-normal text-white/50 sm:inline"> · </span>
                          <span className="block text-white/90 sm:inline sm:text-inherit">{job.company}</span>
                        </h3>
                      </div>
                      <p className="hidden shrink-0 text-sm text-white/60 sm:block">{job.period}</p>
                    </div>

                    {job.projects?.length ? (
                      <div className="mt-5 space-y-6 border-l border-white/15 pl-4 transition-colors duration-300 group-hover/job:border-white/35 sm:ml-1 sm:pl-5">
                        {job.projects.map((project) => (
                          <div key={project.id} className="group/project">
                            <h4 className="flex min-w-0 items-start gap-2 text-base font-medium text-white transition-colors duration-200 group-hover/project:text-white sm:text-lg">
                              <span
                                className="mt-0.5 shrink-0 text-white/45 transition-all duration-200 group-hover/project:text-white group-hover/project:translate-x-0.5"
                                aria-hidden
                              >
                                ›
                              </span>
                              <span className="text-balance-wrap">{project.title}</span>
                            </h4>
                            <BulletList items={project.highlights} />
                          </div>
                        ))}
                      </div>
                    ) : job.highlights?.length ? (
                      <div className="mt-4 border-l border-white/15 pl-4 transition-colors duration-300 group-hover/job:border-white/35 sm:ml-1 sm:pl-5">
                        <BulletList items={job.highlights} />
                      </div>
                    ) : null}
                  </article>

                  {!isLast ? (
                    <div className="relative flex items-center pb-2 sm:pl-10">
                      <span
                        className="absolute left-[3px] top-1/2 hidden -translate-y-1/2 sm:flex sm:h-7 sm:w-7 sm:items-center sm:justify-center sm:rounded-full sm:border sm:border-white/20 sm:bg-black"
                        aria-hidden
                      >
                        <ArrowDown className="h-3.5 w-3.5 text-white/55" strokeWidth={2} />
                      </span>
                      <div className="hidden h-px flex-1 bg-white/10 sm:block" aria-hidden />
                    </div>
                  ) : null}
                </MotionItem>
              )
            })}
          </MotionStagger>
        </div>
      </div>
    </section>
  )
}
