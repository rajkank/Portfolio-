import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks, site } from '../data/site.js'
import ScrollProgressBar from './ScrollProgressBar.jsx'
import { scrollToSection } from '../utils/scrollToSection.js'

/** Panel exit duration — keep in sync with `panelVariants.exit` so scroll-after-close stays aligned. */
const PANEL_EXIT_DURATION_S = 0.28

const easeOut = [0.22, 1, 0.36, 1]
const easeIn = [0.4, 0, 1, 1]

const panelVariants = {
  hidden: {
    opacity: 0,
    y: -20,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: easeOut },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.99,
    transition: { duration: PANEL_EXIT_DURATION_S, ease: easeIn },
  },
}

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.055, delayChildren: 0.08 },
  },
  exit: {
    transition: { staggerChildren: 0.035, staggerDirection: -1 },
  },
}

const linkVariants = {
  hidden: { opacity: 0, x: -18 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.34, ease: easeOut },
  },
  exit: {
    opacity: 0,
    x: -10,
    transition: { duration: 0.18, ease: easeIn },
  },
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  /** Section to scroll to after the mobile drawer finishes closing (layout must match final header height). */
  const pendingSectionIdRef = useRef(null)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const next = window.scrollY > 24
        setScrolled((prev) => (prev === next ? prev : next))
        ticking = false
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const onViewportChange = () => {
      if (mq.matches) setOpen(false)
    }
    mq.addEventListener('change', onViewportChange)
    return () => mq.removeEventListener('change', onViewportChange)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const closeMenu = () => setOpen(false)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex flex-col pt-[env(safe-area-inset-top,0px)] isolate transition-[background,box-shadow,border-color] duration-300 ${
        scrolled
          ? 'border-b border-zinc-800/80 bg-zinc-950/80 shadow-lg shadow-black/20 backdrop-blur-md'
          : 'border-b border-white/12 bg-transparent shadow-[0_1px_0_0_rgba(255,255,255,0.06)]'
      }`}
    >
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.button
                key="mobile-nav-scrim"
                type="button"
                aria-label="Close menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="fixed inset-0 z-[45] cursor-default border-0 bg-black/55 backdrop-blur-[3px] md:hidden"
                onClick={closeMenu}
              />
            )}
          </AnimatePresence>,
          document.body,
        )}

      <ScrollProgressBar />
      <div className="page-container flex h-16 max-w-none items-center justify-between">
        <button
          type="button"
          onClick={() => scrollToSection('hero')}
          className="group flex items-center gap-2 text-left"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-zinc-700/80 bg-zinc-900/60 transition group-hover:border-emerald-500/40">
            <img
              src="/favicon.svg"
              alt=""
              width={36}
              height={36}
              className="h-full w-full object-cover"
              decoding="async"
            />
          </span>
          <span className="hidden flex-col sm:flex">
            <span className="text-sm font-semibold text-white">{site.name}</span>
            <span className="text-[11px] text-zinc-500">{site.title}</span>
          </span>
        </button>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollToSection(link.id)}
              className="group relative rounded-full px-3 py-1.5 text-sm text-zinc-400 transition hover:bg-zinc-800/60 hover:text-white"
            >
              <span className="relative z-10">{link.label}</span>
              <span
                className="pointer-events-none absolute inset-x-3 bottom-1.5 h-[2px] origin-center scale-x-0 rounded-full bg-gradient-to-r from-emerald-400/30 via-emerald-400 to-teal-500/70 shadow-[0_0_12px_rgba(52,211,153,0.35)] transition-transform duration-300 ease-out group-hover:scale-x-100"
                aria-hidden
              />
            </button>
          ))}
        </nav>

        <motion.button
          type="button"
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/50 text-zinc-200 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          whileTap={{ scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        >
          <motion.span
            className="inline-flex"
            initial={false}
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ duration: 0.28, ease: easeOut }}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </motion.span>
        </motion.button>
      </div>

      <AnimatePresence
        onExitComplete={() => {
          const id = pendingSectionIdRef.current
          if (!id) return
          pendingSectionIdRef.current = null
          requestAnimationFrame(() => {
            requestAnimationFrame(() => scrollToSection(id))
          })
        }}
      >
        {open ? (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Primary navigation"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative z-[51] border-b border-emerald-500/15 bg-gradient-to-b from-zinc-950/98 via-zinc-950/95 to-zinc-950/90 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.65)] backdrop-blur-xl md:hidden"
          >
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/35 to-transparent"
              aria-hidden
            />
            <motion.div
              variants={listVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="page-container flex max-h-[min(70dvh,28rem)] flex-col gap-0.5 overflow-y-auto overscroll-contain px-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))] pt-2 sm:px-6"
            >
              {navLinks.map((link) => (
                <motion.button
                  key={link.id}
                  type="button"
                  variants={linkVariants}
                  onClick={() => {
                    pendingSectionIdRef.current = link.id
                    setOpen(false)
                  }}
                  className="group relative min-h-11 rounded-xl px-3 py-3 text-left text-base text-zinc-100 transition-colors hover:bg-emerald-500/10 hover:text-white sm:min-h-0 sm:text-sm"
                >
                  <span className="relative z-10">{link.label}</span>
                  <span
                    className="pointer-events-none absolute inset-x-3 bottom-2 h-[2px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-emerald-400/40 via-emerald-400 to-teal-500/60 shadow-[0_0_12px_rgba(52,211,153,0.35)] transition-transform duration-300 ease-out group-hover:scale-x-100 group-active:scale-x-100"
                    aria-hidden
                  />
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
