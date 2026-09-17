import { useCurrentWeather } from '@/features/weather/hooks'
import type { WeatherCondition } from '@/types/models'
import type { IconComponent } from '@/icons'
import {
  WeatherClearIcon,
  WeatherPartlyCloudyIcon,
  WeatherCloudyIcon,
  WeatherFogIcon,
  WeatherDrizzleIcon,
  WeatherRainIcon,
  WeatherSnowIcon,
  WeatherThunderstormIcon,
} from '@/icons'

const CONDITION_ICONS: Record<WeatherCondition, IconComponent> = {
  clear: WeatherClearIcon,
  partly_cloudy: WeatherPartlyCloudyIcon,
  cloudy: WeatherCloudyIcon,
  fog: WeatherFogIcon,
  drizzle: WeatherDrizzleIcon,
  rain: WeatherRainIcon,
  snow: WeatherSnowIcon,
  thunderstorm: WeatherThunderstormIcon,
}

// Kept for the icon's accessible name (title) — no longer rendered as visible text.
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

  const ConditionIcon = CONDITION_ICONS[data.condition]

  return (
    <div className="flex items-center gap-2 text-sm">
      <ConditionIcon className="h-6 w-6 text-neutral-500" title={CONDITION_LABELS[data.condition]} />
      <span className="font-medium text-neutral-900">{Math.round(data.temperature)}°F</span>
    </div>
  )
}
