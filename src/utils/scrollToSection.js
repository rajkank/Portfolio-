/** Space between section start and bottom edge of fixed header */
const HEADER_GAP_PX = 10

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Scrolls so `#id` lines up under the fixed header. Uses measured header height so it works on
 * phones/tablets (Safari) and when the mobile drawer was just open.
 */
export function scrollToSection(id, options = {}) {
  const { behavior = 'smooth' } = options
  const el = document.getElementById(id)
  if (!el) return

  const header = document.querySelector('header')
  const headerH = header?.getBoundingClientRect().height ?? 0
  const top =
    el.getBoundingClientRect().top + window.scrollY - headerH - HEADER_GAP_PX

  window.scrollTo({
    top: Math.max(0, top),
    behavior: prefersReducedMotion() ? 'auto' : behavior,
  })
}
