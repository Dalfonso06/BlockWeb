export function DateBadge() {
  const formatted = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="font-medium text-neutral-900">{formatted}</span>
    </div>
  )
}
