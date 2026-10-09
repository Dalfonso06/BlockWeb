import { AddIcon } from '@/icons'

interface WeekQuickActionsProps {
  onAddWorkout: () => void
}

export function WeekQuickActions({ onAddWorkout }: WeekQuickActionsProps) {
  return (
    <div className="rounded-md border border-neutral-200 p-4 dark:border-neutral-800">
      <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Quick Actions</h3>

      <button
        onClick={onAddWorkout}
        className="mt-3 flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
      >
        <AddIcon className="h-3 w-3" />
        Add workout
      </button>
    </div>
  )
}
