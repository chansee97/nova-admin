<template>
  <n-icon :size="props.size || 20" :depth="props.depth" :color="props.color">
    <Icon :icon="props.icon" />
  </n-icon>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
const props = defineProps<{
  icon: string;
  color?: string;
  size?: number;
  depth?: 1 | 2 | 3 | 4 | 5;
}>();
</script>

<style scoped></style>
