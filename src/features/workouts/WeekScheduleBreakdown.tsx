import { useState } from 'react'
import { enumerateDates, toDateKey } from '@/lib/date'
import { useWorkoutTypes } from '@/features/workout-types/hooks'
import { TrainingWeekHeader } from '@/features/training-weeks/TrainingWeekHeader'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { useDeleteWorkout, useWorkouts } from './hooks'
import { DayScheduleRow } from './DayScheduleRow'
import { WorkoutFormModal } from './WorkoutFormModal'
import type { TrainingWeek, Workout } from '@/types/models'

interface WeekScheduleBreakdownProps {
  week: TrainingWeek
  isEditMode: boolean
}

type WorkoutModalState = { mode: 'add'; date: string } | { mode: 'edit'; workout: Workout } | null

export function WeekScheduleBreakdown({ week, isEditMode }: WeekScheduleBreakdownProps) {
  const [workoutModalState, setWorkoutModalState] = useState<WorkoutModalState>(null)
  const [deletingWorkout, setDeletingWorkout] = useState<Workout | null>(null)

  const { data: workouts, isLoading: isLoadingWorkouts } = useWorkouts(week.id)
  const { data: workoutTypes, isLoading: isLoadingWorkoutTypes } = useWorkoutTypes()
  const deleteWorkout = useDeleteWorkout(week.id)

  if (isLoadingWorkouts || isLoadingWorkoutTypes) {
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
  const plannedVolumeMinutes = (workouts ?? []).reduce((sum, w) => sum + (w.planned_duration ?? 0), 0)

  async function handleConfirmDeleteWorkout() {
    if (!deletingWorkout) return
    await deleteWorkout.mutateAsync(deletingWorkout.id)
    setDeletingWorkout(null)
  }

  const modalKey =
    workoutModalState === null
      ? 'closed'
      : workoutModalState.mode === 'add'
        ? `add-${workoutModalState.date}`
        : `edit-${workoutModalState.workout.id}`

  return (
    <div className="rounded-md border border-neutral-200 dark:border-neutral-800">
      <TrainingWeekHeader
        week={week}
        workoutCount={workouts?.length ?? 0}
        plannedVolumeMinutes={plannedVolumeMinutes}
      />

      <div className="px-4">
        {dates.map((date) => (
          <DayScheduleRow
            key={date}
            date={date}
            workouts={workoutsByDate.get(date) ?? []}
            workoutTypeNameById={workoutTypeNameById}
            isEditMode={isEditMode}
            onAddWorkout={(d) => setWorkoutModalState({ mode: 'add', date: d })}
            onEditWorkout={(workout) => setWorkoutModalState({ mode: 'edit', workout })}
            onDeleteWorkout={(workout) => setDeletingWorkout(workout)}
          />
        ))}
      </div>

      <WorkoutFormModal
        key={modalKey}
        isOpen={workoutModalState !== null}
        onClose={() => setWorkoutModalState(null)}
        trainingWeekId={week.id}
        date={
          workoutModalState?.mode === 'add'
            ? workoutModalState.date
            : workoutModalState?.mode === 'edit'
              ? toDateKey(workoutModalState.workout.scheduled_start)
              : ''
        }
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
