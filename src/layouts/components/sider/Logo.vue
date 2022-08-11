<template>
  <div class="h-60px text-2xl flex-center overflow-hidden">
    <SvgIcon name="logo" class="w-9 h-9" />
    <div v-show="!appStore.collapsed" class="mx-5">{{ appStore.title }}</div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store';
const appStore = useAppStore();
</script>

<style scoped></style>
