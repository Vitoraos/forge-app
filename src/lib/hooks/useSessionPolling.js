'use client'

import { useEffect, useState, useCallback } from 'react'
import { apiFetch } from '@/lib/supabase/api'

export function useSessionPolling(sessionId) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchSession = useCallback(async () => {
    try {
      const data = await apiFetch(`/agent/session/${sessionId}`)
      setSession(data.session)
      return data.session
    } catch (err) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }, [sessionId])

  useEffect(() => {
    if (!sessionId) return

    fetchSession()

    // Poll every 3 seconds while session is active
    const interval = setInterval(async () => {
      const s = await fetchSession()

      // Stop polling when session reaches terminal state
      if (s && ['done', 'failed', 'awaiting_approval', 'plan_review'].includes(s.status)) {
        clearInterval(interval)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [sessionId, fetchSession])

  return { session, loading, error, refetch: fetchSession }
}
