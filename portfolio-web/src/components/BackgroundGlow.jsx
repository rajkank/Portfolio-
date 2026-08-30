export default function BackgroundGlow() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div className="absolute -left-1/4 top-0 h-[520px] w-[520px] rounded-full bg-emerald-950/40 blur-[120px]" />
      <div className="absolute bottom-0 right-[-10%] h-[480px] w-[480px] rounded-full bg-teal-950/35 blur-[110px]" />
      <div className="absolute left-1/2 top-1/3 h-px w-[min(90vw,720px)] -translate-x-1/2 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
    </div>
  )
}
