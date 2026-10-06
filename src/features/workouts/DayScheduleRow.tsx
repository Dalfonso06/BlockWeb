import { formatMonthDay, formatWeekday } from '@/lib/date'
import { AddIcon } from '@/icons'
import { WorkoutSummary } from './WorkoutSummary'
import type { Workout } from '@/types/models'

interface DayScheduleRowProps {
  date: string
  workouts: Workout[]
  workoutTypeNameById: Record<number, string>
  isEditMode: boolean
  onAddWorkout: (date: string) => void
  onEditWorkout: (workout: Workout) => void
  onDeleteWorkout: (workout: Workout) => void
}

export function DayScheduleRow({
  date,
  workouts,
  workoutTypeNameById,
  isEditMode,
  onAddWorkout,
  onEditWorkout,
  onDeleteWorkout,
}: DayScheduleRowProps) {
  return (
    <div className="flex gap-4 border-b border-neutral-100 py-3 last:border-b-0 dark:border-neutral-900">
      <div className="w-24 shrink-0">
        <div className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{formatWeekday(date)}</div>
        <div className="text-xs text-neutral-500">{formatMonthDay(date)}</div>
      </div>

      <div className="flex-1">
        {workouts.length === 0 ? (
          <div className="flex h-full items-center gap-3">
            <p className="text-sm text-neutral-400">Rest day</p>
            {isEditMode && (
              <button
                onClick={() => onAddWorkout(date)}
                className="flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
              >
                <AddIcon className="h-3 w-3" />
                Add workout
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            <div className="divide-y divide-neutral-100 dark:divide-neutral-900">
              {workouts.map((workout) => (
                <WorkoutSummary
                  key={workout.id}
                  workout={workout}
                  workoutTypeName={workoutTypeNameById[workout.workout_type_id] ?? 'Workout'}
                  onEdit={isEditMode ? () => onEditWorkout(workout) : undefined}
                  onDelete={isEditMode ? () => onDeleteWorkout(workout) : undefined}
                />
              ))}
            </div>
            {isEditMode && (
              <button
                onClick={() => onAddWorkout(date)}
                className="flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
              >
                <AddIcon className="h-3 w-3" />
                Add workout
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
