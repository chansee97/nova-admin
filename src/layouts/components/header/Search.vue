<template>
  <n-tooltip placement="bottom" trigger="hover">
    <template #trigger>
      <HeaderButton @click="handleSearch">
        <i-icon-park-outline-search class="text-18px" />
      </HeaderButton>
    </template>
    <span>搜索</span>
  </n-tooltip>
</template>

<script setup lang="ts">
import HeaderButton from '../common/HeaderButton.vue';
const handleSearch = () => {
  window.open('https://github.com/chen-see');
};
</script>

<style scoped></style>
