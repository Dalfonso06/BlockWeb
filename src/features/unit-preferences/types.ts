import type { DistanceUnit } from '@/types/enums'

export interface UserUnitPreference {
  id: number
  user_id: number
  workout_type_id: number
  unit: DistanceUnit
  created_at: string
  updated_at: string
}

export interface UserUnitPreferenceSet {
  unit: DistanceUnit
}
