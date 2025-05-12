<script setup lang="ts">
import { collection, getDocs } from 'firebase/firestore'
import { Zap } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'
import { AVATAR_PATHS, isAvatarId } from '~/components/tasks/data/avatarData'
import { isBannerId } from '~/components/tasks/data/bannerData'
import { getBannerInlineStyle } from '~/composables/useBannerStyle'
import { useFirebase } from '~/server/utils/firebase'

interface LeaderboardEntry {
  uid: string
  username: string
  xp: number
  avatar: string
  banner: string
  streak: number
  theme: string
}

const { db } = useFirebase()
const topPlayers = ref<LeaderboardEntry[]>([])
const otherPlayers = ref<LeaderboardEntry[]>([])
const loading = ref(true)

onMounted(async () => {
  const playerSnapshot = await getDocs(collection(db, 'players'))
  const userSnapshot = await getDocs(collection(db, 'users'))

  const userMap = Object.fromEntries(
    userSnapshot.docs.map(doc => [doc.id, doc.data()]),
  )

  const allEntries: LeaderboardEntry[] = []

  for (const doc of playerSnapshot.docs) {
    const playerData = doc.data()
    const uid = doc.id
    const userData = userMap[uid]

    if (!userData || typeof userData.totalXP !== 'number')
      continue

    const selectedAvatar = isAvatarId(playerData.selectedAvatar)
      ? playerData.selectedAvatar
      : 'red'

    const selectedTheme = typeof playerData.selectedTheme === 'string'
      ? playerData.selectedTheme
      : 'zinc'

    allEntries.push({
      uid,
      username: userData.username || 'Unknown',
      xp: userData.totalXP,
      streak: typeof userData.streak === 'number' ? userData.streak : 0,
      avatar: AVATAR_PATHS[selectedAvatar],
      banner: playerData.selectedBanner || 'none',
      theme: selectedTheme,
    })
  }

  allEntries.sort((a, b) => b.xp - a.xp)
  topPlayers.value = allEntries.slice(0, 10)
  otherPlayers.value = allEntries.slice(10)
  loading.value = false
})

/* For streak badge colors */
const themeColors: Record<string, string> = {
  zinc: 'bg-[#17181a] dark:bg-white text-white dark:text-black',
  orange: 'bg-[#f97317] text-white',
  green: 'bg-[#15a34a] text-white dark:text-black',
  red: 'bg-[#dc2627] text-white',
  blue: 'bg-[#2563eb] text-white dark:text-black',
  rose: 'bg-[#e11e48] text-white',
  violet: 'bg-[#7c3aed] text-white',
  yellow: 'bg-[#facb14] text-black dark:text-black',
}
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <h2 class="text-2xl font-bold tracking-tight">
        Leaderboard
      </h2>
      <i class="m-3 text-muted-foreground"><b>Tip: </b>Collect XP to join the Leaderboard!</i>
    </div>
    <main>
      <div v-if="loading" class="text-center text-muted-foreground">
        Loading...
      </div>

      <div v-else>
        <div class="space-y-4">
          <div
            v-for="(player, index) in topPlayers" :key="player.uid"
            class="relative flex items-center justify-between border-4 rounded-lg p-4 shadow-sm"
            :style="isBannerId(player.banner) ? getBannerInlineStyle(player.banner) : undefined"
          >
            <!-- Streak badge -->
            <div
              v-if="player.streak !== 0"
              class="absolute right--3 top--2 flex items-center gap-1 rounded px-2 py-0.5 text-sm font-bold shadow sm:right--5"
              :class="themeColors[player.theme] || themeColors.zinc"
            >
              {{ player.streak }}
              <Zap class="size-4" />
            </div>

            <!-- Main card content -->
            <div class="flex items-center gap-4">
              <span class="w-6 text-right text-xl font-bold">{{ index + 1 }}</span>
              <img :src="player.avatar" alt="avatar" class="size-12 justify-self-center object-contain sm:size-20">
              <span class="font-semibold">{{ player.username }}</span>
            </div>
            <span class="text-sm text-muted-foreground">{{ player.xp.toLocaleString('en-US') }} XP</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
