<script setup lang="ts">
import { computed, provide, ref, useId, useSlots, type ComputedRef } from 'vue'
import type { TabLabels, TheTabsContext } from './TheTabs.type'
import Item from './TheTabs.Item.vue'
import List from './TheTabs.List.vue'
import Tab from './TheTabs.Tab.vue'

const slots = useSlots()
const id = useId()
const activeTab = ref(`${id}0`)
const allSlots = computed(() => slots.default?.() || [])

const isItemComponent = computed(() => (slot: { type: unknown }) => slot.type === Item)

const validChildren = computed(() => {
  return allSlots.value?.filter(isItemComponent.value).map((slot, i) => ({
    ...slot,
    id: `${id}${i}`,
  }))
})

const tabsLabels: ComputedRef<TabLabels> = computed(() =>
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

const nonItemSlots = computed(() => allSlots.value.filter((slot) => !isItemComponent.value(slot)))

defineExpose({
  Item: Item,
})
</script>

<template>
  <div class="tabs">
    <List :tabs-labels="tabsLabels" />
    <Tab v-for="child in validChildren" :key="child.id" :id="child.id">
      <component :is="child" />
    </Tab>
    <component v-for="(child, index) in nonItemSlots" :key="index" :is="child"> </component>
  </div>
</template>
