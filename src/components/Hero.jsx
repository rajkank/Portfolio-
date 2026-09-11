import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { site } from '../data/site.js'
import Sparkles from './Sparkles.jsx'
import ResumeHeroButton from './resume/ResumeHeroButton.jsx'

const ease = [0.22, 1, 0.36, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, ease },
  },
}

const textStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
}

export default function Hero() {
  const reduce = useReducedMotion()
  const [heroLineVisible, setHeroLineVisible] = useState(true)

  useEffect(() => {
    const hero = document.getElementById('hero')
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        if (!hero) {
          ticking = false
          return
        }
        const rect = hero.getBoundingClientRect()
        const stillInHero = rect.bottom > 80 && rect.top < window.innerHeight * 0.92
        setHeroLineVisible((prev) => (prev === stillInHero ? prev : stillInHero))
        ticking = false
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const initialState = reduce ? 'visible' : 'hidden'
  const animateState = 'visible'

  return (
    <section
      id="hero"
      className="section-hero relative flex min-h-[100svh] min-h-[100dvh] w-full flex-col justify-center overflow-x-hidden pb-10 pt-[calc(5rem+env(safe-area-inset-top,0px))] sm:pb-16 sm:pt-24 lg:pb-20 lg:pt-28"
    >
      <Sparkles />

      <div className="page-container grid w-full min-w-0 items-center gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(260px,420px)] lg:gap-14 xl:gap-20">
        <motion.div
          className="min-w-0"
          variants={textStagger}
          initial={initialState}
          animate={animateState}
        >
          <motion.h1
            variants={fadeUp}
            className="max-w-2xl font-serif text-[clamp(1.65rem,5.2vw,3.25rem)] leading-[1.12] tracking-tight text-paper xl:max-w-3xl"
          >
            <span className="font-semibold">{site.hero.headline}</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted sm:mt-6 sm:text-base md:text-lg md:leading-[1.75]"
          >
            {site.hero.intro}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8">
            <ResumeHeroButton />
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial={initialState}
          animate={animateState}
          className="relative mx-auto w-full max-w-[min(100%,300px)] sm:max-w-[340px] lg:mx-0 lg:ml-auto lg:max-w-none lg:justify-self-end"
        >
          <div
            className="pointer-events-none absolute -inset-6 rounded-full bg-[radial-gradient(circle,rgba(88,224,213,0.18),transparent_68%)] blur-2xl sm:-inset-8"
            aria-hidden
          />

          <div className="relative overflow-hidden rounded-none border border-paper/15 bg-navy-deep/40 p-1.5 shadow-[0_28px_64px_-24px_rgba(0,0,0,0.65)] ring-1 ring-accent/20">
            <div className="overflow-hidden rounded-none bg-navy-midnight">
              <img
                src={site.profileImage}
                alt={site.name}
                width={840}
                height={1050}
                className="aspect-[4/5] w-full object-cover object-[center_14%]"
                decoding="async"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-10"
        aria-hidden
        initial={false}
        animate={
          reduce
            ? { opacity: 1, scaleX: 1 }
            : {
                opacity: heroLineVisible ? 1 : 0,
                scaleX: heroLineVisible ? 1 : 0.4,
              }
        }
        transition={{ type: 'tween', duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ transformOrigin: 'center' }}
      >
        <div className="mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-paper/55 to-transparent sm:max-w-4xl lg:max-w-5xl" />
      </motion.div>
    </section>
  )
}
