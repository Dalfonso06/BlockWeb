import type { SelectHTMLAttributes } from 'react'
import { ChevronDownIcon } from '@/icons'

export function Select({ className = '', ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className={`relative ${className}`}>
      <select
        className="w-full appearance-none rounded-md border border-neutral-300 bg-white px-3 py-2 pr-8 text-sm text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
        {...props}
      />
      <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 text-neutral-500" />
    </div>
  )
}
