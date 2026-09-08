import { request } from '@/api/client'
import type { TrainingBlock } from '@/types/models'
import type { TrainingBlockCreate, TrainingBlockUpdate } from './types'

export function listTrainingBlocks(): Promise<TrainingBlock[]> {
  return request<TrainingBlock[]>('/training-blocks/')
}

export function getTrainingBlock(id: number): Promise<TrainingBlock> {
  return request<TrainingBlock>(`/training-blocks/${id}`)
}

export function createTrainingBlock(payload: TrainingBlockCreate): Promise<TrainingBlock> {
  return request<TrainingBlock>('/training-blocks/', { method: 'POST', body: payload })
}

export function updateTrainingBlock(id: number, payload: TrainingBlockUpdate): Promise<TrainingBlock> {
  return request<TrainingBlock>(`/training-blocks/${id}`, { method: 'PATCH', body: payload })
}

export function deleteTrainingBlock(id: number): Promise<void> {
  return request<void>(`/training-blocks/${id}`, { method: 'DELETE' })
}
