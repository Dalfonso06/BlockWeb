import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'

interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description?: string
  confirmLabel?: string
  isConfirming?: boolean
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirm',
  isConfirming = false,
}: ConfirmDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      {description && <p className="text-sm text-neutral-600 dark:text-neutral-400">{description}</p>}

      <div className="mt-6 flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onClose} disabled={isConfirming}>
          Cancel
        </Button>
        <Button type="button" variant="danger" onClick={onConfirm} disabled={isConfirming}>
          {isConfirming ? 'Deleting…' : confirmLabel}
        </Button>
      </div>
    </Modal>
  )
}
