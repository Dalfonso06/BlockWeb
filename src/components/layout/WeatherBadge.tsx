import { useCurrentWeather } from '@/features/weather/hooks'
import type { WeatherCondition } from '@/types/models'

const CONDITION_LABELS: Record<WeatherCondition, string> = {
  clear: 'Clear',
  partly_cloudy: 'Partly Cloudy',
  cloudy: 'Cloudy',
  fog: 'Fog',
  drizzle: 'Drizzle',
  rain: 'Rain',
  snow: 'Snow',
  thunderstorm: 'Thunderstorm',
}

export function WeatherBadge() {
  const { data, isLoading, error } = useCurrentWeather()

  // Weather is a non-critical header widget — stay quiet while loading, and
  // on error (e.g. location permission denied) rather than showing a fault
  // in the middle of the app chrome.
  if (isLoading || error || !data) return null

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="font-medium text-neutral-900">{Math.round(data.temperature)}°F</span>
      <span className="text-neutral-500">{CONDITION_LABELS[data.condition]}</span>
    </div>
  )
}
