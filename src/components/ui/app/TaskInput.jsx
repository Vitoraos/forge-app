'use client'

import Button from '@/components/ui/Button'

export default function TaskInput({ value, onChange, onSubmit, loading, disabled, disabledReason }) {
  function handleKeyDown(e) {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      if (!disabled && !loading && value.trim()) {
        onSubmit()
      }
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-medium text-muted uppercase tracking-wider">
        Task
      </label>
      <div className={`
        relative bg-surface border rounded transition-all duration-150
        ${disabled ? 'border-border opacity-60' : 'border-border focus-within:border-accent focus-within:shadow-glow-sm'}
      `}>
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            disabled
              ? disabledReason || 'Select a repo to continue'
              : 'Describe what you want to build or fix…\n\nExamples:\n• Add input validation to the login route\n• Fix the bug where users can submit empty forms\n• Refactor the auth service to use async/await'
          }
          disabled={disabled}
          rows={6}
          className="w-full bg-transparent px-3 py-3 text-sm text-secondary placeholder-muted resize-none focus:outline-none font-sans leading-relaxed"
        />
        <div className="flex items-center justify-between px-3 py-2 border-t border-border">
          <span className="text-xs text-muted/60">
            {value.length > 0 ? `${value.length} chars` : '⌘↵ to submit'}
          </span>
          <Button
            variant="primary"
            size="sm"
            onClick={onSubmit}
            loading={loading}
            disabled={disabled || !value.trim()}
          >
            Run Forge
          </Button>
        </div>
      </div>

      {disabled && disabledReason && (
        <p className="text-xs text-muted flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          {disabledReason}
        </p>
      )}
    </div>
  )
}
