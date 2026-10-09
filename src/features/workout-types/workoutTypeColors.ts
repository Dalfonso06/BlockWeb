// Temporary client-side color mapping for common workout type names, matched
// case-insensitively. `WorkoutType` has no color field in the backend yet —
// once it does, this lookup should be replaced by that stored value.
const WORKOUT_TYPE_COLORS: Record<string, string> = {
  swim: 'bg-blue-500',
  bike: 'bg-green-500',
  cycling: 'bg-green-500',
  run: 'bg-orange-500',
  running: 'bg-orange-500',
  strength: 'bg-purple-500',
  lift: 'bg-purple-500',
  yoga: 'bg-pink-500',
  walk: 'bg-teal-500',
}

const DEFAULT_WORKOUT_TYPE_COLOR = 'bg-neutral-400'

export function getWorkoutTypeColor(workoutTypeName: string): string {
  return WORKOUT_TYPE_COLORS[workoutTypeName.toLowerCase()] ?? DEFAULT_WORKOUT_TYPE_COLOR
}
