<template>
  <div text-center>
    这个页面包含了一个不在侧边菜单的详情页面
    <n-button @click="routerPush('/test/test2/detail')">
      跳转详情子页
    </n-button>
  </div>
</template>

<script setup lang="ts">
import { useAppRouter } from '@/hooks';
const { routerPush } = useAppRouter();
</script>

<style scoped></style>
