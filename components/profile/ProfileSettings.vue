<script setup lang="ts">
import { useLogout } from '@/composables/useLogout'
import { useUserStore } from '@/stores/userStore'
import { ref } from 'vue'

const userStore = useUserStore()
const usernameInput = ref(userStore.username || 'Athlete')
const { logout } = useLogout()
const colorMode = useColorMode()

async function updateUsername() {
  await userStore.updateUsername(usernameInput.value.trim())
}
</script>

<template>
  <div class="mx-auto max-w-sm flex flex-col items-center gap-6 py-4 text-center text-muted-foreground">
    <!-- Change Username -->
    <div class="w-full space-y-2">
      <label for="username" class="block text-sm font-medium">Change Username</label>
      <input
        id="username"
        v-model="usernameInput"
        type="text"
        placeholder="Enter new username"
        maxlength="12"
        class="w-full border border-input rounded-md bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
      >
      <Button
        class="w-full"
        @click="updateUsername"
      >
        Save
      </Button>
    </div>

    <!-- Theme toggle -->
    <div class="space-y-1.5">
      <Label>Theme</Label>
      <div class="grid grid-cols-3 gap-2">
        <Button
          class="justify-center gap-2"
          variant="outline"
          :class="{ 'border-primary border-2': colorMode.preference === 'light' }"
          @click="colorMode.preference = 'light'"
        >
          <Icon name="i-ph-sun-dim-duotone" size="16" />
          <span class="text-xs capitalize">Light</span>
        </Button>
        <Button
          class="justify-center gap-2"
          variant="outline"
          :class="{ 'border-primary border-2': colorMode.preference === 'dark' }"
          @click="colorMode.preference = 'dark'"
        >
          <Icon name="i-ph-moon-stars-duotone" size="16" />
          <span class="text-xs capitalize">Dark</span>
        </Button>
        <Button
          class="justify-center gap-2"
          variant="outline"
          :class="{ 'border-primary border-2': colorMode.preference === 'system' }"
          @click="colorMode.preference = 'system'"
        >
          <Icon name="i-lucide-monitor" size="16" />
          <span class="text-xs capitalize">System</span>
        </Button>
      </div>
    </div>

    <!-- Log out button -->
    <div class="w-full pt-4">
      <Button
        class="w-full rounded-md bg-destructive px-3 py-2 text-white transition hover:bg-destructive/90"
        @click="logout"
      >
        Log out
      </Button>
    </div>

    <!-- Joke ad button -->
    <div>
      <a
        href="https://youtu.be/0fv1qATRl1c?si=SQv3rN83k_36R1Nm"
        target="_blank"
        rel="noopener"
        class="text-sm underline hover:text-primary"
      >
        Watch ad for coins
      </a>
    </div>
  </div>
</template>
