<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface iconPorps {
  icon?: string
  color?: string
  size?: number
  depth?: 1 | 2 | 3 | 4 | 5
}
const props = withDefaults(defineProps<iconPorps>(), {
  size: 18,
  icon: 'icon-park-outline:baby-feet',
})
</script>

<template>
  <n-icon
    :size="props.size"
    :depth="props.depth"
    :color="props.color"
  >
    <Icon :icon="props.icon" />
  </n-icon>
</template>

<style scoped></style>
