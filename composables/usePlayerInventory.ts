// For calculating total coins based on purchased items -> useBadgeProgress -> Badges
import { usePlayerStore } from '@/stores/playerStore'
import { computed } from 'vue'
import { shopAvatars } from '~/components/tasks/data/avatarData'
import { shopBanners, shopThemes } from '~/components/tasks/data/shopData'

export function usePlayerInventory() {
  const playerStore = usePlayerStore()

  const totalCoins = computed(() => {
    const avatarItems = playerStore.unlockedAvatars
      .map(id => shopAvatars.find(a => a.id === id))
      .filter(Boolean)

    const bannerItems = playerStore.unlockedBanners
      .map(id => shopBanners.find(b => b.id === id))
      .filter(Boolean)

    const themeItems = playerStore.unlockedThemes
      .map(id => shopThemes.find(t => t.id === id))
      .filter(Boolean)

    const allItems = [...avatarItems, ...bannerItems, ...themeItems]

    return allItems.reduce((sum, item) => sum + (item?.price ?? 0), 0)
  })

  return {
    getPlayerInventoryTotal: () => totalCoins.value,
  }
}
