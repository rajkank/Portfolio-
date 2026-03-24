import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { site } from '../data/site.js'

/** Minimum time the loader stays visible after assets are ready (avoids a flash). */
const MIN_DISPLAY_MS = 2400
/** Failsafe if `load` never fires (extensions, odd networks). */
const MAX_WAIT_MS = 12000

const ease = [0.22, 1, 0.36, 1]

/** Persists across React Strict Mode remounts so the overlay does not flash twice. */
let loaderDismissedGlobal = false

/** Same clock as `index.html` so the minimum display time starts at first paint, not when React mounts. */
function getLoaderStartTime() {
  if (typeof window === 'undefined') return performance.now()
  const t0 = window.__PORTFOLIO_LOADER_T0__
  return typeof t0 === 'number' ? t0 : performance.now()
}

function getFontsReadyPromise() {
  const ready = document.fonts?.ready
  if (ready && typeof ready.then === 'function') {
    return ready
  }
  return Promise.resolve()
}

export default function PageLoader() {
  const [visible, setVisible] = useState(() => !loaderDismissedGlobal)
  const [progress, setProgress] = useState(0)
  const finishedRef = useRef(false)
  const hideTimerRef = useRef(null)
  const rafRef = useRef(null)
  /** Total ms from `start` until dismiss — set when load (or failsafe) completes. */
  const totalMsRef = useRef(null)

  /** Drop the static HTML overlay; the React layer matches it for a seamless handoff. */
  useLayoutEffect(() => {
    document.getElementById('initial-site-loader')?.remove()
  }, [])

  useEffect(() => {
    if (loaderDismissedGlobal) return

    const start = getLoaderStartTime()
    document.body.style.overflow = 'hidden'

    const cancelRaf = () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }

    /**
     * Percent tracks real time: before assets are ready it creeps toward ~90% using MIN_DISPLAY_MS
     * as a guide; after we know the end time, it runs 0→100% across the full wait (including delay).
     */
    const tick = () => {
      const elapsed = performance.now() - start
      const total = totalMsRef.current
      if (total == null) {
        setProgress(Math.min(90, (elapsed / MIN_DISPLAY_MS) * 90))
      } else {
        setProgress(Math.min(100, (elapsed / total) * 100))
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    const finish = () => {
      if (finishedRef.current || loaderDismissedGlobal) return
      finishedRef.current = true
      const elapsed = performance.now() - start
      /** Dismiss at start + max(MIN_DISPLAY_MS, elapsed) — same rule as the hide timer. */
      totalMsRef.current = Math.max(MIN_DISPLAY_MS, elapsed)
      loaderDismissedGlobal = true
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed)
      hideTimerRef.current = window.setTimeout(() => setVisible(false), remaining)
    }

    let loadHandler = null
    const whenWindowLoaded = new Promise((resolve) => {
      if (document.readyState === 'complete') {
        resolve()
      } else {
        loadHandler = () => resolve()
        window.addEventListener('load', loadHandler, { once: true })
      }
    })

    let cancelled = false
    Promise.all([whenWindowLoaded, getFontsReadyPromise()]).then(() => {
      if (cancelled || finishedRef.current || loaderDismissedGlobal) return
      finish()
    })

    const maxTimer = window.setTimeout(() => finish(), MAX_WAIT_MS)

    return () => {
      cancelled = true
      cancelRaf()
      if (loadHandler) {
        window.removeEventListener('load', loadHandler)
      }
      window.clearTimeout(maxTimer)
      if (hideTimerRef.current) {
        window.clearTimeout(hideTimerRef.current)
        hideTimerRef.current = null
      }
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    if (visible) return
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [visible])

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.body.style.overflow = ''
      }}
    >
      {visible && (
        <motion.div
          key="page-loader"
          role="status"
          aria-live="polite"
          aria-busy="true"
          aria-label="Loading portfolio"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.5, ease },
          }}
          className="fixed inset-0 z-[2147483646] flex flex-col items-center justify-center gap-8 bg-[#0a0a0a] px-6"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{
              background:
                'radial-gradient(ellipse 80% 50% at 50% -20%, #10b981 0%, transparent 55%)',
            }}
            aria-hidden
          />

          <div className="relative flex w-full max-w-sm flex-col items-center gap-6">
            <div className="relative h-16 w-16">
              <motion.span
                className="absolute inset-0 rounded-full border-2 border-zinc-800"
                aria-hidden
              />
              <motion.span
                className="absolute inset-0 rounded-full border-2 border-transparent border-t-emerald-400 border-r-emerald-500/40"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 0.9,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                aria-hidden
              />
            </div>

            <div className="w-full text-center">
              <p className="font-serif text-xl tracking-wide text-zinc-100 sm:text-2xl">
                {site.name}
              </p>
              <p className="mt-2 text-sm font-medium tracking-[0.18em] text-zinc-500 uppercase">
                Loading portfolio
              </p>
              <motion.p
                className="mt-2 text-sm text-zinc-500"
                animate={{ opacity: [0.55, 0.95, 0.55] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                Please wait while the site finishes loading
              </motion.p>
            </div>

            <div className="w-full" aria-hidden>
              <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800/80">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-600 via-teal-400 to-cyan-500"
                  style={{ width: `${progress}%` }}
                  transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                />
              </div>
              <p className="mt-2 text-center text-xs font-medium tabular-nums text-zinc-400">
                {Math.round(progress)}%
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
