<script setup lang="ts">
import { useBadgeStore } from '@/stores/badgeStore'
import { useStarStore } from '@/stores/starStore'
import NumberFlow from '@number-flow/vue'
import { Award, Star } from 'lucide-vue-next'
import NextBadgeCard from '~/components/badges/NextBadgeCard.vue'
import BadgeInfo from '~/components/info/BadgeInfo.vue'
import { badges } from '~/components/tasks/data/badgeData.js'
/* import BadgeConstruction from '~/components/badges/BadgeConstruction.vue' */
import { useBadgeProgress } from '~/composables/useBadgeProgress'
import CompletedBadgeCard from '../components/badges/CompletedBadgeCard.vue'

const starStore = useStarStore()
const badgeStore = useBadgeStore()
const { progress } = useBadgeProgress()

const starValue = computed(() => starStore.stars)

type BadgeType = 'steps' | 'calories' | 'distance' | 'azm' | 'coins' | 'xp' | 'streak' | 'badges'

// 1️⃣ Combine static badge data with dynamic claimed & completed state
const allBadges = computed(() =>
  badges.flatMap(group =>
    group.badges.map(badge => ({
      ...badge,
      category: group.category,
      completed: progress.value[badge.type] >= (badge.target ?? 0),
      claimed: badgeStore.claimedBadgeIds.includes(badge.id),
    })),
  ),
)

// 2️⃣ Utility: get claimed + next badge for a given type
function getBadgeDataByType(type: BadgeType) {
  const badgeList = allBadges.value
    .filter(b => b.type === type)
    .sort((a, b) => (a.target ?? 0) - (b.target ?? 0))

  const completed = badgeList.filter(b => b.completed)
  const next = badgeList.find(b => !b.completed)

  return { completed, next }
}
// Utility: get claimed + next badge for a given type
/* function getBadgeDataByType(type: BadgeType) {
  const badgeList = allBadges.value
    .filter(b => b.type === type)
    .sort((a, b) => (a.target ?? 0) - (b.target ?? 0))

  const completed = badgeList
    .filter(b => userProgress[type] >= (b.target ?? 0))
    .map(b => ({ ...b, completed: true }))
  const next = badgeList.find(b => userProgress[type] < (b.target ?? 0))

  return { completed, next }
} */

onMounted(async () => {
  await badgeStore.fetchBadges()
  await starStore.fetchStars()
})
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <div class="flex items-center justify-between gap-2">
        <h2 class="text-2xl font-bold tracking-tight">
          Badges
        </h2>
        <BadgeInfo />
      </div>
      <div>
        <div class="flex flex-row items-center gap-2">
          <h3 class="flex flex-row items-center gap-2 text-muted-foreground">
            <strong>Stars: </strong>
            <NumberFlow
              :value="starValue"
            />
          </h3>
          <Star
            class="size-4"
            :class="starValue !== 0 ? 'text-blue-500 fill-blue-500' : 'text-muted-foreground'"
          />
        </div>
      </div>
    </div>
    <i
      class="text-muted-foreground sm:mt-2"
    >
      <b>Tip: </b>Sync data in <strong>quests</strong> to update totals
    </i>

    <!-- Main body under header -->
    <main class="flex flex-1 flex-col gap-4 md:gap-8">
      <!-- <BadgeConstruction /> -->

      <Card
        v-for="category in badges"
        :key="category.category"
        class="rounded-2xl bg-background p-4 shadow-lg"
      >
        <div class="mb-4 flex flex-row items-center justify-between">
          <CardTitle>{{ category.category }}</CardTitle>
          <Award class="h-4 min-w-4 text-muted-foreground" />
        </div>

        <p class="mb-2 text-sm font-semibold">
          You're currently at:
          <NumberFlow
            :value="progress[category.badges[0].type as BadgeType]"
            class="inline-block"
          />
        </p>

        <NextBadgeCard
          v-if="getBadgeDataByType(category.badges[0].type as BadgeType).next"
          :badge="getBadgeDataByType(category.badges[0].type as BadgeType).next!"
          class="mb-6"
        />

        <!-- <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5"> -->
        <div class="grid grid-cols-2 min-w-0 gap-4 sm:grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] xl:grid-cols-5">
          <CompletedBadgeCard
            v-for="badge in getBadgeDataByType(category.badges[0].type as BadgeType).completed"
            :key="badge.id"
            :badge="badge"
          />
        </div>
      </Card>
    </main>
  </div>
</template>
