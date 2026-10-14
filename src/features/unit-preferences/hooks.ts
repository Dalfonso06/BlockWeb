import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { workoutTypeUnitKeys } from '@/features/workout-types/hooks'
import * as unitPreferencesApi from './api'
import type { DistanceUnit } from '@/types/models'

export const unitPreferenceKeys = {
  all: ['unit-preferences'] as const,
}

export function useUnitPreferences() {
  return useQuery({
    queryKey: unitPreferenceKeys.all,
    queryFn: unitPreferencesApi.listUnitPreferences,
  })
}

export function useSetUnitPreference() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ workoutTypeId, unit }: { workoutTypeId: number; unit: DistanceUnit }) =>
      unitPreferencesApi.setUnitPreference(workoutTypeId, { unit }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: unitPreferenceKeys.all })
      queryClient.invalidateQueries({ queryKey: workoutTypeUnitKeys.all })
    },
  })
}

export function useResetUnitPreferences() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (workoutTypeIds: number[]) =>
      Promise.all(workoutTypeIds.map((workoutTypeId) => unitPreferencesApi.deleteUnitPreference(workoutTypeId))),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: unitPreferenceKeys.all })
      queryClient.invalidateQueries({ queryKey: workoutTypeUnitKeys.all })
    },
  })
}

export function useDeleteUnitPreference() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (workoutTypeId: number) => unitPreferencesApi.deleteUnitPreference(workoutTypeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: unitPreferenceKeys.all })
      queryClient.invalidateQueries({ queryKey: workoutTypeUnitKeys.all })
    },
  })
}
