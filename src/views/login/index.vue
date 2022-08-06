<template>
  <div style="text-align: center">
    <h1>{{ msg }}</h1>
    <span>
      Already configured: vue3、vite3、unocss、eslint、prettier、ts、tsx、conventional、husk、lint-staged、vue-router
    </span>
    <div><router-link to="/">Go to layout</router-link></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const msg = ref('It is just a blank template.');
</script>

<style lang="less" scoped></style>
