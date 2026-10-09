import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { useTrainingBlock } from '@/features/training-blocks/hooks'
import { TrainingBlockSummary } from '@/features/training-blocks/TrainingBlockSummary'
import { TrainingBlockFormModal } from '@/features/training-blocks/TrainingBlockFormModal'
import { useTrainingWeeks } from '@/features/training-weeks/hooks'
import { TrainingWeekScroller } from '@/features/training-weeks/TrainingWeekScroller'
import { WeekScheduleBreakdown } from '@/features/workouts/WeekScheduleBreakdown'

export function TrainingBlockDetailPage() {
  const { blockId } = useParams<{ blockId: string }>()
  const id = Number(blockId)
  const [selectedWeekId, setSelectedWeekId] = useState<number | null>(null)
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false)

  const { data: block, isLoading: isLoadingBlock } = useTrainingBlock(id)
  const { data: weeks, isLoading: isLoadingWeeks } = useTrainingWeeks(id)

  const sortedWeeks = [...(weeks ?? [])].sort((a, b) => a.week_number - b.week_number)
  const activeWeekId = selectedWeekId ?? sortedWeeks[0]?.id ?? null
  const activeWeek = sortedWeeks.find((week) => week.id === activeWeekId) ?? null

  return (
    <div>
      <div className="flex items-center justify-between">
        <Link
          to="/training-plan"
          className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
        >
          ← Training Plan
        </Link>

        <Button onClick={() => setIsBlockModalOpen(true)}>Edit Plan</Button>
      </div>

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

      <div className="mt-6">
        {activeWeek && <WeekScheduleBreakdown week={activeWeek} />}
      </div>

      {block && (
        <TrainingBlockFormModal
          key={`edit-${block.id}-${isBlockModalOpen}`}
          isOpen={isBlockModalOpen}
          onClose={() => setIsBlockModalOpen(false)}
          trainingBlock={block}
        />
      )}
    </div>
  )
}
