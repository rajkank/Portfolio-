import MotionReveal from './MotionReveal.jsx'
import ContactForm from './ContactForm.jsx'
import SectionHeading from './SectionHeading.jsx'

export default function Contact() {
  return (
    <section id="contact" className="section-pad w-full pb-[max(5rem,env(safe-area-inset-bottom,0px))] pt-10 sm:pb-24 sm:pt-14">
      <div className="page-container min-w-0">
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading
            eyebrow="Contact"
            title="Let’s build something intelligent"
            description="Send a message and I’ll get it in my inbox. You’ll receive a confirmation email right away."
          />
        </div>

        <MotionReveal className="mx-auto mt-2 w-full max-w-2xl min-w-0" delay={0.08} y={32}>
          <div className="border border-muted/20 bg-navy-dark/50 p-4 sm:p-6 md:p-8">
            <ContactForm />
          </div>
        </MotionReveal>
      </div>
    </section>
  )
}
