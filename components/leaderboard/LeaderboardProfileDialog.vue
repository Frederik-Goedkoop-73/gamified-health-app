<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Coins, Star, Zap } from 'lucide-vue-next'

const props = defineProps<{
  open: boolean
  player: {
    username: string
    avatar: string
    xp: number
    stars: number
    streak: number
    level: number
    coins: number
  }
}>()

const emit = defineEmits(['update:open'])

// Local copy of open
const localOpen = ref(props.open)

// Sync prop -> local
watch(() => props.open, (val) => {
  localOpen.value = val
})

// Emit local -> parent
watch(localOpen, (val) => {
  emit('update:open', val)
})
</script>

<template>
  <Dialog v-model:open="localOpen">
    <DialogContent class="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle class="text-xl">
          {{ props.player.username }}
        </DialogTitle>
        <DialogDescription />
      </DialogHeader>

      <div class="flex flex-col items-center gap-4">
        <img
          :src="props.player.avatar"
          alt="Avatar"
          class="size-20 object-contain"
        >

        <div class="flex flex-col items-center gap-2 text-sm text-muted-foreground">
          <!-- Level + XP -->
          <div class="flex items-center gap-4">
            <span class="text-primary font-semibold">Lvl {{ props.player.level }}</span>
            <span>{{ props.player.xp.toLocaleString() }} XP</span>
          </div>

          <!-- Coins + Stars + Streak in one row -->
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-1">
              <Coins class="size-4 text-yellow-500" />
              <span>{{ props.player.coins }} coins</span>
            </div>
            <div class="flex items-center gap-1">
              <Star class="size-4 text-blue-500" />
              <span>{{ props.player.stars }} stars</span>
            </div>
            <div class="flex items-center gap-1">
              <Zap class="size-4 text-rose-500" />
              <span>{{ props.player.streak }} days</span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
