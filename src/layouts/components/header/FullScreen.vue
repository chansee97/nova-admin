<template>
  <n-tooltip placement="bottom" trigger="hover">
    <template #trigger>
      <HeaderButton @click="appStore.toggleFullScreen()">
        <i-icon-park-outline-off-screen-two v-if="appStore.fullScreen" class="text-18px" />
        <i-icon-park-outline-full-screen-two v-else class="text-18px" />
      </HeaderButton>
    </template>
    <span>全屏</span>
  </n-tooltip>
</template>

<script setup lang="ts">
import HeaderButton from '../common/HeaderButton.vue';
import { useAppStore } from '@/store';
const appStore = useAppStore();
</script>

<style scoped></style>
