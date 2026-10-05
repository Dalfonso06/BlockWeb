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

// Formats an ISO date-only string as a short weekday, e.g. "Mon".
export function formatWeekday(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('en-US', { weekday: 'short' })
}

// Formats an ISO date-only string as a short month/day, e.g. "Oct 15".
export function formatMonthDay(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

// Formats a date range concisely, e.g. "Sep 13 - 20" within a month or
// "Sep 30 - Oct 6" across months — the month is only repeated when it changes.
export function formatDateRange(startIsoDate: string, endIsoDate: string, includeYear: boolean = false): string {
  const [startYear, startMonth, startDay] = startIsoDate.split('-').map(Number)
  const [endYear, endMonth, endDay] = endIsoDate.split('-').map(Number)
  const start = new Date(startYear, startMonth - 1, startDay)
  const end = new Date(endYear, endMonth - 1, endDay)

  const startMonthLabel = start.toLocaleDateString('en-US', { month: 'short' })
  const endMonthLabel = end.toLocaleDateString('en-US', { month: 'short' })
  const yearSuffix = includeYear ? `, ${end.getFullYear()}` : ''

  if (startMonthLabel === endMonthLabel) {
    return `${startMonthLabel} ${start.getDate()} - ${end.getDate()}${yearSuffix}`
  }
  return `${startMonthLabel} ${start.getDate()} - ${endMonthLabel} ${end.getDate()}${yearSuffix}`
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
