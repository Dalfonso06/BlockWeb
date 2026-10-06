import { formatTime } from '@/lib/date'
import { EditIcon, DeleteIcon } from '@/icons'
import type { Workout } from '@/types/models'

interface WorkoutSummaryProps {
  workout: Workout
  workoutTypeName: string
  onEdit?: () => void
  onDelete?: () => void
}

export function WorkoutSummary({ workout, workoutTypeName, onEdit, onDelete }: WorkoutSummaryProps) {
  const distanceLabel =
    workout.planned_distance != null ? `${workout.planned_distance}${workout.unit ?? ''}` : '—'

  return (
    <div className="rounded-md border border-neutral-200 px-3 py-2 text-sm dark:border-neutral-800">
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-6">
          <div>
            <div className="font-medium text-neutral-900 dark:text-neutral-100">{workoutTypeName}</div>
            <div className="text-xs text-neutral-500">{workout.title}</div>
          </div>

          <div>
            <div className="font-medium text-neutral-900 dark:text-neutral-100">{distanceLabel}</div>
            <div className="text-xs text-neutral-500">{formatTime(workout.scheduled_start)}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-500">{workout.status}</span>
          {onEdit && (
            <button
              onClick={onEdit}
              aria-label={`Edit ${workout.title}`}
              className="text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              <EditIcon className="h-3.5 w-3.5" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              aria-label={`Delete ${workout.title}`}
              className="text-neutral-500 hover:text-red-600"
            >
              <DeleteIcon className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
