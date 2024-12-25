<script setup lang="ts">
import TheBadge from './components/TheBadge/TheBadge.vue'
import { Tabs } from './components/Tabs'
</script>

<template>
  <Tabs>
    <Tabs.Item>
      <template #label> This is a <TheBadge variant="positive">Tab 1</TheBadge> </template>
      Tab 1 content
    </Tabs.Item>
    <Tabs.Item label="Tab 2"> Tab 2 content </Tabs.Item>
    <Tabs.Item label="Tab 3"> Tab 3 content </Tabs.Item>
    Not a tab content, <em>but it will be rendered</em>
  </Tabs>
</template>
