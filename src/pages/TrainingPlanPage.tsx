import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { EditIcon, DeleteIcon } from '@/icons'
import { formatDate } from '@/lib/date'
import { useDeleteTrainingBlock, useTrainingBlocks } from '@/features/training-blocks/hooks'
import { TrainingBlockFormModal } from '@/features/training-blocks/TrainingBlockFormModal'
import { TrainingBlockStatusPill } from '@/features/training-blocks/TrainingBlockStatusPill'
import type { TrainingBlock } from '@/types/models'

export function TrainingPlanPage() {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingBlock, setEditingBlock] = useState<TrainingBlock | null>(null)
  const [deletingBlock, setDeletingBlock] = useState<TrainingBlock | null>(null)
  const { data: trainingBlocks, isLoading } = useTrainingBlocks()
  const deleteTrainingBlock = useDeleteTrainingBlock()

  function handleNew() {
    setEditingBlock(null)
    setIsModalOpen(true)
  }

  function handleEdit(block: TrainingBlock) {
    setEditingBlock(block)
    setIsModalOpen(true)
  }

  function handleModalClose() {
    setIsModalOpen(false)
    setEditingBlock(null)
  }

  async function handleConfirmDelete() {
    if (!deletingBlock) return
    await deleteTrainingBlock.mutateAsync(deletingBlock.id)
    setDeletingBlock(null)
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">Training Plan</h1>
        <Button onClick={handleNew}>New Training Block</Button>
      </div>

      <div className="mt-6">
        {isLoading && <p className="text-sm text-neutral-500">Loading…</p>}

        {!isLoading && trainingBlocks?.length === 0 && (
          <p className="text-sm text-neutral-500">No training blocks yet.</p>
        )}

        {!isLoading && trainingBlocks && trainingBlocks.length > 0 && (
          <ul className="space-y-2">
            {trainingBlocks.map((block) => (
              <li
                key={block.id}
                onClick={() => navigate(`/training-plan/${block.id}`)}
                className="flex cursor-pointer items-center justify-between rounded-md border border-neutral-200 px-4 py-3 text-sm hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium text-neutral-900 dark:text-neutral-100">{block.name}</span>
                  <span className="text-neutral-500">
                    {formatDate(block.start_date)} – {formatDate(block.end_date)}
                  </span>
                  <TrainingBlockStatusPill status={block.status} />
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleEdit(block)
                    }}
                    aria-label={`Edit ${block.name}`}
                    className="text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
                  >
                    <EditIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setDeletingBlock(block)
                    }}
                    aria-label={`Delete ${block.name}`}
                    className="text-neutral-500 hover:text-red-600"
                  >
                    <DeleteIcon className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <TrainingBlockFormModal
        key={`${editingBlock?.id ?? 'new'}-${isModalOpen}`}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        trainingBlock={editingBlock}
      />

      <ConfirmDialog
        isOpen={deletingBlock !== null}
        onClose={() => setDeletingBlock(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Training Block"
        description={deletingBlock ? `Are you sure you want to delete "${deletingBlock.name}"? This cannot be undone.` : undefined}
        confirmLabel="Delete"
        isConfirming={deleteTrainingBlock.isPending}
      />
    </div>
  )
}
