import { useAuth } from '@/features/auth/useAuth'

export function DashboardPage() {
  const { user } = useAuth()

  return (
    <div>
      <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
        Welcome{user ? `, ${user.first_name} ${user.last_name}` : ''}
      </h1>
      <p className="mt-2 text-sm text-neutral-500">
        This is a placeholder — the training dashboard will live here.
      </p>
    </div>
  )
}
