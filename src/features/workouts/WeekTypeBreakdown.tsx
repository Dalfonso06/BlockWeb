import { formatDuration } from '@/lib/date'
import type { Workout } from '@/types/models'

interface WeekTypeBreakdownProps {
  workouts: Workout[]
  workoutTypeNameById: Record<number, string>
}

interface TypeTotals {
  typeId: number
  totalMinutes: number
  distanceByUnit: Record<string, number>
}

export function WeekTypeBreakdown({ workouts, workoutTypeNameById }: WeekTypeBreakdownProps) {
  const totalsByType = new Map<number, TypeTotals>()

  for (const workout of workouts) {
    const totals = totalsByType.get(workout.workout_type_id) ?? {
      typeId: workout.workout_type_id,
      totalMinutes: 0,
      distanceByUnit: {},
    }
    totals.totalMinutes += workout.planned_duration ?? 0
    if (workout.planned_distance != null) {
      const unit = workout.unit ?? ''
      totals.distanceByUnit[unit] = (totals.distanceByUnit[unit] ?? 0) + workout.planned_distance
    }
    totalsByType.set(workout.workout_type_id, totals)
  }

  const rows = [...totalsByType.values()].sort((a, b) => b.totalMinutes - a.totalMinutes)

  return (
    <div className="w-64 shrink-0 rounded-md border border-neutral-200 p-4 dark:border-neutral-800">
      <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Week Breakdown</h3>

      {rows.length === 0 ? (
        <p className="mt-2 text-sm text-neutral-500">No workouts planned yet.</p>
      ) : (
        <ul className="mt-3 space-y-3">
          {rows.map((row) => {
            const distanceLabel = Object.entries(row.distanceByUnit)
              .map(([unit, total]) => `${total}${unit}`)
              .join(', ')

            return (
              <li key={row.typeId} className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-neutral-900 dark:text-neutral-100">
                  {workoutTypeNameById[row.typeId] ?? 'Workout'}
                </span>
                <span className="text-neutral-500">
                  {formatDuration(row.totalMinutes)}
                  {distanceLabel && ` · ${distanceLabel}`}
                </span>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
