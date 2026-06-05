'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'

// ─── FORGE WORDMARK ───────────────────────────────────────────────
function ForgeWordmark({ size = 'lg' }) {
  const sizes = {
    sm: 'text-2xl tracking-[0.15em]',
    lg: 'text-5xl tracking-[0.2em]',
    xl: 'text-7xl tracking-[0.25em]',
  }

  return (
    <div className={`font-mono font-semibold ${sizes[size]} relative inline-block select-none`}>
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

// ─── GRID BACKGROUND ──────────────────────────────────────────────
function GridBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(#2563EB 1px, transparent 1px),
            linear-gradient(90deg, #2563EB 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, #2563eb08 0%, transparent 70%)',
        }}
      />
    </div>
  )
}

// ─── NAV ──────────────────────────────────────────────────────────
function Nav({ onLogin, onSignup }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-border/50 backdrop-blur-sm bg-base/80">
      <ForgeWordmark size="sm" />
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onLogin}>
          Login
        </Button>
        <Button variant="primary" size="sm" onClick={onSignup}>
          Get Started
        </Button>
      </div>
    </nav>
  )
}

// ─── HERO ─────────────────────────────────────────────────────────
function Hero({ onSignup, onLogin }) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-32 relative">
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto gap-8">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-xs text-accent font-mono tracking-wider">
            AI CODING AGENT — MOBILE FIRST
          </span>
        </div>

        <ForgeWordmark size="xl" />

        <p className="text-xl text-muted font-light leading-relaxed max-w-lg">
          Code doesn't wait for a desk.{' '}
          <span className="text-secondary font-medium">Neither does Forge.</span>
        </p>

        <div className="flex items-center gap-4 pt-2">
          <Button variant="primary" size="lg" onClick={onSignup}>
            Start Building
          </Button>
          <Button variant="ghost" size="lg" onClick={onLogin}>
            Sign In
          </Button>
        </div>

        <div className="flex items-center gap-6 pt-4">
          {['No laptop', 'No setup', 'No limits'].map((item) => (
            <div key={item} className="flex items-center gap-1.5">
              <span className="text-accent text-xs">✦</span>
              <span className="text-xs text-muted">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Arc reactor glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, #2563EB44, transparent)',
        }}
      />
    </section>
  )
}

// ─── PAIN ─────────────────────────────────────────────────────────
function Pain() {
  const pains = [
    {
      number: '01',
      heading: 'Your best ideas don\'t happen at a desk',
      body: 'You\'re on your phone, away from your laptop, and a fix or feature suddenly becomes obvious. You make a note. You forget it. Or worse — you remember it but the momentum is gone by the time you sit down.',
    },
    {
      number: '02',
      heading: 'Coding tools assume you have a computer',
      body: 'Every IDE, every CLI, every dev environment is built for a machine with a keyboard. Your phone is more powerful than the computer that sent people to the moon. But it can\'t ship code.',
    },
    {
      number: '03',
      heading: 'The gap between idea and shipped code is too wide',
      body: 'Open laptop. Pull latest. Find the file. Understand the context. Write the code. Test it. Commit. Push. By the time you\'ve done all that, the idea has cost you an hour.',
    },
  ]

  return (
    <section className="px-6 py-24 max-w-3xl mx-auto">
      <div className="flex flex-col gap-3 mb-16">
        <span className="text-xs font-mono text-accent tracking-widest uppercase">
          The Problem
        </span>
        <h2 className="text-3xl font-semibold text-secondary leading-tight">
          Great developers are being slowed down
          <span className="text-muted"> by the tools they depend on.</span>
        </h2>
      </div>

      <div className="flex flex-col gap-0">
        {pains.map((pain, i) => (
          <div
            key={pain.number}
            className="flex gap-6 py-8 border-b border-border last:border-0"
          >
            <span className="font-mono text-xs text-accent/40 pt-1 shrink-0 w-6">
              {pain.number}
            </span>
            <div className="flex flex-col gap-2">
              <h3 className="text-base font-medium text-secondary">
                {pain.heading}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {pain.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── SOLUTION ─────────────────────────────────────────────────────
function Solution() {
  const statements = [
    'Describe a feature.',
    'Forge plans it.',
    'Forge writes it.',
    'You approve it.',
    'It ships.',
  ]

  return (
    <section className="px-6 py-24 border-y border-border relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          background: 'radial-gradient(ellipse 60% 80% at 50% 50%, #2563EB, transparent)',
        }}
      />

      <div className="max-w-3xl mx-auto relative">
        <div className="flex flex-col gap-3 mb-16">
          <span className="text-xs font-mono text-accent tracking-widest uppercase">
            The Solution
          </span>
          <h2 className="text-3xl font-semibold text-secondary leading-tight">
            A coding agent that lives in your pocket.
            <span className="text-muted"> Fully autonomous. Human approved.</span>
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {statements.map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-4"
              style={{ opacity: 1 - i * 0.08 }}
            >
              <div className="w-px h-6 bg-accent/20 shrink-0" />
              <p
                className="font-mono text-xl font-medium"
                style={{
                  color: i === 0 ? '#F0F0F0' : i === 4 ? '#2563EB' : '#888',
                }}
              >
                {s}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── HOW IT WORKS ─────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Connect your repo',
      body: 'Add any GitHub repo and your personal access token. Forge indexes your codebase instantly so the agent understands your code before it touches it.',
    },
    {
      step: '02',
      title: 'Describe your task',
      body: 'Tell Forge what you want in plain English. Fix this bug. Add this feature. Refactor this function. The planner agent breaks it into precise subtasks.',
    },
    {
      step: '03',
      title: 'Review the plan',
      body: 'Before any code is written, you see the plan. Approve it, edit it, or reject it. You stay in control at every step.',
    },
    {
      step: '04',
      title: 'Approve and merge',
      body: 'Review the full file output and explanation for each change. Approve what you want. Forge pushes to a branch. You merge when ready.',
    },
  ]

  return (
    <section className="px-6 py-24 max-w-3xl mx-auto">
      <div className="flex flex-col gap-3 mb-16">
        <span className="text-xs font-mono text-accent tracking-widest uppercase">
          How It Works
        </span>
        <h2 className="text-3xl font-semibold text-secondary leading-tight">
          From idea to branch in minutes.
          <span className="text-muted"> From your phone.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {steps.map((s) => (
          <div
            key={s.step}
            className="flex gap-6 p-5 bg-surface border border-border rounded hover:border-accent/30 transition-all duration-150"
          >
            <span className="font-mono text-xs text-accent shrink-0 pt-0.5">
              {s.step}
            </span>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-sm font-semibold text-secondary">
                {s.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">{s.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── FEATURES ─────────────────────────────────────────────────────
function Features() {
  const features = [
    {
      title: 'Dual LLM architecture',
      body: 'A planner agent thinks at the system level. A coder agent executes with precision. Two minds. One result.',
    },
    {
      title: 'Human in the loop',
      body: 'Forge never pushes code without your approval. You review the plan, the code, and the explanation before anything ships.',
    },
    {
      title: 'Per-repo memory',
      body: 'Forge remembers every decision, every rejection, every preference — per repo. It gets smarter with every session.',
    },
    {
      title: 'Any model, your key',
      body: 'Bring your own OpenRouter API key. Choose your planner and coder models. Switch mid-session. You control the intelligence.',
    },
    {
      title: 'Indexes your codebase',
      body: 'Before planning, Forge reads your entire repo — exports, routes, functions, dependencies. Context-aware from the first prompt.',
    },
    {
      title: 'Branch per session',
      body: 'Every approved session pushes to its own branch. Clean history. Safe merges. Your main branch stays untouched.',
    },
  ]

  return (
    <section className="px-6 py-24 border-t border-border bg-surface/30">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col gap-3 mb-16">
          <span className="text-xs font-mono text-accent tracking-widest uppercase">
            Features
          </span>
          <h2 className="text-3xl font-semibold text-secondary leading-tight">
            Built for developers who move fast
            <span className="text-muted"> and can't afford to stop.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-px bg-border">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex flex-col gap-2 p-6 bg-base hover:bg-surface transition-all duration-150"
            >
              <div className="flex items-center gap-2">
                <span className="w-1 h-4 bg-accent rounded-full" />
                <h3 className="text-sm font-semibold text-secondary">
                  {f.title}
                </h3>
              </div>
              <p className="text-sm text-muted leading-relaxed pl-3">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CREDIBILITY ──────────────────────────────────────────────────
function Credibility() {
  const stack = [
    'OpenRouter',
    'Supabase',
    'GitHub API',
    'Next.js',
    'Poolside Laguna',
    'Claude Sonnet',
  ]

  return (
    <section className="px-6 py-16 border-t border-border">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-6 text-center">
        <p className="text-xs font-mono text-muted tracking-widest uppercase">
          Powered by
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {stack.map((item) => (
            <span
              key={item}
              className="px-3 py-1 text-xs font-mono text-muted border border-border rounded-full"
            >
              {item}
            </span>
          ))}
        </div>
        <p className="text-xs text-muted max-w-sm">
          The world's best coding models. Stateful sessions. Encrypted credentials.
          Built for developers who ship from anywhere.
        </p>
      </div>
    </section>
  )
}

// ─── FINAL CTA ────────────────────────────────────────────────────
function FinalCTA({ onSignup }) {
  return (
    <section className="px-6 py-32 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 100%, #2563eb0a 0%, transparent 70%)',
        }}
      />
      <div className="max-w-2xl mx-auto flex flex-col items-center text-center gap-8 relative">
        <ForgeWordmark size="lg" />
        <p className="text-2xl font-light text-muted leading-relaxed">
          Your next commit is waiting.
          <br />
          <span className="text-secondary font-medium">
            Start building from your phone.
          </span>
        </p>
        <Button variant="primary" size="lg" onClick={onSignup}>
          Start Building — It's Free
        </Button>
        <p className="text-xs text-muted">
          No laptop required. No setup. Just your phone and a GitHub repo.
        </p>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, #2563EB44, transparent)',
        }}
      />
    </section>
  )
}

// ─── FOOTER ───────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="px-6 py-6 border-t border-border">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <ForgeWordmark size="sm" />
        <p className="text-xs text-muted font-mono">
          © {new Date().getFullYear()} Forge
        </p>
      </div>
    </footer>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────
export default function LandingPage() {
  const router = useRouter()

  const goToSignup = () => router.push('/signup')
  const goToLogin = () => router.push('/login')

  return (
    <div className="bg-base text-secondary min-h-screen">
      <GridBackground />
      <Nav onLogin={goToLogin} onSignup={goToSignup} />
      <Hero onSignup={goToSignup} onLogin={goToLogin} />
      <Pain />
      <Solution />
      <HowItWorks />
      <Features />
      <Credibility />
      <FinalCTA onSignup={goToSignup} />
      <Footer />
    </div>
  )
}
