<template>
  <div class="h-60px text-2xl flex-center overflow-hidden cursor-pointer" @click="pushHome">
    <SvgIcon name="logo" :size="28" />
    <span v-show="!appStore.collapsed" class="mx-4">{{ appStore.title }}</span>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store';
import { useAppRouter } from '@/hook';
const appStore = useAppStore();
const { routerPush } = useAppRouter();
const pushHome = () => {
  routerPush('/');
};
</script>

<style scoped></style>
