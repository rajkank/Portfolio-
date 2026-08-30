import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, AtSign, Mail } from 'lucide-react'
import { useLoaderGate } from '../context/LoaderGate.jsx'
import { site } from '../data/site.js'
import { scrollToSection } from '../utils/scrollToSection.js'
import Sparkles from './Sparkles.jsx'
import ResumeHeroButton from './resume/ResumeHeroButton.jsx'

const ease = [0.22, 1, 0.36, 1]

const HEADLINE = 'Welcome to my digital humble abode.'
const headlineWords = HEADLINE.replace(/\.$/, '').split(' ')

const textStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
}

/** Stagger container for headline words (text reveal) */
const headlineRevealContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.085,
      delayChildren: 0.1,
    },
  },
}

/** Clip row — participates in stagger chain */
const headlineWordClip = {
  hidden: {},
  visible: {},
}

const headlineWordReveal = {
  hidden: { y: '100%' },
  visible: {
    y: 0,
    transition: { duration: 0.58, ease },
  },
}

const headlineWordRevealReduced = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.35, ease },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, ease },
  },
}

export default function Hero() {
  const reduce = useReducedMotion()
  const { heroAnimationReady } = useLoaderGate()
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

  const textState = reduce ? 'visible' : 'hidden'
  /** Wait for the page loader to finish so entrance animations are visible on every load. */
  const animateState = reduce ? 'visible' : heroAnimationReady ? 'visible' : 'hidden'

  const textHover = reduce
    ? undefined
    : {
        y: -4,
        transition: { type: 'spring', stiffness: 280, damping: 32, mass: 0.9 },
      }

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] min-h-[100dvh] w-full flex-col justify-center overflow-x-hidden pb-12 pt-[calc(5.75rem+env(safe-area-inset-top,0px))] sm:pb-20 sm:pt-28"
    >
      <Sparkles />

      <div className="page-container grid w-full gap-10 lg:grid-cols-[minmax(0,1.15fr)_auto] lg:items-center lg:gap-12 xl:gap-16">
        <motion.div
          className="group min-w-0 rounded-2xl border border-transparent p-5 -m-5 transition-colors duration-300 hover:border-emerald-500/15 hover:bg-zinc-900/25 hover:shadow-[0_0_48px_-16px_rgba(16,185,129,0.12)] sm:p-6 sm:-m-6"
          variants={textStagger}
          initial={textState}
          animate={animateState}
          whileHover={textHover}
        >
          <motion.h1
            variants={fadeUp}
            initial={textState}
            animate={animateState}
            className="font-serif text-[clamp(1.875rem,4.5vw+0.25rem,3.75rem)] leading-[1.12] tracking-tight text-white transition-[text-shadow] duration-300 group-hover:text-emerald-50 group-hover:[text-shadow:0_0_32px_rgba(16,185,129,0.15)]"
          >
            <span className="sr-only">{HEADLINE}</span>
            <motion.span
              variants={headlineRevealContainer}
              className="flex flex-wrap gap-x-[0.3em] gap-y-1 transition-colors duration-300 group-hover:text-emerald-50"
              aria-hidden="true"
            >
              {headlineWords.map((w, i) => (
                <motion.span
                  key={`${w}-${i}`}
                  variants={headlineWordClip}
                  className="inline-block overflow-hidden pb-[0.14em] align-bottom"
                >
                  <motion.span
                    variants={reduce ? headlineWordRevealReduced : headlineWordReveal}
                    className="inline-block will-change-transform"
                  >
                    {w}
                    {i === headlineWords.length - 1 ? '.' : ''}
                  </motion.span>
                </motion.span>
              ))}
            </motion.span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400 transition-colors duration-300 group-hover:text-zinc-300 sm:text-lg xl:max-w-3xl"
          >
            I&apos;m <span className="font-semibold text-zinc-200">{site.nameDisplay}</span>
            — {site.title}. {site.tagline}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3"
          >
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-zinc-950 shadow-lg shadow-emerald-500/10 transition hover:bg-zinc-100 sm:w-auto sm:py-3"
            >
              <Mail className="h-4 w-4" />
              Let&apos;s talk
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('projects')}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-zinc-600 bg-zinc-900/40 px-6 py-3.5 text-sm font-medium text-white transition hover:border-emerald-500/40 hover:bg-zinc-800/60 sm:w-auto sm:py-3"
            >
              View projects
              <ArrowUpRight className="h-4 w-4" />
            </button>
            <ResumeHeroButton />
            <a
              href={`mailto:${site.email}`}
              className="inline-flex min-w-0 max-w-full items-center gap-2 break-all rounded-full border border-transparent px-2 py-2 text-sm text-zinc-500 transition hover:text-emerald-400 sm:break-normal"
            >
              <AtSign className="h-4 w-4 opacity-70" />
              {site.email}
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial={textState}
          animate={animateState}
          className="group relative mx-auto w-full max-w-[min(100%,340px)] lg:mx-0 lg:ml-auto lg:max-w-md lg:justify-self-end"
        >
          <div className="pointer-events-none absolute -inset-8 rounded-[3rem] bg-[radial-gradient(ellipse_at_50%_40%,rgba(16,185,129,0.22),transparent_65%)] blur-2xl transition-opacity duration-500 group-hover:opacity-100 sm:-inset-10" />
          <div className="pointer-events-none absolute -inset-4 rounded-[2.75rem] bg-gradient-to-br from-emerald-500/18 via-transparent to-teal-700/12 blur-xl transition-all duration-500 group-hover:from-emerald-400/28 group-hover:to-teal-600/20" />

          <div className="relative rounded-[2.5rem] bg-gradient-to-br from-emerald-300/45 via-teal-500/30 to-zinc-900/90 p-[3px] shadow-[0_32px_64px_-28px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.08)] transition-[box-shadow] duration-500 group-hover:shadow-[0_40px_80px_-28px_rgba(16,185,129,0.22),0_0_0_1px_rgba(16,185,129,0.2)]">
            <div className="rounded-[calc(2.5rem-3px)] bg-zinc-950/90 px-8 py-9 ring-1 ring-zinc-800/70 backdrop-blur-sm sm:px-10 sm:py-11">
              <p className="font-serif text-[clamp(1.75rem,3.2vw+0.35rem,2.85rem)] leading-[1.15] tracking-tight text-white">
                {site.name}
              </p>
              <p className="mt-4 text-[0.7rem] font-medium uppercase leading-snug tracking-[0.22em] text-emerald-400/95 sm:text-xs">
                {site.title}
              </p>
              <motion.span
                className="mt-8 block h-px w-16 max-w-full origin-left bg-gradient-to-r from-emerald-400/55 via-emerald-400/25 to-transparent lg:ml-auto lg:origin-right"
                aria-hidden
                initial={reduce ? false : { scaleX: 0, opacity: 0 }}
                animate={
                  reduce || heroAnimationReady
                    ? { scaleX: 1, opacity: 1 }
                    : { scaleX: 0, opacity: 0 }
                }
                transition={{ delay: reduce ? 0 : 0.45, duration: 0.55, ease }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom separator: visible while hero is on screen; fades when scrolling away */}
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
        <div className="mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-white/55 to-transparent sm:max-w-4xl lg:max-w-5xl" />
      </motion.div>
    </section>
  )
}
