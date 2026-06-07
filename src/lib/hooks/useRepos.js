'use client'

import { useEffect, useState, useCallback } from 'react'
import { apiFetch } from '@/lib/supabase/api'

export function useRepos() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchRepos = useCallback(async () => {
    try {
      const data = await apiFetch('/repos')
      setRepos(data.repos || [])
    } catch (err) {
      console.error('Failed to fetch repos:', err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchRepos()
  }, [fetchRepos])

  return { repos, loading, refetch: fetchRepos }
}
