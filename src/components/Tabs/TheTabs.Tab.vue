<script setup lang="ts">
import { inject } from 'vue'
import type { TheTabsContext } from './TheTabs.type'

const { activeTab } = inject<TheTabsContext>('tabsContext') || {}

defineProps<{
  id: string
}>()
</script>

<template>
  <div
    role="tabpanel"
    :aria-labelledby="`button-${id}`"
    :key="id"
    :id="id"
    :hidden="activeTab !== id"
  >
    <slot />
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-0.5rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

[role='tabpanel'] {
  animation: fadeIn var(--timing-fast) ease-in-out;
  margin-bottom: var(--spacing-md);
}
</style>
