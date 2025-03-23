<script setup lang="ts">
// import NumberFlow from '@number-flow/vue'
import { Trophy } from 'lucide-vue-next'
import { useXPStore } from '~/stores/xpStore'

const xpStore = useXPStore()

// Ensure totalXP is a valid number
if (typeof xpStore.totalXP !== 'number' || Number.isNaN(xpStore.totalXP)) {
  xpStore.totalXP = 0
}

// Calculate daily progress (rounded)
const daily_3_xp = computed(() => Math.round(xpStore.totalXP))
const daily_3_progress = computed(() => {
  const progress = (daily_3_xp.value / 1000) * 100
  return Math.min(progress, 100) // Cap progress at 100%
})
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <h2 class="text-2xl font-bold tracking-tight">
        Quests
      </h2>
      <i class="m-3 text-muted-foreground"><b>Tip: </b>Hover over a quest to see more info</i>
    </div>
    <!-- Main body under header -->
    <main class="flex flex-1 flex-col gap-4 md:gap-8">
      <!-- Daily quests -->
      <Card class="xl:col-span-2">
        <!-- Daily quests -->
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle>Daily Quests</CardTitle>
          <Trophy class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent class="flex flex-row flex-wrap items-center justify-center gap-x-10% gap-y-4 pt-2">
          <!-- Add daily quests here -->
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger as-child>
                <Card class="normal min-w-100">
                  <CardHeader class="lex-col flex flex-col items-center justify-center pb-2 space-y-0">
                    <CardTitle>Style 1</CardTitle>
                  </cardheader>
                  <hr class="normal-hr my-1 w-full">
                  <CardContent class="flex flex-col items-center justify-between gap-1 pt-2">
                    <strong>5km run</strong>
                    <p>Reward: 100 xp</p>
                    <hr class="my-1 w-80%">
                    <p class="text-muted-foreground">
                      0 / 5000 m
                    </p>
                  </cardcontent>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <p>Run 5 km today before 24:00</p>
              </TooltipContent>
            </Tooltip>
          </tooltipprovider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger as-child>
                <Card class="normal min-w-100">
                  <CardHeader class="lex-col flex flex-row items-center justify-center pb-2 space-y-0">
                    <CardTitle>Style 2</CardTitle>
                  </cardheader>
                  <hr class="normal-hr my-1 w-full">
                  <CardContent class="flex flex-col items-center justify-between pt-2">
                    <p>10k steps</p>
                    <hr class="my-1 w-80%">
                    <p>Reward: 100 xp</p>
                  </cardcontent>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <p>Walk 10.000 steps today before 24:00</p>
                <hr class="my-1 w-full">
                <p class="text-muted-foreground">
                  0 / 10.000 steps
                </p>
              </TooltipContent>
            </Tooltip>
          </tooltipprovider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger as-child>
                <Card
                  class="normal min-w-100" :class="{
                    'text-muted-foreground': xpStore.hasAwarded1000XP,
                    'bg-secondary': xpStore.hasAwarded1000XP,
                  }"
                >
                  <CardHeader class="relative flex flex-col items-center justify-center pb-3">
                    <!-- Avatar positioned absolutely -->
                    <div class="absolute left-4 top-2 h-10 w-10">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0" /><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" /><g id="SVGRepo_iconCarrier"> <path d="M18.5 6C19.8807 6 21 4.88071 21 3.5C21 2.11929 19.8807 1 18.5 1C17.1193 1 16 2.11929 16 3.5C16 4.88071 17.1193 6 18.5 6Z" fill="hsl(var(--primary))" /> <path d="M9.49967 3.9377L7.47 5.20625C7.11268 5.42957 7 5.79894 7 6.19575C7 6.98119 7.86395 7.46003 8.53 7.04375L10.4185 5.86341C10.7689 5.64441 11.218 5.66348 11.5485 5.91141L13 7L9.29261 10.7074C9.09787 10.9021 8.91955 11.1126 8.75947 11.3367L6.94614 13.8754C6.683 14.2438 6.20519 14.3894 5.78129 14.2305L3.21008 13.2663C2.7942 13.1103 2.3257 13.2614 2.07933 13.631C1.76802 14.098 1.92419 14.7314 2.41688 15.0001L4.88909 16.3486C6.12269 17.0215 7.65806 16.7479 8.58338 15.6904L10.5 13.5L12.3001 16.0201C12.7307 16.623 12.7928 17.4144 12.4615 18.077L10.7236 21.5528C10.3912 22.2177 10.8746 23 11.618 23C12.0887 23 12.5417 22.9167 12.7764 22.4472L14.7476 18.5049C15.2149 17.5701 15.1622 16.4595 14.6083 15.5732L13 13L16 10L17.3722 10.9148C18.6066 11.7378 19.9731 11.6756 21.3162 11.2279C21.7813 11.0729 22 10.6447 22 10.1805C22 9.56252 21.4451 9.09248 20.8356 9.19407C20.1453 9.30911 19.1462 9.69488 18.6352 9.01366C16.9655 6.78731 14.9948 5.21933 12.5466 3.85922C11.5923 3.32907 10.4254 3.35913 9.49967 3.9377Z" fill="hsl(var(--primary))" /> </g></svg>
                    </div>

                    <!-- Centered title -->
                    <CardTitle>Style 3</CardTitle>
                  </CardHeader>
                  <hr class="normal-hr my-1 w-full">
                  <CardContent class="flex flex-col items-center justify-center gap-2 pt-2">
                    <p>1000 xp</p>
                    <Progress v-model="daily_3_progress" class="mb-2 mt-1 h-1" />
                    <p v-if="!xpStore.hasAwarded1000XP">
                      Reward: 200 xp
                    </p>
                    <p v-else>
                      200 xp granted
                    </p>
                  </cardcontent>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <p>Collect 1000 xp today before 24:00</p>
                <hr class="my-1 w-full">
                <p class="text-muted-foreground">
                  {{ daily_3_xp }} / 1000 xp
                </p>
              </TooltipContent>
            </Tooltip>
          </tooltipprovider>
        </CardContent>

        <p class="m-3 text-muted-foreground">
          I still need to pick which style is best and then start coding a <b>reusable component</b> for these in which
          I can <b>slot</b> different array values.
        </p>
        <hr>

        <!-- Weekly quests -->
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle>Weekly Quests</CardTitle>
          <Trophy class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent class="flex flex-row flex-wrap items-center justify-center gap-x-10% gap-y-4 pt-2">
          <!-- Add weekly quests here -->
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger as-child>
                <Card class="normal min-w-100">
                  <CardHeader class="lex-col flex flex-row items-center justify-center pb-2 space-y-0">
                    <CardTitle>Weekly 1</CardTitle>
                  </cardheader>
                  <CardContent class="flex flex-col items-center justify-between pt-2">
                    Run 15km
                    <hr class="my-1 w-80%">
                    <p>Reward: 1000 xp</p>
                  </cardcontent>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <p>Run 15 km this week before Sunday 24:00</p>
              </TooltipContent>
            </Tooltip>
          </tooltipprovider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger as-child>
                <Card class="normal min-w-100">
                  <CardHeader class="lex-col flex flex-row items-center justify-center pb-2 space-y-0">
                    <CardTitle>Weekly 2</CardTitle>
                  </cardheader>
                  <CardContent class="flex flex-col items-center justify-between pt-2">
                    60k steps
                    <hr class="my-1 w-80%">
                    <p>Reward: 1000 xp</p>
                  </cardcontent>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <p>Walk 60.000 steps this week before Sunday 24:00</p>
              </TooltipContent>
            </Tooltip>
          </tooltipprovider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger as-child>
                <Card class="hard min-w-100">
                  <CardHeader class="lex-col flex flex-row items-center justify-center pb-2 space-y-0">
                    <CardTitle>Weekly 3</CardTitle>
                  </cardheader>
                  <CardContent class="flex flex-col items-center justify-between pt-2">
                    7000 kcal
                    <hr class="my-1 w-80%">
                    <p>Reward: 2000 xp</p>
                  </cardcontent>
                </Card>
              </TooltipTrigger>
              <TooltipContent class="flex flex-col items-center justify-center pt-2">
                <p class="text-rose-700">
                  Hard challenge:
                </p>
                <p>Burn 7000 kcal this week before Sunday 24:00</p>
              </TooltipContent>
            </Tooltip>
          </tooltipprovider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger as-child>
                <Card class="normal min-w-100">
                  <CardHeader class="lex-col flex flex-row items-center justify-center pb-2 space-y-0">
                    <CardTitle>Weekly 4</CardTitle>
                  </cardheader>
                  <CardContent class="flex flex-col items-center justify-between pt-2">
                    ...
                    <hr class="my-1 w-80%">
                    <p>Reward: 1000 xp</p>
                  </cardcontent>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <p>... this week before Sunday 24:00</p>
              </TooltipContent>
            </Tooltip>
          </tooltipprovider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger as-child>
                <Card class="normal min-w-100">
                  <CardHeader class="lex-col flex flex-row items-center justify-center pb-2 space-y-0">
                    <CardTitle>Weekly 5</CardTitle>
                  </cardheader>
                  <CardContent class="flex flex-col items-center justify-between pt-2">
                    ...
                    <hr class="my-1 w-80%">
                    <p>Reward: 1000 xp</p>
                  </cardcontent>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <p>... this week before Sunday 24:00</p>
              </TooltipContent>
            </Tooltip>
          </tooltipprovider>
        </cardcontent>
        <p class="m-3 text-muted-foreground">
          These cards aren't styled yet
        </p>
      </Card>
      <div class="flex justify-center gap-5">
        <Button class="mb-5 w-50" @click="xpStore.addXP(500);">
          Add 500 xp
        </Button>
        <Button class="mb-5 w-50 bg-rose-600 hover:bg-rose-500" @click="xpStore.resetXP();">
          Reset xp
        </Button>
      </div>
    </main>
  </div>
</template>

<style scoped>
.hard {
  box-shadow: 0 0 5px red;
}

.hard:hover {
  border-color: red;
  transition: 0.2s;
}

.normal:hover {
  border-color: hsl(var(--primary) / 1);

  .normal-hr {
    border-color: hsl(var(--primary) / 1);
    transition: 0.2s;
  }

  transition: 0.2s;
}
</style>
