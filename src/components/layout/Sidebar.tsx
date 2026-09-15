import { useState } from 'react'
import type { IconComponent } from '@/icons'
import { HomeIcon } from '@/icons'
import { useAuth } from '@/features/auth/useAuth'
import { SettingsModal } from '@/components/layout/SettingsModal'
import { SidebarNavLink } from '@/components/layout/SidebarNavLink'
import { Avatar } from '@/components/ui/Avatar'

interface NavItem {
  label: string
  to: string
  icon: IconComponent
}

const navItems: NavItem[] = [{ label: 'Dashboard', to: '/', icon: HomeIcon }]

export function Sidebar() {
  const { user } = useAuth()
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  return (
    <aside className="flex w-60 flex-col bg-accent px-4 py-6 text-white">
      <span className="px-2 text-lg font-semibold">Block</span>

      <nav className="mt-8 flex flex-col gap-1">
        {navItems.map((item) => (
          <SidebarNavLink key={item.to} to={item.to} label={item.label} icon={item.icon} />
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
