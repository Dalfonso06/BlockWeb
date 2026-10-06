import { useState } from 'react'
import { FormModal } from '@/components/ui/FormModal'
import { Button } from '@/components/ui/Button'
import { ApiError } from '@/api/client'
import { useWorkoutTypes, useCreateWorkoutType } from '@/features/workout-types/hooks'
import { useCreateWorkout, useUpdateWorkout } from './hooks'
import type { DistanceUnit, Workout, WorkoutStatus } from '@/types/models'

interface WorkoutFormModalProps {
  isOpen: boolean
  onClose: () => void
  trainingWeekId: number
  date: string
  workout?: Workout | null
}

const STATUS_OPTIONS: WorkoutStatus[] = ['planned', 'completed', 'skipped']
const UNIT_OPTIONS: DistanceUnit[] = ['km', 'mi', 'm', 'yd']

const emptyForm = {
  workout_type_id: '',
  title: '',
  time: '',
  planned_duration: '',
  planned_distance: '',
  unit: '' as DistanceUnit | '',
  status: 'planned' as WorkoutStatus,
}

function formFromWorkout(workout: Workout) {
  return {
    workout_type_id: String(workout.workout_type_id),
    title: workout.title,
    time: workout.scheduled_start.slice(11, 16),
    planned_duration: workout.planned_duration != null ? String(workout.planned_duration) : '',
    planned_distance: workout.planned_distance != null ? String(workout.planned_distance) : '',
    unit: workout.unit ?? ('' as DistanceUnit | ''),
    status: workout.status,
  }
}

export function WorkoutFormModal({ isOpen, onClose, trainingWeekId, date, workout = null }: WorkoutFormModalProps) {
  const isEditing = workout !== null
  const [form, setForm] = useState(workout ? formFromWorkout(workout) : emptyForm)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isAddingType, setIsAddingType] = useState(false)
  const [newTypeName, setNewTypeName] = useState('')

  const { data: workoutTypes } = useWorkoutTypes()
  const createWorkoutType = useCreateWorkoutType()
  const createWorkout = useCreateWorkout(trainingWeekId)
  const updateWorkout = useUpdateWorkout(workout?.id ?? -1, trainingWeekId)

  function handleClose() {
    setSubmitError(null)
    setIsAddingType(false)
    setNewTypeName('')
    onClose()
  }

  async function handleCreateType() {
    const name = newTypeName.trim()
    if (!name) return
    const created = await createWorkoutType.mutateAsync({ name })
    setForm((f) => ({ ...f, workout_type_id: String(created.id) }))
    setNewTypeName('')
    setIsAddingType(false)
  }

  async function handleSubmit() {
    setSubmitError(null)

    const payload = {
      training_week_id: trainingWeekId,
      workout_type_id: Number(form.workout_type_id),
      scheduled_start: `${date}T${form.time}:00`,
      title: form.title,
      planned_duration: form.planned_duration ? Number(form.planned_duration) : null,
      planned_distance: form.planned_distance ? Number(form.planned_distance) : null,
      unit: form.unit || null,
      status: form.status,
    }

    try {
      if (isEditing && workout) {
        await updateWorkout.mutateAsync(payload)
      } else {
        await createWorkout.mutateAsync(payload)
      }
      handleClose()
    } catch (err) {
      setSubmitError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.')
    }
  }

  const isSubmitting = isEditing ? updateWorkout.isPending : createWorkout.isPending

  return (
    <FormModal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditing ? 'Edit Workout' : 'Add Workout'}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      submitError={submitError}
      submitLabel={isEditing ? 'Save' : 'Add'}
    >
      <div className="space-y-4">

        <div className="space-y-1">
          <label htmlFor="workout-type" className="text-sm">
            Type
          </label>
          {!isAddingType ? (
            <div className="flex gap-2">
              <select
                id="workout-type"
                value={form.workout_type_id}
                onChange={(e) => setForm({ ...form, workout_type_id: e.target.value })}
                required
                className="flex-1 rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
              >
                <option value="" disabled>
                  Select a type
                </option>
                {(workoutTypes ?? []).map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
              <Button type="button" variant="secondary" onClick={() => setIsAddingType(true)}>
                + New
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                value={newTypeName}
                onChange={(e) => setNewTypeName(e.target.value)}
                placeholder="e.g. Swim"
                autoFocus
                className="flex-1 rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
              />
              <Button type="button" onClick={handleCreateType} disabled={createWorkoutType.isPending}>
                Add
              </Button>
              <Button type="button" variant="secondary" onClick={() => setIsAddingType(false)}>
                Cancel
              </Button>
            </div>
          )}
        </div>
        
        <div className="space-y-1">
          <label htmlFor="workout-title" className="text-sm">
            Title
          </label>
          <input
            id="workout-title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="workout-time" className="text-sm">
            Time
          </label>
          <input
            id="workout-time"
            type="time"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
            required
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label htmlFor="workout-duration" className="text-sm">
              Duration (min)
            </label>
            <input
              id="workout-duration"
              type="number"
              min="0"
              value={form.planned_duration}
              onChange={(e) => setForm({ ...form, planned_duration: e.target.value })}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="workout-status" className="text-sm">
              Status
            </label>
            <select
              id="workout-status"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as WorkoutStatus })}
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

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label htmlFor="workout-distance" className="text-sm">
              Distance
            </label>
            <input
              id="workout-distance"
              type="number"
              min="0"
              step="0.01"
              value={form.planned_distance}
              onChange={(e) => setForm({ ...form, planned_distance: e.target.value })}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="workout-unit" className="text-sm">
              Unit
            </label>
            <select
              id="workout-unit"
              value={form.unit}
              onChange={(e) => setForm({ ...form, unit: e.target.value as DistanceUnit | '' })}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
            >
              <option value="">—</option>
              {UNIT_OPTIONS.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </FormModal>
  )
}
