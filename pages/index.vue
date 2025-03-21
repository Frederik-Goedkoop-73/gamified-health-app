<script setup lang="ts">
import { useCoinStore } from '@/stores/coinStore'
import { useStreakStore } from '@/stores/streakStore'
import { useXPStore } from '@/stores/xpStore'
import NumberFlow from '@number-flow/vue'
import { Activity, Coins, CreditCard, DollarSign, Flame, User, Users } from 'lucide-vue-next'

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

const dataRecentSales = [
  {
    name: 'Mike Hunt',
    email: 'mike.hunt@email.com',
    amount: 1999,
  },
  {
    name: 'Jackson Off',
    email: 'jackson.off@email.com',
    amount: 39,
  },
  {
    name: 'Optimum Nogger',
    email: 'Optimum.Nogger@email.com',
    amount: 299,
  },
  {
    name: 'Barmit Kim',
    email: 'barmit@email.com',
    amount: 99,
  },
  {
    name: 'Pasta Davis',
    email: 'pasta.davis@email.com',
    amount: 39,
  },
]

// Initialise the Pinia store
const xpStore = useXPStore()
const coinStore = useCoinStore()
const streakStore = useStreakStore()

// Computed values for number-flow
const progressValue = computed(() => xpStore.xpProgress())
const xpProgressValue = computed(() => xpStore.xp)
const xpToNextLevelValue = computed(() => xpStore.totalXpNeededForNextLevel())
const streakValue = computed(() => streakStore.streak)
const coinValue = computed(() => coinStore.coins)

// Function for checking if values aren't 0 -> styling
const streakIsPositive = (streakValue: number) => streakValue > 0
const coinIsPositive = (coinValue: number) => coinValue > 0

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
        Dashboard
      </h2>
      <div class="flex items-center space-x-2">
        <BaseDateRangePicker />
        <!-- <Button>Download</Button> -->
      </div>
    </div>
    <!-- Main body under header -->
    <main class="flex flex-1 flex-col gap-4 md:gap-8">
      <!-- Profile card -->
      <Card>
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle class="text-md font-medium">
            <NuxtLink to="/profile" class="text-md cursor-pointer font-medium">
              Profile
            </NuxtLink><!-- add username {{ username }} -->
          </CardTitle>
          <div class="text-s w-85% flex flex-row items-center justify-end gap-5% text-muted-foreground">
            <!-- Streak value -->
            <div class="flex flex-row items-center gap-2">
              <Flame
                class="h-4 w-4" :class="{
                  'text-rose-500': streakIsPositive(streakValue),
                  'text-muted-foreground': streakValue === 0,
                }"
              />
              <NumberFlow
                :value="streakValue"
              />
            </div>
            <!-- Coin value -->
            <div class="flex flex-row items-center gap-2">
              <Coins
                class="h-4 w-4" :class="{
                  'text-yellow-500': coinIsPositive(coinValue),
                  'text-muted-foreground': coinValue === 0,
                }"
              />
              <NumberFlow
                :value="coinValue"
              />
            </div>
          </div>
          <User class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2m font-bold">
            <div class="flex items-center gap-2">
              <Avatar class="h-12 w-12">
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <p>Lvl.{{ xpStore.level }}</p>
              <!-- Shadcn Progress Bar -->
              <div class="mt-6 w-full flex flex-col gap-2">
                <Progress v-model="progressValue" />
                <p class="flex justify-center text-xs text-muted-foreground font-normal">
                  <NumberFlow
                    :value="xpProgressValue" suffix=" XP"
                  />
                  &nbsp;/&nbsp;
                  <NumberFlow
                    :value="xpToNextLevelValue" suffix=" XP"
                  />
                </p>
              </div>

              <p>Lvl.{{ xpStore.level + 1 }}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <!-- Devtools -->
      <Card>
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle class="text-md font-medium">
            <NuxtLink to="/profile" class="text-md cursor-pointer font-medium">
              Devtools
            </NuxtLink><!-- add username {{ username }} -->
          </CardTitle>
          <User class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="flex-container justify">
            <div class="mt-4 flex flex-row justify-between gap-4">
              <Button class="w-30%" @click="xpStore.addXP(10)">
                Gain 10 XP
              </Button>
              <Button class="w-30%" @click="xpStore.addXP(100)">
                Gain 100 XP
              </Button>
              <Button class="w-30%" @click="xpStore.addXP(1000)">
                Gain 1000 XP
              </Button>
            </div>
            <div class="mt-4 flex flex-row justify-between gap-4">
              <Button class="w-30%" @click="streakStore.addStreak(1)">
                Gain 1 streak
              </Button>
              <Button class="w-30%" @click="streakStore.addStreak(10)">
                Gain 10
                streak
              </Button>
              <Button class="w-30%" @click="streakStore.addStreak(100)">
                Gain 100
                streak
              </Button>
            </div>
            <div class="mt-4 flex flex-row justify-between gap-4">
              <Button class="w-30%" @click="coinStore.addCoins(10)">
                Gain 10 coins
              </Button>
              <Button class="w-30%" @click="coinStore.addCoins(100)">
                Gain 100 coins
              </Button>
              <Button class="w-30%" @click="coinStore.addCoins(1000)">
                Gain 1000 coins
              </Button>
            </div>
            <div class="mt-4 flex flex-row items-center justify-center">
              <Button
                class="w-100% bg-rose-600 lg:w-30% md:w-70% hover:bg-rose-500"
                @click="xpStore.resetXP(); streakStore.resetStreak(); coinStore.resetCoins()"
              >
                Reset all
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <!-- Grid 2 card underneath -->
      <div class="grid gap-4 lg:grid-cols-2 xl:grid-cols-3 md:gap-8">
        <!-- Graph card -->
        <Card class="xl:col-span-2">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent class="pl-2">
            <DashboardBarChart />
          </CardContent>
        </Card>
        <!-- Daily quests card -->
        <Card>
          <CardHeader>
            <CardTitle>Daily Quests</CardTitle>
          </CardHeader>
          <CardContent class="grid gap-8">
            <div v-for="recentSales in dataRecentSales" :key="recentSales.name" class="flex items-center gap-4">
              <Avatar class="hidden h-9 w-9 sm:flex">
                <AvatarFallback>{{ recentSales.name.split(' ').map((n) => n[0]).join('') }}</AvatarFallback>
              </Avatar>
              <div class="grid gap-1">
                <p class="text-sm font-medium leading-none">
                  {{ recentSales.name }}
                </p>
                <p class="text-sm text-muted-foreground">
                  {{ recentSales.email }}
                </p>
              </div>
              <div class="ml-auto font-medium">
                <NumberFlow
                  :value="recentSales.amount"
                  :format="{ style: 'currency', currency: 'EUR', trailingZeroDisplay: 'stripIfInteger' }" prefix="+"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <hr>
      <!-- Other dashboard cards -> may be deleted -->
      <div class="grid gap-4 lg:grid-cols-4 md:grid-cols-2 md:gap-8">
        <Card>
          <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle class="text-sm font-medium">
              Total Revenue
            </CardTitle>
            <DollarSign class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">
              <NumberFlow
                :value="dataCard.totalRevenue"
                :format="{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }"
              />
            </div>
            <p class="text-xs text-muted-foreground">
              <NumberFlow
                :value="dataCard.totalRevenueDesc" prefix="+"
                :format="{ style: 'percent', minimumFractionDigits: 1 }"
              />
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle class="text-sm font-medium">
              Subscriptions
            </CardTitle>
            <Users class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">
              <NumberFlow :value="dataCard.subscriptions" prefix="+" />
            </div>
            <p class="text-xs text-muted-foreground">
              <NumberFlow
                :value="dataCard.subscriptionsDesc" prefix="+"
                :format="{ style: 'percent', minimumFractionDigits: 1 }"
              /> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle class="text-sm font-medium">
              Sales
            </CardTitle>
            <CreditCard class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">
              <NumberFlow :value="dataCard.sales" prefix="+" />
            </div>
            <p class="text-xs text-muted-foreground">
              <NumberFlow
                :value="dataCard.salesDesc" prefix="+"
                :format="{ style: 'percent', minimumFractionDigits: 1 }"
              /> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle class="text-sm font-medium">
              Active Now
            </CardTitle>
            <Activity class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">
              <NumberFlow :value="dataCard.activeNow" prefix="+" />
            </div>
            <p class="text-xs text-muted-foreground">
              <NumberFlow :value="dataCard.activeNowDesc" prefix="+" /> since last hour
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  </div>
</template>
