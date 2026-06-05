'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useSessions } from '@/lib/hooks/useSessions'
import { useUser } from '@/lib/hooks/useUser'
import { createClient } from '@/lib/supabase/client'
import StatusDot from '@/components/ui/StatusDot'

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  if (hours < 24) return `${hours}h ago`
  return `${days}d ago`
}

function ForgeWordmark() {
  return (
    <div className="font-mono font-semibold text-lg tracking-[0.15em] relative inline-block select-none">
      <span className="text-secondary">F</span>
      <span className="text-accent">O</span>
      <span className="text-secondary">R</span>
      <span className="text-secondary">G</span>
      <span className="text-accent">E</span>
    </div>
  )
}

export default function Sidebar({ open, onToggle }) {
  const router = useRouter()
  const pathname = usePathname()
  const { user } = useUser()
  const { sessions, loading } = useSessions()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <aside
      className={`
        fixed top-0 left-0 h-full bg-surface border-r border-border
        flex flex-col z-40 transition-all duration-150
        ${open ? 'w-64' : 'w-12'}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-4 border-b border-border shrink-0">
        {open && <ForgeWordmark />}
        <button
          onClick={onToggle}
          className="p-1.5 rounded text-muted hover:text-secondary hover:bg-border/50 transition-all duration-150 ml-auto"
          title={open ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            {open ? (
              <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            )}
          </svg>
        </button>
      </div>

      {/* New task button */}
      <div className="px-2 py-3 border-b border-border shrink-0">
        <button
          onClick={() => router.push('/app')}
          className={`
            w-full flex items-center gap-2 px-2 py-2 rounded
            text-sm font-medium transition-all duration-150
            ${pathname === '/app'
              ? 'bg-accent/10 text-accent border border-accent/20'
              : 'text-muted hover:text-secondary hover:bg-border/50'
            }
          `}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
            <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          {open && <span>New Task</span>}
        </button>
      </div>

      {/* Sessions list */}
      <div className="flex-1 overflow-y-auto py-2">
        {open && (
          <>
            {loading ? (
              <div className="px-3 py-4 flex flex-col gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-12 bg-border/30 rounded animate-pulse" />
                ))}
              </div>
            ) : sessions.length === 0 ? (
              <div className="px-3 py-6 text-center">
                <p className="text-xs text-muted">No sessions yet</p>
                <p className="text-xs text-muted/60 mt-1">Start your first task</p>
              </div>
            ) : (
              <div className="flex flex-col gap-0.5 px-2">
                {sessions.map((session) => (
                  <button
                    key={session.id}
                    onClick={() => router.push(`/app/session/${session.id}`)}
                    className={`
                      w-full text-left px-2 py-2.5 rounded
                      transition-all duration-150
                      ${pathname === `/app/session/${session.id}`
                        ? 'bg-accent/10 border border-accent/20'
                        : 'hover:bg-border/50'
                      }
                    `}
                  >
                    <p className="text-xs text-secondary font-medium truncate leading-snug">
                      {session.task}
                    </p>
                    <div className="flex items-center justify-between mt-1.5">
                      <StatusDot status={session.status} />
                      <span className="text-xs text-muted/60">
                        {timeAgo(session.created_at)}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Settings + logout */}
      <div className="border-t border-border p-2 shrink-0 flex flex-col gap-1">
        <button
          onClick={() => router.push('/app/settings')}
          className={`
            w-full flex items-center gap-2 px-2 py-2 rounded text-xs
            transition-all duration-150
            ${pathname === '/app/settings'
              ? 'text-accent bg-accent/10'
              : 'text-muted hover:text-secondary hover:bg-border/50'
            }
          `}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
            <circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M7 1V2M7 12V13M1 7H2M12 7H13M2.5 2.5L3.2 3.2M10.8 10.8L11.5 11.5M11.5 2.5L10.8 3.2M3.2 10.8L2.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          {open && <span>Settings</span>}
        </button>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-2 py-2 rounded text-xs text-muted hover:text-danger hover:bg-danger/10 transition-all duration-150"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
            <path d="M5 2H2V12H5M9 10L13 7L9 4M13 7H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {open && <span>Sign out</span>}
        </button>
      </div>
    </aside>
  )
}
