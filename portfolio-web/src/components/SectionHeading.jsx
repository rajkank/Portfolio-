import MotionReveal from './MotionReveal.jsx'

export default function SectionHeading({ eyebrow, title, description, variant = 'default' }) {
  const isLight = variant === 'light'
  const isGradient = variant === 'gradient'

  const eyebrowClass = isLight
    ? 'text-emerald-800/90'
    : isGradient
      ? 'text-emerald-100/80'
      : 'text-emerald-400/90'

  const titleClass = isLight ? 'text-zinc-900' : 'text-white'

  const descClass = isLight
    ? 'text-zinc-700'
    : isGradient
      ? 'text-zinc-200/90'
      : 'text-zinc-400'

  return (
    <MotionReveal className="mb-8 max-w-2xl sm:mb-12">
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
