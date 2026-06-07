'use client'

import { useState } from 'react'
import { apiFetch } from '@/lib/supabase/api'
import Button from '@/components/ui/Button'

export default function PlanReview({ session, onApproved }) {
  const plan = session?.plan
  const [subtasks, setSubtasks] = useState(plan?.subtasks || [])
  const [approving, setApproving] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null)
  const [error, setError] = useState(null)

  function updateSubtask(index, field, value) {
    setSubtasks(prev => prev.map((s, i) =>
      i === index ? { ...s, [field]: value } : s
    ))
  }

  async function handleApprove() {
    setError(null)
    setApproving(true)

    try {
      // Save edits first if any
      await apiFetch('/agent/edit-plan', {
        method: 'POST',
        body: JSON.stringify({
          session_id: session.id,
          subtasks,
        }),
      })

      // Then approve
      await apiFetch('/agent/approve-plan', {
        method: 'POST',
        body: JSON.stringify({ session_id: session.id }),
      })

      onApproved()
    } catch (err) {
      setError(err.message)
    } finally {
      setApproving(false)
    }
  }

  const riskColors = {
    low: 'text-success border-success/20 bg-success/5',
    medium: 'text-accent border-accent/20 bg-accent/5',
    high: 'text-danger border-danger/20 bg-danger/5',
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-xs font-mono text-accent uppercase tracking-wider">
            Plan Ready — Review Required
          </span>
        </div>
      </div>

      {/* Analysis */}
      {plan?.analysis && (
        <div className="px-4 py-3 border-b border-border bg-surface/50">
          <p className="text-xs text-muted uppercase tracking-wider font-mono mb-2">
            Analysis
          </p>
          <p className="text-sm text-secondary leading-relaxed">
            {plan.analysis}
          </p>
        </div>
      )}

      {/* Subtasks */}
      <div className="flex-1 px-4 py-4 flex flex-col gap-3">
        <p className="text-xs text-muted uppercase tracking-wider font-mono">
          Subtasks — {subtasks.length} file{subtasks.length !== 1 ? 's' : ''}
        </p>

        {subtasks.map((subtask, i) => (
          <div
            key={i}
            className="flex flex-col gap-3 p-3 bg-surface border border-border rounded"
          >
            {/* File path + risk */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-mono text-accent truncate">
                {subtask.file_path}
              </span>
              {subtask.risk && (
                <span className={`
                  text-xs font-mono px-2 py-0.5 rounded-full border shrink-0
                  ${riskColors[subtask.risk] || riskColors.medium}
                `}>
                  {subtask.risk}
                </span>
              )}
            </div>

            {/* Instruction */}
            {editingIndex === i ? (
              <textarea
                value={subtask.instruction}
                onChange={e => updateSubtask(i, 'instruction', e.target.value)}
                rows={4}
                className="w-full bg-base border border-accent/30 rounded px-3 py-2 text-xs text-secondary font-mono resize-none focus:outline-none focus:border-accent"
              />
            ) : (
              <p className="text-xs text-muted leading-relaxed">
                {subtask.instruction}
              </p>
            )}

            {/* Risk reason */}
            {subtask.risk_reason && subtask.risk !== 'low' && (
              <p className="text-xs text-muted/60 italic">
                ⚠ {subtask.risk_reason}
              </p>
            )}

            {/* Edit toggle */}
            <button
              onClick={() => setEditingIndex(editingIndex === i ? null : i)}
              className="text-xs text-muted hover:text-accent transition-colors duration-150 self-start"
            >
              {editingIndex === i ? 'Done editing' : 'Edit instruction'}
            </button>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="px-4 py-4 border-t border-border shrink-0 flex flex-col gap-3">
        {error && (
          <p className="text-xs text-danger">{error}</p>
        )}
        <div className="flex gap-3">
          <Button
            variant="primary"
            size="md"
            loading={approving}
            onClick={handleApprove}
            className="flex-1"
          >
            Approve Plan — Start Coding
          </Button>
        </div>
        <p className="text-xs text-muted text-center">
          You can edit any instruction above before approving
        </p>
      </div>
    </div>
  )
}
