import type { ReactNode } from 'react'
import { useAuth } from '@/features/auth/useAuth'
import { Button } from '@/components/ui/Button'

export function AppShell({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-svh flex flex-col">
      <header className="flex items-center justify-between border-b border-neutral-200 px-6 py-4 dark:border-neutral-800">
        <span className="font-semibold text-neutral-900 dark:text-neutral-100">Block</span>
        {user && (
          <div className="flex items-center gap-3 text-sm">
            <span>{user.username}</span>
            <Button variant="secondary" onClick={logout}>
              Log out
            </Button>
          </div>
        )}
      </header>
      <main className="flex-1 px-6 py-8">{children}</main>
    </div>
  )
}
