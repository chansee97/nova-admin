<template>
  <div style="text-align: center">
    <h1>{{ msg }}</h1>
    <span>Already configured: vue3、vite3、eslint、prettier、ts、tsx、conventional、husk、lint-staged、vue-router</span>
    <a href="" @click="switchPage('test')">to test page</a>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const msg = ref('It is just a blank template.');

const switchPage = (path: string) => {
  router.push(path);
};
</script>

<style lang="less" scoped></style>
