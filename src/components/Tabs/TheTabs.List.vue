<script setup lang="ts">
import { computed } from 'vue'
import type { TabLabels } from './TheTabs.type'
import Button from './TheTabs.Button.vue'
defineProps<{
  tabsLabels: TabLabels
}>()

const handleKeyDown = computed(() => (event: KeyboardEvent) => {
  const parent = event.currentTarget as HTMLDivElement
  const buttons = Array.from(parent.querySelectorAll("button[role='tab']"))
  const currentIndex = buttons.findIndex((button) => button === event.target)
  let newIndex = currentIndex
  switch (event.key) {
    case 'Home':
      newIndex = 0
      break
    case 'ArrowRight':
    case 'ArrowUp':
      newIndex = (currentIndex + 1) % buttons.length
      break
    case 'ArrowLeft':
    case 'ArrowDown':
      newIndex = (currentIndex - 1 + buttons.length) % buttons.length
      break
    case 'End':
      newIndex = buttons.length - 1
      break
    default:
      return
  }
  const next = buttons[newIndex] as HTMLButtonElement
  next.focus()
  event.preventDefault()
})
</script>

<template>
  <div role="tablist" class="tabslist" @keydown="handleKeyDown">
    <Button v-for="{ label, tabId } in tabsLabels" :id="tabId" :key="tabId">
      <div v-if="typeof label === 'string'">{{ label }}</div>
      <div v-else><component :is="label" /></div>
    </Button>
  </div>
</template>

<style scoped>
.tabslist {
  display: flex;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-md);
}
</style>
