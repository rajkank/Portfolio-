export default function BackgroundGlow() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 isolate overflow-hidden will-change-transform [transform:translateZ(0)]"
      aria-hidden
    >
      {/* Lighter blur on phones / small tablets — large blurs are very GPU-heavy */}
      <div className="absolute -left-1/4 top-0 h-[min(100vw,520px)] w-[min(100vw,520px)] rounded-full bg-emerald-950/40 blur-[72px] md:h-[520px] md:w-[520px] md:blur-[120px]" />
      <div className="absolute bottom-0 right-[-10%] h-[min(92vw,480px)] w-[min(92vw,480px)] rounded-full bg-teal-950/35 blur-[64px] md:h-[480px] md:w-[480px] md:blur-[110px]" />
      <div className="absolute left-1/2 top-1/3 h-px w-[min(90vw,720px)] -translate-x-1/2 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
    </div>
  )
}
