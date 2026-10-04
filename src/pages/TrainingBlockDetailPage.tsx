import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTrainingBlock } from '@/features/training-blocks/hooks'
import { TrainingBlockSummary } from '@/features/training-blocks/TrainingBlockSummary'
import { useTrainingWeeks } from '@/features/training-weeks/hooks'
import { TrainingWeekScroller } from '@/features/training-weeks/TrainingWeekScroller'
import { WeekScheduleBreakdown } from '@/features/workouts/WeekScheduleBreakdown'

export function TrainingBlockDetailPage() {
  const { blockId } = useParams<{ blockId: string }>()
  const id = Number(blockId)
  const [selectedWeekId, setSelectedWeekId] = useState<number | null>(null)

  const { data: block, isLoading: isLoadingBlock } = useTrainingBlock(id)
  const { data: weeks, isLoading: isLoadingWeeks } = useTrainingWeeks(id)

  const sortedWeeks = [...(weeks ?? [])].sort((a, b) => a.week_number - b.week_number)
  const activeWeekId = selectedWeekId ?? sortedWeeks[0]?.id ?? null
  const activeWeek = sortedWeeks.find((week) => week.id === activeWeekId) ?? null

  return (
    <div>
      <Link to="/training-plan" className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100">
        ← Training Plan
      </Link>

      <div className="mt-4">
        {isLoadingBlock && <p className="text-sm text-neutral-500">Loading…</p>}
        {!isLoadingBlock && block && <TrainingBlockSummary block={block} />}
      </div>

      <div className="mt-6">
        {isLoadingWeeks && <p className="text-sm text-neutral-500">Loading…</p>}
        {!isLoadingWeeks && (
          <TrainingWeekScroller
            weeks={sortedWeeks}
            selectedWeekId={activeWeekId}
            onSelectWeek={setSelectedWeekId}
          />
        )}
      </div>

      <div className="mt-6">{activeWeek && <WeekScheduleBreakdown week={activeWeek} />}</div>
    </div>
  )
}
