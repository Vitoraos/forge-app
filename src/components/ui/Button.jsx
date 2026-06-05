export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  ...props
}) {
  const base = `
    inline-flex items-center justify-center font-medium
    transition-all duration-150 border rounded
    focus-visible:outline focus-visible:outline-1
    focus-visible:outline-accent disabled:opacity-40
    disabled:cursor-not-allowed select-none
  `

  const variants = {
    primary: `
      bg-accent text-white border-accent
      hover:bg-accent/90 active:scale-95
      shadow-glow-sm hover:shadow-glow
    `,
    ghost: `
      bg-transparent text-secondary border-border
      hover:border-accent/50 hover:text-accent
      active:scale-95
    `,
    danger: `
      bg-transparent text-danger border-danger/30
      hover:bg-danger/10 active:scale-95
    `,
    surface: `
      bg-surface text-secondary border-border
      hover:border-accent/50 active:scale-95
    `,
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2',
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <span className="w-3.5 h-3.5 border border-current border-t-transparent rounded-full animate-spin" />
          <span>Loading</span>
        </>
      ) : children}
    </button>
  )
}
