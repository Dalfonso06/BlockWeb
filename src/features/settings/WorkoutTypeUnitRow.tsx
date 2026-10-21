import { Select } from '@/components/ui/Select'
import { DistanceUnit } from '@/types/models'

const UNIT_OPTIONS = Object.values(DistanceUnit)

interface WorkoutTypeUnitRowProps {
  workoutTypeName: string
  unit: DistanceUnit
  isDefault: boolean
  onChangeUnit: (unit: DistanceUnit) => void
}

export function WorkoutTypeUnitRow({ workoutTypeName, unit, isDefault, onChangeUnit }: WorkoutTypeUnitRowProps) {
  return (
    <div className="flex items-center justify-between gap-3 py-2 text-sm">
      <span className="text-neutral-700 dark:text-neutral-300">{workoutTypeName}</span>

      <div className="flex items-center gap-2">
        {isDefault && <span className="text-xs text-neutral-400">Default</span>}
        <Select value={unit} onChange={(e) => onChangeUnit(e.target.value as DistanceUnit)} className="w-24">
          {UNIT_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </div>
    </div>
  )
}
