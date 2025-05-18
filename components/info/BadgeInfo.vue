<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Award, Info, Star } from 'lucide-vue-next'
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
        <DialogTitle>About Badges</DialogTitle>
        <DialogDescription>
          This page will showcase your long-term achievements based on your activity and progression:
        </DialogDescription>
      </DialogHeader>

      <ul class="mt-4 text-sm text-muted-foreground space-y-3">
        <li class="flex items-center gap-2">
          <Award class="size-4 min-w-4 text-primary" />
          Marathon Stepper 🚶‍➡️ — Lifetime step milestones
        </li>
        <li class="flex items-center gap-2">
          <Award class="size-4 min-w-4 text-primary" />
          Calorie Inferno 🔥 — Total calories burned
        </li>
        <li class="flex items-center gap-2">
          <Award class="size-4 min-w-4 text-primary" />
          Sleeping Beauty 💤 — Total hours slept
        </li>
        <li class="flex items-center gap-2">
          <Award class="size-4 min-w-4 text-primary" />
          Distance Runner 🏃‍♂️ — Kilometers walked or run
        </li>
        <li class="flex items-center gap-2">
          <Award class="size-4 min-w-4 text-primary" />
          Go-Getter 🚀 — Active Zone Minutes (AZM) reached
        </li>
        <li class="flex items-center gap-2">
          <Award class="size-4 min-w-4 text-primary" />
          Golddigger 💰 — Coins spent in the shop
        </li>
        <li class="flex items-center gap-2">
          <Award class="size-4 min-w-4 text-primary" />
          Experienced One 🌟 — Total XP earned
        </li>
        <li class="flex items-center gap-2">
          <Award class="size-4 min-w-4 text-primary" />
          Consistent Streaker 📅 — Max login streak achieved
        </li>
        <li class="flex items-center gap-2">
          <Award class="size-4 min-w-4 text-blue-500" />
          Completionist 🏆 — Collect all other badges
        </li>
      </ul>

      <div class="mt-6 text-sm text-muted-foreground space-y-2">
        <p><strong class="text-primary">Tip:</strong> Sync your Fitbit regularly to keep your badge progress up to date.</p>
        <p>Badges unlock <strong class="text-blue-500">stars</strong>, which are used to unlock exclusive avatars and banners in the shop.</p>
      </div>

      <ul class="mt-4 text-sm text-muted-foreground space-y-3">
        <li class="flex items-center gap-2">
          <span class="inline-block size-4 min-w-4 rounded-sm bg-[url('/public/banners/bronze.jpg')]" /> XP progress toward the next level
        </li>
        <li class="flex items-center gap-2">
          <span class="inline-block size-4 min-w-4 rounded-sm bg-[url('/public/banners/silver.jpg')]" /> XP progress toward the next level
        </li>
        <li class="flex items-center gap-2">
          <span class="inline-block size-4 min-w-4 rounded-sm bg-[url('/public/banners/gold.jpg')]" /> XP progress toward the next level
        </li>
      </ul>

      <ul class="mt-4 text-xs text-muted-foreground space-y-3">
        <li class="flex items-center gap-2">
          <Star class="size-4 min-w-4 text-blue-500 self-start" />
          Each badge tier unlocks a growing number of stars, from 1 to 9 total across Bronze, Silver, and Gold. Aim high to complete them all!
        </li>
      </ul>
    </DialogContent>
  </Dialog>
</template>
