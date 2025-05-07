import type { BannerID } from '~/components/tasks/data/bannerData'
import { BANNER_COLORS, isBannerId } from '~/components/tasks/data/bannerData'

const metallicBannerIds: BannerID[] = ['bronze', 'silver', 'gold', 'platinum']

export function isMetallicBanner(banner: string): banner is BannerID {
  return isBannerId(banner) && metallicBannerIds.includes(banner)
}

export function getSolidBannerColor(banner: BannerID): string {
  const color = BANNER_COLORS[banner]
  // Only allow solid colors (e.g., hex codes) as borderColor
  if (color.startsWith('')) {
    return color
  }
  return 'var(--border)' // fallback for invalid solid colors
}

export function getBannerInlineStyle(banner?: string): Record<string, string> | undefined {
  if (!banner || !isBannerId(banner))
    return undefined

  if (isMetallicBanner(banner)) {
    return {
      borderImageSource: BANNER_COLORS[banner],
      borderImageSlice: '1%',
      borderImageRepeat: 'no-repeat',
      borderImageOutset: '0',
      borderImageWidth: '4px',
      borderStyle: 'solid',
      borderWidth: '4px',
    }
  }

  return {
    borderStyle: 'solid',
    borderColor: getSolidBannerColor(banner),
    borderWidth: '4px',
  }
}
