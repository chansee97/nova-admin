<template>
  <div text-center c-red>I prove that you have made the jump test3.</div>
  <n-button strong secondary type="success" @click="loadingBar.start()">loading-bar</n-button>
</template>

<script setup lang="ts">
import { useLoadingBar } from 'naive-ui';
const loadingBar = useLoadingBar();
</script>

<style scoped></style>
