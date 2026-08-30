import { useEffect, useRef } from 'react'

/**
 * Updates width via transform (GPU-friendly) and batches reads with rAF — avoids
 * React re-rendering on every scroll tick (major source of main-thread jank).
 */
export default function ScrollProgressBar() {
  const barRef = useRef(null)
  const rafRef = useRef(0)

  useEffect(() => {
    const el = document.documentElement

    const update = () => {
      rafRef.current = 0
      const bar = barRef.current
      if (!bar) return
      const total = el.scrollHeight - el.clientHeight
      const pct = total <= 0 ? 0 : el.scrollTop / total
      bar.style.transform = `scaleX(${pct})`
    }

    const schedule = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  return (
    <div
      className="relative h-1 w-full shrink-0 overflow-hidden bg-zinc-900/90"
      role="presentation"
      aria-hidden
    >
      <div
        ref={barRef}
        className="h-full origin-left bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 will-change-transform"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}
