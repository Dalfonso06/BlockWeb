import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as trainingWeeksApi from './api'
import type { TrainingWeekCreate, TrainingWeekUpdate } from './types'

export const trainingWeekKeys = {
  byBlock: (trainingBlockId: number) => ['training-weeks', { trainingBlockId }] as const,
  detail: (id: number) => ['training-weeks', id] as const,
}

export function useTrainingWeeks(trainingBlockId: number) {
  return useQuery({
    queryKey: trainingWeekKeys.byBlock(trainingBlockId),
    queryFn: () => trainingWeeksApi.listTrainingWeeks(trainingBlockId),
  })
}

export function useTrainingWeek(id: number) {
  return useQuery({
    queryKey: trainingWeekKeys.detail(id),
    queryFn: () => trainingWeeksApi.getTrainingWeek(id),
  })
}

export function useCreateTrainingWeek(trainingBlockId: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: TrainingWeekCreate) => trainingWeeksApi.createTrainingWeek(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: trainingWeekKeys.byBlock(trainingBlockId) }),
  })
}

export function useUpdateTrainingWeek(id: number, trainingBlockId: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: TrainingWeekUpdate) => trainingWeeksApi.updateTrainingWeek(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: trainingWeekKeys.byBlock(trainingBlockId) })
      queryClient.invalidateQueries({ queryKey: trainingWeekKeys.detail(id) })
    },
  })
}

export function useDeleteTrainingWeek(trainingBlockId: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => trainingWeeksApi.deleteTrainingWeek(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: trainingWeekKeys.byBlock(trainingBlockId) }),
  })
}
