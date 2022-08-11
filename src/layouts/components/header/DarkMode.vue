<template>
  <n-tooltip placement="bottom" trigger="hover">
    <template #trigger>
      <div
        class="hover:bg-hex-F3F4F6 hover:shadow-inner h-full px-4 flex-center cursor-pointer"
        @click="appStore.toggleDarkMode()"
      >
        <e-icon v-show="appStore.darkMode" icon="icon-park-outline:moon" />
        <e-icon v-show="!appStore.darkMode" icon="icon-park-outline:sun" />
      </div>
    </template>
    <span>切换主题模式</span>
  </n-tooltip>
</template>

<script setup lang="ts">
import { useApp } from '@/store';
const appStore = useApp();
</script>

<style scoped></style>
