import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks, site } from '../data/site.js'
import ScrollProgressBar from './ScrollProgressBar.jsx'

function scrollToId(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex flex-col transition-[background,box-shadow,border-color] duration-300 ${
        scrolled
          ? 'border-b border-zinc-800/80 bg-zinc-950/80 shadow-lg shadow-black/20 backdrop-blur-md'
          : 'border-b border-white/12 bg-transparent shadow-[0_1px_0_0_rgba(255,255,255,0.06)]'
      }`}
    >
      <ScrollProgressBar />
      <div className="page-container flex h-16 max-w-none items-center justify-between">
        <button
          type="button"
          onClick={() => scrollToId('hero')}
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
              onClick={() => scrollToId(link.id)}
              className="rounded-full px-3 py-1.5 text-sm text-zinc-400 transition hover:bg-zinc-800/60 hover:text-white"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/50 text-zinc-200 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="border-b border-zinc-800/80 bg-zinc-950/95 backdrop-blur-md md:hidden"
          >
            <div className="page-container flex flex-col gap-1 pb-4 pt-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => {
                    setOpen(false)
                    scrollToId(link.id)
                  }}
                  className="rounded-xl px-3 py-3 text-left text-sm text-zinc-300 hover:bg-zinc-800/80"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
