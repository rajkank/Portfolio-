import { skillCategories } from '../data/site.js'
import MotionReveal, { MotionItem, MotionStagger } from './MotionReveal.jsx'

export default function Skills() {
  return (
    <section id="skills" className="section-pad w-full bg-black text-white">
      <div className="page-container">
        <MotionReveal as="header" className="mb-10 max-w-2xl sm:mb-12">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">Skills</p>
          <h2 className="mt-2 font-serif text-[clamp(1.75rem,4.8vw,2.25rem)] tracking-tight sm:text-4xl">Technical toolkit</h2>
          <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
            Generative AI, machine learning, NLP, computer vision, APIs, and the stack behind
            production systems.
          </p>
        </MotionReveal>

        <MotionStagger
          className="grid gap-6 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-8 lg:gap-x-14 lg:gap-y-10"
          stagger={0.08}
          delayChildren={0.04}
        >
          {skillCategories.map((cat, index) => (
            <MotionItem
              key={cat.id}
              as="article"
              className="group border-l border-white/15 pl-4 transition-all duration-300 hover:border-white/55 hover:bg-white/[0.03] hover:pl-5 sm:pl-5 sm:hover:pl-6"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[10px] font-medium tabular-nums tracking-[0.18em] text-white/35 transition-colors duration-200 group-hover:text-white/60">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="min-w-0 text-base font-semibold leading-snug transition-colors duration-200 group-hover:text-white sm:text-lg">
                  {cat.title}
                </h3>
              </div>
              <p className="text-balance-wrap mt-3 text-sm leading-relaxed text-white/75 transition-colors duration-200 group-hover:text-white/90 sm:text-[15px]">
                {cat.items.join(' · ')}
              </p>
            </MotionItem>
          ))}
        </MotionStagger>
      </div>
    </section>
  )
}
