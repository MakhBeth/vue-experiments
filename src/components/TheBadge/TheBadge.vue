<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

type SpanHTMLAttributes = Omit<HTMLSpanElement, keyof HTMLElement> & HTMLAttributes

interface Props extends /* @vue-ignore */ SpanHTMLAttributes {
  variant?: 'neutral' | 'positive' | 'negative'
}

withDefaults(defineProps<Props>(), {
  variant: 'neutral',
})
</script>

<template>
  <span class="badge" :class="variant" v-bind="$attrs"> <slot /></span>
</template>

<style scoped>
.badge {
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: light-dark(var(--color-gray-1), var(--color-gray-10));
  font-size: var(--font-size-xs);
  color: light-dark(var(--color-gray-15), var(--color-gray-0));
  border-radius: 100vw;
  font-weight: 800;

  &:is(.positive) {
    background-color: light-dark(var(--color-green-2), var(--color-green-10));
  }

  &:is(.negative) {
    background-color: light-dark(var(--color-red-2), var(--color-red-10));
  }
}
</style>
