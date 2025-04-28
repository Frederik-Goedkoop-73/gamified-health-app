<script setup lang="ts">
import type { FitbitHeart, FitbitProfile, FitbitSleep, FitbitSteps } from '~/types/fitbit'

defineProps<{
  profile: FitbitProfile
  steps: FitbitSteps['activities-steps']
  sleep: FitbitSleep['sleep']
  heart: FitbitHeart['activities-heart']
}>()
</script>

<template>
  <Card>
    <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
      <CardTitle class="text-xl font-bold">
        Fitbit Profile Overview
      </CardTitle>
    </CardHeader>

    <CardContent class="flex flex-col gap-6">
      <!-- Profile Info -->
      <div class="flex flex-row items-center gap-4 border-b pb-4">
        <div class="flex flex-col">
          <p class="text-lg font-semibold">
            {{ profile.user.displayName }}
          </p>
        </div>
      </div>

      <!-- User Details -->
      <div class="grid grid-cols-2 gap-4 text-sm">
        <p><span class="font-medium">Full Name:</span> {{ profile.user.fullName || 'N/A' }}</p>
        <p><span class="font-medium">Age:</span> {{ profile.user.age || 'N/A' }} years</p>
        <p><span class="font-medium">Height:</span> {{ profile.user.height || 'N/A' }} cm</p>
        <p><span class="font-medium">Weight:</span> {{ profile.user.weight || 'N/A' }} kg</p>
      </div>

      <!-- Steps Section -->
      <div>
        <h3 class="mb-2 text-lg font-semibold">
          Steps (Last 7 Days)
        </h3>
        <ul class="text-sm text-muted-foreground space-y-1">
          <li v-for="day in steps" :key="day.dateTime">
            <span class="font-medium">{{ day.dateTime }}:</span> {{ day.value }} steps
          </li>
        </ul>
      </div>

      <!-- Sleep Section -->
      <div>
        <h3 class="mb-2 text-lg font-semibold">
          Sleep (Today)
        </h3>
        <ul class="text-sm text-muted-foreground space-y-1">
          <li v-for="night in sleep" :key="night.dateOfSleep">
            <span class="font-medium">{{ night.dateOfSleep }}:</span>
            {{ (night.duration / 3600000).toFixed(1) || 'N/A' }} hours
          </li>
        </ul>
      </div>

      <!-- Heart Rate Section -->
      <div>
        <h3 class="mb-2 text-lg font-semibold">
          Heart Rate (Last 7 Days)
        </h3>
        <ul class="text-sm text-muted-foreground space-y-1">
          <li v-for="day in heart" :key="day.dateTime">
            <span class="font-medium">{{ day.dateTime }}:</span>
            {{ day.value.restingHeartRate || 'N/A' }} bpm
          </li>
        </ul>
      </div>
    </CardContent>
  </Card>
</template>
