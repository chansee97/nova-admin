<template>
  <n-tooltip placement="bottom" trigger="hover">
    <template #trigger>
      <HeaderButton @click="appStore.toggleDarkMode()">
        <i-icon-park-outline-moon v-if="appStore.darkMode" />
        <i-icon-park-outline-sun v-else />
      </HeaderButton>
    </template>
    <span>切换主题模式</span>
  </n-tooltip>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store';
import HeaderButton from '../common/HeaderButton.vue';

const appStore = useAppStore();
</script>

<style scoped></style>
