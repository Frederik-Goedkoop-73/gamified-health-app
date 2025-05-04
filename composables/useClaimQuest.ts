import { useCoinStore } from '@/stores/coinStore'
import { useQuestStore } from '@/stores/questStore'
import { useXPStore } from '@/stores/xpStore'
import { toast } from 'vue-sonner' // Or your toast plugin

export function useClaimQuest() {
  const xpStore = useXPStore()
  const coinStore = useCoinStore()
  const questStore = useQuestStore()

  const claimQuest = (questId: string) => {
    const quest = questStore.getQuestById(questId)
    if (!quest || !quest.completed || quest.claimed)
      return

    xpStore.addXP(quest.rewardXP)
    coinStore.addCoins(quest.rewardCoins)
    questStore.markQuestAsClaimed(questId)

    toast.success(`Quest claimed! +${quest.rewardXP} XP, +${quest.rewardCoins} coins`)
  }

  return { claimQuest }
}
