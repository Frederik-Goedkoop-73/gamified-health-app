import { format } from 'date-fns'

export function getDatesThisWeek(): string[] {
  const today = new Date()
  const startOfWeek = new Date(today)

  // Make Sunday (0) the *end* of the week, so we subtract 6 instead of -1
  const dayOfWeek = today.getDay()
  const offset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek // Monday as start of week

  startOfWeek.setDate(today.getDate() + offset)

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek)
    d.setDate(startOfWeek.getDate() + i)
    return format(d, 'yyyy-MM-dd')
  })
}
