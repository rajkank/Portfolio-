import { motion, useReducedMotion } from 'framer-motion'
import { Github, Linkedin, Mail, Phone } from 'lucide-react'
import { site } from '../data/site.js'
import ContactForm from './ContactForm.jsx'
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
    <section id="contact" className="w-full pb-[max(6rem,env(safe-area-inset-bottom,0px))] pt-12 sm:pb-24 sm:pt-16">
      <div className="page-container">
        <SectionHeading
          eyebrow="Contact"
          title="Let’s build something intelligent"
          description="Send a message and I’ll get it in my inbox. You’ll receive a confirmation email right away."
        />

        <motion.div
          className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(17rem,0.75fr)] lg:gap-8"
          variants={container}
          initial={reduce ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-8% 0px', amount: 0.1 }}
        >
          <motion.div variants={item} className="group/card relative min-w-0">
            <div className="absolute -inset-px rounded-none bg-gradient-to-br from-emerald-500/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" />
            <div className="relative h-full rounded-none border border-zinc-800/90 bg-zinc-900/55 p-6 shadow-lg shadow-black/20 backdrop-blur-sm sm:p-8 lg:bg-zinc-900/50 lg:backdrop-blur-md">
              <h3 className="font-serif text-xl text-white sm:text-2xl">Send a message</h3>
              <p className="mt-2 text-sm text-zinc-400">
                Tell me about the role, project, or idea. I typically reply within a day.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </motion.div>

          <motion.aside variants={item} className="group/card relative min-w-0 lg:sticky lg:top-28">
            <div className="absolute -inset-px rounded-none bg-gradient-to-br from-emerald-500/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" />
            <div className="relative rounded-none border border-zinc-800/90 bg-zinc-900/55 p-6 shadow-lg shadow-black/20 backdrop-blur-sm sm:p-7 lg:bg-zinc-900/50 lg:backdrop-blur-md">
              <h3 className="font-serif text-xl text-white">Reach me</h3>
              <p className="mt-2 text-sm text-zinc-400">Prefer email, a call, or a social ping?</p>

              <div className="mt-6 space-y-3">
                <motion.a
                  href={`mailto:${site.email}`}
                  whileHover={linkHover}
                  className="flex min-w-0 items-center gap-3 rounded-none border border-zinc-800 bg-zinc-950/50 px-4 py-3.5 text-sm text-white transition-colors hover:border-emerald-500/40"
                >
                  <Mail className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span className="min-w-0 break-words">{site.email}</span>
                </motion.a>
                <motion.a
                  href={`tel:${site.phone.replace(/\s/g, '')}`}
                  whileHover={linkHover}
                  className="flex min-w-0 items-center gap-3 rounded-none border border-zinc-800 bg-zinc-950/50 px-4 py-3.5 text-sm text-zinc-200 transition-colors hover:border-emerald-500/40"
                >
                  <Phone className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span className="min-w-0 break-words">{site.phone}</span>
                </motion.a>
              </div>

              <p className="mb-3 mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Connect
              </p>
              <div className="flex flex-col gap-3">
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
                      className={`group inline-flex min-h-[44px] w-full items-center justify-start gap-2.5 rounded-none border border-zinc-700/80 bg-zinc-900/60 px-4 py-3 ${s.accent} text-sm font-medium text-zinc-100 shadow-sm transition-colors`}
                    >
                      {s.id === 'kaggle' ? (
                        <KaggleMark className="h-7 w-7 shrink-0" />
                      ) : (
                        <Icon className="h-4 w-4 shrink-0 opacity-90" />
                      )}
                      {s.label}
                      <span className="ml-auto text-[10px] text-zinc-500 opacity-0 transition-opacity group-hover:opacity-100">
                        ↗
                      </span>
                    </motion.a>
                  )
                })}
              </div>
            </div>
          </motion.aside>
        </motion.div>
      </div>
    </section>
  )
}
