<script setup lang="ts">
import { useStarStore } from '@/stores/starStore'
import NumberFlow from '@number-flow/vue'
import { Award, Star } from 'lucide-vue-next'
import BadgeConstruction from '~/components/badges/BadgeConstruction.vue'
import BadgeInfo from '~/components/info/BadgeInfo.vue'
import { badges } from '~/components/tasks/data/badgeData.js'

const starStore = useStarStore()
const starValue = computed(() => starStore.stars)
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <div class="flex items-center justify-between gap-2">
        <h2 class="text-2xl font-bold tracking-tight">
          Badges
        </h2>
        <BadgeInfo />
      </div>
      <div>
        <div class="flex flex-row items-center gap-2">
          <h3 class="flex flex-row items-center gap-2 text-muted-foreground">
            <strong>Stars: </strong>
            <NumberFlow
              :value="starValue"
            />
          </h3>
          <Star
            class="size-4"
            :class="starValue !== 0 ? 'text-blue-500' : 'text-muted-foreground'"
          />
        </div>
      </div>
    </div>
    <!-- Main body under header -->
    <main class="flex flex-1 flex-col gap-4 md:gap-8">
      <BadgeConstruction />

      <!-- Badges Grid -->
      <!-- <Card class="xl:col-span-2">
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle class="text-2xl font-bold">
            Achievement Badges
          </CardTitle>
          <Award class="h-4 w-4 text-muted-foreground" />
        </CardHeader>

        <CardContent class="space-y-8">
          <div v-for="category in badges" :key="category.category" class="badge-category">
            <div class="category-header mb-4">
              <h3 class="flex items-center gap-2 text-xl text-primary font-semibold">
                <Award class="h-5 w-5" />
                {{ category.category }}
              </h3>
              <hr class="mt-2 border-t border-muted">
            </div>

            <div class="badges-grid">
              <div v-for="badge in category.badges" :key="badge.tier" class="badge-item">
                <div class="badge-content">
                  <img
                    :src="badge.icon"
                    :alt="badge.tier"
                    class="badge-image"
                    loading="lazy"
                  >
                  <div class="badge-info">
                    <h4 class="badge-tier">
                      {{ badge.tier }}
                    </h4>
                    <p class="badge-requirement">
                      {{ badge.requirement }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </card>
    -->
    </main>
  </div>
</template>

<style scoped>
.badge-category {
  @apply pb-6 last:pb-0;
}

.category-header {
  @apply mb-4;
}

.badges-grid {
  @apply grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4;
}

.badge-item {
  @apply transition-all hover:scale-105;
}

.badge-content {
  @apply flex flex-col items-center p-4 rounded-lg bg-card border border-muted hover:border-primary;
}

.badge-image {
  @apply w-30 h-30 min-w-30 object-contain mb-3;
}

.badge-info {
  @apply text-center;
}

.badge-tier {
  @apply font-semibold text-sm md:text-base;
}

.badge-requirement {
  @apply text-xs md:text-sm text-muted-foreground mt-1;
}

hr {
  @apply border-t border-muted my-4;
}
</style>
