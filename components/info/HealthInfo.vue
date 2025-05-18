<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Flame, Footprints, HeartPulse, Info, MoonStar, Ruler, Zap } from 'lucide-vue-next'
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <Button variant="ghost" size="icon" class="text-muted-foreground hover:text-primary">
        <Info class="size-5" />
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>About Health Stats</DialogTitle>
        <DialogDescription>
          This page gives you an overview of your weekly Fitbit data using clear charts and icons:
        </DialogDescription>
      </DialogHeader>

      <ul class="mt-4 text-sm text-muted-foreground space-y-3">
        <li class="flex items-center gap-2">
          <Footprints class="size-4 min-w-4 text-primary" /> Steps taken each day
        </li>
        <li class="flex items-center gap-2">
          <Ruler class="size-4 min-w-4 text-primary" /> Distance walked or run in kilometers
        </li>
        <li class="flex items-center gap-2">
          <MoonStar class="size-4 min-w-4 text-primary" /> Sleep duration per night (in hours and minutes)
        </li>
        <li class="flex items-center gap-2">
          <Zap class="size-4 min-w-4 text-primary" /> Active Zone Minutes (AZM) – time spent in fat burn, cardio, or peak zones
        </li>
        <li class="flex items-center gap-2">
          <Flame class="size-4 min-w-4 text-primary" /> Calories burned
        </li>
        <li class="flex items-center gap-2">
          <HeartPulse class="size-4 min-w-4 text-primary" /> Resting Heart Rate (daily average)
        </li>
      </ul>

      <div class="mt-6 text-sm text-muted-foreground space-y-2">
        <p><strong class="text-primary">Tip:</strong> Sync your Fitbit app before clicking “Sync Latest Data” to ensure your latest health data appears.</p>
        <p>You must be connected to <strong class="text-primary">both Google and Fitbit</strong> to view and store data locally.</p>
      </div>
    </DialogContent>
  </Dialog>
</template>
