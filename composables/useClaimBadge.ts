import { badges } from '@/components/tasks/data/badgeData'
import { useBadgeStore } from '@/stores/badgeStore'
import { useCoinStore } from '@/stores/coinStore'
import { useStarStore } from '@/stores/starStore'
import { useXPStore } from '@/stores/xpStore'
import { toast } from 'vue-sonner' // Or your toast plugin

export function useClaimBadge() {
  const xpStore = useXPStore()
  const coinStore = useCoinStore()
  const starStore = useStarStore()
  const badgeStore = useBadgeStore()

  const claimBadge = (badgeId: string) => {
    // Flatten static badges into one list to look up by ID
    const allBadges = badges.flatMap(group =>
      group.badges.map(b => ({
        ...b,
        category: group.category,
        id: String(b.id), // force string ID
      })),
    )

    const badge = allBadges.find(b => String(b.id) === badgeId)
    if (!badge) {
      return
    }

    if (badgeStore.claimedBadgeIds.includes(badgeId)) {
      return
    }

    // Give rewards
    if (badge.xp)
      xpStore.addXP(badge.xp)
    coinStore.addCoins(badge.coins)
    starStore.addStars(badge.stars)

    // Save to store and Firestore
    badgeStore.claimBadge(badgeId)

    toast.success(`Badge claimed! +${badge.stars} stars, +${badge.coins} coins, +${badge.xp ?? 0}`)
  }

  return { claimBadge }
}
