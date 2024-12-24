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
    aria-labelledby="{`button-${id}`}"
    role="tabpanel"
    key="{id}"
    id="{id}"
    :hidden="activeTab !== id"
  >
    <slot />
  </div>
</template>
