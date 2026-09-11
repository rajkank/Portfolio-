import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks, navCta, site } from '../data/site.js'
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
    const mq = window.matchMedia('(min-width: 1024px)')
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
      className={`fixed inset-x-0 top-0 z-50 flex flex-col pt-[env(safe-area-inset-top,0px)] isolate transition-[background,box-shadow,border-color,color] duration-300 ${
        scrolled
          ? 'border-b border-muted/25 bg-nav-soft/95 shadow-sm shadow-navy-midnight/8 backdrop-blur-md'
          : 'surface-nav-gradient border-b border-paper/20 shadow-[0_1px_0_0_rgba(255,255,255,0.12)]'
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
                className="fixed inset-0 z-[45] cursor-default border-0 bg-black/55 backdrop-blur-[3px] lg:hidden"
                onClick={closeMenu}
              />
            )}
          </AnimatePresence>,
          document.body,
        )}

      <ScrollProgressBar scrolled={scrolled} />
      <div className="page-container flex h-16 max-w-none items-center justify-between">
        <button
          type="button"
          onClick={() => scrollToSection('hero')}
          className="group flex items-center gap-2 text-left"
        >
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl border transition ${
              scrolled
                ? 'border-muted/30 bg-navy-midnight/6 group-hover:border-muted/45'
                : 'border-paper/25 bg-paper/10 group-hover:border-paper/45'
            }`}
          >
            <img
              src="/favicon.ico"
              alt=""
              width={36}
              height={36}
              className="h-full w-full object-cover"
              decoding="async"
            />
          </span>
          <span className="min-w-0 max-w-[9.5rem] truncate sm:max-w-none">
            <span
              className={`block truncate text-sm font-semibold transition-colors ${
                scrolled ? 'text-navy-midnight' : 'text-paper'
              }`}
            >
              {site.navName}
            </span>
          </span>
        </button>

        <nav className="hidden items-center gap-0.5 lg:flex xl:gap-1" aria-label="Primary">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollToSection(link.id)}
              className={`group relative shrink-0 rounded-full px-2.5 py-1.5 text-sm transition-colors xl:px-3 ${
                scrolled ? 'text-navy-dark/85' : 'text-paper/80'
              }`}
            >
              <span className="relative z-10">{link.label}</span>
              <span
                className={`pointer-events-none absolute inset-x-3 bottom-1.5 h-[2px] origin-center scale-x-0 rounded-full transition-transform duration-300 ease-out group-hover:scale-x-100 ${
                  scrolled
                    ? 'bg-gradient-to-r from-accent/40 via-accent to-accent/70 shadow-[0_0_12px_rgba(88,224,213,0.35)]'
                    : 'bg-gradient-to-r from-paper/40 via-paper to-paper/70 shadow-[0_0_12px_rgba(255,255,255,0.35)]'
                }`}
                aria-hidden
              />
            </button>
          ))}
          <button
            type="button"
            onClick={() => scrollToSection(navCta.id)}
            className={`ml-2 shrink-0 rounded-full px-3 py-1.5 text-sm font-semibold transition xl:ml-5 xl:px-4 ${
              scrolled
                ? 'bg-navy-midnight text-paper hover:bg-navy-dark'
                : 'bg-paper text-navy-midnight hover:bg-paper/90'
            }`}
          >
            {navCta.label}
          </button>
        </nav>

        <motion.button
          type="button"
          className={`relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition lg:hidden ${
            scrolled
              ? 'border-muted/30 bg-navy-midnight/6 text-navy-midnight'
              : 'border-paper/20 bg-paper/10 text-paper'
          }`}
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
            className="relative z-[51] border-b border-paper/15 surface-nav-gradient shadow-[0_24px_48px_-12px_rgba(0,0,0,0.45)] backdrop-blur-xl lg:hidden"
          >
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-paper/35 to-transparent"
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
                  className="group relative min-h-11 rounded-xl px-3 py-3 text-left text-base text-paper sm:min-h-0 sm:text-sm"
                >
                  <span className="relative z-10">{link.label}</span>
                  <span
                    className="pointer-events-none absolute inset-x-3 bottom-2 h-[2px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-paper/40 via-paper to-paper/70 shadow-[0_0_12px_rgba(255,255,255,0.35)] transition-transform duration-300 ease-out group-hover:scale-x-100 group-active:scale-x-100"
                    aria-hidden
                  />
                </motion.button>
              ))}
              <motion.button
                type="button"
                variants={linkVariants}
                onClick={() => {
                  pendingSectionIdRef.current = navCta.id
                  setOpen(false)
                }}
                className="mt-2 min-h-11 rounded-full bg-paper px-4 py-3 text-center text-base font-semibold text-navy-midnight transition hover:bg-paper/90 sm:text-sm"
              >
                {navCta.label}
              </motion.button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
