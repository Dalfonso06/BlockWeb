import {
  WorkoutRunIcon,
  WorkoutSwimIcon,
  WorkoutBikeIcon,
  WorkoutWalkIcon,
  WorkoutYogaIcon,
  WorkoutStrengthIcon,
  WorkoutGenericIcon,
} from '@/icons'
import type { IconComponent } from '@/icons'

interface WorkoutTypeIconStyle {
  icon: IconComponent
  tint: string
  iconColor: string
}

// Temporary client-side icon/color mapping for common workout type names,
// matched case-insensitively — mirrors workoutTypeColors.ts's same set of
// names and color families, kept separate since it pairs each type with an
// icon rather than a single dot color. Once the backend stores a color
// and/or icon per workout type, both lookups should be replaced by that.
const WORKOUT_TYPE_ICON_STYLES: Record<string, WorkoutTypeIconStyle> = {
  swim: { icon: WorkoutSwimIcon, tint: 'bg-blue-100', iconColor: 'text-blue-600' },
  bike: { icon: WorkoutBikeIcon, tint: 'bg-green-100', iconColor: 'text-green-600' },
  cycling: { icon: WorkoutBikeIcon, tint: 'bg-green-100', iconColor: 'text-green-600' },
  run: { icon: WorkoutRunIcon, tint: 'bg-orange-100', iconColor: 'text-orange-600' },
  running: { icon: WorkoutRunIcon, tint: 'bg-orange-100', iconColor: 'text-orange-600' },
  strength: { icon: WorkoutStrengthIcon, tint: 'bg-purple-100', iconColor: 'text-purple-600' },
  lift: { icon: WorkoutStrengthIcon, tint: 'bg-purple-100', iconColor: 'text-purple-600' },
  yoga: { icon: WorkoutYogaIcon, tint: 'bg-pink-100', iconColor: 'text-pink-600' },
  walk: { icon: WorkoutWalkIcon, tint: 'bg-teal-100', iconColor: 'text-teal-600' },
}

const DEFAULT_WORKOUT_TYPE_ICON_STYLE: WorkoutTypeIconStyle = {
  icon: WorkoutGenericIcon,
  tint: 'bg-neutral-100',
  iconColor: 'text-neutral-500',
}

export function getWorkoutTypeIconStyle(workoutTypeName: string): WorkoutTypeIconStyle {
  return WORKOUT_TYPE_ICON_STYLES[workoutTypeName.toLowerCase()] ?? DEFAULT_WORKOUT_TYPE_ICON_STYLE
}
