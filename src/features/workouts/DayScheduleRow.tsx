import { formatMonthDay, formatWeekday } from '@/lib/date'
import { WorkoutSummary } from './WorkoutSummary'
import type { Workout } from '@/types/models'

interface DayScheduleRowProps {
  date: string
  workouts: Workout[]
  workoutTypeNameById: Record<number, string>
}

export function DayScheduleRow({ date, workouts, workoutTypeNameById }: DayScheduleRowProps) {
  return (
    <div className="flex gap-4 border-b border-neutral-100 py-3 last:border-b-0 dark:border-neutral-900">
      <div className="w-24 shrink-0">
        <div className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{formatWeekday(date)}</div>
        <div className="text-xs text-neutral-500">{formatMonthDay(date)}</div>
      </div>

      <div className="flex-1">
        {workouts.length === 0 ? (
          <div className="flex h-full items-center">
            <p className="text-sm text-neutral-400">Rest day</p>
          </div>
        ) : (
          <div className="space-y-2">
            {workouts.map((workout) => (
              <WorkoutSummary
                key={workout.id}
                workout={workout}
                workoutTypeName={workoutTypeNameById[workout.workout_type_id] ?? 'Workout'}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
