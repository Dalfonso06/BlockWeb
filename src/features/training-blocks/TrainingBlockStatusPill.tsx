import { Pill, type PillColor } from '@/components/ui/Pill'
import type { TrainingBlockStatus } from '@/types/models'

interface TrainingBlockStatusPillProps {
  status: TrainingBlockStatus
  className?: string
}

const colorByStatus: Record<TrainingBlockStatus, PillColor> = {
  planned: 'purple',
  active: 'green',
  completed: 'blue',
  archived: 'neutral',
}

export function TrainingBlockStatusPill({ status, className }: TrainingBlockStatusPillProps) {
  return (
    <Pill color={colorByStatus[status]} className={className}>
      {status[0].toUpperCase() + status.slice(1)}
    </Pill>
  )
}
