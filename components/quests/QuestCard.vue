<script setup lang="ts">
import { Progress } from '@/components/ui/progress'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Coins, Flame, Footprints, HeartPulse, MoonStar, Zap } from 'lucide-vue-next'
import { useClaimQuest } from '~/composables/useClaimQuest'

const props = defineProps<{
  id: string
  title: string
  progressText: string
  rewardxp: string
  rewardcoins: number
  completed: boolean
  claimed: boolean
  percentage: number
  tooltip: string
  difficulty: 'normal' | 'hard' | 'legendary'
  icon: 'Footprints' | 'MoonStar' | 'HeartPulse' | 'Flame' | 'Zap'
}>()

const { claimQuest } = useClaimQuest()

function handleClick() {
  if (props.completed && !props.claimed) {
    claimQuest(props.id)
  }
}

const icons = {
  Footprints,
  MoonStar,
  HeartPulse,
  Flame,
  Zap,
}
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <Card
          class="relative min-w-48 w-100 p-4 transition hover:scale-105"
          :class="[completed && !claimed ? 'bg-secondary text-muted-foreground' : 'bg-background',
                   claimed ? 'bg-muted text-muted-foreground opacity-60 cursor-default' : 'bg-background']"
          @click="handleClick"
        >
          <!-- Icon top-left -->
          <component
            :is="icons[icon]"
            class="absolute left-2 top-2 h-5 w-5 text-primary"
          />

          <!-- 'Hard' badge top-right -->
          <div
            v-if="difficulty !== 'normal'"
            class="absolute right--2 top--2 rounded px-2 py-0.5 text-xs font-semibold" :class="[
              difficulty === 'hard' ? 'bg-red-500 text-white' : '',
              difficulty === 'legendary' ? 'bg-yellow-400 text-black' : '',
            ]"
          >
            {{ difficulty.charAt(0).toUpperCase() + difficulty.slice(1) }}
          </div>

          <!-- Title -->
          <CardHeader class="flex flex-col items-center justify-center pb-1">
            <CardTitle class="text-md text-center font-bold">
              {{ title }}
            </CardTitle>
          </CardHeader>

          <!-- Separator -->
          <hr class="my-1 w-full border-muted">

          <!-- Progress and Reward -->
          <CardContent class="flex flex-col items-center justify-center gap-1 pt-1">
            <Progress :model-value="percentage" class="h-1 w-full" />
            <p class="text-xs text-muted-foreground">
              {{ progressText }}
            </p>
            <p class="text-sm font-semibold">
              {{ rewardxp }}
            </p>
            <p class="flex flex-row gap-2 text-sm font-semibold">
              +{{ rewardcoins }} <Coins class="size-4 text-yellow-500" />
            </p>
          </CardContent>

          <!-- Completion check -->
          <Badge
            v-if="completed && !claimed"
            class="absolute bottom-2 right-2 cursor-pointer text-sm"
          >
            Completed, click to claim reward ✅
          </Badge>

          <!-- Completion check -->
          <Badge
            v-if="claimed"
            variant="secondary"
            class="absolute bottom-2 right-2 text-sm font-semibold"
          >
            🎉 Claimed 🎉
          </Badge>
        </Card>
      </TooltipTrigger>
      <TooltipContent class="text-sm text-muted-foreground">
        {{ tooltip }}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
