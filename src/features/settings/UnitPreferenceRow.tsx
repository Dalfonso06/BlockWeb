import { DeleteIcon } from '@/icons'
import { Select } from '@/components/ui/Select'
import type { DistanceUnit } from '@/types/models'

const UNIT_OPTIONS: DistanceUnit[] = ['km', 'mi', 'm', 'yd']

interface UnitPreferenceRowProps {
  workoutTypeName: string
  unit: DistanceUnit
  onChangeUnit: (unit: DistanceUnit) => void
  onDelete: () => void
}

export function UnitPreferenceRow({ workoutTypeName, unit, onChangeUnit, onDelete }: UnitPreferenceRowProps) {
  return (
    <div className="flex items-center justify-between gap-3 py-2 text-sm">
      <span className="text-neutral-700 dark:text-neutral-300">{workoutTypeName}</span>

      <div className="flex items-center gap-2">
        <Select value={unit} onChange={(e) => onChangeUnit(e.target.value as DistanceUnit)}>
          {UNIT_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>

        <button
          onClick={onDelete}
          aria-label={`Delete ${workoutTypeName} unit preference`}
          className="text-neutral-500 hover:text-red-600"
        >
          <DeleteIcon className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}
