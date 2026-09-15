import type { IconBaseProps, IconType } from 'react-icons'
import { FaHouse, FaUser, FaXmark } from 'react-icons/fa6'

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
