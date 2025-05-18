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
  Coins,
  Info,
  User,
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
        <DialogTitle>About Your Profile</DialogTitle>
        <DialogDescription>
          This page shows your current progression and cosmetic profile:
        </DialogDescription>
      </DialogHeader>

      <ul class="mt-4 text-sm text-muted-foreground space-y-3">
        <li class="flex items-center gap-2">
          <User class="size-4 min-w-4 text-primary" /> Your account name and avatar
        </li>
        <li class="flex items-center gap-2">
          <Zap class="size-4 min-w-4 text-rose-500" /> Your current login streak
        </li>
        <li class="flex items-center gap-2">
          <Coins class="size-4 min-w-4 text-yellow-500" /> Total coin balance earned from quests
        </li>
        <li class="flex items-center gap-2">
          <span class="inline-block size-4 min-w-4 rounded-sm bg-primary" /> XP progress toward the next level
        </li>
        <li class="flex items-center gap-2">
          <span class="inline-block size-4 min-w-4 border border-primary rounded-sm" /> Equipped avatar, banner, and theme
        </li>
      </ul>

      <div class="mt-6 text-sm text-muted-foreground space-y-2">
        <p>Your level increases as you complete quests and earn XP.</p>
        <p>You can spend coins in the shop to unlock cosmetic items like avatars, banners, and themes.</p>
        <p>All of your profile data is auto-saved across sessions.</p>
      </div>
    </DialogContent>
  </Dialog>
</template>
