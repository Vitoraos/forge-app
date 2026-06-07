'use client'

import { useState } from 'react'
import Sidebar from './Sidebar'

export default function AppShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-base flex">
      <Sidebar
        open={sidebarOpen}
        onToggle={() => setSidebarOpen(prev => !prev)}
      />
      <main
        className={`
          flex-1 min-h-screen transition-all duration-150
          ${sidebarOpen ? 'ml-64' : 'ml-12'}
        `}
      >
        {children}
      </main>
    </div>
  )
}
