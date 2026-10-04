import { useState } from 'react'
import { FormModal } from '@/components/ui/FormModal'
import { ApiError } from '@/api/client'
import type { TrainingBlock, TrainingBlockStatus } from '@/types/models'
import { useCreateTrainingBlock, useUpdateTrainingBlock } from './hooks'

interface TrainingBlockFormModalProps {
  isOpen: boolean
  onClose: () => void
  trainingBlock?: TrainingBlock | null
}

const STATUS_OPTIONS: TrainingBlockStatus[] = ['planned', 'active', 'completed', 'archived']

const emptyForm = {
  name: '',
  description: '',
  start_date: '',
  end_date: '',
  status: 'planned' as TrainingBlockStatus,
}

function formFromTrainingBlock(trainingBlock: TrainingBlock) {
  return {
    name: trainingBlock.name,
    description: trainingBlock.description ?? '',
    start_date: trainingBlock.start_date,
    end_date: trainingBlock.end_date,
    status: trainingBlock.status,
  }
}

export function TrainingBlockFormModal({ isOpen, onClose, trainingBlock = null }: TrainingBlockFormModalProps) {
  const isEditing = trainingBlock !== null
  const [form, setForm] = useState(trainingBlock ? formFromTrainingBlock(trainingBlock) : emptyForm)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const createTrainingBlock = useCreateTrainingBlock()
  const updateTrainingBlock = useUpdateTrainingBlock(trainingBlock?.id ?? -1)

  function handleClose() {
    setSubmitError(null)
    onClose()
  }

  async function handleSubmit() {
    setSubmitError(null)

    const payload = {
      name: form.name,
      description: form.description || null,
      start_date: form.start_date,
      end_date: form.end_date,
      status: form.status,
    }

    try {
      if (isEditing && trainingBlock) {
        await updateTrainingBlock.mutateAsync(payload)
      } else {
        await createTrainingBlock.mutateAsync(payload)
      }
      handleClose()
    } catch (err) {
      setSubmitError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.')
    }
  }

  const isSubmitting = isEditing ? updateTrainingBlock.isPending : createTrainingBlock.isPending

  return (
    <FormModal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditing ? 'Edit Training Block' : 'New Training Block'}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      submitError={submitError}
      submitLabel={isEditing ? 'Save' : 'Create'}
    >
      <div className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="block-name" className="text-sm">
            Name
          </label>
          <input
            id="block-name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="block-description" className="text-sm">
            Description
          </label>
          <textarea
            id="block-description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={2}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label htmlFor="block-start-date" className="text-sm">
              Start date
            </label>
            <input
              id="block-start-date"
              type="date"
              value={form.start_date}
              onChange={(e) => setForm({ ...form, start_date: e.target.value })}
              required
              className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="block-end-date" className="text-sm">
              End date
            </label>
            <input
              id="block-end-date"
              type="date"
              value={form.end_date}
              onChange={(e) => setForm({ ...form, end_date: e.target.value })}
              required
              className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="block-status" className="text-sm">
            Status
          </label>
          <select
            id="block-status"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value as TrainingBlockStatus })}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status[0].toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </FormModal>
  )
}
