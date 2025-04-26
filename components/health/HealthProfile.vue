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
      <CardTitle class="text-lg font-semibold">
        Fitbit Profile
      </CardTitle>
    </CardHeader>

    <CardContent class="flex flex-col gap-4">
      <!-- Profile Info -->
      <div class="flex flex-row items-center gap-4">
        <img
          :src="profile.user.avatar || 'https://via.placeholder.com/150'"
          :alt="`Avatar of ${profile.user.displayName}`"
          class="h-12 w-12 rounded-full object-cover"
        >
        <div>
          <p class="text-lg font-semibold">
            {{ profile.user.displayName }}
          </p>
          <p class="text-sm text-muted-foreground">
            {{ profile.user.email || 'N/A' }}
          </p>
        </div>
      </div>

      <div class="text-sm text-muted-foreground">
        <p><strong>Full Name:</strong> {{ profile.user.fullName || 'N/A' }}</p>
        <p><strong>Member Since:</strong> {{ profile.user.memberSince || 'N/A' }}</p>
        <p><strong>Height:</strong> {{ profile.user.height || 'N/A' }} cm</p>
        <p><strong>Weight:</strong> {{ profile.user.weight || 'N/A' }} kg</p>
        <p><strong>Age:</strong> {{ profile.user.age || 'N/A' }} years</p>
        <p><strong>EncodedId:</strong> {{ profile.user.encodedId || 'N/A' }}</p>
      </div>

      <!-- Steps Section -->
      <div>
        <h3 class="text-md mb-2 font-semibold">
          Steps (Last 7 Days)
        </h3>
        <ul class="list-disc list-inside text-sm space-y-1">
          <li v-for="day in steps" :key="day.dateTime">
            {{ day.dateTime }}: {{ day.value }} steps
          </li>
        </ul>
      </div>

      <!-- Sleep Section -->
      <div>
        <h3 class="text-md mb-2 font-semibold">
          Sleep (Today)
        </h3>
        <ul class="list-disc list-inside text-sm space-y-1">
          <li v-for="night in sleep" :key="night.dateOfSleep">
            {{ night.dateOfSleep }}: {{ (night.duration / 3600000).toFixed(1) || 'N/A' }} hours
          </li>
        </ul>
      </div>

      <!-- Heart Rate Section -->
      <div>
        <h3 class="text-md mb-2 font-semibold">
          Heart Rate (Last 7 Days)
        </h3>
        <ul class="list-disc list-inside text-sm space-y-1">
          <li v-for="day in heart" :key="day.dateTime">
            {{ day.dateTime }}: {{ day.value.restingHeartRate || 'N/A' }} bpm
          </li>
        </ul>
      </div>
    </CardContent>
  </Card>
</template>
