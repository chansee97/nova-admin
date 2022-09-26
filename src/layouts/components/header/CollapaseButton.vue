<template>
  <n-tooltip placement="bottom" trigger="hover">
    <template #trigger>
      <HeaderButton @click="appStore.toggleCollapse()">
        <i-icon-park-outline-menu-unfold v-if="appStore.collapsed" />
        <i-icon-park-outline-menu-fold v-else />
      </HeaderButton>
    </template>
    <span>切换侧边栏</span>
  </n-tooltip>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store';
import HeaderButton from '../common/HeaderButton.vue';

const appStore = useAppStore();
</script>

<style scoped></style>
