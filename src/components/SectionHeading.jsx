import MotionReveal from './MotionReveal.jsx'

export default function SectionHeading({ eyebrow, title, description, variant = 'default' }) {
  const isLight = variant === 'light'
  const isGradient = variant === 'gradient'

  const eyebrowClass = isLight
    ? 'text-accent/90'
    : isGradient
      ? 'text-accent/80'
      : 'text-accent/90'

  const titleClass = isLight ? 'text-navy-midnight' : 'text-paper'

  const descClass = isLight
    ? 'text-muted'
    : isGradient
      ? 'text-paper/85/90'
      : 'text-muted'

  return (
    <MotionReveal className="mb-8 max-w-2xl min-w-0 sm:mb-12">
      {eyebrow ? (
        <p className={`mb-2 text-xs font-semibold uppercase tracking-[0.2em] ${eyebrowClass}`}>
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`font-serif text-[clamp(1.5rem,4.5vw,2.25rem)] tracking-tight sm:text-3xl md:text-4xl ${titleClass}`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`mt-3 text-sm leading-relaxed sm:text-base ${descClass}`}>{description}</p>
      ) : null}
    </MotionReveal>
  )
}
