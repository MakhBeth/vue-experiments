<script setup lang="ts">
import type { VNode } from 'vue'

defineProps<{
  label?: string
}>()
defineSlots<{
  label: () => VNode | VNode[]
}>()
</script>

<template>
  <div>a</div>
</template>
