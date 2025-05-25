<script setup lang="ts">
import { useClaimBadge } from '@/composables/useClaimBadge'

const props = defineProps<{
  badge: {
    id: string
    type: string
    tier: string
    requirement: string
    target?: number
    icon: string
    stars: number
    coins: number
    claimed: boolean
    completed: boolean
    xp?: number
  }
}>()

const { claimBadge } = useClaimBadge()

function handleClick() {
  if (props.badge.completed && !props.badge.claimed) {
    claimBadge(props.badge.id)
  }
}
</script>

<template>
  <Card
    class="w-full border rounded-xl p-3 shadow transition sm:w-40 hover:scale-105" :class="[
      badge.completed && !badge.claimed ? 'bg-secondary text-muted-foreground cursor-pointer' : 'bg-background',
      badge.claimed ? 'bg-muted text-muted-foreground opacity-60 cursor-default hover:scale-100' : 'bg-background',
    ]"
    @click="handleClick()"
  >
    <div class="flex flex-col items-center gap-2 text-center">
      <img :src="badge.icon" alt="Badge" class="z-10 h-auto w-15 object-contain">
      <span class="text-sm font-semibold">{{ badge.tier }}</span>
      <span class="text-xs">{{ badge.requirement }}</span>

      <Badge
        v-if="!badge.claimed"
        class="mt-2 px-3 py-1 text-xs font-semibold"
      >
        Click to claim ✅
      </Badge>
    </div>
  </Card>
</template>
