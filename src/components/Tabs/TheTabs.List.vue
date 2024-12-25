<script setup lang="ts">
import { computed } from 'vue'
import type { TabLabels } from './TheTabs.type'
import Button from './TheTabs.Button.vue'
import type { TheTabsContext } from './TheTabs.type'
import { inject } from 'vue'

defineProps<{
  tabsLabels: TabLabels
}>()

const { activeTab } = inject<TheTabsContext>('tabsContext') || {}

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
  <div
    role="tablist"
    class="tabslist"
    @keydown="handleKeyDown"
    :style="{ '--active-tab': `--tab-${activeTab}` }"
  >
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

  &::before {
    background-color: light-dark(var(--color-gray-15), var(--color-gray-1));
    border-radius: 0;
    border-radius: 100vh;
    content: '';
    height: anchor-size(var(--active-tab) height);
    left: anchor(var(--active-tab) left);
    opacity: 1;
    position: absolute;
    top: anchor(var(--active-tab) top);
    transition: all calc(var(--timing) * 0.2) ease-in-out;
    view-transition-name: target;
    width: anchor-size(var(--active-tab) width);
    z-index: -1;
  }
}
</style>
