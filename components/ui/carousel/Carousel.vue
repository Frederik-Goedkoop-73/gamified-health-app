<script setup lang="ts">
import type { CarouselEmits, CarouselProps, WithClassAsProps } from './interface'
import { cn } from '@/lib/utils'
import { useProvideCarousel } from './useCarousel'

const props = withDefaults(defineProps<CarouselProps & WithClassAsProps>(), {
  orientation: 'horizontal',
})

const emits = defineEmits<CarouselEmits>()

const carouselArgs = useProvideCarousel(props, emits)

defineExpose({
  scrollPrev: carouselArgs.scrollPrev,
  scrollNext: carouselArgs.scrollNext,
  scrollTo: carouselArgs.scrollTo, // ✅ expose scrollTo
})

function onKeyDown(event: KeyboardEvent) {
  const prevKey = props.orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft'
  const nextKey = props.orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight'

  if (event.key === prevKey) {
    event.preventDefault()
    carouselArgs.scrollPrev()

    return
  }

  if (event.key === nextKey) {
    event.preventDefault()
    carouselArgs.scrollNext()
  }
}
</script>

<template>
  <div
    :class="cn('relative', props.class)"
    role="region"
    aria-roledescription="carousel"
    tabindex="0"
    @keydown="onKeyDown"
  >
    <slot v-bind="carouselArgs" />
  </div>
</template>
