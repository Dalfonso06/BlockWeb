import type { WorkoutStatus } from '@/types/enums'

export interface WorkoutCreate {
  training_week_id: number
  workout_type_id: number
  scheduled_start: string
  title: string
  description?: string | null
  planned_duration?: number | null
  planned_distance?: number | null
  status?: WorkoutStatus
  completed_at?: string | null
  notes?: string | null
}

export type WorkoutUpdate = Partial<WorkoutCreate>
