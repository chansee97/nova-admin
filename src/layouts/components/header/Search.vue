<script setup lang="ts">
import HeaderButton from '../common/HeaderButton.vue'

function handleSearch() {
  window.$message?.success('施工中...')
}
</script>

<template>
  <n-tooltip
    placement="bottom"
    trigger="hover"
  >
    <template #trigger>
      <HeaderButton @click="handleSearch">
        <i-icon-park-outline-search />
      </HeaderButton>
    </template>
    <span>搜索</span>
  </n-tooltip>
</template>

<style scoped></style>
