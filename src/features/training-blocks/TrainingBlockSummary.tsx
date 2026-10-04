import { formatDate } from '@/lib/date'
import type { TrainingBlock } from '@/types/models'

interface TrainingBlockSummaryProps {
  block: TrainingBlock
}

export function TrainingBlockSummary({ block }: TrainingBlockSummaryProps) {
  return (
    <div className="rounded-md border border-neutral-200 px-4 py-3 dark:border-neutral-800">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">{block.name}</h1>
        <span className="text-sm text-neutral-500">{block.status}</span>
      </div>

      {block.description && (
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{block.description}</p>
      )}

      <p className="mt-2 text-sm text-neutral-500">
        {formatDate(block.start_date)} – {formatDate(block.end_date)}
      </p>
    </div>
  )
}
