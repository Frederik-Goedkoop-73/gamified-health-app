<script setup lang="ts">
// import NumberFlow from '@number-flow/vue'
import { HeartPulse } from 'lucide-vue-next'

const dataCard = ref({
  totalRevenue: 0,
  totalRevenueDesc: 0,
  subscriptions: 0,
  subscriptionsDesc: 0,
  sales: 0,
  salesDesc: 0,
  activeNow: 0,
  activeNowDesc: 0,
})

onMounted(() => {
  dataCard.value = {
    totalRevenue: 45231.89,
    totalRevenueDesc: 20.1 / 100,
    subscriptions: 2350,
    subscriptionsDesc: 180.5 / 100,
    sales: 12234,
    salesDesc: 45 / 100,
    activeNow: 573,
    activeNowDesc: 201,
  }
})
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <h2 class="text-2xl font-bold tracking-tight">
        Health Stats
      </h2>
      <div class="flex items-center space-x-2">
        <BaseDateRangePicker />
        <!-- <Button>Download</Button> -->
      </div>
    </div>
    <!-- Main body under header -->
    <main class="flex flex-1 flex-col gap-4 md:gap-8">
      <!-- Test carousel of charts -->
      <Card class="xl:col-span-2">
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle>Overview</CardTitle>
          <HeartPulse class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent class="flex flex-col items-center justify-between pt-2">
          <Carousel v-slot="{ canScrollNext }" class="relative w-95%">
            <CarouselContent>
              <CarouselItem v-for="(_, index) in 2" :key="index">
                <div class="p-1">
                  <Card>
                    <CardContent class="flex flex-col items-center justify-center p-6">
                      <span class="text-4xl font-semibold">{{ index + 1 }}</span><br>
                      <span class="text-center text-2xl font-semibold">Add different health charts here</span>
                      <DashboardBarChart />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div class="p-1">
                  <Card>
                    <CardContent class="flex flex-col items-center justify-center p-6">
                      <span class="text-4xl font-semibold">3</span><br>
                      <span class="text-center text-2xl font-semibold">Add different health charts here</span>
                      <DashboardLineChart />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext v-if="canScrollNext" />
          </Carousel>
        </CardContent>
      </Card>
      <!-- Test bar chart -->
      <Card class="xl:col-span-2">
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle>Overview</CardTitle>
          <HeartPulse class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent class="pl-2">
          <DashboardBarChart /> <!-- https://ui.shadcn.com/docs/components/chart -->
        </CardContent>
      </Card>
      <!-- Test line chart -->
      <Card class="xl:col-span-2">
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle>Overview</CardTitle>
          <HeartPulse class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent class="pl-2">
          <DashboardLineChart />
        </CardContent>
      </Card>
    </main>
  </div>
</template>
