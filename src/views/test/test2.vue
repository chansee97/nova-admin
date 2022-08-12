<template>
  <div text-center c-yellow>I prove that you have made the ju mp test2. {{ userStore.name }}</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store';

const userStore = useAuthStore();

const router = useRouter();
</script>

<style scoped></style>
