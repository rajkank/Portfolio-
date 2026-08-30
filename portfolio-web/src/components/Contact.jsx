import { motion, useReducedMotion } from 'framer-motion'
import { Github, Linkedin, Mail, Phone } from 'lucide-react'
import { site } from '../data/site.js'
import SectionHeading from './SectionHeading.jsx'

const spring = { type: 'spring', stiffness: 400, damping: 30 }

function KaggleMark({ className = '' }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-md border border-[#20BEFF]/45 bg-[#20BEFF]/12 font-mono text-[10px] font-bold leading-none text-[#20BEFF] ${className}`}
      aria-hidden
    >
      K
    </span>
  )
}

const socialLinks = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: site.social.linkedin,
    Icon: Linkedin,
    accent: 'hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/10 hover:text-[#93C5FD]',
  },
  {
    id: 'github',
    label: 'GitHub',
    href: site.social.github,
    Icon: Github,
    accent: 'hover:border-zinc-400/40 hover:bg-white/5 hover:text-white',
  },
  {
    id: 'kaggle',
    label: 'Kaggle',
    href: site.social.kaggle,
    Icon: KaggleMark,
    accent: 'hover:border-[#20BEFF]/45 hover:bg-[#20BEFF]/10 hover:text-[#7dd3fc]',
  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.06 } },
}

const item = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function Contact() {
  const reduce = useReducedMotion()
  const linkHover = reduce ? undefined : { scale: 1.02, transition: spring }

  return (
    <section id="contact" className="scroll-mt-24 w-full pb-24 pt-12 sm:pt-16">
      <div className="page-container">
        <SectionHeading
          eyebrow="Contact"
          title="Let’s build something intelligent"
          description="Reach out for roles in AI engineering, GenAI systems, or collaboration on products."
        />

        <motion.div
          className="mx-auto max-w-3xl"
          variants={container}
          initial={reduce ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
        >
          {/* Direct lines */}
          <motion.div variants={item} className="group/card relative mb-8">
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-emerald-500/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" />
            <div className="relative rounded-2xl border border-zinc-800/90 bg-zinc-900/50 p-6 shadow-lg shadow-black/20 backdrop-blur-md sm:p-8">
              <p className="text-sm text-zinc-400">
                Prefer email? I typically reply within a day. For a quick intro, mention the kind of AI
                problem you’re solving.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <motion.a
                  href={`mailto:${site.email}`}
                  whileHover={linkHover}
                  className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-950/50 px-4 py-3.5 text-sm text-white transition-colors hover:border-emerald-500/40"
                >
                  <Mail className="h-4 w-4 shrink-0 text-emerald-400" />
                  {site.email}
                </motion.a>
                <motion.a
                  href={`tel:${site.phone.replace(/\s/g, '')}`}
                  whileHover={linkHover}
                  className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-950/50 px-4 py-3.5 text-sm text-zinc-200 transition-colors hover:border-emerald-500/40"
                >
                  <Phone className="h-4 w-4 shrink-0 text-emerald-400" />
                  {site.phone}
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Social — LinkedIn → GitHub → Kaggle */}
          <motion.div variants={item}>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Connect
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {socialLinks.map((s) => {
                const Icon = s.Icon
                return (
                  <motion.a
                    key={s.id}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={linkHover}
                    whileTap={reduce ? undefined : { scale: 0.98 }}
                    className={`group inline-flex min-w-[160px] flex-1 items-center justify-center gap-2.5 rounded-2xl border border-zinc-700/80 bg-zinc-900/60 px-5 py-3.5 text-sm font-medium text-zinc-100 shadow-sm transition-colors sm:min-w-[140px] ${s.accent}`}
                  >
                    {s.id === 'kaggle' ? (
                      <KaggleMark className="h-7 w-7 shrink-0" />
                    ) : (
                      <Icon className="h-4 w-4 shrink-0 opacity-90" />
                    )}
                    {s.label}
                    <span className="ml-0.5 text-[10px] text-zinc-500 opacity-0 transition-opacity group-hover:opacity-100">
                      ↗
                    </span>
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
