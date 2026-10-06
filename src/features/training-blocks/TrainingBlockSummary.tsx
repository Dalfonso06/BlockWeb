import { formatDateRange } from '@/lib/date'
import { EditIcon } from '@/icons'
import { TrainingBlockStatusPill } from './TrainingBlockStatusPill'
import type { TrainingBlock } from '@/types/models'

interface TrainingBlockSummaryProps {
  block: TrainingBlock
  isEditMode?: boolean
  onEdit?: () => void
}

export function TrainingBlockSummary({ block, isEditMode = false, onEdit }: TrainingBlockSummaryProps) {
  return (
    <div className="rounded-md border border-neutral-200 px-4 py-3 dark:border-neutral-800">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">{block.name}</h1>
        <div className="flex items-center gap-2">
          <TrainingBlockStatusPill status={block.status} />
          {isEditMode && onEdit && (
            <button
              onClick={onEdit}
              aria-label={`Edit ${block.name}`}
              className="text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              <EditIcon className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {block.description && (
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{block.description}</p>
      )}

      <p className="mt-2 text-sm text-neutral-500">
        {formatDateRange(block.start_date, block.end_date, true)}
      </p>
    </div>
  )
}
