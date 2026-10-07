import type { DistanceUnit } from '@/types/models'

export interface TrainingWeekCreate {
  training_block_id: number
  week_number: number
  start_date: string
  end_date: string
  name?: string | null
  focus?: string | null
}

export type TrainingWeekUpdate = Partial<TrainingWeekCreate>

export interface WorkoutTypeBreakdownItem {
  workout_type: string
  duration_sum: number
  distance: number | null
  unit: DistanceUnit | null
}

export interface TrainingWeekBreakdownResponse {
  training_week_id: number
  week_number: number
  start_date: string
  end_date: string
  total_planned_duration_minutes: number
  workout_types: WorkoutTypeBreakdownItem[]
}
