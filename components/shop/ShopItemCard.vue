<script setup lang="ts">
import { useStarStore } from '@/stores/starStore'
import { useXPStore } from '@/stores/xpStore'
import { Coins } from 'lucide-vue-next'
import { getBannerInlineStyle } from '~/composables/useBannerStyle'
import { isBannerId } from '../tasks/data/bannerData'

const props = defineProps<{
  name: string
  image?: string
  type: 'avatar' | 'banner' | 'theme'
  price: number
  rarity?: 'common' | 'rare' | 'epic' | 'legendary'
  color?: string
  levelrequired?: number
  starsrequired?: number
  onBuy: () => void
  bought?: boolean
}>()

const bannerId = computed(() =>
  typeof props.color === 'string' && isBannerId(props.color) ? props.color : undefined,
)

const bannerStyle = computed(() => bannerId.value ? getBannerInlineStyle(bannerId.value) : undefined)

const xpStore = useXPStore()
const starStore = useStarStore()

const lockedByLevel = computed(() => {
  return typeof props.levelrequired === 'number' && xpStore.level < props.levelrequired
})

const lockedByStars = computed(() => {
  return typeof props.starsrequired === 'number' && starStore.stars < props.starsrequired
})
</script>

<template>
  <Card
    class="relative transition"
    :class="[
      bought || lockedByLevel || lockedByStars
        ? 'bg-muted text-muted-foreground opacity-70 cursor-not-allowed'
        : 'hover:shadow-md sm:hover:scale-102 cursor-pointer',

      // Border colors for rarities
      !(lockedByLevel || lockedByStars) && rarity === 'rare' ? 'border-blue-500' : '',
      !(lockedByLevel || lockedByStars) && rarity === 'epic' ? 'border-purple-500 ring-1 ring-purple-400' : '',
      !(lockedByLevel || lockedByStars) && rarity === 'legendary' ? 'border-yellow-400 ring-2 ring-yellow-300 shadow-[0_0_12px_rgba(234,179,8,0.6)]' : '',
      type === 'banner' ? 'max-[400px]:max-w-75 sm:min-w-80 sm:max-w-100%' : 'min-w-60',
    ]"
    @click="!bought && !(lockedByLevel || lockedByStars) && onBuy()"
  >
    <CardHeader class="flex flex-col items-center justify-center pb-2">
      <CardTitle v-if="lockedByLevel || lockedByStars">
        ? ? ?
      </CardTitle>
      <CardTitle v-else>
        {{ name }}
      </CardTitle>
      <!-- Rarity Badge Top-Right -->
      <div
        v-if="rarity && rarity !== 'common' && !(lockedByLevel || lockedByStars)"
        class="absolute right--2 top--2 rounded px-2 py-0.5 text-xs font-semibold uppercase"
        :class="{
          'bg-blue-500 text-white': rarity === 'rare',
          'bg-purple-500 text-white': rarity === 'epic',
          'bg-yellow-400 text-black': rarity === 'legendary',
          /* 'bg-gradient-to-r from-pink-500 via-yellow-500 to-purple-500 text-white': rarity === 'mythic' */
        }"
      >
        <!-- :style="rarity === 'mythic' ? {
          background: 'linear-gradient(-45deg, dc2627, #f97317, #facb14, #15a34a, #2563eb)',
          color: 'white',
        } : undefined" -->
        {{ rarity }}
      </div>
    </CardHeader>
    <hr class="my-1 w-full">
    <CardContent class="m-auto flex flex-col items-center justify-between gap-2 pt-2">
      <!-- Banner Preview Skeleton -->
      <div
        v-if="type === 'banner'"
        class="h-40 w-full flex items-center gap-4 border-4 rounded-lg bg-secondary px-4 py-2" :class="[
          (lockedByLevel || lockedByStars) ? 'border-2 border-dashed border-black/70 dark:border-white/70' : 'border-4 bg-secondary',
        ]"
        :style="lockedByLevel || lockedByStars ? {} : bannerStyle"
      >
        <div class="size-12 rounded-full bg-primary/30 sm:size-16" />
        <div class="flex-1 space-y-2">
          <div class="h-4 w-3/4 rounded bg-primary/50" />
          <div class="h-4 w-2/3 rounded bg-primary/40" />
        </div>
      </div>

      <!-- Themes -->
      <div
        v-else-if="type === 'theme'"
        class="h-16 w-16 border rounded-full"
        :style="lockedByLevel
          ? { border: '2px dashed grey', backgroundColor: 'transparent' }
          : { backgroundColor: color }"
      />

      <!-- Avatars -->
      <div v-else>
        <div class="flex items-center justify-center">
          <!-- Glow dot behind image -->
          <div
            class="absolute h-10 w-20 rounded-full blur-xl"
            :class="{
              'bg-blue-500 opacity-10': rarity === 'rare' && !(lockedByLevel || lockedByStars),
              'bg-purple-500 opacity-20': rarity === 'epic' && !(lockedByLevel || lockedByStars),
              'bg-yellow-300 opacity-30 animate-pulse': rarity === 'legendary' && !(lockedByLevel || lockedByStars),
            }"
          />

          <!-- Actual image -->
          <img
            :src="(lockedByLevel || lockedByStars) ? '/Placeholder.png' : image"
            :alt="name"
            class="z-10 h-16 w-auto object-contain"
          >
        </div>
      </div>
      <div class="flex flex-row items-center justify-between gap-2">
        <template v-if="lockedByLevel">
          <p class="text-sm text-muted-foreground font-semibold">
            {{ `Unlock at lvl. ${props.levelrequired}` }}
          </p>
        </template>
        <template v-else-if="lockedByStars">
          <p class="text-sm text-muted-foreground font-semibold">
            {{ `Unlock at ${props.starsrequired} stars` }}
          </p>
        </template>
        <template v-else>
          <p class="text-muted-foreground">
            {{ price.toLocaleString('en-US') }}
          </p>
          <Coins class="h-4 w-4 text-yellow-500" />
        </template>
      </div>

      <Badge v-if="bought" variant="outline" class="text-muted-foreground font-semibold">
        Owned
      </Badge>
    </CardContent>
  </Card>
</template>
