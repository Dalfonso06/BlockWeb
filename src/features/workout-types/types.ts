import type { DistanceUnit } from '@/types/enums'

export interface WorkoutTypeCreate {
  name: string
}

export type WorkoutTypeUpdate = Partial<WorkoutTypeCreate>

export interface WorkoutTypeUnitSummary {
  id: number
  name: string
  unit: DistanceUnit | null
}
