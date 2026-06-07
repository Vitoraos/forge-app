'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { apiFetch } from '@/lib/api'

export function useSessions(repoId = null) {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const intervalRef = useRef(null)

  const fetchSessions = useCallback(async () => {
    try {
      const path = repoId
        ? `/agent/sessions?repo_id=${repoId}`
        : `/agent/sessions`
      const data = await apiFetch(path)
      setSessions(data.sessions || [])
    } catch (err) {
      console.error('Failed to fetch sessions:', err.message)
    } finally {
      setLoading(false)
    }
  }, [repoId])

  useEffect(() => {
    fetchSessions()

    // Poll every 5 seconds to keep sidebar fresh
    intervalRef.current = setInterval(fetchSessions, 5000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [fetchSessions])

  return { sessions, loading, refetch: fetchSessions }
}
