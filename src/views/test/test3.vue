<template>
  <div text-center c-red>I prove that you have made the jump test3.</div>
  <n-button strong secondary type="success" @click="testMsg">testMsg</n-button>
</template>

<script setup lang="ts">
const testMsg = () => {
  window.$message.error('Once upon a time you dressed so fine');
};
</script>

<style scoped></style>
