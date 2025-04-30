import { eachDayOfInterval, endOfToday, format, startOfWeek } from 'date-fns'

export function getDatesThisWeek(): string[] {
  const monday = startOfWeek(new Date(), { weekStartsOn: 1 }) // Monday
  const today = endOfToday()
  return eachDayOfInterval({ start: monday, end: today }).map(d => format(d, 'yyyy-MM-dd'))
}
