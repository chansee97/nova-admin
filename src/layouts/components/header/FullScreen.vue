<template>
  <n-tooltip placement="bottom" trigger="hover">
    <template #trigger>
      <HeaderButton @click="appStore.toggleFullScreen()">
        <e-icon v-if="appStore.fullScreen" icon="icon-park-outline:off-screen-two" />
        <e-icon v-else icon="icon-park-outline:full-screen-two" />
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
