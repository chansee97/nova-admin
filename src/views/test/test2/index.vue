<template>
  <div text-center>
    I prove that you have made the ju mp test2.
    <n-button @click="routerPush('/test/test2/detail')">跳转详情子页</n-button>
  </div>
</template>

<script setup lang="ts">
import { useAppRouter } from '@/hooks';
const { routerPush } = useAppRouter();
</script>

<style scoped></style>
