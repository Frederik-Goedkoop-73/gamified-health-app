<script setup lang="ts">
import { useToast } from '@/components/ui/toast/use-toast'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-vue-next'
import PasswordInput from '~/components/PasswordInput.vue'

const { toast } = useToast()
const isLoading = ref(false)
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errMsg = ref('')

const { register, signInWithGoogle } = useAuth()

async function onSubmit(event: Event) {
  event.preventDefault()
  errMsg.value = ''

  if (password.value !== confirmPassword.value) {
    errMsg.value = 'Passwords do not match'
    return
  }

  isLoading.value = true
  try {
    await register()
    toast({
      title: 'Success',
      description: 'Account created successfully!',
    })
    navigateTo('/') // Redirect after signup
  }
  catch (error: any) {
    errMsg.value = error.message || 'Signup failed'
    toast({
      title: 'Error',
      description: errMsg.value,
      variant: 'destructive',
    })
  }
  finally {
    isLoading.value = false
  }
}

async function handleGoogleSignup() {
  isLoading.value = true
  try {
    await signInWithGoogle()
    toast({
      title: 'Success',
      description: 'Signed up with Google successfully!',
    })
    navigateTo('/')
  }
  catch (error: any) {
    toast({
      title: 'Error',
      description: error.message || 'Google signup failed',
      variant: 'destructive',
    })
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <form @submit="onSubmit">
      <div class="grid gap-4">
        <div v-if="errMsg" class="text-sm text-destructive">
          {{ errMsg }}
        </div>

        <div class="grid gap-2">
          <Label for="name">Username</Label>
          <Input
            id="name"
            v-model="name"
            placeholder="Enter your username"
            type="text"
            auto-capitalize="none"
            auto-complete="name"
            auto-correct="off"
            :disabled="isLoading"
            required
          />
        </div>

        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input
            id="email"
            v-model="email"
            placeholder="name@example.com"
            type="email"
            auto-capitalize="none"
            auto-complete="email"
            auto-correct="off"
            :disabled="isLoading"
            required
          />
        </div>

        <div class="grid gap-2">
          <Label for="password">Password</Label>
          <PasswordInput id="password" v-model="password" :disabled="isLoading" required />
        </div>

        <div class="grid gap-2">
          <Label for="confirm-password">Confirm Password</Label>
          <PasswordInput id="confirm-password" v-model="confirmPassword" :disabled="isLoading" required />
        </div>

        <Button type="submit" :disabled="isLoading">
          <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
          Create Account
        </Button>
      </div>
    </form>

    <Separator label="Or continue with" />

    <div class="flex items-center gap-4">
      <Button
        variant="outline"
        class="w-full gap-2"
        :disabled="isLoading"
        @click="handleGoogleSignup"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-4">
          <path
            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
            fill="currentColor"
          />
        </svg>
        Google
      </Button>
    </div>

    <div class="mt-4 text-center text-sm text-muted-foreground">
      Already have an account?
      <NuxtLink to="/login" class="underline">
        Sign in
      </NuxtLink>
    </div>
  </div>
</template>
