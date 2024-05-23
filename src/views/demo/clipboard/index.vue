<script setup lang="ts">
const text = ref('Hello nova-admin')
</script>

<template>
  <n-card title="剪切板示例">
    <n-h3>v-copy 指令</n-h3>
    <n-input-group>
      <n-input v-model:value="text" placeholder="请输入要复制的内容" />
      <n-button v-copy="text" type="primary">
        v-copy复制
      </n-button>
    </n-input-group>
    <n-h3>copy-text 组件</n-h3>
    <copy-text v-model:value="text" />
  </n-card>
</template>

<style scoped></style>
