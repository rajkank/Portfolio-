export default function GlassCard({ children, className = '', as: Tag = 'div', ...rest }) {
  return (
    <Tag
      className={`rounded-2xl border border-zinc-800/80 bg-zinc-900/45 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset] backdrop-blur-md transition-colors duration-300 hover:border-emerald-500/25 ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
