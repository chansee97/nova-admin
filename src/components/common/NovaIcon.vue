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
  isLocal: false,
})

const isLocal = computed(() => {
  return props.icon && props.icon.startsWith('local:')
})

function getLocalIcon(icon: string) {
  const svgName = icon.replace('local:', '')
  const svg = import.meta.glob('@/assets/svg-icons/*.svg', {
    query: '?raw',
    import: 'default',
    eager: true,
  })
  return svg[`/src/assets/svg-icons/${svgName}.svg`]
}
</script>

<template>
  <n-icon
    v-if="icon && !isLocal"
    :size="size"
    :depth="depth"
    :color="color"
  >
    <Icon :icon="icon" />
  </n-icon>
  <n-icon
    v-if="icon && isLocal"
    :size="size"
    :depth="depth"
    :color="color"
    v-html="getLocalIcon(icon)"
  />
</template>

<style scoped></style>
