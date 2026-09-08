import { request } from '@/api/client'
import type { User } from '@/types/models'
import type { UserUpdate } from './types'

export function listUsers(): Promise<User[]> {
  return request<User[]>('/users/')
}

export function getUser(id: number): Promise<User> {
  return request<User>(`/users/${id}`)
}

export function updateUser(id: number, payload: UserUpdate): Promise<User> {
  return request<User>(`/users/${id}`, { method: 'PATCH', body: payload })
}

export function deleteUser(id: number): Promise<void> {
  return request<void>(`/users/${id}`, { method: 'DELETE' })
}
