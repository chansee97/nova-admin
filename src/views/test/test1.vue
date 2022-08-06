<template>
  <div text-center c-blue>I prove that you have made the jump test1.</div>
  <div @click="pinter">click me</div>
</template>

<script setup lang="ts">
const pinter = () => {
  console.log('打印环境配置', import.meta.env);
};
</script>

<style scoped></style>
