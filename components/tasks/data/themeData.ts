export type ThemeID =
  | 'zinc'

  | 'orange'
  | 'green'
  | 'red'

  | 'blue'
  | 'rose'

  | 'violet'

  | 'yellow'

export const THEME_COLORS: Record<ThemeID, string> = {
  zinc: '#71717a',
  orange: '#f97317',
  green: '#15a34a',
  red: '#dc2627',
  blue: '#2563eb',
  rose: '#e11e48',
  violet: '#7c3aed',
  yellow: '#facb14',
}

export function getThemeIds(): ThemeID[] {
  return Object.keys(THEME_COLORS) as ThemeID[]
}

export function isThemeId(id: string): id is ThemeID {
  return typeof id === 'string' && id in THEME_COLORS
}

export function isThemeArray(arr: unknown): arr is ThemeID[] {
  return Array.isArray(arr) && arr.every(isThemeId)
}
