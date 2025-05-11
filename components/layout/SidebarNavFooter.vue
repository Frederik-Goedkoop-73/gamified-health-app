<script setup lang="ts">
import { useAuth } from '@/composables/UseAuth'
import { usePlayerStore } from '@/stores/playerStore'
import { useUserStore } from '@/stores/userStore'
import { AVATAR_PATHS } from '~/components/tasks/data/avatarData'
import { useSidebar } from '~/components/ui/sidebar'
import { useLogout } from '~/composables/useLogout'

const { user } = useAuth() // Use composable to manage authentication state
const userStore = useUserStore() // Use Pinia store to manage user data
const playerStore = usePlayerStore() // Use Pinia store to manage player data
const { selectedAvatar } = storeToRefs(playerStore)

// Auth: Fetch player data when user is available -> fetch selected avatar
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
    playerStore.setAvatar('red')// Reset to default avatar
  }
}, { immediate: true }) // Fetch user and player data when user changes)

const { isMobile } = useSidebar()

const { logout } = useLogout()
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <!-- Avatar image -->
            <div class="relative h-10 w-10 overflow-hidden rounded-md">
              <img
                :src="AVATAR_PATHS[selectedAvatar] || AVATAR_PATHS.red"
                :alt="`Selected avatar: ${selectedAvatar}`"
                class="h-full w-full object-contain"
              > <!-- https://tailwindcss.com/docs/object-fit -->
            </div>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">{{ userStore.username || "Guest" }}</span>
            </div>
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          class="min-w-56 w-[--radix-dropdown-menu-trigger-width] rounded-lg"
          :side="isMobile ? 'bottom' : 'right'"
          align="end"
        >
          <DropdownMenuLabel class="p-0 font-normal">
            <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <!-- Avatar image -->
              <div class="relative h-10 w-10 overflow-hidden rounded-md">
                <img
                  :src="AVATAR_PATHS[selectedAvatar] || AVATAR_PATHS.red"
                  :alt="`Selected avatar: ${selectedAvatar}`"
                  class="h-full w-full object-contain"
                > <!-- https://tailwindcss.com/docs/object-fit -->
              </div>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-semibold">{{ userStore.username || "Guest" }}</span>
                <span class="truncate text-xs">{{ userStore.email }}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="logout">
            <Icon name="i-lucide-log-out" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>

<style scoped>

</style>
