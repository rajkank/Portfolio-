import { education } from '../data/site.js'
import { MotionItem, MotionStagger } from './MotionReveal.jsx'
import SectionHeading from './SectionHeading.jsx'

export default function Education() {
  return (
    <section id="education" lang="en" className="section-bg-navy-alt section-pad w-full">
      <div className="page-container">
        <SectionHeading
          variant="gradient"
          eyebrow="Education"
          title="Academic foundation"
          description="Information Technology at SIES GST — with strong diploma groundwork from DBATU."
        />

        <MotionStagger className="mx-auto flex max-w-3xl flex-col gap-6 sm:gap-8" stagger={0.14}>
          {education.map((edu) => (
            <MotionItem
              key={edu.id}
              as="article"
              className="group border border-muted/20 bg-navy-dark/50 p-5 transition-all duration-300 hover:border-accent/30 hover:bg-navy-dark/65 sm:p-6 md:p-8"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                <div className="min-w-0 flex-1">
                  <h3 className="text-balance-wrap font-serif text-base font-semibold leading-snug text-paper transition-colors duration-200 group-hover:text-accent sm:text-lg md:text-xl">
                    {edu.degree}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted sm:text-[15px]">
                    {edu.school}
                  </p>
                  <p className="mt-3 text-xs uppercase tracking-[0.16em] text-muted/90 sm:text-sm">
                    {edu.period}
                  </p>
                </div>

                <div className="w-full shrink-0 border border-muted/20 px-4 py-3 sm:w-auto sm:text-right">
                  <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted/80">
                    Result
                  </p>
                  <p className="mt-1 font-serif text-lg font-semibold text-paper sm:text-xl">
                    {edu.result}
                  </p>
                </div>
              </div>
            </MotionItem>
          ))}
        </MotionStagger>
      </div>
    </section>
  )
}
