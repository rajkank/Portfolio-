export default function GlassCard({ children, className = '', as: Tag = 'div', ...rest }) {
  return (
    <Tag
      className={`rounded-none border border-muted/20/80 bg-navy-deep/70/55 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset] backdrop-blur-sm transition-colors duration-300 hover:border-accent/25 lg:bg-navy-deep/70/45 lg:backdrop-blur-md ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
