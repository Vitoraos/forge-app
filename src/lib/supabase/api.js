import { createClient } from '@/lib/supabase/client'

export async function apiFetch(path, options = {}) {
  const supabase = createClient()

  const { data: { session } } = await supabase.auth.getSession()

  if (!session) throw new Error('Not authenticated')

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.access_token}`,
      ...options.headers,
    },
  })

  const data = await res.json()

  if (!res.ok) throw new Error(data.error || 'Request failed')

  return data
}
