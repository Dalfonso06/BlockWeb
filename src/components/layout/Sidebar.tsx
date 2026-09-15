import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '@/features/auth/useAuth'
import { SettingsModal } from '@/components/layout/SettingsModal'
import { Avatar } from '@/components/ui/Avatar'

interface NavItem {
  label: string
  to: string
}

const navItems: NavItem[] = [{ label: 'Dashboard', to: '/' }]

export function Sidebar() {
  const { user } = useAuth()
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  return (
    <aside className="flex w-60 flex-col bg-accent px-4 py-6 text-white">
      <span className="px-2 text-lg font-semibold">Block</span>

      <nav className="mt-8 flex flex-col gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end
            className={({ isActive }) =>
              `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive ? 'bg-white/15 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {user && (
        <div className="mt-auto border-t border-white/20 pt-4">
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Avatar size="sm" />
            <span className="truncate">
              {user.first_name} {user.last_name}
            </span>
          </button>
        </div>
      )}

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </aside>
  )
}
