import { getWorkoutTypeIconStyle } from './workoutTypeIconStyles'

interface WorkoutTypeIconProps {
  workoutTypeName: string
  // No default size — same-specificity Tailwind size utilities don't
  // reliably override each other based on className string order, so
  // callers must always size the circle explicitly (e.g. "h-8 w-8").
  className: string
}

export function WorkoutTypeIcon({ workoutTypeName, className }: WorkoutTypeIconProps) {
  const { icon: Icon, tint, iconColor } = getWorkoutTypeIconStyle(workoutTypeName)

  return (
    <span className={`inline-flex shrink-0 items-center justify-center rounded-full ${tint} ${className}`}>
      <Icon className={`h-1/2 w-1/2 ${iconColor}`} />
    </span>
  )
}
