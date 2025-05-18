<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Coins, Info, ShoppingCart, Star, User } from 'lucide-vue-next'
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <Button variant="ghost" size="icon" class="text-muted-foreground hover:text-primary">
        <Info class="size-5" />
      </Button>
    </DialogTrigger>

    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>About the Shop</DialogTitle>
        <DialogDescription>
          Use coins to unlock cosmetic upgrades for your profile:
        </DialogDescription>
      </DialogHeader>

      <ul class="mt-4 text-sm text-muted-foreground space-y-3">
        <li class="flex items-center gap-2">
          <Coins class="size-4 min-w-4 text-yellow-500" /> Your coins are shown at the top right
        </li>
        <li class="flex items-center gap-2">
          <Star class="size-4 min-w-4 text-blue-500" /> The same goes for your stars
        </li>
        <li class="flex items-center gap-2">
          <ShoppingCart class="size-4 min-w-4 text-primary" /> Browse avatars, banners, and themes
        </li>
        <li class="flex items-center gap-2">
          <User class="size-4 min-w-4 text-primary" /> Equip unlocked items on your profile page
        </li>
      </ul>

      <div class="mt-6 text-sm text-muted-foreground space-y-2">
        <p><strong class="text-yellow-500">Coins</strong> are earned by completing quests.</p>
        <p><strong class="text-blue-500">Coins</strong> are earned by acquiring badges.</p>
        <p>Click on an item to purchase it—your balance will be updated immediately.</p>
        <p>Already purchased items are marked as <strong>unlocked</strong> and cannot be bought again.</p>
        <p class="pt-2">
          <strong class="text-primary">Note:</strong> There is no purchase guard; once you click on an item you can afford, you will buy it!
        </p>
      </div>
    </DialogContent>
  </Dialog>
</template>
