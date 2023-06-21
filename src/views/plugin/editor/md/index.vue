<script setup lang="ts">
const text = ref('# Hello Editor ![图片描述](https://via.placeholder.com/350x150)')
</script>

<template>
  <n-card>
    <MdEditor v-model="text" />
  </n-card>
</template>

<style scoped></style>
