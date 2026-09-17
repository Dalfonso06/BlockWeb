import { UserIcon } from '@/icons'

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
        <UserIcon className="h-1/2 w-1/2" aria-hidden="true" />
      )}
    </span>
  )
}
