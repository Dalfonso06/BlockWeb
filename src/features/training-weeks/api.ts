import { request } from '@/api/client'
import type { TrainingWeek } from '@/types/models'
import type { TrainingWeekBreakdownResponse, TrainingWeekCreate, TrainingWeekUpdate } from './types'

export function listTrainingWeeks(trainingBlockId: number): Promise<TrainingWeek[]> {
  return request<TrainingWeek[]>(`/training-weeks/?training_block_id=${trainingBlockId}`)
}

export function getTrainingWeek(id: number): Promise<TrainingWeek> {
  return request<TrainingWeek>(`/training-weeks/${id}`)
}

export function createTrainingWeek(payload: TrainingWeekCreate): Promise<TrainingWeek> {
  return request<TrainingWeek>('/training-weeks/', { method: 'POST', body: payload })
}

export function updateTrainingWeek(id: number, payload: TrainingWeekUpdate): Promise<TrainingWeek> {
  return request<TrainingWeek>(`/training-weeks/${id}`, { method: 'PATCH', body: payload })
}

export function deleteTrainingWeek(id: number): Promise<void> {
  return request<void>(`/training-weeks/${id}`, { method: 'DELETE' })
}

export function getTrainingWeekBreakdown(id: number): Promise<TrainingWeekBreakdownResponse> {
  return request<TrainingWeekBreakdownResponse>(`/training-weeks/${id}/breakdown`)
}
