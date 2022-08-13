<template>
  <n-tooltip placement="bottom" trigger="hover">
    <template #trigger>
      <HeaderButton @click="handleReload">
        <i-icon-park-outline-refresh class="text-18px" />
      </HeaderButton>
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
