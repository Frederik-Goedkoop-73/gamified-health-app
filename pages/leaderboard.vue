<script setup lang="ts">
import { collection, getDocs } from 'firebase/firestore'
import { Zap } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'
import LeaderboardInfo from '~/components/info/LeaderboardInfo.vue'
import LeaderboardProfileDialog from '~/components/leaderboard/LeaderboardProfileDialog.vue'
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
  stars: number
  level: number
  coins: number
}

const { db } = useFirebase()
const allPlayers = ref<LeaderboardEntry[]>([])
const loading = ref(true) // assuming you have this

const { auth } = useFirebase()
const currentUser = auth.currentUser
const currentUserEntry = ref<LeaderboardEntry | null>(null)
const currentUserRank = ref<number | null>(null)

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
      username: userData.username || 'Guest',
      xp: userData.totalXP,
      streak: typeof userData.streak === 'number' ? userData.streak : 0,
      avatar: AVATAR_PATHS[selectedAvatar],
      stars: userData.stars || 0,
      banner: playerData.selectedBanner || 'none',
      theme: selectedTheme,
      level: userData.level || 0,
      coins: userData.coins || 0,
    })

    // Check if the current user is in the leaderboard and their position
    allEntries.sort((a, b) => b.xp - a.xp)

    const currentIndex = allEntries.findIndex(e => e.uid === currentUser?.uid)
    if (currentIndex !== -1) {
      currentUserEntry.value = allEntries[currentIndex]
      currentUserRank.value = currentIndex + 1 // 1-based rank
    }
  }

  allEntries.sort((a, b) => b.xp - a.xp)
  allPlayers.value = allEntries
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

const dialogOpen = ref(false)
const selectedPlayer = ref<LeaderboardEntry | null>(null)

function showPlayerProfile(player: LeaderboardEntry) {
  selectedPlayer.value = {
    username: player.username,
    avatar: player.avatar,
    xp: player.xp,
    stars: player.stars, // or however you want to estimate this
    streak: player.streak,
    banner: player.banner,
    theme: player.theme,
    uid: player.uid,
    level: player.level,
    coins: player.coins,
  }
  dialogOpen.value = true
}
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <div class="flex items-center justify-between gap-2">
        <h2 class="text-2xl font-bold tracking-tight">
          Leaderboard
        </h2>
        <LeaderboardInfo />
      </div>
      <i class="m-3 text-muted-foreground"><b>Tip: </b>Collect XP to join the Leaderboard!</i>
    </div>
    <main>
      <LeaderboardProfileDialog
        v-if="selectedPlayer"
        v-model:open="dialogOpen"
        :player="selectedPlayer"
      />

      <div v-if="loading" class="text-center text-muted-foreground">
        Loading...
      </div>

      <div v-else>
        <div v-if="currentUserEntry" class="mb-6 flex items-center justify-between border rounded-lg bg-background p-4 shadow">
          <div class="flex items-center gap-2 whitespace-nowrap">
            <span class="text-lg font-bold">Your Rank:</span>
            <span
              class="text-xl text-muted-foreground font-semibold"
            >#{{ currentUserRank }}</span>
          </div>
          <div class="flex items-center justify-center gap-4">
            <img :src="currentUserEntry.avatar" alt="avatar" class="size-12 justify-self-center object-contain sm:size-20">
          </div>
        </div>

        <hr v-if="currentUserEntry" class="my-4">

        <div class="space-y-4">
          <div
            v-for="(player, index) in allPlayers" :key="player.uid"
            class="relative flex items-center justify-between border-4 rounded-lg p-4 shadow-sm"
            :style="isBannerId(player.banner) ? getBannerInlineStyle(player.banner) : undefined"
            @click="() => showPlayerProfile(player)"
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
