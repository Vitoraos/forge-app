'use client'

import { useState } from 'react'

const SUGGESTED_MODELS = {
  planner: [
    { id: 'anthropic/claude-3.5-sonnet', label: 'Claude 3.5 Sonnet' },
    { id: 'anthropic/claude-3-opus', label: 'Claude 3 Opus' },
    { id: 'openai/gpt-4o', label: 'GPT-4o' },
    { id: 'google/gemini-pro-1.5', label: 'Gemini Pro 1.5' },
  ],
  coder: [
    { id: 'poolside/laguna-m.1:free', label: 'Laguna M.1 (Free)' },
    { id: 'deepseek/deepseek-coder', label: 'DeepSeek Coder' },
    { id: 'qwen/qwen-2.5-coder-32b-instruct', label: 'Qwen 2.5 Coder' },
    { id: 'anthropic/claude-3.5-sonnet', label: 'Claude 3.5 Sonnet' },
  ],
}

function ModelPicker({ label, value, onChange, suggestions }) {
  const [custom, setCustom] = useState(false)
  const isCustom = !suggestions.find(s => s.id === value)

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-muted uppercase tracking-wider">
        {label}
      </label>

      {!custom && !isCustom ? (
        <select
          value={value}
          onChange={e => {
            if (e.target.value === '__custom__') {
              setCustom(true)
            } else {
              onChange(e.target.value)
            }
          }}
          className="w-full bg-surface border border-border rounded px-3 py-2 text-sm text-secondary transition-all duration-150 focus:outline-none focus:border-accent focus:shadow-glow-sm"
        >
          {suggestions.map(s => (
            <option key={s.id} value={s.id}>{s.label}</option>
          ))}
          <option value="__custom__">Custom model…</option>
        </select>
      ) : (
        <div className="flex gap-2">
          <input
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder="e.g. mistralai/mistral-7b-instruct"
            className="flex-1 bg-surface border border-border rounded px-3 py-2 text-sm text-secondary font-mono placeholder-muted transition-all duration-150 focus:outline-none focus:border-accent focus:shadow-glow-sm"
          />
          <button
            onClick={() => {
              setCustom(false)
              onChange(suggestions[0].id)
            }}
            className="px-2 py-2 text-xs text-muted hover:text-secondary border border-border rounded transition-all duration-150"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  )
}

export default function ModelSelector({ plannerModel, coderModel, onPlannerChange, onCoderChange }) {
  return (
    <div className="flex flex-col gap-4">
      <label className="text-xs font-medium text-muted uppercase tracking-wider">
        Models
      </label>
      <div className="p-3 bg-surface border border-border rounded flex flex-col gap-4">
        <ModelPicker
          label="Planner"
          value={plannerModel}
          onChange={onPlannerChange}
          suggestions={SUGGESTED_MODELS.planner}
        />
        <ModelPicker
          label="Coder"
          value={coderModel}
          onChange={onCoderChange}
          suggestions={SUGGESTED_MODELS.coder}
        />
      </div>
    </div>
  )
}
