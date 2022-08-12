<template>
  <n-tooltip placement="bottom" trigger="hover">
    <template #trigger>
      <HeaderButton @click="handleRefresh"><e-icon icon="icon-park-outline:refresh" /></HeaderButton>
    </template>
    <span>刷新页面</span>
  </n-tooltip>
</template>

<script setup lang="ts">
import HeaderButton from '../common/HeaderButton.vue';
const handleRefresh = () => {
  window.open('https://github.com/chen-see');
};
</script>

<style scoped></style>
