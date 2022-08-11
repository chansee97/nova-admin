<template>
  <Icon :icon="props.icon" class="inline-block" :width="props.size" />
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
const props = defineProps({
  icon: {
    type: String,
    default: 'icon-park-outline:game',
  },
  size: {
    type: Number,
    default: 18,
  },
});
</script>

<style scoped></style>
