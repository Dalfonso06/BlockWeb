import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-accent text-white hover:opacity-90',
  secondary: 'bg-transparent text-neutral-700 border border-neutral-300 hover:bg-neutral-100 dark:text-neutral-300 dark:border-neutral-700 dark:hover:bg-neutral-800',
}

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none ${variantClasses[variant]} ${className}`}
      {...props}
    />
  )
}
