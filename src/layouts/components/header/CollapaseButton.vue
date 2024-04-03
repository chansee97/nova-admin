<script setup lang="ts">
import { useAppStore } from '@/store'

const appStore = useAppStore()
</script>

<template>
  <n-tooltip placement="bottom" trigger="hover">
    <template #trigger>
      <CommonWrapper @click="appStore.toggleCollapse()">
        <icon-park-outline-menu-unfold v-if="appStore.collapsed" />
        <icon-park-outline-menu-fold v-else />
      </CommonWrapper>
    </template>
    <span>切换侧边栏</span>
  </n-tooltip>
</template>

<style scoped></style>
