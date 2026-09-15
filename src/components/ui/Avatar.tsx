interface AvatarProps {
  src?: string | null
  size?: 'sm' | 'md'
  className?: string
}

const sizeClasses: Record<NonNullable<AvatarProps['size']>, string> = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
}

export function Avatar({ src, size = 'sm', className = '' }: AvatarProps) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-white text-neutral-400 ring-1 ring-black/5 ${sizeClasses[size]} ${className}`}
    >
      {src ? (
        <img src={src} alt="" className="h-full w-full object-cover" />
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-2/3 w-2/3"
          aria-hidden="true"
        >
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" />
        </svg>
      )}
    </span>
  )
}
