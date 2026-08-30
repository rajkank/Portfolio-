import { motion, useReducedMotion } from 'framer-motion'
import {
  Brain,
  Code2,
  Database,
  FileText,
  Globe,
  ScanEye,
  Sparkles,
  Wrench,
} from 'lucide-react'
import { skillCategories } from '../data/site.js'
import SectionHeading from './SectionHeading.jsx'

const iconById = {
  prog: Code2,
  dl: Brain,
  genai: Sparkles,
  nlp: FileText,
  cv: ScanEye,
  tools: Wrench,
  web: Globe,
  db: Database,
}

const spring = { type: 'spring', stiffness: 420, damping: 30 }

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.06 },
  },
}

const cardReveal = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Skills() {
  const reduce = useReducedMotion()
  const cardHover = reduce ? undefined : { y: -6, transition: spring }

  return (
    <section id="skills" className="w-full py-16 sm:py-20">
      <div className="page-container">
        <SectionHeading
          eyebrow="Skills"
          title="Technical toolkit"
          description="Programming, deep learning, GenAI, NLP, CV, tooling, web, and data — aligned with your resume."
        />

        <motion.div
          className="grid gap-5 sm:gap-6 md:grid-cols-2"
          variants={container}
          initial={reduce ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-8% 0px', amount: 0.15 }}
        >
          {skillCategories.map((cat) => {
            const Icon = iconById[cat.id] ?? Code2
            return (
              <motion.article
                key={cat.id}
                variants={cardReveal}
                className="group relative"
              >
                <motion.div whileHover={cardHover} className="h-full">
                  <div className="relative h-full overflow-hidden rounded-2xl border border-zinc-800/70 bg-[radial-gradient(120%_80%_at_0%_0%,rgba(16,185,129,0.08),transparent_50%),linear-gradient(165deg,rgba(24,24,27,0.9),rgba(9,9,11,0.95))] p-5 shadow-lg shadow-black/20 backdrop-blur-sm transition-[border-color,box-shadow] duration-300 sm:p-6 group-hover:border-emerald-500/35 group-hover:shadow-[0_20px_50px_-24px_rgba(16,185,129,0.25)]">
                    {/* Decorative corner */}
                    <div
                      className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald-500/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100 group-hover:bg-emerald-400/15"
                      aria-hidden
                    />

                    <div className="relative flex items-start gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-zinc-700/80 bg-zinc-950/60 text-emerald-400/95 shadow-inner ring-1 ring-white/[0.04] transition-all duration-300 group-hover:scale-105 group-hover:border-emerald-500/40 group-hover:text-emerald-300 group-hover:shadow-[0_0_24px_-6px_rgba(16,185,129,0.35)]">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-serif text-lg font-semibold leading-snug tracking-tight text-white sm:text-[1.15rem]">
                          {cat.title}
                        </h3>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {cat.items.map((item) => (
                            <motion.span
                              key={item}
                              whileHover={reduce ? undefined : { scale: 1.04 }}
                              whileTap={reduce ? undefined : { scale: 0.98 }}
                              className="inline-flex max-w-full rounded-lg border border-zinc-700/70 bg-zinc-950/70 px-2.5 py-1.5 text-left text-[11px] font-medium leading-snug text-zinc-300 shadow-sm ring-1 ring-black/20 transition-colors duration-200 hover:border-emerald-500/35 hover:text-zinc-100 sm:text-xs"
                            >
                              {item}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
