<template>
  <div class="h-60px text-2xl flex-center overflow-hidden cursor-pointer" @click="toRoot">
    <SvgIcon name="logo" :size="28" />
    <span v-show="!appStore.collapsed" class="mx-4">{{ appStore.title }}</span>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store';
import { useAppRouter } from '@/hooks';
const { toRoot } = useAppRouter();
const appStore = useAppStore();
</script>

<style scoped></style>
