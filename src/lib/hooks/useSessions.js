'use client'

import { useEffect, useState, useCallback } from 'react'
import { apiFetch } from '@/lib/api'

export function useSessions(repoId = null) {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)

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
  }, [fetchSessions])

  return { sessions, loading, refetch: fetchSessions }
}
