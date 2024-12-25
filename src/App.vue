<script setup lang="ts">
import TheBadge from './components/TheBadge/TheBadge.vue'
import { Tabs } from './components/Tabs'
</script>

<template>
  <Tabs>
    <Tabs.Item>
      <template #label>
        <TheBadge>Tab 1</TheBadge>
      </template>
      Tab 1 content
    </Tabs.Item>
    <Tabs.Item label="Tab 2"> Tab 2 content </Tabs.Item>
    <Tabs.Item label="Tab 3"> Tab 3 content </Tabs.Item>
  </Tabs>
</template>
