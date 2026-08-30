import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useReducedMotion } from 'framer-motion'
import { useFinePointer } from '../hooks/useFinePointer.js'

const INTERACTIVE =
  'a, button, [role="button"], label, summary, select, [data-cursor="hover"]'
const TEXT =
  'input, textarea, select, [contenteditable="true"], iframe'

function isNode(el, selector) {
  return el instanceof Element && Boolean(el.closest(selector))
}

export default function AiCursor() {
  const fine = useFinePointer()
  const reduce = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const rootRef = useRef(null)
  const coreRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: -100, y: -100 })
  const ring = useRef({ x: -100, y: -100 })
  const rafRef = useRef(0)

  useEffect(() => {
    setEnabled(fine && !reduce)
  }, [fine, reduce])

  useEffect(() => {
    if (!enabled) return

    const html = document.documentElement
    html.classList.add('cursor-ai')

    const applyHover = (hovering, text) => {
      const root = rootRef.current
      if (!root) return
      root.dataset.hover = hovering ? 'true' : 'false'
      root.dataset.text = text ? 'true' : 'false'
    }

    const onMove = (e) => {
      pos.current.x = e.clientX
      pos.current.y = e.clientY
      const target = e.target
      applyHover(isNode(target, INTERACTIVE), isNode(target, TEXT))
    }

    const onOver = (e) => {
      applyHover(isNode(e.target, INTERACTIVE), isNode(e.target, TEXT))
    }

    const onDown = () => {
      rootRef.current?.setAttribute('data-down', 'true')
    }
    const onUp = () => {
      rootRef.current?.removeAttribute('data-down')
    }

    const onLeave = () => {
      applyHover(false, true)
    }

    const tick = () => {
      const lerp = 0.2
      ring.current.x += (pos.current.x - ring.current.x) * lerp
      ring.current.y += (pos.current.y - ring.current.y) * lerp

      const core = coreRef.current
      const frame = ringRef.current
      if (core) {
        core.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`
      }
      if (frame) {
        frame.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    document.addEventListener('mouseleave', onLeave)
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      html.classList.remove('cursor-ai')
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [enabled])

  if (!enabled || typeof document === 'undefined') return null

  return createPortal(
    <div
      ref={rootRef}
      className="ai-cursor pointer-events-none fixed inset-0 z-[2147483645]"
      aria-hidden
      data-hover="false"
      data-text="false"
    >
      <div ref={ringRef} className="ai-cursor-ring">
        <span className="ai-cursor-tick ai-cursor-tick-tl" />
        <span className="ai-cursor-tick ai-cursor-tick-tr" />
        <span className="ai-cursor-tick ai-cursor-tick-bl" />
        <span className="ai-cursor-tick ai-cursor-tick-br" />
      </div>
      <div ref={coreRef} className="ai-cursor-core" />
    </div>,
    document.body,
  )
}
