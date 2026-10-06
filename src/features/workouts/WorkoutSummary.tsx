import { formatTime } from '@/lib/date'
import { ActionMenu } from '@/components/ui/ActionMenu'
import { getWorkoutTypeColor } from '@/features/workout-types/workoutTypeColors'
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
    <div className="rounded-md px-3 py-2 text-sm dark:border-neutral-800">
      <div className="grid grid-cols-[9rem_6rem_1fr] items-center gap-2">
        <div>
          <div className="flex items-center gap-2 font-medium text-neutral-900 dark:text-neutral-100">
            <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${getWorkoutTypeColor(workoutTypeName)}`} />
            {workoutTypeName}
          </div>
          <div className="text-xs text-neutral-500">{workout.title}</div>
        </div>

        <div>
          <div className="font-medium text-neutral-900 dark:text-neutral-100">{distanceLabel}</div>
          <div className="text-xs text-neutral-500">{formatTime(workout.scheduled_start)}</div>
        </div>

        <div className="flex items-center justify-end gap-4">
          <span className="text-xs text-neutral-500">{workout.status}</span>
          {(onEdit || onDelete) && (
            <ActionMenu
              label={`Actions for ${workout.title}`}
              actions={[
                ...(onEdit ? [{ label: 'Edit', onClick: onEdit }] : []),
                ...(onDelete ? [{ label: 'Delete', onClick: onDelete, danger: true }] : []),
              ]}
            />
          )}
        </div>
      </div>
    </div>
  )
}
