<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Info, ListOrdered, User, Zap } from 'lucide-vue-next'
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
        <DialogTitle>About the Leaderboard</DialogTitle>
        <DialogDescription>
          Compete with others by earning XP through quests and activity!
        </DialogDescription>
      </DialogHeader>

      <ul class="mt-4 text-sm text-muted-foreground space-y-3">
        <li class="flex items-center gap-2">
          <User class="size-4 min-w-4 text-primary" /> Each card represents a user with their avatar, XP, and username
        </li>
        <li class="flex items-center gap-2">
          <Zap class="size-4 min-w-4 text-primary" /> A lightning badge shows their current streak (days in a row active)
        </li>
        <li class="flex items-center gap-2">
          <ListOrdered class="size-4 min-w-4 text-primary" /> The number on the left shows their rank
        </li>
      </ul>

      <div class="mt-6 text-sm text-muted-foreground space-y-2">
        <p>Only users with XP are shown in the leaderboard.</p>
        <p><strong class="text-primary">You’ll see your own ranking</strong> displayed at the top if you are listed.</p>
        <p>You can <strong class="text-primary">click a player’s card</strong> to view more details about them.</p>
      </div>
    </DialogContent>
  </Dialog>
</template>
