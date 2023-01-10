<template>
  <div
    class="h-60px text-2xl flex-center overflow-hidden cursor-pointer"
    @click="toRoot"
  >
    <SvgIcon
      name="logo"
      :size="28"
    />
    <span
      v-show="!appStore.collapsed"
      class="mx-4"
    >{{ name }}</span>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store';
import { useAppRouter } from '@/hooks';
import { useAppInfo } from '@/hooks';
const { name } = useAppInfo();
const { toRoot } = useAppRouter();
const appStore = useAppStore();
</script>

<style scoped></style>
