<template>
  <div>I prove that you have made the jump.</div>
  <a href="" @click="router.back()">to back</a>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
</script>

<style scoped></style>
