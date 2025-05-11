<script setup lang="ts">
import type { User } from 'firebase/auth' // Import User type from Firebase
import { Loader2 } from 'lucide-vue-next'
import PasswordInput from '~/components/PasswordInput.vue'
import { useToast } from '~/components/ui/toast/use-toast'

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const showUsernameDialog = ref(false)
const tempUser = ref<User | null>(null) // Now properly typed
const tempUsername = ref('')
const { toast } = useToast()

// Initialise useAuth
const {
  login,
  signInWithGoogle,
  errMsg,
  isLoggedIn,
  setupUsername,
  handleSignOut,
} = useAuth()

// Handle google login
async function handleGoogleLogin() {
  isLoading.value = true
  try {
    const userCredential = await signInWithGoogle()
    // No need for null check - TypeScript now knows this is UserCredential
    // Check if user exists by trying to setup username with null
    const usernameSetupResult = await setupUsername(userCredential.user, null)

    if (!usernameSetupResult) {
      showUsernameDialog.value = true
      tempUser.value = userCredential.user
    }
    else {
      navigateTo('/')
    }
  }
  catch {
    errMsg.value = 'Google login failed'
    toast({
      title: 'Error',
      description: 'Google login failed',
      variant: 'destructive',
    })
  }
  finally {
    isLoading.value = false
  }
}

// Handle new registration
async function handleUsernameSubmit() {
  if (!tempUser.value)
    return

  isLoading.value = true
  try {
    const success = await setupUsername(tempUser.value, tempUsername.value)
    if (success) {
      showUsernameDialog.value = false
      toast({
        title: 'Success',
        description: `You have been logged in as ${tempUsername.value}`,
        variant: 'default',
      })
      navigateTo('/')
    }
  }
  catch {
    errMsg.value = 'Failed to save username'
    toast({
      title: 'Error',
      description: 'Failed to save username',
      variant: 'destructive',
    })
  }
  finally {
    isLoading.value = false
  }
}

// Handle email/password login
async function onSubmit(event: Event) {
  event.preventDefault()
  if (!email.value || !password.value) {
    toast({
      title: 'Error',
      description: 'Email and password are required',
      variant: 'destructive',
    })
    return
  }

  isLoading.value = true
  try {
    await login()
    if (isLoggedIn.value) {
      toast({
        title: 'Success',
        description: 'You have been logged in successfully',
        variant: 'default',
      })
      navigateTo('/')
    }
  }
  catch {
    toast({
      title: 'Error',
      description: 'Login failed',
      variant: 'destructive',
    })
  }
  finally {
    isLoading.value = false
  }
}

// Handle logout
async function handleLogout() {
  isLoading.value = true
  try {
    await handleSignOut()
    toast({
      title: 'Success',
      description: 'You have been logged out successfully',
      variant: 'default',
    })
  }
  catch (error) {
    toast({
      title: 'Error',
      description: 'Logout failed',
      variant: 'destructive',
    })
    console.error('Logout failed:', error)
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <form class="grid gap-6" @submit="onSubmit">
    <!-- Error message display -->
    <div v-if="errMsg" class="text-sm text-destructive">
      {{ errMsg }}
    </div>

    <div class="flex flex-col gap-4">
      <Button
        variant="outline"
        class="w-full gap-2"
        type="button"
        :disabled="isLoading"
        @click="handleGoogleLogin"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-4">
          <path
            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
            fill="currentColor"
          />
        </svg>
        Login with Google
      </Button>
    </div>

    <Separator label="Or continue with" />

    <div class="grid gap-2">
      <Label for="email">
        Email
      </Label>
      <Input
        id="email"
        v-model="email"
        type="email"
        placeholder="name@example.com"
        :disabled="isLoading"
        auto-capitalize="none"
        auto-complete="email"
        auto-correct="off"
        required
      />
    </div>

    <div class="grid gap-2">
      <div class="flex items-center">
        <Label for="password">
          Password
        </Label>
        <NuxtLink
          to="/forgot-password"
          class="ml-auto inline-block text-sm underline"
        >
          Forgot your password?
        </NuxtLink>
      </div>
      <PasswordInput
        id="password"
        v-model="password"
        :disabled="isLoading"
        required
      />
    </div>

    <Button type="submit" class="w-full" :disabled="isLoading">
      <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
      Login
    </Button>

    <!-- Username Dialog -->
    <Dialog v-model:open="showUsernameDialog">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Choose a Username</DialogTitle>
          <DialogDescription>
            Please enter a username to complete your registration
          </DialogDescription>
        </DialogHeader>
        <div class="grid gap-4 py-4">
          <div class="grid gap-2">
            <Label for="username">Username</Label>
            <Input
              id="username"
              v-model="tempUsername"
              placeholder="Enter your username"
              :disabled="isLoading"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            :disabled="isLoading"
            @click="handleUsernameSubmit"
          >
            <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </form>

  <div class="mt-4 text-center text-sm text-muted-foreground">
    Don't have an account?
    <NuxtLink to="/register" class="underline">
      Sign up
    </NuxtLink>
  </div>

  <!-- Temporary logout btn -->
  <Button
    v-if="isLoggedIn"
    variant="destructive"
    size="sm"
    :disabled="isLoading"
    class="w-full"
    @click="handleLogout"
  >
    <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
    Logout
  </Button>
</template>

<style scoped>

</style>
