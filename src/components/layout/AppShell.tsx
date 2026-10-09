import type { ReactNode } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-svh overflow-hidden overscroll-none">
      <Sidebar />
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden overscroll-none">
        <Header />
        <main className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-8">{children}</main>
      </div>
    </div>
  )
}
