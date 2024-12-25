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
  validChildren.value.map((child) => {
    if (child.props && 'label' in child.props) {
      return {
        label: child.props.label,
        tabId: child.id,
      }
    }
    if (typeof child.children !== 'string' && !Array.isArray(child.children)) {
      return {
        label: child.children?.label,
        tabId: child.id,
      }
    }
    throw new Error('Pass a valid label plz')
  }),
)

const setActiveTab = (tabId: string) => {
  activeTab.value = tabId
}

provide<TheTabsContext>('tabsContext', {
  activeTab,
  setActiveTab,
})

defineExpose({
  Item: TabItem,
})
</script>

<template>
  <div class="tabs">
    <div v-for="{ label, tabId } in tabsLabels" :key="tabId">
      <div v-if="typeof label === 'string'">{{ label }}</div>
      <div v-else><component :is="label" /></div>
    </div>
  </div>
</template>
