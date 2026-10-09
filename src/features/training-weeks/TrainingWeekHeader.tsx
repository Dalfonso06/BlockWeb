import { formatDateRange, formatDuration } from '@/lib/date'
import type { TrainingWeek } from '@/types/models'

interface TrainingWeekHeaderProps {
  week: TrainingWeek
  workoutCount: number
  plannedVolumeMinutes: number
}

export function TrainingWeekHeader({ week, workoutCount, plannedVolumeMinutes }: TrainingWeekHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
      <div>
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Week {week.week_number}</h2>
        <p className="mt-0.5 text-sm text-neutral-500">{formatDateRange(week.start_date, week.end_date, true)}</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            {formatDuration(plannedVolumeMinutes)}
          </div>
          <div className="text-xs text-neutral-500">planned volume</div>
        </div>

        <div className="h-8 w-px bg-neutral-200 dark:bg-neutral-800" />

        <div className="text-right">
          <div className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">{workoutCount}</div>
          <div className="text-xs text-neutral-500">workouts planned</div>
        </div>
      </div>
    </div>
  )
}
