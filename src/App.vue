<script setup lang="ts">
import TheBadge from './components/TheBadge/TheBadge.vue'
import { Tabs } from './components/Tabs'
</script>

<template>
  <TheBadge>Positive</TheBadge>
  <Tabs>
    <Tabs.Item label="Tab 1">Tab 1</Tabs.Item>
    <Tabs.Item label="Tab 21">Tab 2</Tabs.Item>
  </Tabs>
</template>
