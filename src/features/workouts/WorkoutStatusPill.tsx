import { Pill, type PillColor } from '@/components/ui/Pill'
import type { WorkoutStatus } from '@/types/enums'

interface WorkoutStatusPillProps {
  status: WorkoutStatus
  className?: string
}

const colorByStatus: Record<WorkoutStatus, PillColor> = {
  planned: 'neutral',
  completed: 'green',
  skipped: 'amber',
}

export function WorkoutStatusPill({ status, className }: WorkoutStatusPillProps) {
  return (
    <Pill color={colorByStatus[status]} className={className}>
      {status[0].toUpperCase() + status.slice(1)}
    </Pill>
  )
}
