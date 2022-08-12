<template>
  <n-tooltip placement="bottom" trigger="hover">
    <template #trigger>
      <HeaderButton @click="handleReload"><e-icon icon="icon-park-outline:refresh" /></HeaderButton>
    </template>
    <span>刷新页面</span>
  </n-tooltip>
</template>

<script setup lang="ts">
import HeaderButton from '../common/HeaderButton.vue';
import { useAppStore } from '@/store';
const appStore = useAppStore();

const handleReload = () => {
  appStore.reloadPage();
};
</script>

<style scoped></style>
