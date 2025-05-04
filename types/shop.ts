import type { AvatarID } from '~/components/tasks/data/avatarData'
import type { BannerID } from '~/components/tasks/data/bannerData'
import type { ThemeID } from '~/components/tasks/data/themeData'

// Union of all shop item types
export type ShopItem = AvatarShopItem | ThemeShopItem | BannerShopItem

export interface BaseShopItem {
  id: string
  title: string
  type: 'avatar' | 'banner' | 'theme'
  price: number
  rarity?: 'common' | 'rare' | 'epic' | 'legendary'
  levelrequired?: number
  claimed?: boolean
}

// Avatar-specific items
export interface AvatarShopItem extends BaseShopItem {
  type: 'avatar'
  id: AvatarID
  path: string
}

// Theme-specific items
export interface ThemeShopItem extends BaseShopItem {
  type: 'theme'
  id: ThemeID
  color: string
}

// Banner-specific items
export interface BannerShopItem extends BaseShopItem {
  type: 'banner'
  id: BannerID
  color: string
}
