<script setup lang="ts">
import type { VNode } from 'vue'

defineProps<{
  label?: string
}>()
defineSlots<{
  label: () => VNode | VNode[]
  default: () => VNode | VNode[]
}>()
</script>

<template>
  <slot />
</template>
