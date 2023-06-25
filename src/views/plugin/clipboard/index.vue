<script setup lang="ts">
const text = ref('Hello v-copy')
</script>

<template>
  <n-card>
    <n-h1> v-copy 使用</n-h1>
    <n-input-group>
      <n-input v-model:value="text" placeholder="请输入要复制的内容" />
      <n-button v-copy="text" type="primary">
        v-copy复制
      </n-button>
    </n-input-group>
  </n-card>
</template>

<style scoped></style>
