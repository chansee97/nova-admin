<template>
  <n-tooltip placement="bottom" trigger="hover">
    <template #trigger>
      <div class="hover:bg-hex-F3F4F6 hover:shadow-inner h-full px-4 flex-center cursor-pointer" @click="openNotice">
        <e-icon icon="icon-park-outline:remind" />
      </div>
    </template>
    <span>消息通知</span>
  </n-tooltip>
</template>

<script setup lang="ts">
const openNotice = () => {
  console.log('消息通知');
};
</script>

<style scoped></style>
