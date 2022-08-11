<template>
  <n-tooltip placement="bottom" trigger="hover">
    <template #trigger>
      <HeaderButton @click="openNotice"><e-icon icon="icon-park-outline:remind" /></HeaderButton>
    </template>
    <span>消息通知</span>
  </n-tooltip>
</template>

<script setup lang="ts">
import HeaderButton from '../common/HeaderButton.vue';
const openNotice = () => {
  console.log('消息通知');
};
</script>

<style scoped></style>
