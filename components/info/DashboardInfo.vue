<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Info } from 'lucide-vue-next'
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
        <DialogTitle>About the Dashboard</DialogTitle>
        <DialogDescription>
          This page gives you a snapshot of your health and quest activity:
        </DialogDescription>
      </DialogHeader>

      <ul class="mt-4 list-disc list-outside pl-4 text-sm text-muted-foreground space-y-1">
        <li><strong class="text-primary">Profile & Progress:</strong> See your current level, XP, and streak.</li>
        <li><strong class="text-primary">Health Stats:</strong> View today's steps, sleep, calories, and more.</li>
        <li><strong class="text-primary">Daily Quests:</strong> Complete health-related tasks for rewards.</li>
      </ul>

      <!-- Dashboard Layout Skeleton -->
      <div class="space-y-2">
        <div class="space-y-3">
          <Card class="h-16 w-full flex items-center justify-center rounded-lg text-muted-foreground">
            Profile & Progress
          </Card>

          <div class="flex flex-wrap justify-between">
            <Card class="h-20 w-[49%] flex items-center justify-center rounded-lg text-muted-foreground">
              Daily Health Stats
            </Card>
            <Card class="h-20 w-[49%] flex items-center justify-center rounded-lg text-muted-foreground">
              Daily Quests
            </Card>
          </div>
        </div>
      </div>

      <!-- Sync instructions -->
      <div class="mt-6 text-sm text-muted-foreground space-y-2">
        <p>Make sure you're logged in with <strong class="text-primary">both Google and Fitbit</strong> to link your account and store your data.</p>
        <p>To update your data:</p>
        <ol class="list-decimal list-outside pl-4 space-y-1">
          <li>Sync your watch in the Fitbit app.</li>
          <li>Click the <em class="text-primary">“Sync Latest Data”</em> button at the top right of this page.</li>
        </ol>
      </div>
    </DialogContent>
  </Dialog>
</template>
