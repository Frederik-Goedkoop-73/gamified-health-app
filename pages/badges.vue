<script setup lang="ts">
// import NumberFlow from '@number-flow/vue'
import { Award, Coins } from 'lucide-vue-next'

const badges = [
  {
    category: 'Marathon Stepper 🚶‍➡️',
    badges: [
      { tier: 'Bronze I', requirement: 'Walk 10,000 steps' },
      { tier: 'Bronze II', requirement: 'Walk 25,000 steps' },
      { tier: 'Bronze III', requirement: 'Walk 50,000 steps' },
      { tier: 'Silver I', requirement: 'Walk 75,000 steps' },
      { tier: 'Silver II', requirement: 'Walk 100,000 steps' },
      { tier: 'Silver III', requirement: 'Walk 150,000 steps' },
      { tier: 'Gold I', requirement: 'Walk 200,000 steps' },
      { tier: 'Gold II', requirement: 'Walk 300,000 steps' },
      { tier: 'Gold III', requirement: 'Walk 500,000 steps' },
    ],
  },
  {
    category: 'Calorie Inferno 🔥',
    badges: [
      { tier: 'Bronze I', requirement: 'Burn 1,000 calories' },
      { tier: 'Bronze II', requirement: 'Burn 2,500 calories' },
      { tier: 'Bronze III', requirement: 'Burn 5,000 calories' },
      { tier: 'Silver I', requirement: 'Burn 7,500 calories' },
      { tier: 'Silver II', requirement: 'Burn 10,000 calories' },
      { tier: 'Silver III', requirement: 'Burn 15,000 calories' },
      { tier: 'Gold I', requirement: 'Burn 20,000 calories' },
      { tier: 'Gold II', requirement: 'Burn 30,000 calories' },
      { tier: 'Gold III', requirement: 'Burn 50,000 calories' },
    ],
  },
  {
    category: 'Super Cardio Bros ❤️',
    badges: [
      { tier: 'Bronze I', requirement: 'Achieve 100 cardio load points' },
      { tier: 'Bronze II', requirement: 'Achieve 250 cardio load points' },
      { tier: 'Bronze III', requirement: 'Achieve 500 cardio load points' },
      { tier: 'Silver I', requirement: 'Achieve 750 cardio load points' },
      { tier: 'Silver II', requirement: 'Achieve 1,000 cardio load points' },
      { tier: 'Silver III', requirement: 'Achieve 1,500 cardio load points' },
      { tier: 'Gold I', requirement: 'Achieve 2,000 cardio load points' },
      { tier: 'Gold II', requirement: 'Achieve 3,000 cardio load points' },
      { tier: 'Gold III', requirement: 'Achieve 5,000 cardio load points' },
    ],
  },
  {
    category: 'Sleeping Beauty 💤',
    badges: [
      { tier: 'Bronze I', requirement: 'Sleep 7 hours in a night' },
      { tier: 'Bronze II', requirement: 'Sleep 7 hours for 3 consecutive nights' },
      { tier: 'Bronze III', requirement: 'Sleep 7 hours for 7 consecutive nights' },
      { tier: 'Silver I', requirement: 'Sleep 8 hours in a night' },
      { tier: 'Silver II', requirement: 'Sleep 8 hours for 3 consecutive nights' },
      { tier: 'Silver III', requirement: 'Sleep 8 hours for 7 consecutive nights' },
      { tier: 'Gold I', requirement: 'Sleep 9 hours in a night' },
      { tier: 'Gold II', requirement: 'Sleep 9 hours for 3 consecutive nights' },
      { tier: 'Gold III', requirement: 'Sleep 9 hours for 7 consecutive nights' },
    ],
  },
  {
    category: 'Distance Runner 🏃‍♂️',
    badges: [
      { tier: 'Bronze I', requirement: 'Walk/run 5 km' },
      { tier: 'Bronze II', requirement: 'Walk/run 10 km' },
      { tier: 'Bronze III', requirement: 'Walk/run 25 km' },
      { tier: 'Silver I', requirement: 'Walk/run 50 km' },
      { tier: 'Silver II', requirement: 'Walk/run 75 km' },
      { tier: 'Silver III', requirement: 'Walk/run 100 km' },
      { tier: 'Gold I', requirement: 'Walk/run 150 km' },
      { tier: 'Gold II', requirement: 'Walk/run 200 km' },
      { tier: 'Gold III', requirement: 'Walk/run 300 km' },
    ],
  },
  {
    category: 'Go-Getter 🚀',
    badges: [
      { tier: 'Bronze I', requirement: 'Achieve 30 active zone minutes' },
      { tier: 'Bronze II', requirement: 'Achieve 60 active zone minutes' },
      { tier: 'Bronze III', requirement: 'Achieve 120 active zone minutes' },
      { tier: 'Silver I', requirement: 'Achieve 200 active zone minutes' },
      { tier: 'Silver II', requirement: 'Achieve 300 active zone minutes' },
      { tier: 'Silver III', requirement: 'Achieve 500 active zone minutes' },
      { tier: 'Gold I', requirement: 'Achieve 750 active zone minutes' },
      { tier: 'Gold II', requirement: 'Achieve 1,000 active zone minutes' },
      { tier: 'Gold III', requirement: 'Achieve 1,500 active zone minutes' },
    ],
  },
  {
    category: 'Golddigger 💰',
    badges: [
      { tier: 'Bronze I', requirement: 'Earn 100 coins' },
      { tier: 'Bronze II', requirement: 'Earn 250 coins' },
      { tier: 'Bronze III', requirement: 'Earn 500 coins' },
      { tier: 'Silver I', requirement: 'Earn 750 coins' },
      { tier: 'Silver II', requirement: 'Earn 1,000 coins' },
      { tier: 'Silver III', requirement: 'Earn 1,500 coins' },
      { tier: 'Gold I', requirement: 'Earn 2,000 coins' },
      { tier: 'Gold II', requirement: 'Earn 3,000 coins' },
      { tier: 'Gold III', requirement: 'Earn 5,000 coins' },
    ],
  },
  {
    category: 'Experienced One 🌟',
    badges: [
      { tier: 'Bronze I', requirement: 'Earn 100 XP' },
      { tier: 'Bronze II', requirement: 'Earn 250 XP' },
      { tier: 'Bronze III', requirement: 'Earn 500 XP' },
      { tier: 'Silver I', requirement: 'Earn 750 XP' },
      { tier: 'Silver II', requirement: 'Earn 1,000 XP' },
      { tier: 'Silver III', requirement: 'Earn 1,500 XP' },
      { tier: 'Gold I', requirement: 'Earn 2,000 XP' },
      { tier: 'Gold II', requirement: 'Earn 3,000 XP' },
      { tier: 'Gold III', requirement: 'Earn 5,000 XP' },
    ],
  },
  {
    category: 'Consistent Streaker 📅',
    badges: [
      { tier: 'Bronze I', requirement: 'Maintain a 3-day streak' },
      { tier: 'Bronze II', requirement: 'Maintain a 7-day streak' },
      { tier: 'Bronze III', requirement: 'Maintain a 14-day streak' },
      { tier: 'Silver I', requirement: 'Maintain a 21-day streak' },
      { tier: 'Silver II', requirement: 'Maintain a 25-day streak' },
      { tier: 'Silver III', requirement: 'Maintain a 28-day streak' },
      { tier: 'Gold I', requirement: 'Maintain a 30-day streak' },
      { tier: 'Gold II', requirement: 'Maintain a 35-day streak' },
      { tier: 'Gold III', requirement: 'Maintain a 40-day streak' },
    ],
  },
  {
    category: 'Completionist 🏆',
    badges: [
      { tier: 'Platinum Completionist', requirement: 'Collect all 81 badges (9 categories × 9 badges each)' },
    ],
  },
]
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <h2 class="text-2xl font-bold tracking-tight">
        Badges
      </h2>
      <i class="m-3 text-muted-foreground"><b>Tip: </b>Hover over a quest to see more info</i>
    </div>
    <!-- Main body under header -->
    <main class="flex flex-1 flex-col gap-4 md:gap-8">
      <!-- Daily quests -->
      <Card class="xl:col-span-2">
        <!-- Daily quests -->
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle>Themes</CardTitle>
          <Award class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent class="flex flex-row flex-wrap items-center justify-center gap-x-10% gap-y-4 pt-2">
          <Card v-for="category in badges" :key="category.category">
            <strong class="text-bold text-lg">{{ category.category }}</strong>
            <ul>
              <li v-for="badge in category.badges" :key="badge.tier">
                <strong>{{ badge.tier }}:</strong> {{ badge.requirement }}
                <hr>
              </li>
            </ul>
          </Card>
        </CardContent>

        <hr>

        <!-- Avatars -->
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle>Avatars</CardTitle>
          <Award class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent class="flex flex-row flex-wrap items-center justify-center gap-x-10% gap-y-4 pt-2">
          <!-- Shop item -->
          <Card class="normal min-w-80 hover:shadow-md">
            <CardHeader class="lex-col flex flex-col items-center justify-center pb-2 space-y-0">
              <CardTitle>Avatar 1</CardTitle>
            </cardheader>
            <hr class="normal-hr my-1 w-full">
            <CardContent class="flex flex-col items-center justify-between gap-1 pt-2">
              <img src="public/avatars/avatartion.png" alt="Avatar 1" class="h-40 w-40 rounded-lg">
              <hr class="my-1 w-80%">
              <div class="flex flex-row items-center justify-between gap-2">
                <p class="text-muted-foreground">
                  200
                </p>
                <Coins class="h-4 w-4 text-yellow-500" />
              </div>
            </cardcontent>
          </Card>

          <!-- Shop item -->
          <Card class="normal min-w-80 hover:shadow-md">
            <CardHeader class="lex-col flex flex-col items-center justify-center pb-2 space-y-0">
              <CardTitle>Avatar 2</CardTitle>
            </cardheader>
            <hr class="normal-hr my-1 w-full">
            <CardContent class="flex flex-col items-center justify-between gap-1 pt-2">
              <img src="public/avatars/avatartion.png" alt="Avatar 2" class="h-40 w-40 rounded-lg">
              <hr class="my-1 w-80%">
              <div class="flex flex-row items-center justify-between gap-2">
                <p class="text-muted-foreground">
                  200
                </p>
                <Coins class="h-4 w-4 text-yellow-500" />
              </div>
            </cardcontent>
          </Card>
        </cardcontent>
      </card>
      <div class="flex flex-row flex-wrap items-center justify-center gap-4">
        <Card class="normal min-w-80 hover:shadow-md">
          <CardHeader class="lex-col flex flex-col items-center justify-center pb-2 space-y-0">
            <CardTitle>Calories badges</CardTitle>
          </cardheader>
          <hr class="normal-hr my-1 w-full">
          <CardContent class="flex flex-col items-center justify-between gap-1 pt-2">
            <img src="public/badges/Calories.png" class="h-80 min-w-80 rounded-lg">
          </cardcontent>
        </card>
        <Card class="normal min-w-80 hover:shadow-md">
          <CardHeader class="lex-col flex flex-col items-center justify-center pb-2 space-y-0">
            <CardTitle>Steps badges</CardTitle>
          </cardheader>
          <hr class="normal-hr my-1 w-full">
          <CardContent class="flex flex-col items-center justify-between gap-1 pt-2">
            <img src="public/badges/Steps.png" class="h-80 min-w-80 rounded-lg">
          </cardcontent>
        </card>
        <Card class="normal min-w-80 hover:shadow-md">
          <CardHeader class="lex-col flex flex-col items-center justify-center pb-2 space-y-0">
            <CardTitle>Platinum badge</CardTitle>
          </cardheader>
          <hr class="normal-hr my-1 w-full">
          <CardContent class="flex flex-col items-center justify-between gap-1 pt-2">
            <img src="public/badges/Platinum.png" class="aspect-ratio h-80 rounded-lg">
          </cardcontent>
        </card>
      </div>
      <Strong class="text-center text-muted-foreground">More coming soon ...</Strong>
    </main>
  </div>
</template>
