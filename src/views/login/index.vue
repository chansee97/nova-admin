<template>
  <div text-center flex-col-center wh-full>
    <h1 font="bold" text-5xl>{{ msg }}</h1>
    <div m-10>
      Already configured: vue3、vite3、unocss、eslint、prettier、ts、tsx、conventional、husk、lint-staged、vue-router
    </div>
    <div c-lightBlue><router-link to="/">Go to layout</router-link></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const msg = ref('It is just a blank template.');
</script>

<style lang="less" scoped></style>
