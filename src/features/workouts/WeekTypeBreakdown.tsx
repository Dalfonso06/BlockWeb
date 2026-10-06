import { Fragment } from 'react'
import { formatDuration } from '@/lib/date'
import { ChartIcon, ClockIcon } from '@/icons'
import { getWorkoutTypeColor } from '@/features/workout-types/workoutTypeColors'
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
  const totalMinutes = rows.reduce((sum, row) => sum + row.totalMinutes, 0)

  return (
    <div className="w-64 shrink-0 rounded-md border border-neutral-200 p-4 dark:border-neutral-800">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
        <ChartIcon className="h-3.5 w-3.5" />
        Week Breakdown
      </h3>

      {rows.length === 0 ? (
        <p className="mt-2 text-sm text-neutral-500">No workouts planned yet.</p>
      ) : (
        <>
          <div className="mt-3 border-t border-neutral-200 dark:border-neutral-800" />

          <div className="mt-3 grid grid-cols-[1rem_1fr_auto_auto] items-center gap-x-2 gap-y-3 text-sm">
            {rows.map((row) => {
              const typeName = workoutTypeNameById[row.typeId] ?? 'Workout'
              const distanceLabel = Object.entries(row.distanceByUnit)
                .map(([unit, total]) => `${total}${unit}`)
                .join(', ')

              return (
                <Fragment key={row.typeId}>
                  <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${getWorkoutTypeColor(typeName)}`} />
                  <span className="font-medium text-neutral-500 dark:text-neutral-100">{typeName}</span>
                  <span className="text-right text-neutral-500">{formatDuration(row.totalMinutes)}</span>
                  <span className="text-right text-neutral-500">{distanceLabel}</span>
                </Fragment>
              )
            })}

            <div className="col-span-4 border-t border-neutral-200 dark:border-neutral-800" />

            <ClockIcon className="h-2.5 w-2.5 shrink-0 text-neutral-500 dark:text-neutral-100" />
            <span className="text-neutral-500 dark:text-neutral-100">Total</span>
            <span className="text-right text-neutral-500 dark:text-neutral-100">
              {formatDuration(totalMinutes)}
            </span>
            <span />
          </div>
        </>
      )}
    </div>
  )
}
