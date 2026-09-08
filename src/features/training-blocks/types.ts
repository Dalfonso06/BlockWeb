import type { TrainingBlockStatus } from '@/types/models'

export interface TrainingBlockCreate {
  name: string
  description?: string | null
  start_date: string
  end_date: string
  status?: TrainingBlockStatus
}

export type TrainingBlockUpdate = Partial<TrainingBlockCreate>
