<script setup lang="ts">
import { GraduationCap } from 'lucide-vue-next'

definePageMeta({
  layout: 'blank',
})
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-6 bg-muted p-6 min-h-svh md:p-10">
    <div class="max-w-sm w-full flex flex-col gap-6">
      <NuxtLink to="https://www.kuleuven.be/english/kuleuven/" class="flex items-center self-center gap-2 font-medium">
        <div class="size-8 flex items-center justify-center rounded-md bg-primary text-primary-foreground">
          <GraduationCap name="i-lucide-gallery-vertical-end" class-name="size-6" />
        </div>
        KU Leuven
      </NuxtLink>
      <Card>
        <CardHeader class="text-center">
          <CardTitle class="text-xl">
            Forgot Password
          </CardTitle>
          <CardDescription>
            Enter your email below to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid mx-auto max-w-sm gap-6">
            <AuthForgotPassword />
            <p class="text-center text-sm text-muted-foreground">
              Already have an account?
              <NuxtLink
                to="/login"
                class="underline underline-offset-4 hover:text-primary"
              >
                Login
              </NuxtLink>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<style scoped>

</style>
