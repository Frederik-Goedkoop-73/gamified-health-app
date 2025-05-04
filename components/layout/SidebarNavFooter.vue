<script setup lang="ts">
import { useAuth } from '@/composables/UseAuth'
import { usePlayerStore } from '@/stores/playerStore'
import { useUserStore } from '@/stores/userStore'
import { AVATAR_PATHS } from '~/components/tasks/data/avatarData'
import { useSidebar } from '~/components/ui/sidebar'

const { user, handleSignOut } = useAuth() // Use composable to manage authentication state
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

const { isMobile, setOpenMobile } = useSidebar()

const showModalTheme = ref(false)
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
              <span class="truncate text-xs">{{ userStore.email || "Please login" }}</span>
            </div>
            <Icon name="i-lucide-chevrons-up-down" class="ml-auto size-4" />
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
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Icon name="i-lucide-sparkles" />
              Upgrade to Pro
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Icon name="i-lucide-badge-check" />
              Account
            </DropdownMenuItem>
            <DropdownMenuItem as-child>
              <NuxtLink to="/settings" @click="setOpenMobile(false)">
                <Icon name="i-lucide-settings" />
                Settings
              </NuxtLink>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icon name="i-lucide-bell" />
              Notifications
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem as-child>
              <NuxtLink to="https://github.com/dianprata/nuxt-shadcn-dashboard" external target="_blank">
                <Icon name="i-lucide-github" />
                Github Repository
              </NuxtLink>
            </DropdownMenuItem>
            <DropdownMenuItem @click="showModalTheme = true">
              <Icon name="i-lucide-paintbrush" />
              Theme
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="handleSignOut">
            <Icon name="i-lucide-log-out" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>

  <Dialog v-model:open="showModalTheme">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Customize</DialogTitle>
        <DialogDescription class="text-xs text-muted-foreground">
          Customize & Preview in Real Time
        </DialogDescription>
      </DialogHeader>
      <ThemeCustomize />
    </DialogContent>
  </Dialog>
</template>

<style scoped>

</style>
