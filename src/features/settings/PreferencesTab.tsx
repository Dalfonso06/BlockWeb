import { useState } from 'react'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { useWorkoutTypes } from '@/features/workout-types/hooks'
import {
  useUnitPreferences,
  useSetUnitPreference,
  useDeleteUnitPreference,
  useResetUnitPreferences,
} from '@/features/unit-preferences/hooks'
import { WorkoutTypeUnitRow } from './WorkoutTypeUnitRow'
import { DistanceUnit } from '@/types/enums'
import type { WorkoutType } from '@/types/models'

export function PreferencesTab() {
  const { data: workoutTypes, isLoading: isLoadingWorkoutTypes } = useWorkoutTypes()
  const { data: preferences, isLoading: isLoadingPreferences } = useUnitPreferences()
  const setPreference = useSetUnitPreference()
  const deletePreference = useDeleteUnitPreference()
  const resetPreferences = useResetUnitPreferences()

  const [isConfirmingReset, setIsConfirmingReset] = useState(false)

  if (isLoadingWorkoutTypes || isLoadingPreferences) {
    return <p className="text-sm text-neutral-500">Loading…</p>
  }

  const preferenceByTypeId = Object.fromEntries(
    (preferences ?? []).map((preference) => [preference.workout_type_id, preference]),
  )

  // Workout types with no default unit and no explicit preference don't
  // track distance at all (e.g. "Lift") — leave them out of the list.
  const unitTrackedWorkoutTypes = (workoutTypes ?? []).filter(
    (workoutType) => workoutType.default_unit != null || preferenceByTypeId[workoutType.id] != null,
  )

  function handleChangeUnit(workoutType: WorkoutType, newUnit: DistanceUnit) {
    // If the chosen unit matches the workout type's own default, there's no
    // need for an explicit override row — delete it (if one exists) instead
    // of writing a preference that just duplicates the default.
    if (newUnit === workoutType.default_unit) {
      if (preferenceByTypeId[workoutType.id]) {
        deletePreference.mutate(workoutType.id)
      }
      return
    }

    setPreference.mutate({ workoutTypeId: workoutType.id, unit: newUnit })
  }

  async function handleConfirmReset() {
    await resetPreferences.mutateAsync((preferences ?? []).map((preference) => preference.workout_type_id))
    setIsConfirmingReset(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Units</h3>

        <button
          type="button"
          onClick={() => setIsConfirmingReset(true)}
          disabled={(preferences ?? []).length === 0}
          className="text-sm text-accent hover:underline disabled:cursor-not-allowed disabled:text-neutral-400 disabled:no-underline dark:text-accent-dark dark:disabled:text-neutral-600"
        >
          Reset to defaults
        </button>
      </div>

      {unitTrackedWorkoutTypes.length === 0 ? (
        <p className="mt-2 text-sm text-neutral-500">No workout types with a unit yet.</p>
      ) : (
        <div className="mt-3 divide-y divide-neutral-100 dark:divide-neutral-900">
          {unitTrackedWorkoutTypes.map((workoutType) => {
            const preference = preferenceByTypeId[workoutType.id]
            const unit = preference?.unit ?? workoutType.default_unit ?? DistanceUnit.M

            return (
              <WorkoutTypeUnitRow
                key={workoutType.id}
                workoutTypeName={workoutType.name}
                unit={unit}
                isDefault={!preference}
                onChangeUnit={(newUnit) => handleChangeUnit(workoutType, newUnit)}
              />
            )
          })}
        </div>
      )}

      <ConfirmDialog
        isOpen={isConfirmingReset}
        onClose={() => setIsConfirmingReset(false)}
        onConfirm={handleConfirmReset}
        title="Reset Unit Preferences"
        description="This clears every unit you've customized, reverting each workout type back to its default unit."
        confirmLabel="Reset"
        isConfirming={resetPreferences.isPending}
      />
    </div>
  )
}
