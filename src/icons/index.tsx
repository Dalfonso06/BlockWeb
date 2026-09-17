import type { IconBaseProps, IconType } from 'react-icons'
import { FaCalendarDays, FaClipboardList, FaCube, FaHouse, FaUser, FaXmark } from 'react-icons/fa6'

import clearSvg from '@meteocons/svg-static/fill/clear-day.svg?raw'
import partlyCloudySvg from '@meteocons/svg-static/fill/partly-cloudy-day.svg?raw'
import cloudySvg from '@meteocons/svg-static/fill/cloudy.svg?raw'
import fogSvg from '@meteocons/svg-static/fill/fog.svg?raw'
import drizzleSvg from '@meteocons/svg-static/fill/drizzle.svg?raw'
import rainSvg from '@meteocons/svg-static/fill/rain.svg?raw'
import snowSvg from '@meteocons/svg-static/fill/snow.svg?raw'
import thunderstormSvg from '@meteocons/svg-static/fill/thunderstorms.svg?raw'

// Central icon registry: every icon the app uses is named here once, by what
// it means in the UI rather than which icon-set glyph it happens to be.
// Import icons from here everywhere else — never straight from an icon
// library — so switching libraries, or swapping one icon for a hand-rolled
// SVG, only ever touches this file. A custom icon just needs to match
// IconComponent's shape: (props: IconProps) => ReactNode.

export type IconProps = IconBaseProps
export type IconComponent = IconType

export const HomeIcon: IconComponent = FaHouse
export const UserIcon: IconComponent = FaUser
export const CloseIcon: IconComponent = FaXmark
export const TrainingPlanIcon: IconComponent = FaClipboardList
export const CalendarIcon: IconComponent = FaCalendarDays
// Temporary placeholder logo — swap for the real brand mark when one exists.
export const LogoIcon: IconComponent = FaCube

// Weather condition icons come from Meteocons' static SVG set instead of
// react-icons/fa6 — a documented exception (see CLAUDE.md). The "monochrome"
// style uses currentColor internally, so these need to be inlined into the
// DOM (not rendered via <img src>) to actually inherit surrounding text
// color like every other icon in this registry does.
function createStaticIcon(svgMarkup: string): IconComponent {
  return function StaticIcon({ className = '', title, 'aria-hidden': ariaHidden }: IconProps) {
    return (
      <span
        className={`inline-block align-middle [&>svg]:block [&>svg]:h-full [&>svg]:w-full ${className}`}
        title={title}
        aria-hidden={ariaHidden}
        dangerouslySetInnerHTML={{ __html: svgMarkup }}
      />
    )
  }
}

export const WeatherClearIcon: IconComponent = createStaticIcon(clearSvg)
export const WeatherPartlyCloudyIcon: IconComponent = createStaticIcon(partlyCloudySvg)
export const WeatherCloudyIcon: IconComponent = createStaticIcon(cloudySvg)
export const WeatherFogIcon: IconComponent = createStaticIcon(fogSvg)
export const WeatherDrizzleIcon: IconComponent = createStaticIcon(drizzleSvg)
export const WeatherRainIcon: IconComponent = createStaticIcon(rainSvg)
export const WeatherSnowIcon: IconComponent = createStaticIcon(snowSvg)
export const WeatherThunderstormIcon: IconComponent = createStaticIcon(thunderstormSvg)
