import { motion, useReducedMotion } from 'framer-motion'

export default function MotionReveal({ children, className = '', delay = 0 }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-32px 0px -16px 0px', amount: 0.12 }}
      transition={{
        duration: 0.42,
        delay,
        ease: [0.33, 0, 0.2, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
