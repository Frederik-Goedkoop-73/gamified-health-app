<script setup lang="ts">
const props = defineProps<{
  title: string
  data: { name: string, value: any }[]
}>()

// Find sleepLabel in data
const label = computed(() => {
  const item = props.data.find(d => d.name === 'sleepHours')
  return typeof item?.value === 'string' ? item.value : '—'
})
</script>

<template>
  <div class="border border-border rounded bg-background p-2 text-sm shadow">
    Sleep: {{ label }}
  </div>
</template>
