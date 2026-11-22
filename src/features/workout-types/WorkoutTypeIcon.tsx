import { getWorkoutTypeIconStyle } from './workoutTypeIconStyles'

interface WorkoutTypeIconProps {
  workoutTypeName: string
  className?: string
}

export function WorkoutTypeIcon({ workoutTypeName, className = '' }: WorkoutTypeIconProps) {
  const { icon: Icon, tint, iconColor } = getWorkoutTypeIconStyle(workoutTypeName)

  return (
    <span className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${tint} ${className}`}>
      <Icon className={`h-4 w-4 ${iconColor}`} />
    </span>
  )
}
