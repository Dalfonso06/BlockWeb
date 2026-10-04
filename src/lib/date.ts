// Formats an ISO date-only string ("YYYY-MM-DD") for display, e.g. "Oct 18, 2026".
// Parses the components manually rather than `new Date(isoDate)` to avoid UTC
// parsing shifting the date by a day in negative-offset timezones.
export function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

// Formats an ISO date-only string as a short day label, e.g. "Mon, Oct 18".
export function formatDayLabel(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

// Returns the inclusive list of "YYYY-MM-DD" strings between two ISO date-only strings.
export function enumerateDates(startIsoDate: string, endIsoDate: string): string[] {
  const [startYear, startMonth, startDay] = startIsoDate.split('-').map(Number)
  const [endYear, endMonth, endDay] = endIsoDate.split('-').map(Number)
  const start = new Date(startYear, startMonth - 1, startDay)
  const end = new Date(endYear, endMonth - 1, endDay)

  const dates: string[] = []
  for (const cursor = start; cursor <= end; cursor.setDate(cursor.getDate() + 1)) {
    dates.push(
      `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, '0')}-${String(cursor.getDate()).padStart(2, '0')}`,
    )
  }
  return dates
}

// Extracts the "YYYY-MM-DD" date portion from a full ISO datetime string.
export function toDateKey(isoDateTime: string): string {
  return isoDateTime.slice(0, 10)
}
