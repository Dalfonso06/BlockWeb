import type { Workout } from '@/types/models'

interface WorkoutSummaryProps {
  workout: Workout
  workoutTypeName: string
}

export function WorkoutSummary({ workout, workoutTypeName }: WorkoutSummaryProps) {
  const metrics = [
    workout.planned_duration != null ? `${workout.planned_duration} min` : null,
    workout.planned_distance != null ? `${workout.planned_distance}${workout.unit ?? ''}` : null,
  ].filter(Boolean)

  return (
    <div className="rounded-md border border-neutral-200 px-3 py-2 text-sm dark:border-neutral-800">
      <div className="flex items-center justify-between gap-2">
        <span className="font-medium text-neutral-900 dark:text-neutral-100">{workout.title}</span>
        <span className="text-xs text-neutral-500">{workout.status}</span>
      </div>
      <div className="mt-1 flex items-center gap-2 text-xs text-neutral-500">
        <span className="rounded bg-neutral-100 px-1.5 py-0.5 dark:bg-neutral-800">{workoutTypeName}</span>
        {metrics.length > 0 && <span>{metrics.join(' · ')}</span>}
      </div>
    </div>
  )
}
