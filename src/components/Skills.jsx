import { motion, useReducedMotion } from 'framer-motion'
import {
  Brain,
  Cloud,
  Code2,
  Database,
  FileText,
  Globe,
  ScanEye,
  Server,
  Sparkles,
} from 'lucide-react'
import { skillCategories } from '../data/site.js'
import SectionHeading from './SectionHeading.jsx'

const iconById = {
  genai: Sparkles,
  ml: Brain,
  nlp: FileText,
  cv: ScanEye,
  backend: Server,
  prog: Code2,
  db: Database,
  cloud: Cloud,
  web: Globe,
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
          description="Generative AI, machine learning, NLP, computer vision, APIs, and the stack behind production systems."
        />

        <motion.div
          className="flex flex-col gap-4 sm:gap-5"
          variants={container}
          initial={reduce ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-8% 0px', amount: 0.08 }}
        >
          {skillCategories.map((cat, index) => {
            const Icon = iconById[cat.id] ?? Code2
            return (
              <motion.article
                key={cat.id}
                variants={cardReveal}
                className="group relative"
              >
                <motion.div whileHover={cardHover} className="h-full">
                  <div className="relative overflow-hidden rounded-none border border-zinc-800/70 bg-[radial-gradient(120%_80%_at_0%_0%,rgba(16,185,129,0.08),transparent_50%),linear-gradient(165deg,rgba(24,24,27,0.9),rgba(9,9,11,0.95))] p-5 shadow-lg shadow-black/20 backdrop-blur-sm transition-[border-color,box-shadow] duration-300 sm:px-6 sm:py-5 group-hover:border-emerald-500/35 group-hover:shadow-[0_20px_50px_-24px_rgba(16,185,129,0.25)]">
                    <div
                      className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald-500/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100 group-hover:bg-emerald-400/15"
                      aria-hidden
                    />

                    <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                      <div className="flex min-w-0 shrink-0 items-center gap-3 sm:w-[15.5rem] lg:w-[17.5rem]">
                        <span className="font-mono text-[10px] font-semibold tabular-nums tracking-[0.18em] text-emerald-500/70">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-zinc-700/80 bg-zinc-950/60 text-emerald-400/95 shadow-inner ring-1 ring-white/[0.04] transition-all duration-300 group-hover:scale-105 group-hover:border-emerald-500/40 group-hover:text-emerald-300 group-hover:shadow-[0_0_24px_-6px_rgba(16,185,129,0.35)]">
                          <Icon className="h-5 w-5" aria-hidden />
                        </span>
                        <h3 className="min-w-0 font-serif text-base font-semibold leading-snug tracking-tight text-white sm:text-lg">
                          {cat.title}
                        </h3>
                      </div>

                      <div className="hidden h-10 w-px shrink-0 bg-zinc-800/80 sm:block" aria-hidden />

                      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
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
                </motion.div>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
