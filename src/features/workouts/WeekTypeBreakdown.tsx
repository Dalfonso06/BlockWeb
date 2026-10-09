import { Fragment } from 'react'
import { formatDuration } from '@/lib/date'
import { ChartIcon, ClockIcon } from '@/icons'
import { getWorkoutTypeColor } from '@/features/workout-types/workoutTypeColors'
import type { WorkoutTypeBreakdownItem } from '@/features/training-weeks/types'

interface WeekTypeBreakdownProps {
  workoutTypes: WorkoutTypeBreakdownItem[]
  totalMinutes: number
}

export function WeekTypeBreakdown({ workoutTypes, totalMinutes }: WeekTypeBreakdownProps) {
  return (
    <div className="rounded-md border border-neutral-200 p-4 dark:border-neutral-800">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
        <ChartIcon className="h-3.5 w-3.5" />
        Week Breakdown
      </h3>

      {workoutTypes.length === 0 ? (
        <p className="mt-2 text-sm text-neutral-500">No workouts planned yet.</p>
      ) : (
        <>
          <div className="mt-3 border-t border-neutral-200 dark:border-neutral-800" />

          <div className="mt-3 grid grid-cols-[1rem_1fr_auto_auto] items-center gap-x-2 gap-y-3 text-sm">
            {workoutTypes.map((item) => (
              <Fragment key={item.workout_type}>
                <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${getWorkoutTypeColor(item.workout_type)}`} />
                <span className="font-medium text-neutral-500 dark:text-neutral-100">{item.workout_type}</span>
                <span className="text-right text-neutral-500">{formatDuration(item.duration_sum)}</span>
                <span className="pl-3 text-right text-neutral-500">
                  {item.distance != null ? `${item.distance}${item.unit ?? ''}` : ''}
                </span>
              </Fragment>
            ))}

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
