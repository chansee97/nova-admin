<template>
  <n-tooltip placement="bottom" trigger="hover">
    <template #trigger>
      <div
        class="hover:bg-hex-F3F4F6 hover:shadow-inner h-full px-4 flex-center cursor-pointer"
        @click="appStore.toggleFullScreen()"
      >
        <e-icon v-show="appStore.fullScreen" icon="icon-park-outline:off-screen-two" />
        <e-icon v-show="!appStore.fullScreen" icon="icon-park-outline:full-screen-two" />
      </div>
    </template>
    <span>全屏</span>
  </n-tooltip>
</template>

<script setup lang="ts">
import { useApp } from '@/store';
const appStore = useApp();
</script>

<style scoped></style>
