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
                    'bg-secondary': xpStore.hasAwarded1000XP }"
                >
                  <CardHeader class="lex-col flex flex-row items-center justify-center pb-2 space-y-0">
                    <CardTitle>Style 3</CardTitle>
                  </cardheader>
                  <hr class="normal-hr my-1 w-full">
                  <CardContent class="flex flex-col items-center justify-between pt-2">
                    <p>1000 xp</p>
                    <Progress
                      v-model="daily_3_progress" class="mb-2 mt-1 h-1" :class="{
                        'bg-secondary': xpStore.hasAwarded1000XP }"
                    />
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
          I still need to pick which style is best and then start coding a <b>reusable component</b> for these in which I can <b>slot</b> different array values.
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
        <Button
          class="mb-5 w-50 bg-rose-600 hover:bg-rose-500"
          @click="xpStore.resetXP();"
        >
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
