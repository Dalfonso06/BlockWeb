import { request } from '@/api/client'
import type { Workout } from '@/types/models'
import type { WorkoutCreate, WorkoutUpdate } from './types'

export function listWorkouts(trainingWeekId: number): Promise<Workout[]> {
  return request<Workout[]>(`/workouts/?training_week_id=${trainingWeekId}`)
}

export function getWorkout(id: number): Promise<Workout> {
  return request<Workout>(`/workouts/${id}`)
}

export function createWorkout(payload: WorkoutCreate): Promise<Workout> {
  return request<Workout>('/workouts/', { method: 'POST', body: payload })
}

export function updateWorkout(id: number, payload: WorkoutUpdate): Promise<Workout> {
  return request<Workout>(`/workouts/${id}`, { method: 'PATCH', body: payload })
}

export function deleteWorkout(id: number): Promise<void> {
  return request<void>(`/workouts/${id}`, { method: 'DELETE' })
}
