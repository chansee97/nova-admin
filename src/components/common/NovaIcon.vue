<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface iconPorps {
  /* 图标名称 */
  icon?: string
  /* 图标颜色 */
  color?: string
  /* 图标大小 */
  size?: number
  /* 图标深度 */
  depth?: 1 | 2 | 3 | 4 | 5
}
const props = withDefaults(defineProps<iconPorps>(), {
  size: 18,
})
</script>

<template>
  <n-icon
    v-if="props.icon"
    :size="props.size"
    :depth="props.depth"
    :color="props.color"
  >
    <Icon :icon="props.icon" />
  </n-icon>
</template>

<style scoped></style>
