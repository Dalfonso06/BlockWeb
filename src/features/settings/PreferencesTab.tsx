import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { Select } from '@/components/ui/Select'
import { useWorkoutTypes } from '@/features/workout-types/hooks'
import { useUnitPreferences, useSetUnitPreference, useDeleteUnitPreference } from '@/features/unit-preferences/hooks'
import { UnitPreferenceRow } from './UnitPreferenceRow'
import type { UserUnitPreference } from '@/features/unit-preferences/types'
import type { DistanceUnit } from '@/types/models'

const UNIT_OPTIONS: DistanceUnit[] = ['km', 'mi', 'm', 'yd']

export function PreferencesTab() {
  const { data: workoutTypes, isLoading: isLoadingWorkoutTypes } = useWorkoutTypes()
  const { data: preferences, isLoading: isLoadingPreferences } = useUnitPreferences()
  const setPreference = useSetUnitPreference()
  const deletePreference = useDeleteUnitPreference()

  const [deletingPreference, setDeletingPreference] = useState<UserUnitPreference | null>(null)
  const [newWorkoutTypeId, setNewWorkoutTypeId] = useState('')
  const [newUnit, setNewUnit] = useState<DistanceUnit>('km')

  if (isLoadingWorkoutTypes || isLoadingPreferences) {
    return <p className="text-sm text-neutral-500">Loading…</p>
  }

  const workoutTypeNameById = Object.fromEntries(
    (workoutTypes ?? []).map((workoutType) => [workoutType.id, workoutType.name]),
  )

  const preferredTypeIds = new Set((preferences ?? []).map((preference) => preference.workout_type_id))
  const availableWorkoutTypes = (workoutTypes ?? []).filter((workoutType) => !preferredTypeIds.has(workoutType.id))

  async function handleConfirmDelete() {
    if (!deletingPreference) return
    await deletePreference.mutateAsync(deletingPreference.workout_type_id)
    setDeletingPreference(null)
  }

  function handleAddPreference() {
    if (!newWorkoutTypeId) return
    setPreference.mutate({ workoutTypeId: Number(newWorkoutTypeId), unit: newUnit })
    setNewWorkoutTypeId('')
    setNewUnit('km')
  }

  return (
    <div>
      <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Units</h3>

      {(preferences ?? []).length === 0 ? (
        <p className="mt-2 text-sm text-neutral-500">You haven't set any unit preferences yet.</p>
      ) : (
        <div className="mt-3 divide-y divide-neutral-100 dark:divide-neutral-900">
          {(preferences ?? []).map((preference) => (
            <UnitPreferenceRow
              key={preference.id}
              workoutTypeName={workoutTypeNameById[preference.workout_type_id] ?? 'Workout'}
              unit={preference.unit}
              onChangeUnit={(unit) => setPreference.mutate({ workoutTypeId: preference.workout_type_id, unit })}
              onDelete={() => setDeletingPreference(preference)}
            />
          ))}
        </div>
      )}

      {availableWorkoutTypes.length > 0 ? (
        <div className="mt-4 flex items-center gap-2 border-t border-neutral-100 pt-4 dark:border-neutral-900">
          <Select
            value={newWorkoutTypeId}
            onChange={(e) => setNewWorkoutTypeId(e.target.value)}
            className="flex-1"
          >
            <option value="" disabled>
              Select a workout type
            </option>
            {availableWorkoutTypes.map((workoutType) => (
              <option key={workoutType.id} value={workoutType.id}>
                {workoutType.name}
              </option>
            ))}
          </Select>

          <Select value={newUnit} onChange={(e) => setNewUnit(e.target.value as DistanceUnit)}>
            {UNIT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>

          <Button type="button" onClick={handleAddPreference} disabled={!newWorkoutTypeId}>
            Add
          </Button>
        </div>
      ) : (
        <p className="mt-4 border-t border-neutral-100 pt-4 text-sm text-neutral-500 dark:border-neutral-900">
          Every workout type already has a preference set.
        </p>
      )}

      <ConfirmDialog
        isOpen={deletingPreference !== null}
        onClose={() => setDeletingPreference(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Unit Preference"
        description={
          deletingPreference
            ? `Remove your ${workoutTypeNameById[deletingPreference.workout_type_id] ?? 'this workout type'} unit preference? It will fall back to the workout type's default.`
            : undefined
        }
        confirmLabel="Delete"
        isConfirming={deletePreference.isPending}
      />
    </div>
  )
}
