<template>
  <h1>{{ msg }}</h1>
  <span>Already configured: vue3、vite3、eslint、prettier、ts、tsx、conventional、husk、lint-staged、vue-router</span>
  <a href="" @click="router.push('test')">to test page</a>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const msg = ref('It is just a blank template.');
</script>

<style lang="less" scoped></style>
