export type BannerID =
  | 'none'

  | 'orange'
  | 'green'
  | 'red'

  | 'blue'
  | 'rose'

  | 'violet'
  | 'yellow'

  | 'bronze'
  | 'silver'
  | 'gold'
  | 'platinum'

export const BANNER_COLORS: Record<BannerID, string> = {
  none: '',
  orange: '#f97317',
  green: '#15a34a',
  red: '#dc2627',
  blue: '#2563eb',
  rose: '#e11e48',
  violet: '#7c3aed',
  yellow: '#facb14',
  bronze: 'url("/banners/bronze.jpg")',
  silver: 'url("/banners/silver.jpg")',
  gold: 'url("/banners/gold.jpg")',
  platinum: 'url("/banners/platinum.jpg")',
}

export function getBannerIds(): BannerID[] {
  return Object.keys(BANNER_COLORS) as BannerID[]
}

export function isBannerId(id: string): id is BannerID {
  return typeof id === 'string' && id in BANNER_COLORS
}

export function isBannerArray(arr: unknown): arr is BannerID[] {
  return Array.isArray(arr) && arr.every(isBannerId)
}
