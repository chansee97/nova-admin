<template>
  <div text-center c-yellow>I prove that you have made the jump test2.</div>
  {{ userStore.name }}
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useStore } from '@/store/modules';

const userStore = useStore();

const router = useRouter();
</script>

<style scoped></style>
