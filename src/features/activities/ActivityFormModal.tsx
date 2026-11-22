import { useState } from 'react'
import { FormModal } from '@/components/ui/FormModal'
import { Select } from '@/components/ui/Select'
import { ApiError } from '@/api/client'
import { todayDateKey } from '@/lib/date'
import { useWorkoutTypes } from '@/features/workout-types/hooks'
import { useSources } from '@/features/sources/hooks'
import { useCreateActivity } from './hooks'

interface ActivityFormModalProps {
  isOpen: boolean
  onClose: () => void
}

function emptyForm() {
  return {
    workout_type_id: '',
    name: '',
    date: todayDateKey(),
    time: '',
    durationMinutes: '',
    notes: '',
  }
}

export function ActivityFormModal({ isOpen, onClose }: ActivityFormModalProps) {
  const { data: workoutTypes } = useWorkoutTypes()
  const { data: sources, isLoading: isLoadingSources } = useSources()
  const createActivity = useCreateActivity()

  const [form, setForm] = useState(emptyForm)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const manualSource = sources?.find((source) => source.key === 'manual') ?? null

  function handleClose() {
    setForm(emptyForm())
    setSubmitError(null)
    onClose()
  }

  async function handleSubmit() {
    setSubmitError(null)

    if (!manualSource) {
      setSubmitError('Manual logging is not available right now. Please try again later.')
      return
    }

    const payload = {
      workout_type_id: Number(form.workout_type_id),
      name: form.name.trim() ? form.name.trim() : null,
      started_at: `${form.date}T${form.time}:00`,
      elapsed_duration_seconds: Number(form.durationMinutes) * 60,
      notes: form.notes.trim() ? form.notes.trim() : null,
      source_id: manualSource.id,
    }

    try {
      await createActivity.mutateAsync(payload)
      handleClose()
    } catch (err) {
      setSubmitError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <FormModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Log Activity"
      onSubmit={handleSubmit}
      isSubmitting={createActivity.isPending}
      submitError={submitError}
      submitLabel="Log"
    >
      <div className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="activity-type" className="text-sm">
            Type
          </label>
          <Select
            id="activity-type"
            value={form.workout_type_id}
            onChange={(e) => setForm({ ...form, workout_type_id: e.target.value })}
            required
          >
            <option value="" disabled>
              Select a type
            </option>
            {(workoutTypes ?? []).map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </Select>
        </div>

        <div className="space-y-1">
          <label htmlFor="activity-name" className="text-sm">
            Name (optional)
          </label>
          <input
            id="activity-name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label htmlFor="activity-date" className="text-sm">
              Date
            </label>
            <input
              id="activity-date"
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              required
              className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="activity-time" className="text-sm">
              Time
            </label>
            <input
              id="activity-time"
              type="time"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              required
              className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="activity-duration" className="text-sm">
            Duration (min)
          </label>
          <input
            id="activity-duration"
            type="number"
            min="1"
            value={form.durationMinutes}
            onChange={(e) => setForm({ ...form, durationMinutes: e.target.value })}
            required
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="activity-notes" className="text-sm">
            Notes
          </label>
          <textarea
            id="activity-notes"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            rows={2}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
          />
        </div>

        {!isLoadingSources && !manualSource && (
          <p className="text-sm text-red-600 dark:text-red-400">
            Manual logging is not available right now. Please try again later.
          </p>
        )}
      </div>
    </FormModal>
  )
}
