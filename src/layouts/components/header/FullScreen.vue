<script setup lang="ts">
import { useAppStore } from '@/store'

const appStore = useAppStore()
</script>

<template>
  <n-tooltip placement="bottom" trigger="hover">
    <template #trigger>
      <CommonWrapper @click="appStore.toggleFullScreen()">
        <icon-park-outline-off-screen-two v-if="appStore.fullScreen" />
        <icon-park-outline-full-screen-two v-else />
      </CommonWrapper>
    </template>
    <span>全屏</span>
  </n-tooltip>
</template>

<style scoped></style>
