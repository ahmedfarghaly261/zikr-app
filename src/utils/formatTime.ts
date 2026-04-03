export function formatTime(date: Date | string, locale: string = 'en'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleTimeString(locale)
}
