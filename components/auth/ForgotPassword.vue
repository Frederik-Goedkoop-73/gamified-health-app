<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next'
import { useToast } from '~/components/ui/toast/use-toast'
import { useAuth } from '~/composables/UseAuth'

const { toast } = useToast()
const { isLoading, sendPasswordResetEmail, email, errMsg } = useAuth()

const localEmail = ref('')
const isSuccess = ref(false)

async function onSubmit(event: Event) {
  event.preventDefault()
  errMsg.value = ''

  // Basic email validation
  if (!localEmail.value || !localEmail.value.includes('@')) {
    errMsg.value = 'Please enter a valid email address'
    return
  }

  isLoading.value = true

  try {
    // Update the auth compasable's email ref
    email.value = localEmail.value

    await sendPasswordResetEmail(localEmail.value)
    isSuccess.value = true
    toast({
      title: 'Success',
      description: 'Password reset email sent successfully.',
      variant: 'default',
    })
  }
  catch {
    errMsg.value = 'Failed to send password reset email. Please try again.'
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
</script>

<template>
  <form class="space-y-4" @submit="onSubmit">
    <div v-if="!isSuccess">
      <div class="grid gap-2">
        <Label for="email">Email</Label>
        <Input
          id="email"
          v-model="localEmail"
          placeholder="name@example.com"
          type="email"
          auto-capitalize="none"
          auto-complete="email"
          auto-correct="off"
          :disabled="isLoading"
          required
        />
      </div>

      <div v-if="errMsg" class="mt-2 text-sm text-destructive">
        {{ errMsg }}
      </div>

      <Button type="submit" class="mt-4 w-full" :disabled="isLoading">
        <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
        Send Reset Link
      </Button>
    </div>

    <div v-else class="text-center space-y-4">
      <div class="text-green-500">
        Password reset email sent successfully!
      </div>
      <p class="text-sm text-muted-foreground">
        Check your inbox at <span class="font-medium">{{ localEmail }}</span>
        for instructions to reset your password.
      </p>
      <Button
        variant="outline"
        class="mt-4 w-full"
        @click="isSuccess = false; localEmail = ''"
      >
        Send Another Email
      </Button>
    </div>
  </form>
</template>

<style scoped>

</style>
