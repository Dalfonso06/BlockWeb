import { useEffect, useRef, useState } from 'react'
import { MoreIcon } from '@/icons'

interface ActionMenuAction {
  label: string
  onClick: () => void
  danger?: boolean
}

interface ActionMenuProps {
  actions: ActionMenuAction[]
  label?: string
}

export function ActionMenu({ actions, label = 'Actions' }: ActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    function handleOutsideClick(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('mousedown', handleOutsideClick)
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <div ref={containerRef} className="relative inline-flex items-center">
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-label={label}
        aria-expanded={isOpen}
        className="inline-flex items-center text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
      >
        <MoreIcon className="h-3.5 w-3.5" />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-full z-10 mt-1 w-32 rounded-md border border-neutral-200 bg-white py-1 shadow-lg dark:border-neutral-700 dark:bg-neutral-900"
        >
          {actions.map((action) => (
            <button
              key={action.label}
              role="menuitem"
              onClick={() => {
                setIsOpen(false)
                action.onClick()
              }}
              className={`block w-full px-3 py-1.5 text-left text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 ${
                action.danger ? 'text-red-600' : 'text-neutral-700 dark:text-neutral-300'
              }`}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
