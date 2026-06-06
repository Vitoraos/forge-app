'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'

export default function FeedbackInput({ onSubmit, onCancel, loading }) {
  const [feedback, setFeedback] = useState('')

  function handleKeyDown(e) {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      if (feedback.trim() && !loading) {
        onSubmit(feedback.trim())
      }
    }
    if (e.key === 'Escape') {
      onCancel()
    }
  }

  return (
    <div className="flex flex-col gap-3 p-4 bg-surface border border-accent/20 rounded animate-fade-in">
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
        <span className="text-xs font-mono text-accent uppercase tracking-wider">
          Feedback
        </span>
      </div>

      <textarea
        value={feedback}
        onChange={e => setFeedback(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={
          `Tell Forge what to fix or change…\n\nExamples:\n• Add null checks before accessing user.id\n• The function should return early if the array is empty\n• Use the existing errorHandler utility instead of throwing directly`
        }
        rows={5}
        autoFocus
        className="w-full bg-base border border-border rounded px-3 py-2.5 text-sm text-secondary placeholder-muted resize-none focus:outline-none focus:border-accent focus:shadow-glow-sm font-sans leading-relaxed"
      />

      <div className="flex items-center justify-between">
        <span className="text-xs text-muted/60">⌘↵ to send · Esc to cancel</span>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => onSubmit(feedback.trim())}
            loading={loading}
            disabled={!feedback.trim()}
          >
            Send to Planner
          </Button>
        </div>
      </div>
    </div>
  )
}
