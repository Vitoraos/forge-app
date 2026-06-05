'use client'

import { useEffect, useState, useRef } from 'react'

export default function StreamingOutput({ text, title, language = 'text', done = false }) {
  const [displayed, setDisplayed] = useState('')
  const [cursor, setCursor] = useState(true)
  const bottomRef = useRef(null)
  const prevTextRef = useRef('')

  // Animate new text as it arrives
  useEffect(() => {
    if (!text) return

    const newChars = text.slice(prevTextRef.current.length)
    if (!newChars) return

    let i = 0
    const interval = setInterval(() => {
      if (i >= newChars.length) {
        clearInterval(interval)
        prevTextRef.current = text
        return
      }
      setDisplayed(prev => prev + newChars[i])
      i++
    }, 8)

    return () => clearInterval(interval)
  }, [text])

  // Cursor blink
  useEffect(() => {
    if (done) {
      setCursor(false)
      return
    }
    const interval = setInterval(() => setCursor(p => !p), 500)
    return () => clearInterval(interval)
  }, [done])

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [displayed])

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-danger/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-accent/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-success/40" />
          </div>
          <span className="text-xs font-mono text-muted ml-1">{title}</span>
        </div>
        {!done && (
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-xs text-muted font-mono">running</span>
          </div>
        )}
      </div>

      {/* Output */}
      <div className="flex-1 overflow-y-auto p-4">
        {!displayed && !done ? (
          <div className="flex items-center gap-2 text-muted">
            <span className="w-3 h-3 border border-muted border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-mono">Initialising…</span>
          </div>
        ) : (
          <pre className="font-mono text-xs text-secondary leading-relaxed whitespace-pre-wrap break-words">
            {displayed}
            {!done && cursor && (
              <span className="inline-block w-2 h-3.5 bg-accent ml-0.5 align-text-bottom" />
            )}
          </pre>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
