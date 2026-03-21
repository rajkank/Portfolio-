import { Sparkles as SparklesIcon } from 'lucide-react'

const positions = [
  { top: '12%', left: '8%', size: 14, opacity: 0.35 },
  { top: '22%', right: '12%', size: 12, opacity: 0.25 },
  { top: '55%', left: '4%', size: 10, opacity: 0.2 },
  { top: '68%', right: '18%', size: 16, opacity: 0.3 },
  { top: '40%', left: '48%', size: 8, opacity: 0.18 },
]

export default function Sparkles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {positions.map((p, i) => (
        <SparklesIcon
          key={i}
          className="absolute text-emerald-400/80"
          style={{
            top: p.top,
            left: p.left,
            right: p.right,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  )
}
