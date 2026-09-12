import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as workoutTypesApi from './api'
import type { WorkoutTypeCreate, WorkoutTypeUpdate } from './types'

export const workoutTypeKeys = {
  all: ['workout-types'] as const,
  detail: (id: number) => ['workout-types', id] as const,
}

export function useWorkoutTypes() {
  return useQuery({
    queryKey: workoutTypeKeys.all,
    queryFn: workoutTypesApi.listWorkoutTypes,
  })
}

export function useWorkoutType(id: number) {
  return useQuery({
    queryKey: workoutTypeKeys.detail(id),
    queryFn: () => workoutTypesApi.getWorkoutType(id),
  })
}

export function useCreateWorkoutType() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: WorkoutTypeCreate) => workoutTypesApi.createWorkoutType(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: workoutTypeKeys.all }),
  })
}

export function useUpdateWorkoutType(id: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: WorkoutTypeUpdate) => workoutTypesApi.updateWorkoutType(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workoutTypeKeys.all })
      queryClient.invalidateQueries({ queryKey: workoutTypeKeys.detail(id) })
    },
  })
}

export function useDeleteWorkoutType() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => workoutTypesApi.deleteWorkoutType(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: workoutTypeKeys.all }),
  })
}
