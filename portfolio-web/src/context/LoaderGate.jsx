import { createContext, useContext, useState } from 'react'

const LoaderGateContext = createContext(null)

export function LoaderGateProvider({ children }) {
  const [heroAnimationReady, setHeroAnimationReady] = useState(false)
  return (
    <LoaderGateContext.Provider value={{ heroAnimationReady, setHeroAnimationReady }}>
      {children}
    </LoaderGateContext.Provider>
  )
}

export function useLoaderGate() {
  const ctx = useContext(LoaderGateContext)
  if (!ctx) {
    throw new Error('useLoaderGate must be used within LoaderGateProvider')
  }
  return ctx
}
