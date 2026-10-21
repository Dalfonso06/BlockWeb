import { request } from '@/api/client'
import type { UserUnitPreference, UserUnitPreferenceSet } from './types'

export function listUnitPreferences(): Promise<UserUnitPreference[]> {
  return request<UserUnitPreference[]>('/users/me/unit-preferences')
}

export function setUnitPreference(
  workoutTypeId: number,
  payload: UserUnitPreferenceSet,
): Promise<UserUnitPreference> {
  return request<UserUnitPreference>(`/users/me/unit-preferences/${workoutTypeId}`, {
    method: 'PUT',
    body: payload,
  })
}

export function deleteUnitPreference(workoutTypeId: number): Promise<void> {
  return request<void>(`/users/me/unit-preferences/${workoutTypeId}`, { method: 'DELETE' })
}
