'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { Suspense } from 'react'

function ForgeWordmark() {
  return (
    <div className="font-mono font-semibold text-2xl tracking-[0.15em] relative inline-block select-none">
      <span className="text-secondary">F</span>
      <span className="text-accent">O</span>
      <span className="text-secondary">R</span>
      <span className="text-secondary">G</span>
      <span className="text-accent">E</span>
      <span
        className="absolute -bottom-1 left-0 w-full h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, #2563EB, transparent)',
        }}
      />
    </div>
  )
}

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [notice, setNotice] = useState(null)

  useEffect(() => {
    if (searchParams.get('signup') === 'success') {
      setNotice('Account created. Sign in to continue.')
    }
    if (searchParams.get('error') === 'auth_failed') {
      setError('Authentication failed. Please try again.')
    }
  }, [searchParams])

  async function handleLogin(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    // Session is set — middleware handles redirect to /app
    router.push('/app')
    router.refresh()
  }

  return (
    <div className="w-full max-w-sm flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-secondary">
          Welcome back
        </h1>
        <p className="text-sm text-muted">
          Sign in to your Forge account.
        </p>
      </div>

      {/* Notice */}
      {notice && (
        <div className="px-3 py-2 bg-success/10 border border-success/20 rounded">
          <p className="text-xs text-success">{notice}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        <Input
          label="Password"
          type="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />

        {error && (
          <div className="px-3 py-2 bg-danger/10 border border-danger/20 rounded">
            <p className="text-xs text-danger">{error}</p>
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          disabled={!email || !password}
          className="w-full mt-2"
        >
          Sign In
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted font-mono">FORGE</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Footer note */}
      <p className="text-xs text-muted text-center">
        Don't have an account?{' '}
        <button
          onClick={() => router.push('/signup')}
          className="text-accent hover:underline"
        >
          Create one
        </button>
      </p>
    </div>
  )
}

export default function LoginPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-base flex flex-col">
      {/* Background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, #2563eb08 0%, transparent 70%)',
        }}
      />

      {/* Grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(#2563EB 1px, transparent 1px),
            linear-gradient(90deg, #2563EB 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-border/50">
        <button
          onClick={() => router.push('/')}
          className="hover:opacity-70 transition-opacity duration-150"
        >
          <ForgeWordmark />
        </button>
        <button
          onClick={() => router.push('/signup')}
          className="text-xs text-muted hover:text-secondary transition-colors duration-150"
        >
          No account?{' '}
          <span className="text-accent">Sign up</span>
        </button>
      </nav>

      {/* Form */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
