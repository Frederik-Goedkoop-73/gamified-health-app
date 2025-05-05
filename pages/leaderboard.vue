<script setup lang="ts">
import { collection, getDocs } from 'firebase/firestore'
import { onMounted, ref } from 'vue'
import { AVATAR_PATHS, isAvatarId } from '~/components/tasks/data/avatarData'
import { useFirebase } from '~/server/utils/firebase'

interface LeaderboardEntry {
  uid: string
  username: string
  xp: number
  avatar: string
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

    allEntries.push({
      uid,
      username: userData.username || 'Unknown',
      xp: userData.totalXP,
      avatar: AVATAR_PATHS[selectedAvatar],
    })
  }

  allEntries.sort((a, b) => b.xp - a.xp)
  topPlayers.value = allEntries.slice(0, 10)
  otherPlayers.value = allEntries.slice(10)
  loading.value = false
})
</script>

<template>
  <div class="mx-auto max-w-4xl w-full py-8">
    <h2 class="mb-6 text-center text-3xl text-primary font-bold">
      Leaderboard
    </h2>

    <div v-if="loading" class="text-center text-muted-foreground">
      Loading...
    </div>

    <div v-else>
      <div class="space-y-4">
        <div
          v-for="(player, index) in topPlayers"
          :key="player.uid"
          class="flex items-center justify-between border rounded-lg bg-secondary p-4 shadow-sm"
        >
          <div class="flex items-center gap-4">
            <span class="w-6 text-right text-xl font-bold">{{ index + 1 }}</span>
            <img :src="player.avatar" alt="avatar" class="h-20 w-20 justify-self-center object-contain">
            <span class="font-semibold">{{ player.username }}</span>
          </div>
          <span class="text-sm text-muted-foreground">{{ player.xp }} XP</span>
        </div>
      </div>
    </div>
  </div>
</template>
