<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Flame,
  Footprints,
  Info,
  MoonStar,
  Ruler,
  Trophy,
  Zap,
} from 'lucide-vue-next'
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
        <DialogTitle>About Quests</DialogTitle>
        <DialogDescription>
          Complete quests using your Fitbit data to earn XP and coins. Here's how it works:
        </DialogDescription>
      </DialogHeader>

      <ul class="mt-4 text-sm text-muted-foreground space-y-3">
        <li class="flex items-center gap-2">
          <Footprints class="size-4 min-w-4 text-primary" /> Steps – Earn rewards for your daily walking
        </li>
        <li class="flex items-center gap-2">
          <Ruler class="size-4 min-w-4 text-primary" /> Distance – Complete km-based challenges through running/walking
        </li>
        <li class="flex items-center gap-2 pb-2">
          <div class="size-4" /><p><strong class="text-primary">Note:</strong> Activities like cycling do not count as distance for these quests</p>
        </li>
        <li class="flex items-center gap-2">
          <MoonStar class="size-4 min-w-4 text-primary" /> Sleep – Get points for healthy sleep routines
        </li>
        <li class="flex items-center gap-2">
          <Zap class="size-4 min-w-4 text-primary" /> AZM – Active Zone Minutes gained during workouts
        </li>
        <li class="flex items-center gap-2">
          <Flame class="size-4 min-w-4 text-primary" /> Calories – Burn energy and complete calorie-based goals
        </li>
        <li class="flex items-center gap-2">
          <Trophy class="size-4 min-w-4 text-primary" /> XP & Coins – Complete quests to earn XP and unlock cosmetics
        </li>
      </ul>

      <div class="mt-6 text-sm text-muted-foreground space-y-2">
        <p>
          Daily quests reset at <strong class="text-primary">midnight</strong> and weekly quests reset every
          <strong class="text-primary">Monday</strong> at 00:00 (Sunday midnight).
        </p>
        <p>
          You must sync your Fitbit data before midnight to get credit. <strong class="text-primary">Don't forget claim your quest</strong>, because there quests are not auto-claimed for you!
        </p>
        <p>Tap “Sync Latest Data” after syncing in the Fitbit app.</p>
        <p>
          Make sure you're connected to <strong class="text-primary">both Google and Fitbit</strong> to use the quest system fully.
        </p>
      </div>
    </DialogContent>
  </Dialog>
</template>
