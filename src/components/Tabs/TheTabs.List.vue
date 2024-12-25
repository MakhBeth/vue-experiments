<script setup lang="ts">
import { computed } from 'vue'
import type { TabLabels } from './TheTabs.type'
import Button from './TheTabs.Button.vue'
import type { TheTabsContext } from './TheTabs.type'
import { inject } from 'vue'
import { useDebouncedResize } from '@/composables/useDebouncedResize'
import { useCSSSupports } from '@/composables/useCSSSupports'
import { useTemplateRef } from 'vue'
import { ref } from 'vue'
import { watch } from 'vue'
import type { CSSProperties } from 'vue'

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

const supportsAnchorName = useCSSSupports('(anchor-name: --a)')
const width = useDebouncedResize()
const tabsListRef = useTemplateRef<HTMLDivElement>('tabsListRef')
const activeButtonElement = ref<HTMLButtonElement | null>(null)

const handleAnchor = (anchor: HTMLButtonElement) => {
  activeButtonElement.value = anchor
}

const tabButtonStyleFallback = ref<CSSProperties>({})

watch([width, activeButtonElement], () => {
  const buttonRect = activeButtonElement.value?.getBoundingClientRect()
  const parentRect = tabsListRef.value?.getBoundingClientRect()

  if (buttonRect && parentRect) {
    const relativeRect = {
      '--tab-button-top': `${buttonRect.top - parentRect.top}px`,
      '--tab-button-left': `${buttonRect.left - parentRect.left}px`,
      '--tab-button-width': `${buttonRect.width}px`,
      '--tab-button-height': `${buttonRect.height}px`,
    }
    tabButtonStyleFallback.value = relativeRect
  }
})
</script>

<template>
  <div
    role="tablist"
    class="tabslist"
    :class="{ 'no-support-anchor-name': !supportsAnchorName }"
    @keydown="handleKeyDown"
    :style="{ '--active-tab': `--tab-${activeTab}`, ...tabButtonStyleFallback }"
    ref="tabsListRef"
  >
    <Button @anchor="handleAnchor" v-for="{ label, tabId } in tabsLabels" :id="tabId" :key="tabId">
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

  &.no-support-anchor-name::before {
    width: var(--tab-button-width);
    left: var(--tab-button-left);
    top: var(--tab-button-top);
    height: var(--tab-button-height);
  }
}
</style>
