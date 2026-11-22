// Mirrors api/app/schemas/*.py response models. Keep in sync with the backend.
// Enum-like fields are defined in ./enums.ts, not here.

import type { TrainingBlockStatus, WorkoutStatus, DistanceUnit, WeatherCondition } from './enums'

export interface User {
  id: number
  email: string
  username: string
  first_name: string | null
  last_name: string | null
  created_at: string
  updated_at: string
}

export interface TrainingBlock {
  id: number
  user_id: number
  name: string
  description: string | null
  start_date: string
  end_date: string
  status: TrainingBlockStatus
  created_at: string
  updated_at: string
}

export interface TrainingWeek {
  id: number
  training_block_id: number
  week_number: number
  start_date: string
  end_date: string
  name: string | null
  focus: string | null
  created_at: string
  updated_at: string
}

export interface Workout {
  id: number
  training_week_id: number
  user_id: number
  workout_type_id: number
  scheduled_start: string
  title: string
  description: string | null
  planned_duration: number | null
  planned_distance: number | null
  status: WorkoutStatus
  completed_at: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface WorkoutType {
  id: number
  name: string
  default_unit: DistanceUnit | null
}

export interface Weather {
  latitude: number
  longitude: number
  temperature: number
  condition: WeatherCondition
}

export interface Activity {
  id: number
  user_id: number
  workout_type_id: number
  planned_workout_id: number | null
  name: string | null
  started_at: string
  elapsed_duration_seconds: number
  moving_duration_seconds: number | null
  // Confirmed via a live POST /activities/ response that these two are
  // omitted entirely (not even `null`) when not set, unlike every other
  // optional field here — so these stay optional rather than `| null`.
  average_heart_rate?: number
  max_heart_rate?: number
  notes: string | null
  source_id: number
  external_id: string | null
  created_at: string
  updated_at: string
}

export interface Source {
  id: number
  key: string
  name: string
  is_enabled: boolean
  created_at: string
  updated_at: string
}
