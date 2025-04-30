<script setup lang="ts">
import { Progress } from '@/components/ui/progress'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Flame, Footprints, HeartPulse, MoonStar, Zap } from 'lucide-vue-next'

defineProps<{
  title: string
  progressText: string
  reward: string
  completed: boolean
  percentage: number
  tooltip: string
  difficulty: 'normal' | 'hard' | 'legendary'
  icon: 'Footprints' | 'MoonStar' | 'HeartPulse' | 'Flame' | 'Zap'
}>()

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
          :class="completed ? 'bg-secondary text-muted-foreground' : 'bg-background'"
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
            <p class="text-sm text-primary font-semibold">
              {{ reward }}
            </p>
          </CardContent>

          <!-- Completion check -->
          <div
            v-if="completed"
            class="absolute bottom-2 right-2 text-lg text-green-500"
          >
            ✅
          </div>
        </Card>
      </TooltipTrigger>
      <TooltipContent class="text-sm text-muted-foreground">
        {{ tooltip }}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
