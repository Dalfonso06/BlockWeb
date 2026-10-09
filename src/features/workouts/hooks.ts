import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { trainingWeekKeys } from '@/features/training-weeks/hooks'
import * as workoutsApi from './api'
import type { WorkoutStatus } from '@/types/models'
import type { WorkoutCreate, WorkoutUpdate } from './types'

export const workoutKeys = {
  byWeek: (trainingWeekId: number) => ['workouts', { trainingWeekId }] as const,
  detail: (id: number) => ['workouts', id] as const,
}

export function useWorkouts(trainingWeekId: number) {
  return useQuery({
    queryKey: workoutKeys.byWeek(trainingWeekId),
    queryFn: () => workoutsApi.listWorkouts(trainingWeekId),
  })
}

export function useWorkout(id: number) {
  return useQuery({
    queryKey: workoutKeys.detail(id),
    queryFn: () => workoutsApi.getWorkout(id),
  })
}

export function useCreateWorkout(trainingWeekId: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: WorkoutCreate) => workoutsApi.createWorkout(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workoutKeys.byWeek(trainingWeekId) })
      queryClient.invalidateQueries({ queryKey: trainingWeekKeys.breakdown(trainingWeekId) })
    },
  })
}

export function useUpdateWorkout(id: number, trainingWeekId: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: WorkoutUpdate) => workoutsApi.updateWorkout(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workoutKeys.byWeek(trainingWeekId) })
      queryClient.invalidateQueries({ queryKey: workoutKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: trainingWeekKeys.breakdown(trainingWeekId) })
    },
  })
}

export function useUpdateWorkoutStatus(trainingWeekId: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: WorkoutStatus }) =>
      workoutsApi.updateWorkout(id, { status }),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: workoutKeys.byWeek(trainingWeekId) })
      queryClient.invalidateQueries({ queryKey: workoutKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: trainingWeekKeys.breakdown(trainingWeekId) })
    },
  })
}

export function useDeleteWorkout(trainingWeekId: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => workoutsApi.deleteWorkout(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workoutKeys.byWeek(trainingWeekId) })
      queryClient.invalidateQueries({ queryKey: trainingWeekKeys.breakdown(trainingWeekId) })
    },
  })
}
