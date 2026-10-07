import { useState } from 'react'
import { enumerateDates, toDateKey } from '@/lib/date'
import { useWorkoutTypes } from '@/features/workout-types/hooks'
import { TrainingWeekHeader } from '@/features/training-weeks/TrainingWeekHeader'
import { useTrainingWeekBreakdown } from '@/features/training-weeks/hooks'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { useDeleteWorkout, useWorkouts } from './hooks'
import { DayScheduleRow } from './DayScheduleRow'
import { WorkoutFormModal } from './WorkoutFormModal'
import { WeekTypeBreakdown } from './WeekTypeBreakdown'
import { WeekQuickActions } from './WeekQuickActions'
import type { TrainingWeek, Workout } from '@/types/models'

interface WeekScheduleBreakdownProps {
  week: TrainingWeek
}

type WorkoutModalState = { mode: 'add' } | { mode: 'edit'; workout: Workout } | null

export function WeekScheduleBreakdown({ week }: WeekScheduleBreakdownProps) {
  const [workoutModalState, setWorkoutModalState] = useState<WorkoutModalState>(null)
  const [deletingWorkout, setDeletingWorkout] = useState<Workout | null>(null)

  const { data: workouts, isLoading: isLoadingWorkouts } = useWorkouts(week.id)
  const { data: workoutTypes, isLoading: isLoadingWorkoutTypes } = useWorkoutTypes()
  const { data: breakdown, isLoading: isLoadingBreakdown } = useTrainingWeekBreakdown(week.id)
  const deleteWorkout = useDeleteWorkout(week.id)

  if (isLoadingWorkouts || isLoadingWorkoutTypes || isLoadingBreakdown) {
    return <p className="text-sm text-neutral-500">Loading…</p>
  }

  const workoutTypeNameById = Object.fromEntries(
    (workoutTypes ?? []).map((workoutType) => [workoutType.id, workoutType.name]),
  )

  const workoutsByDate = new Map<string, Workout[]>()
  for (const workout of workouts ?? []) {
    const dateKey = toDateKey(workout.scheduled_start)
    const existing = workoutsByDate.get(dateKey)
    if (existing) {
      existing.push(workout)
    } else {
      workoutsByDate.set(dateKey, [workout])
    }
  }

  const dates = enumerateDates(week.start_date, week.end_date)

  async function handleConfirmDeleteWorkout() {
    if (!deletingWorkout) return
    await deleteWorkout.mutateAsync(deletingWorkout.id)
    setDeletingWorkout(null)
  }

  const modalKey =
    workoutModalState === null
      ? 'closed'
      : workoutModalState.mode === 'add'
        ? 'add'
        : `edit-${workoutModalState.workout.id}`

  return (
    <div>
      <div className="flex items-start gap-4">
        <div className="min-w-0 flex-1 rounded-md border border-neutral-200 dark:border-neutral-800">
          <TrainingWeekHeader
            week={week}
            workoutCount={workouts?.length ?? 0}
            plannedVolumeMinutes={breakdown?.total_planned_duration_minutes ?? 0}
          />

          <div className="px-4">
            {dates.map((date) => (
              <DayScheduleRow
                key={date}
                date={date}
                workouts={workoutsByDate.get(date) ?? []}
                workoutTypeNameById={workoutTypeNameById}
                onEditWorkout={(workout) => setWorkoutModalState({ mode: 'edit', workout })}
                onDeleteWorkout={(workout) => setDeletingWorkout(workout)}
              />
            ))}
          </div>
        </div>

        <div className="flex w-64 shrink-0 flex-col gap-4">
          <WeekTypeBreakdown
            workoutTypes={breakdown?.workout_types ?? []}
            totalMinutes={breakdown?.total_planned_duration_minutes ?? 0}
          />
          <WeekQuickActions onAddWorkout={() => setWorkoutModalState({ mode: 'add' })} />
        </div>
      </div>

      <WorkoutFormModal
        key={modalKey}
        isOpen={workoutModalState !== null}
        onClose={() => setWorkoutModalState(null)}
        week={week}
        workout={workoutModalState?.mode === 'edit' ? workoutModalState.workout : null}
      />

      <ConfirmDialog
        isOpen={deletingWorkout !== null}
        onClose={() => setDeletingWorkout(null)}
        onConfirm={handleConfirmDeleteWorkout}
        title="Delete Workout"
        description={deletingWorkout ? `Delete "${deletingWorkout.title}"? This cannot be undone.` : undefined}
        confirmLabel="Delete"
        isConfirming={deleteWorkout.isPending}
      />
    </div>
  )
}
