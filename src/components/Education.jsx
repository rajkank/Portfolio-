import { motion, useReducedMotion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { education } from '../data/site.js'
import SectionHeading from './SectionHeading.jsx'

const spring = { type: 'spring', stiffness: 400, damping: 32 }

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Education() {
  const reduce = useReducedMotion()
  const hoverCard = reduce ? undefined : { y: -6, transition: spring }

  return (
    <section
      id="education"
      lang="en"
      className="section-bg-teal scroll-mt-24 flex min-h-[min(88svh,960px)] w-full flex-col justify-start pt-16 pb-24 sm:pt-20 sm:pb-28 lg:pt-24 lg:pb-32"
    >
      <div className="page-container w-full">
        <SectionHeading
          variant="gradient"
          eyebrow="Education"
          title="Academic foundation"
          description="Information Technology at SIES GST — with strong diploma groundwork from DBATU."
        />

        <motion.div
          className="relative mx-auto max-w-3xl pl-2 sm:pl-0"
          variants={listVariants}
          initial={reduce ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-12% 0px' }}
        >
          {/* Left spine — only in this section */}
          <div
            className="absolute bottom-12 left-[15px] top-12 w-[3px] overflow-hidden rounded-full sm:left-[19px]"
            aria-hidden
          >
            <div className="h-full w-full bg-gradient-to-b from-emerald-200/55 via-emerald-100/30 to-emerald-900/50" />
          </div>

          <ul className="relative space-y-10 sm:space-y-12">
            {education.map((edu, i) => (
              <motion.li
                key={edu.id}
                variants={itemVariants}
                className="relative pl-12 sm:pl-14"
              >
                <span
                  className="absolute left-[9px] top-9 z-10 flex h-4 w-4 items-center justify-center rounded-full border-2 border-emerald-100/90 bg-[#0f2f33] shadow-[0_0_18px_rgba(167,243,208,0.55)] sm:left-[11px]"
                  aria-hidden
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-200" />
                </span>

                <motion.div className="group relative" whileHover={hoverCard}>
                  <div
                    className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br from-white/12 via-transparent to-emerald-950/40 opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden
                  />
                  <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/25 p-6 shadow-xl shadow-black/30 backdrop-blur-md transition-[border-color,box-shadow] duration-300 group-hover:border-emerald-200/25 group-hover:shadow-[0_28px_60px_-28px_rgba(0,0,0,0.5)] sm:p-8">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex min-w-0 gap-4">
                        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-emerald-100/95 shadow-inner transition-transform duration-300 group-hover:scale-105 group-hover:border-emerald-200/35">
                          <GraduationCap className="h-7 w-7" aria-hidden />
                        </span>
                        <div className="min-w-0">
                          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-emerald-100/75">
                            {String(i + 1).padStart(2, '0')}
                          </p>
                          <h3 className="mt-2 font-serif text-xl font-semibold leading-snug text-white sm:text-2xl">
                            {edu.degree}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-zinc-100/90">{edu.school}</p>
                          <p className="mt-3 inline-flex rounded-full border border-white/10 bg-black/25 px-3 py-1 font-mono text-[11px] text-emerald-50/95">
                            {edu.period}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 rounded-2xl border border-emerald-200/20 bg-emerald-950/30 px-5 py-4 text-center sm:min-w-[140px] sm:text-right">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-100/65">
                          Result
                        </p>
                        <p className="mt-1 font-serif text-xl font-semibold leading-tight text-white sm:text-2xl">
                          {edu.result}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
