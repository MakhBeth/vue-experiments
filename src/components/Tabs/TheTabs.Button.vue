<script setup lang="ts">
import { inject } from 'vue'
import type { TheTabsContext } from './TheTabs.type'

const props = defineProps<{
  id: string
}>()

const { activeTab, setActiveTab } = inject<TheTabsContext>('tabsContext') || {}

const handleClick = () => {
  if (!setActiveTab) return
  setActiveTab(props.id)
}
</script>

<template>
  <button
    role="tab"
    :aria-selected="activeTab === id"
    :aria-controls="id"
    :id="`button-${id}`"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<style scoped>
[role='tab'] {
  cursor: pointer;
  border: 1px solid var(--color-gray-6);
  background-color: transparent;
  font-size: var(--font-size-sm);
  font-weight: 800;
  padding: var(--spacing-sm);
  border-radius: 100vw;
  min-height: calc(42rem / 16);
  transition: all var(--timing-fast) ease-in-out;

  &:hover {
    background-color: light-dark(var(--color-gray-1), var(--color-gray-15));
  }

  &[aria-selected='true'] {
    background-color: light-dark(var(--color-gray-15), var(--color-gray-1));
    color: light-dark(var(--color-gray-0), var(--color-gray-15));
  }

  &:focus-visible {
    outline: 2px solid light-dark(var(--color-gray-8), var(--color-gray-2));
    outline-offset: 2px;
  }
}
</style>
