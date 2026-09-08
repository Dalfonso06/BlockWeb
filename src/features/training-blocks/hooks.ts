import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as trainingBlocksApi from './api'
import type { TrainingBlockCreate, TrainingBlockUpdate } from './types'

export const trainingBlockKeys = {
  all: ['training-blocks'] as const,
  detail: (id: number) => ['training-blocks', id] as const,
}

export function useTrainingBlocks() {
  return useQuery({
    queryKey: trainingBlockKeys.all,
    queryFn: trainingBlocksApi.listTrainingBlocks,
  })
}

export function useTrainingBlock(id: number) {
  return useQuery({
    queryKey: trainingBlockKeys.detail(id),
    queryFn: () => trainingBlocksApi.getTrainingBlock(id),
  })
}

export function useCreateTrainingBlock() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: TrainingBlockCreate) => trainingBlocksApi.createTrainingBlock(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: trainingBlockKeys.all }),
  })
}

export function useUpdateTrainingBlock(id: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: TrainingBlockUpdate) => trainingBlocksApi.updateTrainingBlock(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: trainingBlockKeys.all })
      queryClient.invalidateQueries({ queryKey: trainingBlockKeys.detail(id) })
    },
  })
}

export function useDeleteTrainingBlock() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => trainingBlocksApi.deleteTrainingBlock(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: trainingBlockKeys.all }),
  })
}
