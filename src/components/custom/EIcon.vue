<template>
  <n-icon :size="props.size" :depth="props.depth" :color="props.color">
    <Icon :icon="props.icon" />
  </n-icon>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
const props = withDefaults(
  defineProps<{
    icon: string;
    color?: string;
    size?: number;
    depth?: 1 | 2 | 3 | 4 | 5;
  }>(),
  {
    size: 18,
    icon: 'icon-park-outline:baby-feet',
  },
);
</script>

<style scoped></style>
