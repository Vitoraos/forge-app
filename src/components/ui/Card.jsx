export default function Card({ children, className = '', glow = false, ...props }) {
  return (
    <div
      className={`
        bg-surface border border-border rounded p-4
        transition-all duration-150
        ${glow ? 'shadow-glow border-accent/30' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}
