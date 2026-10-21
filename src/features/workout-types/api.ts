import { request } from '@/api/client'
import type { WorkoutType } from '@/types/models'
import type { WorkoutTypeCreate, WorkoutTypeUnitSummary, WorkoutTypeUpdate } from './types'

export function listWorkoutTypes(): Promise<WorkoutType[]> {
  return request<WorkoutType[]>('/workout-types/')
}

export function getWorkoutType(id: number): Promise<WorkoutType> {
  return request<WorkoutType>(`/workout-types/${id}`)
}

export function createWorkoutType(payload: WorkoutTypeCreate): Promise<WorkoutType> {
  return request<WorkoutType>('/workout-types/', { method: 'POST', body: payload })
}

export function updateWorkoutType(id: number, payload: WorkoutTypeUpdate): Promise<WorkoutType> {
  return request<WorkoutType>(`/workout-types/${id}`, { method: 'PATCH', body: payload })
}

export function deleteWorkoutType(id: number): Promise<void> {
  return request<void>(`/workout-types/${id}`, { method: 'DELETE' })
}

export function getWorkoutTypeUnits(): Promise<WorkoutTypeUnitSummary[]> {
  return request<WorkoutTypeUnitSummary[]>('/users/me/workout-type-units')
}
