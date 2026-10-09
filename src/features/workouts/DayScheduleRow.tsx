import { formatMonthDay, formatWeekday } from '@/lib/date'
import { AddIcon } from '@/icons'
import { WorkoutSummary } from './WorkoutSummary'
import type { Workout, WorkoutStatus } from '@/types/models'

interface DayScheduleRowProps {
  date: string
  workouts: Workout[]
  workoutTypeNameById: Record<number, string>
  onAddWorkout: (date: string) => void
  onEditWorkout: (workout: Workout) => void
  onDeleteWorkout: (workout: Workout) => void
  onUpdateWorkoutStatus: (workout: Workout, status: WorkoutStatus) => void
}

export function DayScheduleRow({
  date,
  workouts,
  workoutTypeNameById,
  onAddWorkout,
  onEditWorkout,
  onDeleteWorkout,
  onUpdateWorkoutStatus,
}: DayScheduleRowProps) {
  return (
    <div className="group flex gap-4 border-b border-neutral-100 px-2 py-3 last:border-b-0 dark:border-neutral-900 dark:hover:bg-neutral-900">
      <div className="flex w-24 shrink-0 items-center gap-3">
        <button
          onClick={() => onAddWorkout(date)}
          aria-label={`Add workout on ${formatWeekday(date)}, ${formatMonthDay(date)}`}
          className="opacity-0 text-neutral-500 transition-opacity group-hover:opacity-100! hover:text-neutral-900 dark:hover:text-neutral-100"
        >
          <AddIcon className="h-3 w-3" />
        </button>
        <div>
          <div className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{formatWeekday(date)}</div>
          <div className="text-xs text-neutral-500">{formatMonthDay(date)}</div>
        </div>
      </div>

      <div className="flex-1">
        {workouts.length === 0 ? (
          <div className="flex h-full items-center gap-3">
            <p className="text-sm text-neutral-400">Rest day</p>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="divide-y divide-neutral-100 dark:divide-neutral-900">
              {workouts.map((workout) => (
                <WorkoutSummary
                  key={workout.id}
                  workout={workout}
                  workoutTypeName={workoutTypeNameById[workout.workout_type_id] ?? 'Workout'}
                  onEdit={() => onEditWorkout(workout)}
                  onDelete={() => onDeleteWorkout(workout)}
                  onUpdateStatus={(status) => onUpdateWorkoutStatus(workout, status)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
