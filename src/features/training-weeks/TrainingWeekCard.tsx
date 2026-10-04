import { formatDate } from '@/lib/date'
import type { TrainingWeek } from '@/types/models'

interface TrainingWeekCardProps {
  week: TrainingWeek
  isSelected: boolean
  onSelect: () => void
}

export function TrainingWeekCard({ week, isSelected, onSelect }: TrainingWeekCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      className={`shrink-0 w-40 rounded-md border px-3 py-2 text-left text-sm transition-colors ${
        isSelected
          ? 'border-accent bg-accent/10'
          : 'border-neutral-200 hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-800'
      }`}
    >
      <div className="font-medium text-neutral-900 dark:text-neutral-100">Week {week.week_number}</div>
      {(week.name || week.focus) && (
        <div className="mt-0.5 truncate text-neutral-600 dark:text-neutral-400">
          {week.name ?? week.focus}
        </div>
      )}
      <div className="mt-1 text-xs text-neutral-500">
        {formatDate(week.start_date)} – {formatDate(week.end_date)}
      </div>
    </button>
  )
}
