<script setup lang="ts">
import { computed, provide, ref, useId, useSlots } from 'vue'
import TabItem from './TheTabs.Item.vue'
import type { TheTabsContext } from './TheTabs.type'

const slots = useSlots()
const id = useId()
const activeTab = ref(`${id}0`)

const validChildren = computed(() => {
  const allSlots = slots.default?.() || []
  return allSlots
    ?.filter((slot) => slot.type === TabItem)
    .map((slot, i) => ({
      ...slot,
      id: `${id}${i}`,
    }))
})

const tabsLabels = computed(() =>
  validChildren.value.map((child) => ({
    label: child?.props?.label,
    tabId: child?.id,
  })),
)

const setActiveTab = (tabId: string) => {
  activeTab.value = tabId
}

provide<TheTabsContext>('tabsContext', {
  activeTab,
  setActiveTab,
})

console.log(1, { validChildren: validChildren.value, tabsLabels: tabsLabels.value })

defineExpose({
  Item: TabItem,
})
</script>

<template>
  <div class="tabs">{{ tabsLabels }}</div>
</template>
