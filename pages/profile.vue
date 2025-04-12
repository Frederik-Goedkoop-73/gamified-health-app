<!-- components/AvatarSelector.vue -->
<script setup lang="ts">
import { useAuth } from '@/composables/UseAuth'
import { usePlayerStore } from '@/stores/playerStore'
import { useUserStore } from '@/stores/userStore'
import { AVATAR_PATHS, type AvatarID } from '~/types/player'

const { user, signInWithGoogle } = useAuth() // Use composable to manage authentication state
const userStore = useUserStore() // Use Pinia store to manage user data
const playerStore = usePlayerStore() // Use Pinia store to manage player data
const { selectedAvatar } = storeToRefs(playerStore) // Use storeToRefs to get reactive references to store properties

// Get all avatar IDs as typed array
const allAvatarIds = Object.keys(AVATAR_PATHS) as AvatarID[]

// Auth: Fetch additional data when user is available
watch(() => user.value, async (newUser) => {
  if (newUser) {
    await Promise.all([
      userStore.fetchUser(newUser.uid),
      playerStore.fetchPlayerData(), // No arguments needed, fetches data from Firestore already
    ])
  }
  else {
    userStore.clearUser()
    playerStore.clearPlayerData()
  }
}, { immediate: true }) // Fetch user and player data when user changes)
</script>

<template>
  <!-- Not Logged In State: Sign in card -->
  <Card v-if="!user" class="max-w-md w-full">
    <CardHeader>
      <CardTitle class="text-center">
        Avatar Selection
      </CardTitle>
    </CardHeader>
    <CardContent class="flex flex-col items-center gap-4">
      <div class="h-32 w-32 flex items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800">
        <User class="h-16 w-16 text-muted-foreground" />
      </div>
      <p class="text-center text-muted-foreground">
        Please sign in to customize your avatar
      </p>
      <Button class="mt-4" @click="signInWithGoogle">
        Sign In with Google
      </Button>
    </CardContent>
  </Card>

  <!-- Logged In State: Avatar selector template -->
  <Card v-else>
    <CardHeader>
      <CardTitle class="text-lg">
        Select Avatar
      </CardTitle>
    </CardHeader>
    <CardContent>
      <!-- Selected Avatar Preview -->
      <div class="mb-6 flex flex-col items-center gap-4">
        <div class="relative h-24 w-24 overflow-hidden border-4 border-primary rounded-md">
          <img
            :src="AVATAR_PATHS[selectedAvatar]"
            :alt="`Selected avatar: ${selectedAvatar}`"
            class="h-full w-full object-contain"
          > <!-- https://tailwindcss.com/docs/object-fit -->
        </div>
        <p class="text-sm font-medium">
          Current: {{ selectedAvatar }}
        </p>
      </div>

      <!-- Avatar Grid -->
      <div class="grid grid-cols-4 gap-4">
        <Tooltip v-for="avatar in allAvatarIds" :key="avatar">
          <TooltipTrigger as-child>
            <div
              class="relative aspect-square cursor-pointer overflow-hidden rounded-md transition-all"
              :class="{
                'ring-2 ring-primary': selectedAvatar === avatar,
                'opacity-50 grayscale': !playerStore.hasAvatar(avatar),
                'hover:scale-105': playerStore.hasAvatar(avatar),
              }"
              @click="playerStore.hasAvatar(avatar) && playerStore.setAvatar(avatar)"
            >
              <img
                :src="AVATAR_PATHS[avatar]"
                :alt="`Avatar ${avatar}`"
                class="h-full w-full object-contain"
              >
              <Badge
                v-if="!playerStore.hasAvatar(avatar)"
                variant="outline"
                class="absolute bottom-1 left-1/2 transform text-xs -translate-x-1/2"
                @click="playerStore.unlockAvatar(avatar)"
              >
                Locked
              </Badge>
            </div>
          </TooltipTrigger>
          <TooltipContent v-if="!playerStore.hasAvatar(avatar)">
            <p>Complete challenges to unlock this avatar</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </CardContent>
  </Card>
</template>
