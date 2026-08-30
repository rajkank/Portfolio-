import { useSyncExternalStore } from 'react'

function subscribe(callback) {
  if (typeof window === 'undefined') return () => {}
  const mq = window.matchMedia('(pointer: fine)')
  mq.addEventListener('change', callback)
  return () => mq.removeEventListener('change', callback)
}

function getSnapshot() {
  if (typeof window === 'undefined') return true
  return window.matchMedia('(pointer: fine)').matches
}

function getServerSnapshot() {
  return true
}

/** True when mouse / trackpad is primary (not most phones / tablets in touch mode). */
export function useFinePointer() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
