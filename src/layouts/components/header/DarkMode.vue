<script setup lang="ts">
import HeaderButton from '../common/HeaderButton.vue'
</script>

<template>
  <n-tooltip
    placement="bottom"
    trigger="hover"
  >
    <template #trigger>
      <HeaderButton>
        <DarkModeSwitch />
      </HeaderButton>
    </template>
    <span>切换主题模式</span>
  </n-tooltip>
</template>

<style scoped></style>
