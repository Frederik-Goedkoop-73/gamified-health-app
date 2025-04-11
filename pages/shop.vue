<script setup lang="ts">
import { useCoinStore } from '@/stores/coinStore'
// import NumberFlow from '@number-flow/vue'
import { Coins, ShoppingCart } from 'lucide-vue-next'
import { useToast } from '~/components/ui/toast/use-toast'

const coinStore = useCoinStore()
const { toast } = useToast()

// Test functions -> earnReward can be removed later
// Swap alerts with toast
async function earnReward() {
  try {
    await coinStore.addCoins(100)
    toast ({
      title: 'Success',
      description: '100 coins added successfully!',
    })
  }
  catch {
    toast ({
      title: 'Error',
      description: 'Failed to add coins',
      variant: 'destructive',
    })
  }
}

async function buyItem(price: number) {
  if (coinStore.canAfford(price)) {
    const success = await coinStore.deductCoins(price)
    if (success) {
      // Handle successful purchase logic here
      toast({
        title: 'Success',
        description: `Item purchased for ${price} coins!`,
      })
    }
    else {
      toast({
        title: 'Error',
        description: 'Failed to deduct coins',
        variant: 'destructive',
      })
    }
  }
}
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <h2 class="text-2xl font-bold tracking-tight">
        Shop
      </h2>
      <i class="m-3 text-muted-foreground"><b>Tip: </b>Hover over a quest to see more info</i>
    </div>

    <!-- Coin store test -->
    <p>Current coins: {{ coinStore.coins }}</p>
    <Button class="btn btn-primary" @click="earnReward">
      Earn 100 coins
    </Button>
    <Button :disabled="!coinStore.canAfford(1000)" class="btn btn-primary" @click="buyItem(1000)">
      Buy 1000 coin item
    </Button>

    <!-- Main body under header -->
    <main class="flex flex-1 flex-col gap-4 md:gap-8">
      <!-- Daily quests -->
      <Card class="xl:col-span-2">
        <!-- Daily quests -->
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle>Themes</CardTitle>
          <ShoppingCart class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent class="flex flex-row flex-wrap items-center justify-center gap-x-10% gap-y-4 pt-2">
          <!-- Shop item -->
          <Card class="normal min-w-80 hover:shadow-md">
            <CardHeader class="lex-col flex flex-col items-center justify-center pb-2 space-y-0">
              <CardTitle>Theme 1</CardTitle>
            </cardheader>
            <hr class="normal-hr my-1 w-full">
            <CardContent class="flex flex-col items-center justify-between gap-1 pt-2">
              <img src="public/avatars/avatartion.png" alt="Theme 1" class="h-40 w-40 rounded-lg">
              <hr class="my-1 w-80%">
              <div class="flex flex-row items-center justify-between gap-2">
                <p class="text-muted-foreground">
                  200
                </p>
                <Coins
                  class="h-4 w-4 text-yellow-500"
                />
              </div>
            </cardcontent>
          </Card>

          <!-- Shop item -->
          <Card class="normal min-w-80 hover:shadow-md">
            <CardHeader class="lex-col flex flex-col items-center justify-center pb-2 space-y-0">
              <CardTitle>Theme 2</CardTitle>
            </cardheader>
            <hr class="normal-hr my-1 w-full">
            <CardContent class="flex flex-col items-center justify-between gap-1 pt-2">
              <img src="public/avatars/avatartion.png" alt="Theme 2" class="h-40 w-40 rounded-lg">
              <hr class="my-1 w-80%">
              <div class="flex flex-row items-center justify-between gap-2">
                <p class="text-muted-foreground">
                  200
                </p>
                <Coins
                  class="h-4 w-4 text-yellow-500"
                />
              </div>
            </cardcontent>
          </Card>

          <!-- Shop item -->
          <Card class="normal min-w-80 hover:shadow-md">
            <CardHeader class="lex-col flex flex-col items-center justify-center pb-2 space-y-0">
              <CardTitle>Theme 3</CardTitle>
            </cardheader>
            <hr class="normal-hr my-1 w-full">
            <CardContent class="flex flex-col items-center justify-between gap-1 pt-2">
              <img src="public/avatars/avatartion.png" alt="Theme 3" class="h-40 w-40 rounded-lg">
              <hr class="my-1 w-80%">
              <div class="flex flex-row items-center justify-between gap-2">
                <p class="text-muted-foreground">
                  200
                </p>
                <Coins
                  class="h-4 w-4 text-yellow-500"
                />
              </div>
            </cardcontent>
          </Card>

          <!-- Shop item -->
          <Card class="normal min-w-80 hover:shadow-md">
            <CardHeader class="lex-col flex flex-col items-center justify-center pb-2 space-y-0">
              <CardTitle>Theme 4</CardTitle>
            </cardheader>
            <hr class="normal-hr my-1 w-full">
            <CardContent class="flex flex-col items-center justify-between gap-1 pt-2">
              <img src="public/avatars/avatartion.png" alt="Theme 4" class="h-40 w-40 rounded-lg">
              <hr class="my-1 w-80%">
              <div class="flex flex-row items-center justify-between gap-2">
                <p class="text-muted-foreground">
                  200
                </p>
                <Coins
                  class="h-4 w-4 text-yellow-500"
                />
              </div>
            </cardcontent>
          </Card>

          <!-- Shop item -->
          <Card class="normal min-w-80 hover:shadow-md">
            <CardHeader class="lex-col flex flex-col items-center justify-center pb-2 space-y-0">
              <CardTitle>Theme 5</CardTitle>
            </cardheader>
            <hr class="normal-hr my-1 w-full">
            <CardContent class="flex flex-col items-center justify-between gap-1 pt-2">
              <img src="public/avatars/avatartion.png" alt="Theme 5" class="h-40 w-40 rounded-lg">
              <hr class="my-1 w-80%">
              <div class="flex flex-row items-center justify-between gap-2">
                <p class="text-muted-foreground">
                  200
                </p>
                <Coins
                  class="h-4 w-4 text-yellow-500"
                />
              </div>
            </cardcontent>
          </Card>

          <!-- Shop item -->
          <Card class="normal min-w-80 hover:shadow-md">
            <CardHeader class="lex-col flex flex-col items-center justify-center pb-2 space-y-0">
              <CardTitle>Theme 6</CardTitle>
            </cardheader>
            <hr class="normal-hr my-1 w-full">
            <CardContent class="flex flex-col items-center justify-between gap-1 pt-2">
              <img src="public/avatars/avatartion.png" alt="Theme 6" class="h-40 w-40 rounded-lg">
              <hr class="my-1 w-80%">
              <div class="flex flex-row items-center justify-between gap-2">
                <p class="text-muted-foreground">
                  200
                </p>
                <Coins
                  class="h-4 w-4 text-yellow-500"
                />
              </div>
            </cardcontent>
          </Card>
        </CardContent>

        <hr>

        <!-- Avatars -->
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle>Avatars</CardTitle>
          <ShoppingCart class="h-4 w-4 text-muted-foreground" />
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
                <p
                  class="text-muted-foreground"
                >
                  200
                </p>            <Coins
                  class="h-4 w-4 text-yellow-500"
                />
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
                <p
                  class="text-muted-foreground"
                >
                  200
                </p>            <Coins
                  class="h-4 w-4 text-yellow-500"
                />
              </div>
            </cardcontent>
          </Card>
        </cardcontent>
      </card>
    </main>
  </div>
</template>
