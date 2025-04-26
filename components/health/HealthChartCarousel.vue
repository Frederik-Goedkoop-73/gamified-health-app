<script setup lang="ts">
import HealthChartCard from './HealthChartCard.vue'

defineProps<{
  charts: {
    title: string
    chartComponent: any
    chartProps: Record<string, any>
    footerText?: string
  }[]
}>()
</script>

<template>
  <Card>
    <CardContent class="flex flex-col items-center justify-center p-6">
      <Carousel v-slot="{ canScrollNext }" class="relative w-95%">
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
        <CarouselPrevious />
        <CarouselNext v-if="canScrollNext" />
      </Carousel>
    </CardContent>
  </Card>
</template>
