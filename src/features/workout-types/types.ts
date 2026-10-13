import type { DistanceUnit } from '@/types/models'

export interface WorkoutTypeCreate {
  name: string
}

export type WorkoutTypeUpdate = Partial<WorkoutTypeCreate>

export interface WorkoutTypeUnitSummary {
  id: number
  name: string
  unit: DistanceUnit | null
}
