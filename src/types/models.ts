// Mirrors api/app/schemas/*.py response models. Keep in sync with the backend.

export type TrainingBlockStatus = 'planned' | 'active' | 'completed' | 'archived'

export type WorkoutStatus = 'planned' | 'completed' | 'skipped'

export type DistanceUnit = 'km' | 'mi' | 'm' | 'yd'

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
  unit: DistanceUnit | null
  status: WorkoutStatus
  completed_at: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface WorkoutType {
  id: number
  name: string
}

export type WeatherCondition =
  | 'clear'
  | 'partly_cloudy'
  | 'cloudy'
  | 'fog'
  | 'drizzle'
  | 'rain'
  | 'snow'
  | 'thunderstorm'

export interface Weather {
  latitude: number
  longitude: number
  temperature: number
  condition: WeatherCondition
}
