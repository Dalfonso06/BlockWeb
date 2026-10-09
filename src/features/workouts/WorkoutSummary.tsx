import { formatTime } from '@/lib/date'
import { ActionMenu } from '@/components/ui/ActionMenu'
import { CheckIcon, CircleIcon, MinusIcon } from '@/icons'
import { getWorkoutTypeColor } from '@/features/workout-types/workoutTypeColors'
import type { Workout, WorkoutStatus } from '@/types/models'

interface WorkoutSummaryProps {
  workout: Workout
  workoutTypeName: string
  onEdit?: () => void
  onDelete?: () => void
  onUpdateStatus?: (status: WorkoutStatus) => void
}

export function WorkoutSummary({ workout, workoutTypeName, onEdit, onDelete, onUpdateStatus }: WorkoutSummaryProps) {
  const distanceLabel =
    workout.planned_distance != null ? `${workout.planned_distance}${workout.unit ?? ''}` : '—'
  const isCompleted = workout.status === 'completed'
  const isSkipped = workout.status === 'skipped'

  return (
    <div className="rounded-md px-3 py-2 text-sm dark:border-neutral-800">
      <div className="grid grid-cols-[6rem_8rem_6rem_1fr] items-center gap-2">
        <button
          type="button"
          onClick={() => onUpdateStatus?.(isCompleted ? 'planned' : 'completed')}
          disabled={!onUpdateStatus || isSkipped}
          aria-label={`Mark ${workout.title} as ${isCompleted ? 'planned' : 'completed'}`}
          aria-pressed={isCompleted}
          className="text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 hover:text-accent dark:hover:text-accent-dark"
        >
          {isSkipped ? (
            <MinusIcon className="h-4 w-4" />
          ) : isCompleted ? (
            <CheckIcon className="h-4 w-4 text-emerald-500 dark:text-accent-dark" />
          ) : (
            <CircleIcon className="h-4 w-4" />
          )}
        </button>

        <div className={isSkipped ? 'opacity-50' : ''}>
          <div className="flex items-center gap-2 font-medium text-neutral-900 dark:text-neutral-100">
            <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${getWorkoutTypeColor(workoutTypeName)}`} />
            {workoutTypeName}
          </div>
          <div className="text-xs text-neutral-500">{workout.title}</div>
        </div>

        <div className={isSkipped ? 'opacity-50' : ''}>
          <div className="font-medium text-neutral-900 dark:text-neutral-100">{distanceLabel}</div>
          <div className="text-xs text-neutral-500">{formatTime(workout.scheduled_start)}</div>
        </div>

        <div className="flex items-center justify-end gap-4">
          <span className={`text-xs text-neutral-500 ${isSkipped ? 'opacity-50' : ''}`}>{workout.status}</span>
          {(onEdit || onDelete || onUpdateStatus) && (
            <ActionMenu
              label={`Actions for ${workout.title}`}
              actions={[
                ...(onEdit ? [{ label: 'Edit', onClick: onEdit }] : []),
                ...(onUpdateStatus && workout.status === 'planned'
                  ? [{ label: 'Skip', onClick: () => onUpdateStatus('skipped') }]
                  : []),
                ...(onUpdateStatus && isSkipped
                  ? [{ label: 'Restore', onClick: () => onUpdateStatus('planned') }]
                  : []),
                ...(onDelete ? [{ label: 'Delete', onClick: onDelete, danger: true }] : []),
              ]}
            />
          )}
        </div>
      </div>
    </div>
  )
}
