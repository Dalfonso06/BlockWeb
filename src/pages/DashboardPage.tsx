import { useState } from 'react'
import { useAuth } from '@/features/auth/useAuth'
import { Button } from '@/components/ui/Button'
import { ActivityFormModal } from '@/features/activities/ActivityFormModal'

export function DashboardPage() {
  const { user } = useAuth()
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false)

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          Welcome{user ? `, ${user.first_name} ${user.last_name}` : ''}
        </h1>
        <Button onClick={() => setIsActivityModalOpen(true)}>Log Activity</Button>
      </div>
      <p className="mt-2 text-sm text-neutral-500">
        This is a placeholder — the training dashboard will live here.
      </p>

      <ActivityFormModal isOpen={isActivityModalOpen} onClose={() => setIsActivityModalOpen(false)} />
    </div>
  )
}
