<script setup lang="ts">
import { GraduationCap } from 'lucide-vue-next'
import { useRoute } from 'vue-router'
import { useToast } from '~/components/ui/toast/use-toast'

definePageMeta({
  layout: 'blank',
})

const route = useRoute()
const { setupUsername, isLoggedIn } = useAuth()
const username = ref('')
const isLoading = ref(false)
const errorMsg = ref('')
const { toast } = useToast()

// Redirect if already logged in with username
if (isLoggedIn.value) {
  navigateTo(route.query.redirect?.toString() || '/')
}

function openKULWebsiteInNewTab() {
  window.open('https://www.kuleuven.be/en', '_blank')
}

async function handleSubmit() {
  if (!username.value.trim()) {
    errorMsg.value = 'Username is required'
    return
  }

  isLoading.value = true
  try {
    const success = await setupUsername(null, username.value.trim())
    if (success) {
      toast({
        title: 'Success',
        description: 'You have been logged out successfully',
        variant: 'default', // or 'destructive' for errors
      })
      navigateTo(route.query.redirect?.toString() || '/')
    }
  }
  catch {
    errorMsg.value = 'Failed to save username. Please try another one.'
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-6 bg-muted p-6 min-h-svh md:p-10">
    <div class="max-w-sm w-full flex flex-col gap-6">
      <NuxtLink
        class="flex cursor-pointer items-center self-center gap-2 font-medium"
        @click="openKULWebsiteInNewTab"
      >
        <div
          class="aspect-square size-8 flex items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
        >
          <GraduationCap class="size-6" />
        </div>
        KU Leuven
      </NuxtLink>
      <div class="flex flex-col gap-6">
        <Card>
          <CardHeader class="text-center">
            <CardTitle class="text-xl">
              Choose Your Username
            </CardTitle>
            <CardDescription>
              This will be your display name in the app
            </CardDescription>
          </CardHeader>
          <CardContent class="grid gap-4">
            <form @submit.prevent="handleSubmit">
              <div class="grid gap-2">
                <Label for="username">Username</Label>
                <Input
                  id="username" v-model="username" placeholder="Enter your username"
                  :disabled="isLoading" required
                />
                <p v-if="errorMsg" class="text-sm text-destructive">
                  {{ errorMsg }}
                </p>
              </div>
              <Button type="submit" class="mt-4 w-full" :disabled="isLoading">
                <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
                Continue
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
