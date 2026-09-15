import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/features/auth/useAuth'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { logout } = useAuth()

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Settings">
      <p className="text-sm text-neutral-500">Settings — coming soon.</p>

      <div className="mt-6 border-t border-neutral-200 pt-4 dark:border-neutral-800">
        <Button variant="secondary" onClick={logout}>
          Log out
        </Button>
      </div>
    </Modal>
  )
}
