import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { SlidersIcon } from '@/icons'
import { useAuth } from '@/features/auth/useAuth'
import { PreferencesTab } from '@/features/settings/PreferencesTab'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

const TABS = [{ id: 'preferences', label: 'Preferences', icon: SlidersIcon }] as const

type TabId = (typeof TABS)[number]['id']

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { logout } = useAuth()
  const [activeTab, setActiveTab] = useState<TabId>('preferences')

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Settings" maxWidth="max-w-2xl" height="h-[32rem]">
      <div className="flex h-full flex-col">
        <div className="flex min-h-0 flex-1 gap-6">
          <nav className="w-32 shrink-0 space-y-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'bg-accent/10 font-medium text-accent dark:text-accent-dark'
                    : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800'
                }`}
              >
                <tab.icon className="h-4 w-4 shrink-0" />
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="w-px self-stretch bg-neutral-200 dark:bg-neutral-800" />

          <div className="min-h-0 min-w-0 flex-1 overflow-y-auto">
            {activeTab === 'preferences' && <PreferencesTab />}
          </div>
        </div>

        <div className="mt-6 shrink-0 border-t border-neutral-200 pt-4 dark:border-neutral-800">
          <Button variant="secondary" onClick={logout}>
            Log out
          </Button>
        </div>
      </div>
    </Modal>
  )
}
