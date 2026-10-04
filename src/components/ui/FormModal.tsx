import type { FormEvent, ReactNode } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'

interface FormModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  onSubmit: () => void
  isSubmitting?: boolean
  submitError?: string | null
  submitLabel?: string
  children: ReactNode
}

export function FormModal({
  isOpen,
  onClose,
  title,
  onSubmit,
  isSubmitting = false,
  submitError = null,
  submitLabel = 'Save',
  children,
}: FormModalProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    onSubmit()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <form onSubmit={handleSubmit}>
        {children}

        {submitError && <p className="mt-4 text-sm text-red-600 dark:text-red-400">{submitError}</p>}

        <div className="mt-6 flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving…' : submitLabel}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
