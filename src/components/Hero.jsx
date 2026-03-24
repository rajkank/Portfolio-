import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ArrowUpRight, AtSign, Mail } from 'lucide-react'
import { site } from '../data/site.js'
import { useFinePointer } from '../hooks/useFinePointer.js'
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

const wordHeadline = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
}

const word = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease },
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

/** Portrait entrance: eased tween (no spring overshoot) for a smooth settle */
const imageReveal = {
  hidden: { opacity: 0, x: 48, scale: 0.96 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      delay: 0.16,
      opacity: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
      x: { duration: 0.95, ease: [0.16, 1, 0.3, 1] },
      scale: { duration: 0.95, ease: [0.16, 1, 0.3, 1] },
    },
  },
}

function scrollToId(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Hero() {
  const reduce = useReducedMotion()
  const finePointer = useFinePointer()
  /** 3D tilt + pointer tracking — only for mouse/trackpad (saves GPU/CPU on phones). */
  const tiltEnabled = finePointer && !reduce
  /** Rotating rim, shimmer, pulse rings — skip on touch / reduced motion. */
  const showHeavyDecor = finePointer && !reduce
  const [heroLineVisible, setHeroLineVisible] = useState(true)
  const portraitRef = useRef(null)

  const pointerX = useMotionValue(0.5)
  const pointerY = useMotionValue(0.5)
  const springX = useSpring(pointerX, {
    stiffness: 160,
    damping: 44,
    mass: 0.65,
    restDelta: 0.001,
  })
  const springY = useSpring(pointerY, {
    stiffness: 160,
    damping: 44,
    mass: 0.65,
    restDelta: 0.001,
  })

  const tiltRotateY = useTransform(springX, [0, 1], [-5, 5])
  const tiltRotateX = useTransform(springY, [0, 1], [4.5, -4.5])

  const onPortraitPointerMove = (e) => {
    if (!tiltEnabled || !portraitRef.current) return
    const r = portraitRef.current.getBoundingClientRect()
    pointerX.set(Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)))
    pointerY.set(Math.min(1, Math.max(0, (e.clientY - r.top) / r.height)))
  }

  const onPortraitPointerLeave = () => {
    pointerX.set(0.5)
    pointerY.set(0.5)
  }

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
  const imageState = reduce ? 'visible' : 'hidden'

  const textHover = reduce
    ? undefined
    : {
        y: -4,
        transition: { type: 'spring', stiffness: 280, damping: 32, mass: 0.9 },
      }

  const imageHover =
    reduce || !finePointer
      ? undefined
      : {
          y: -5,
          scale: 1.012,
          transition: { type: 'spring', stiffness: 220, damping: 36, mass: 0.85 },
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
          animate="visible"
          whileHover={textHover}
        >
          <motion.h1
            variants={wordHeadline}
            initial={textState}
            animate="visible"
            className="font-serif text-[clamp(1.875rem,4.5vw+0.25rem,3.75rem)] leading-[1.12] tracking-tight text-white transition-[text-shadow] duration-300 group-hover:text-emerald-50 group-hover:[text-shadow:0_0_32px_rgba(16,185,129,0.15)]"
          >
            <span className="sr-only">{HEADLINE}</span>
            <span
              className="flex flex-wrap gap-x-[0.3em] gap-y-1 transition-colors duration-300 group-hover:text-emerald-50"
              aria-hidden="true"
            >
              {headlineWords.map((w, i) => (
                <motion.span key={`${w}-${i}`} variants={word} className="inline-block">
                  {w}
                  {i === headlineWords.length - 1 ? '.' : ''}
                </motion.span>
              ))}
            </span>
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
              onClick={() => scrollToId('contact')}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-zinc-950 shadow-lg shadow-emerald-500/10 transition hover:bg-zinc-100 sm:w-auto sm:py-3"
            >
              <Mail className="h-4 w-4" />
              Let&apos;s talk
            </button>
            <button
              type="button"
              onClick={() => scrollToId('projects')}
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
          variants={imageReveal}
          initial={imageState}
          animate="visible"
          whileHover={imageHover}
          className="group relative mx-auto w-full max-w-[min(100%,300px)] sm:max-w-[340px] lg:mx-0 lg:ml-auto lg:max-w-[360px] xl:max-w-[380px] lg:justify-self-end"
        >
          {/* Ambient glow */}
          <div className="pointer-events-none absolute -inset-8 rounded-[3rem] bg-[radial-gradient(ellipse_at_50%_40%,rgba(16,185,129,0.22),transparent_65%)] blur-2xl transition-opacity duration-500 group-hover:opacity-100 sm:-inset-10" />
          <div className="pointer-events-none absolute -inset-4 rounded-[2.75rem] bg-gradient-to-br from-emerald-500/20 via-transparent to-teal-700/15 blur-xl transition-all duration-500 group-hover:from-emerald-400/35 group-hover:to-teal-600/25" />

          {/* Gentle idle float — disabled when reduced motion */}
          <motion.div
            className="relative"
            animate={
              reduce || !finePointer
                ? undefined
                : {
                    y: [0, -4],
                  }
            }
            transition={
              reduce || !finePointer
                ? undefined
                : {
                    duration: 7,
                    repeat: Infinity,
                    repeatType: 'mirror',
                    ease: [0.45, 0, 0.55, 1],
                  }
            }
          >
            {/* Breathing accent rings */}
            {showHeavyDecor && (
              <>
                <motion.span
                  className="pointer-events-none absolute -inset-3 rounded-[2.75rem] border border-emerald-400/25 sm:-inset-4"
                  aria-hidden
                  animate={{ scale: [1, 1.05], opacity: [0.4, 0] }}
                  transition={{
                    duration: 3.4,
                    repeat: Infinity,
                    repeatDelay: 0.2,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                />
                <motion.span
                  className="pointer-events-none absolute -inset-3 rounded-[2.75rem] border border-teal-400/20 sm:-inset-4"
                  aria-hidden
                  animate={{ scale: [1, 1.06], opacity: [0.32, 0] }}
                  transition={{
                    duration: 3.4,
                    repeat: Infinity,
                    repeatDelay: 0.2,
                    delay: 1.1,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                />
              </>
            )}

            <motion.div
              className="relative origin-center will-change-transform [transform-style:preserve-3d]"
              style={
                tiltEnabled
                  ? {
                      rotateX: tiltRotateX,
                      rotateY: tiltRotateY,
                      rotateZ: -1.5,
                      transformPerspective: 960,
                    }
                  : {
                      rotateX: 0,
                      rotateY: 0,
                      rotateZ: -1.5,
                      transformPerspective: 960,
                    }
              }
            >
              <div
                ref={portraitRef}
                className="relative z-[1] cursor-default"
                onPointerMove={tiltEnabled ? onPortraitPointerMove : undefined}
                onPointerLeave={tiltEnabled ? onPortraitPointerLeave : undefined}
              >
                {/* Slow rotating rim light (subtle) */}
                {showHeavyDecor && (
                  <motion.div
                    className="pointer-events-none absolute -inset-[35%] z-0 rounded-full opacity-40 blur-3xl"
                    style={{
                      background:
                        'conic-gradient(from 0deg, rgba(52,211,153,0.5), transparent 28%, rgba(20,184,166,0.35), transparent 62%, rgba(52,211,153,0.45))',
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                    aria-hidden
                  />
                )}

                {/* Gradient frame + inner well */}
                <div className="relative z-[1] rounded-[2.5rem] bg-gradient-to-br from-emerald-300/50 via-teal-500/35 to-zinc-900/90 p-[3px] shadow-[0_32px_64px_-28px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.08)] transition-[box-shadow,filter] duration-500 group-hover:shadow-[0_40px_80px_-28px_rgba(16,185,129,0.32),0_0_0_1px_rgba(16,185,129,0.25)]">
                  <div className="relative overflow-hidden rounded-[calc(2.5rem-3px)] bg-zinc-950 ring-1 ring-zinc-800/70">
                    {/* Soft inner vignette */}
                    <div className="pointer-events-none absolute inset-0 z-[1] rounded-[inherit] shadow-[inset_0_0_60px_rgba(0,0,0,0.35)]" aria-hidden />
                    {/* Shimmer sweep */}
                    {showHeavyDecor && (
                      <motion.div
                        className="pointer-events-none absolute inset-0 z-[2] overflow-hidden rounded-[inherit]"
                        aria-hidden
                      >
                        <motion.div
                          className="absolute -left-[40%] top-0 h-full w-[45%] skew-x-[-14deg] bg-gradient-to-r from-transparent via-white/14 to-transparent opacity-60"
                          initial={false}
                          animate={{ x: ['-35%', '200%'] }}
                          transition={{
                            duration: 2.2,
                            repeat: Infinity,
                            repeatDelay: 5,
                            ease: [0.33, 0, 0.2, 1],
                          }}
                        />
                      </motion.div>
                    )}
                    <img
                      src={site.profileImage}
                      alt={`${site.name}, ${site.title}`}
                      className="relative z-0 aspect-[3/4] w-full object-cover object-[center_12%] transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-[1.03]"
                      width={400}
                      height={534}
                      loading="eager"
                      decoding="async"
                      fetchPriority="high"
                    />
                  </div>
                </div>
              </div>

              {/* Caption outside the frame */}
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduce ? 0 : 0.75, duration: 0.45, ease }}
                className="mt-6 text-center lg:text-right"
              >
                <p className="font-serif text-xl tracking-tight text-white sm:text-2xl">{site.name}</p>
                <p className="mt-1.5 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-emerald-400/90">
                  {site.title}
                </p>
                <motion.span
                  className="mx-auto mt-4 block h-px w-12 origin-right bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent lg:ml-auto lg:mr-0"
                  aria-hidden
                  initial={reduce ? false : { scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ delay: reduce ? 0 : 0.95, duration: 0.55, ease }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
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
        transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ transformOrigin: 'center' }}
      >
        <div className="mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-white/55 to-transparent sm:max-w-4xl lg:max-w-5xl" />
      </motion.div>
    </section>
  )
}
