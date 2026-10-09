import { TrainingWeekCard } from './TrainingWeekCard'
import type { TrainingWeek } from '@/types/models'

interface TrainingWeekScrollerProps {
  weeks: TrainingWeek[]
  selectedWeekId: number | null
  onSelectWeek: (id: number) => void
}

export function TrainingWeekScroller({ weeks, selectedWeekId, onSelectWeek }: TrainingWeekScrollerProps) {
  if (weeks.length === 0) {
    return <p className="text-sm text-neutral-500">No weeks scheduled yet.</p>
  }

  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {weeks.map((week) => (
        <TrainingWeekCard
          key={week.id}
          week={week}
          isSelected={week.id === selectedWeekId}
          onSelect={() => onSelectWeek(week.id)}
        />
      ))}
    </div>
  )
}
