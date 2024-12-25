<script setup lang="ts">
import { inject, watch, defineEmits } from 'vue'
import type { CSSProperties } from 'vue'
import type { TheTabsContext } from './TheTabs.type'
import { useTemplateRef } from 'vue'
import { useCSSSupports } from '@/composables/useCSSSupports'
import { onMounted } from 'vue'

const props = defineProps<{
  id: string
}>()

const emit = defineEmits<{
  anchor: [element: HTMLButtonElement]
}>()

const { activeTab, setActiveTab } = inject<TheTabsContext>('tabsContext') || {}

const handleClick = () => {
  if (!setActiveTab) return
  setActiveTab(props.id)
}

const buttonStyle = {
  'anchor-name': `--tab-${props.id}`,
} as CSSProperties

const supportsAnchorName = useCSSSupports('(anchor-name: --a)')
const buttonRef = useTemplateRef<HTMLButtonElement>('buttonRef')

const emitAnchor = (anchor: HTMLButtonElement | null) => {
  if (activeTab?.value === props.id && anchor && !supportsAnchorName.value) {
    emit('anchor', anchor)
  }
}
onMounted(() => {
  emitAnchor(buttonRef.value)
})

watch(
  () => activeTab?.value,
  () => emitAnchor(buttonRef.value),
)
</script>

<template>
  <button
    ref="buttonRef"
    role="tab"
    :aria-selected="activeTab === id"
    :aria-controls="id"
    :id="`button-${id}`"
    @click="handleClick"
    :style="buttonStyle"
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

  &:hover:not([aria-selected='true']) {
    background-color: light-dark(var(--color-gray-1), var(--color-gray-15));
  }

  &[aria-selected='true'] {
    color: light-dark(var(--color-gray-0), var(--color-gray-15));
  }

  &:focus-visible {
    outline: 2px solid light-dark(var(--color-gray-8), var(--color-gray-2));
    outline-offset: 2px;
  }
}
</style>
