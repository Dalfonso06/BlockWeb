import { NavLink } from 'react-router-dom'
import type { IconComponent } from '@/icons'

interface SidebarNavLinkProps {
  to: string
  label: string
  icon: IconComponent
}

export function SidebarNavLink({ to, label, icon: Icon }: SidebarNavLinkProps) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
          isActive ? 'bg-white/15 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
        }`
      }
    >
      <Icon className="h-4 w-4 shrink-0" />
      {label}
    </NavLink>
  )
}
