import { WeatherBadge } from '@/components/layout/WeatherBadge'
import { DateBadge } from '@/components/layout/DateBadge'

export function Header() {
  return (
    <header className="flex items-center justify-between border-b border-neutral-200 bg-white px-6 py-4 text-neutral-900">
      <div />
      <div className="flex items-center gap-8">
        <DateBadge />
        <WeatherBadge />
      </div>
    </header>
  )
}
