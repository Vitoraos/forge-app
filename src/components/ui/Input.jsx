export default function Input({
  label,
  error,
  hint,
  className = '',
  ...props
}) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-xs font-medium text-muted uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        className={`
          w-full bg-surface border border-border rounded
          px-3 py-2 text-sm text-secondary placeholder-muted
          transition-all duration-150
          focus:outline-none focus:border-accent focus:shadow-glow-sm
          disabled:opacity-40 disabled:cursor-not-allowed
          ${error ? 'border-danger focus:border-danger focus:shadow-none' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <span className="text-xs text-danger">{error}</span>
      )}
      {hint && !error && (
        <span className="text-xs text-muted">{hint}</span>
      )}
    </div>
  )
}
