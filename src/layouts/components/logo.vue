<template>
  <div class="h-60px text-2xl flex-center">
    <SvgIcon name="logo" class="w-9 h-9" />
    <span v-show="!props.collapsed" class="font-bold mx-5">{{ props.title }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: 'Logo2',
  },
  collapsed: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped></style>
