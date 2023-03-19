<template>
  <div>
    权限示例:
    <n-h1> 当前权限：{{ role }}</n-h1>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store';
const authStore = useAuthStore();
const { role } = authStore.userInfo;
</script>

<style scoped></style>
