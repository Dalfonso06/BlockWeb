// Canonical location for frontend enums that mirror backend (str, enum.Enum)
// classes. A plain `enum` isn't usable here (this project's tsconfig has
// erasableSyntaxOnly on), so each one is the standard erasable replacement: a
// const object for the values, plus a derived union type of the same name.

// Mirrors api/app/models/training_block.py's TrainingBlockStatus(str, enum.Enum).
export const TrainingBlockStatus = {
  Planned: 'planned',
  Active: 'active',
  Completed: 'completed',
  Archived: 'archived',
} as const

export type TrainingBlockStatus = (typeof TrainingBlockStatus)[keyof typeof TrainingBlockStatus]

// Mirrors api/app/models/workout.py's WorkoutStatus(str, enum.Enum).
export const WorkoutStatus = {
  Planned: 'planned',
  Completed: 'completed',
  Skipped: 'skipped',
} as const

export type WorkoutStatus = (typeof WorkoutStatus)[keyof typeof WorkoutStatus]

// Mirrors api/app/models/workout.py's DistanceUnit(str, enum.Enum).
export const DistanceUnit = {
  Km: 'km',
  Mi: 'mi',
  M: 'm',
  Yd: 'yd',
} as const

export type DistanceUnit = (typeof DistanceUnit)[keyof typeof DistanceUnit]

// Mirrors api/app/schemas/weather.py's WeatherCondition(str, enum.Enum).
export const WeatherCondition = {
  Clear: 'clear',
  PartlyCloudy: 'partly_cloudy',
  Cloudy: 'cloudy',
  Fog: 'fog',
  Drizzle: 'drizzle',
  Rain: 'rain',
  Snow: 'snow',
  Thunderstorm: 'thunderstorm',
} as const

export type WeatherCondition = (typeof WeatherCondition)[keyof typeof WeatherCondition]
