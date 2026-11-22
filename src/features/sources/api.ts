import { request } from '@/api/client'
import type { Source } from '@/types/models'

export function listSources(): Promise<Source[]> {
  return request<Source[]>('/sources/')
}
