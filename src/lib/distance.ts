import type { DistanceUnit } from '@/types/models'

const METERS_PER_UNIT: Record<DistanceUnit, number> = {
  m: 1,
  km: 1000,
  mi: 1609.344,
  yd: 0.9144,
}

// Converts a meters value (the only unit workouts are stored in) to the given unit.
export function convertMetersTo(meters: number, unit: DistanceUnit): number {
  const value = meters / METERS_PER_UNIT[unit]
  return Math.round(value * 100) / 100
}

// The inverse of convertMetersTo, for turning a user-entered value back into meters before saving.
export function convertToMeters(value: number, unit: DistanceUnit): number {
  return Math.round(value * METERS_PER_UNIT[unit] * 100) / 100
}

// Formats a meters value for display in the given unit, e.g. "3.11mi". Falls
// back to meters when no unit could be resolved (no preference, no default).
export function formatDistance(meters: number, unit: DistanceUnit | null): string {
  const resolvedUnit = unit ?? 'm'
  return `${convertMetersTo(meters, resolvedUnit)}${resolvedUnit}`
}
