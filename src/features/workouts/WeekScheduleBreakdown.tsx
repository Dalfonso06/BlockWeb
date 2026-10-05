import { enumerateDates, toDateKey } from '@/lib/date'
import { useWorkoutTypes } from '@/features/workout-types/hooks'
import { TrainingWeekHeader } from '@/features/training-weeks/TrainingWeekHeader'
import { useWorkouts } from './hooks'
import { DayScheduleRow } from './DayScheduleRow'
import type { TrainingWeek, Workout } from '@/types/models'

interface WeekScheduleBreakdownProps {
  week: TrainingWeek
}

export function WeekScheduleBreakdown({ week }: WeekScheduleBreakdownProps) {
  const { data: workouts, isLoading: isLoadingWorkouts } = useWorkouts(week.id)
  const { data: workoutTypes, isLoading: isLoadingWorkoutTypes } = useWorkoutTypes()

  if (isLoadingWorkouts || isLoadingWorkoutTypes) {
    return <p className="text-sm text-neutral-500">Loading…</p>
  }

  const workoutTypeNameById = Object.fromEntries(
    (workoutTypes ?? []).map((workoutType) => [workoutType.id, workoutType.name]),
  )

  const workoutsByDate = new Map<string, Workout[]>()
  for (const workout of workouts ?? []) {
    const dateKey = toDateKey(workout.scheduled_start)
    const existing = workoutsByDate.get(dateKey)
    if (existing) {
      existing.push(workout)
    } else {
      workoutsByDate.set(dateKey, [workout])
    }
  }

  const dates = enumerateDates(week.start_date, week.end_date)

  return (
    <div className="rounded-md border border-neutral-200 dark:border-neutral-800">
      <TrainingWeekHeader week={week} workoutCount={workouts?.length ?? 0} />

      <div className="px-4">
        {dates.map((date) => (
          <DayScheduleRow
            key={date}
            date={date}
            workouts={workoutsByDate.get(date) ?? []}
            workoutTypeNameById={workoutTypeNameById}
          />
        ))}
      </div>
    </div>
  )
}
