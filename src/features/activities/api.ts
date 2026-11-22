import { request } from '@/api/client'
import type { Activity } from '@/types/models'
import type { ActivityCreate } from './types'

export function createActivity(payload: ActivityCreate): Promise<Activity> {
  return request<Activity>('/activities/', { method: 'POST', body: payload })
}
