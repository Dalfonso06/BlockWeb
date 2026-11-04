import { useCurrentWeather } from '@/features/weather/hooks'
import { isNightTime } from '@/lib/date'
import type { WeatherCondition } from '@/types/enums'
import type { IconComponent } from '@/icons'
import {
  WeatherClearIcon,
  WeatherClearNightIcon,
  WeatherPartlyCloudyIcon,
  WeatherPartlyCloudyNightIcon,
  WeatherCloudyIcon,
  WeatherFogIcon,
  WeatherFogNightIcon,
  WeatherDrizzleIcon,
  WeatherRainIcon,
  WeatherSnowIcon,
  WeatherThunderstormIcon,
  WeatherThunderstormNightIcon,
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

// Only conditions with a visually distinct night icon in Meteocons' set are
// overridden here — cloudy/drizzle/rain/snow look the same at any hour, so
// they fall back to the same icon as CONDITION_ICONS.
const NIGHT_CONDITION_ICONS: Record<WeatherCondition, IconComponent> = {
  ...CONDITION_ICONS,
  clear: WeatherClearNightIcon,
  partly_cloudy: WeatherPartlyCloudyNightIcon,
  fog: WeatherFogNightIcon,
  thunderstorm: WeatherThunderstormNightIcon,
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

  const iconsForTimeOfDay = isNightTime() ? NIGHT_CONDITION_ICONS : CONDITION_ICONS
  const ConditionIcon = iconsForTimeOfDay[data.condition]

  return (
    <div className="flex items-center gap-2 text-sm">
      <ConditionIcon className="h-6 w-6 text-neutral-500" title={CONDITION_LABELS[data.condition]} />
      <span className="font-medium text-neutral-900">{Math.round(data.temperature)}°F</span>
    </div>
  )
}
