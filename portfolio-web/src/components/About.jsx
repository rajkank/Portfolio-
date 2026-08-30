import { motion, useReducedMotion } from 'framer-motion'
import { site } from '../data/site.js'
import GlassCard from './GlassCard.jsx'
import MotionReveal from './MotionReveal.jsx'
import SectionHeading from './SectionHeading.jsx'

const cardHover = {
  y: -4,
  transition: { type: 'spring', stiffness: 380, damping: 28 },
}

export default function About() {
  const reduce = useReducedMotion()
  const hover = reduce ? undefined : cardHover

  return (
    <section id="about" lang="en" className="section-bg-teal scroll-mt-24 w-full py-20">
      <div className="page-container">
        <SectionHeading
          variant="gradient"
          eyebrow="About"
          title="Building AI that works in the real world"
        />

        <MotionReveal>
          <motion.div
            whileHover={hover}
            className="group h-full rounded-2xl border border-transparent p-1 transition-colors duration-300 hover:border-emerald-500/10"
          >
            <GlassCard className="relative overflow-hidden p-6 transition-shadow duration-300 group-hover:shadow-[0_0_48px_-16px_rgba(16,185,129,0.12)] sm:p-8 lg:p-10">
              <div
                className="pointer-events-none absolute left-0 top-0 h-full w-1 rounded-full bg-gradient-to-b from-emerald-500/80 via-emerald-500/30 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden
              />
              <div className="pl-4 sm:pl-5">
                <h3 className="font-serif text-2xl text-white sm:text-3xl">Bio</h3>
                <p className="mt-6 w-full text-justify text-[15px] leading-[1.85] text-zinc-400 [text-justify:inter-word] hyphens-auto sm:text-base sm:leading-[1.9]">
                  {site.aboutBio}
                </p>
              </div>
            </GlassCard>
          </motion.div>
        </MotionReveal>
      </div>
    </section>
  )
}
