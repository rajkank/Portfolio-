import { motion, useReducedMotion } from 'framer-motion'

export const revealViewport = { once: true, margin: '-8% 0px', amount: 0.12 }
export const revealEase = [0.22, 1, 0.36, 1]

export default function MotionReveal({ children, className = '', delay = 0, y = 24, as = 'div' }) {
  const reduce = useReducedMotion()
  const Tag = motion[as] ?? motion.div

  return (
    <Tag
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={{
        duration: 0.55,
        delay,
        ease: revealEase,
      }}
      className={className}
    >
      {children}
    </Tag>
  )
}

export function MotionStagger({
  children,
  className = '',
  stagger = 0.1,
  delayChildren = 0.06,
  as = 'div',
}) {
  const reduce = useReducedMotion()
  const Tag = motion[as] ?? motion.div

  return (
    <Tag
      className={className}
      initial={reduce ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={revealViewport}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren },
        },
      }}
    >
      {children}
    </Tag>
  )
}

export function MotionItem({ children, className = '', y = 32, as = 'div' }) {
  const reduce = useReducedMotion()
  const Tag = motion[as] ?? motion.div

  return (
    <Tag
      className={className}
      variants={{
        hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: revealEase },
        },
      }}
    >
      {children}
    </Tag>
  )
}
