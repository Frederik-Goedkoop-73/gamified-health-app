<script setup lang="ts">
import type { IconName } from './HealthCarouselTabs.vue'
import { HeartPulse } from 'lucide-vue-next'
import HealthCarouselTabs from './HealthCarouselTabs.vue'
import HealthChartCard from './HealthChartCard.vue'

defineProps<{
  charts: {
    title: string
    icon: IconName
    chartComponent: any
    chartProps: Record<string, any>
    footerText?: string
  }[]
}>()

const currentSlide = ref(0)
const carouselRef = ref<any>(null)

function goToSlide(index: number) {
  currentSlide.value = index
  carouselRef.value?.scrollTo?.(index) // If carouselRef is ready, scroll
}

function onSlideChanged(newIndex: number) {
  currentSlide.value = newIndex
}
</script>

<template>
  <Card>
    <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
      <CardTitle>
        This week
      </CardTitle>
      <HeartPulse class="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent class="flex flex-col items-center justify-center p-6">
      <HealthCarouselTabs
        :icons="charts.map(chart => chart.icon)"
        :current="currentSlide"
        @update:current=" (i: number) => goToSlide(i)"
      />

      <Carousel
        ref="carouselRef"
        class="relative w-95%"
        @slide-changed="onSlideChanged"
      >
        <CarouselContent>
          <CarouselItem v-for="(chart, index) in charts" :key="index">
            <div class="p-1">
              <HealthChartCard
                :title="chart.title" :chart-component="chart.chartComponent"
                :chart-props="chart.chartProps" :footer-text="chart.footerText"
              />
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </CardContent>
  </Card>
</template>
