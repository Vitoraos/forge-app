'use client'

import { useState } from 'react'
import { apiFetch } from '@/lib/api'
import Button from '@/components/ui/Button'
import FeedbackInput from './FeedbackInput'

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard not available
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-2 py-1 text-xs font-mono text-muted hover:text-secondary border border-border rounded transition-all duration-150"
    >
      {copied ? (
        <>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 5L4 7L8 3" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-success">Copied</span>
        </>
      ) : (
        <>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" />
            <path d="M7 3V2C7 1.45 6.55 1 6 1H2C1.45 1 1 1.45 1 2V6C1 6.55 1.45 7 2 7H3" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          Copy
        </>
      )}
    </button>
  )
}

function LineNumbers({ content }) {
  const lines = content.split('\n')
  return (
    <div className="select-none pr-4 text-right shrink-0">
      {lines.map((_, i) => (
        <div
          key={i}
          className="text-xs font-mono text-muted/30 leading-5"
        >
          {i + 1}
        </div>
      ))}
    </div>
  )
}

export default function CodeReview({ task, draft, onApproved, onFeedbackSent }) {
  const [showFeedback, setShowFeedback] = useState(false)
  const [approving, setApproving] = useState(false)
  const [sendingFeedback, setSendingFeedback] = useState(false)
  const [error, setError] = useState(null)
  const [approved, setApproved] = useState(draft?.verdict === 'approved')

  async function handleApprove() {
    setError(null)
    setApproving(true)

    try {
      const data = await apiFetch('/agent/approve', {
        method: 'POST',
        body: JSON.stringify({ draft_id: draft.id }),
      })

      setApproved(true)
      onApproved?.(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setApproving(false)
    }
  }

  async function handleFeedback(feedback) {
    setError(null)
    setSendingFeedback(true)

    try {
      await apiFetch('/agent/feedback', {
        method: 'POST',
        body: JSON.stringify({
          draft_id: draft.id,
          feedback,
        }),
      })

      setShowFeedback(false)
      onFeedbackSent?.()
    } catch (err) {
      setError(err.message)
    } finally {
      setSendingFeedback(false)
    }
  }

  if (!draft) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted">
        <p className="text-xs font-mono">No draft available</p>
      </div>
    )
  }

  const code = draft.new_content || ''
  const explanation = draft.explanation || ''

  return (
    <div className="flex flex-col h-full overflow-hidden">

      {/* ── Code panel ─────────────────────────────────────── */}
      <div className="flex flex-col flex-1 min-h-0 overflow-hidden">

        {/* Code header */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border shrink-0 bg-surface/80">
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex gap-1.5 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-danger/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-accent/40" />
              <span className="w-2.5 h-2.5 rounded-full bg-success/40" />
            </div>
            <span className="text-xs font-mono text-muted truncate ml-1">
              {draft.file_path}
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-mono text-muted/40">
              {code.split('\n').length} lines
            </span>
            <CopyButton text={code} />
          </div>
        </div>

        {/* Code content */}
        <div className="flex-1 overflow-auto">
          <div className="flex min-w-0 p-4">
            <LineNumbers content={code} />
            <pre className="flex-1 font-mono text-xs text-secondary leading-5 whitespace-pre overflow-x-auto">
              {code}
            </pre>
          </div>
        </div>
      </div>

      {/* ── Explanation panel ──────────────────────────────── */}
      <div className="shrink-0 border-t border-border bg-surface/50">
        <div className="px-4 py-2 border-b border-border/50 flex items-center gap-2">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <circle cx="5" cy="5" r="4" stroke="#2563EB" strokeWidth="1.2" />
            <path d="M5 4.5V7M5 3.5V3" stroke="#2563EB" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span className="text-xs font-mono text-accent uppercase tracking-wider">
            What changed
          </span>
        </div>
        <div className="px-4 py-3 max-h-28 overflow-y-auto">
          <p className="text-sm text-secondary leading-relaxed">
            {explanation || (
              <span className="text-muted italic">No explanation available</span>
            )}
          </p>
        </div>
      </div>

      {/* ── Action bar ─────────────────────────────────────── */}
      <div className="shrink-0 border-t border-border bg-base px-4 py-3 flex flex-col gap-3">

        {/* Error */}
        {error && (
          <div className="px-3 py-2 bg-danger/10 border border-danger/20 rounded">
            <p className="text-xs text-danger">{error}</p>
          </div>
        )}

        {/* Feedback input */}
        {showFeedback && (
          <FeedbackInput
            onSubmit={handleFeedback}
            onCancel={() => setShowFeedback(false)}
            loading={sendingFeedback}
          />
        )}

        {/* Approved state */}
        {approved ? (
          <div className="flex items-center gap-3 py-1">
            <div className="flex items-center gap-2 flex-1">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6" stroke="#06b6d4" strokeWidth="1.2" />
                <path d="M4 7L6 9L10 5" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-sm font-medium text-success">
                Approved and pushed to branch
              </span>
            </div>
            
              href={`https://github.com`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-accent hover:underline font-mono"
            >
              View on GitHub →
            </a>
          </div>
        ) : (
          /* Action buttons */
          !showFeedback && (
            <div className="flex gap-3">
              <Button
                variant="ghost"
                size="md"
                onClick={() => setShowFeedback(true)}
                className="flex-1"
                disabled={approving}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 1H11V8H7L4 11V8H1V1Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Give Feedback
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={handleApprove}
                loading={approving}
                className="flex-1"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Approve & Push
              </Button>
            </div>
          )
        )}
      </div>
    </div>
  )
}
