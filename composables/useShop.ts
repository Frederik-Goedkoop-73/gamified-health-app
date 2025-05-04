import type { ShopItem } from '~/types/shop'
import { useToast } from '@/components/ui/toast/use-toast'
import { useCoinStore } from '@/stores/coinStore'
import { usePlayerStore } from '@/stores/playerStore'

export function useShop() {
  const coinStore = useCoinStore()
  const playerStore = usePlayerStore()
  const { toast } = useToast()

  async function buyItem(item: ShopItem) {
    if (!coinStore.canAfford(item.price)) {
      toast({
        title: 'Not enough coins',
        description: `You need ${item.price} coins to buy ${item.title}`,
        variant: 'destructive',
      })
      return false
    }

    const success = await coinStore.deductCoins(item.price)
    if (success) {
      toast({
        title: 'Purchased!',
        description: `${item.title} bought for ${item.price} coins.`,
      })

      // Save to player progress
      if (item.type === 'avatar') {
        playerStore.unlockAvatar(item.id)
      }
      else if (item.type === 'banner' || item.type === 'theme') {
        playerStore.purchaseItem(item)
      }

      return true
    }

    toast({
      title: 'Error',
      description: 'Failed to deduct coins.',
      variant: 'destructive',
    })
    return false
  }

  return { buyItem }
}
