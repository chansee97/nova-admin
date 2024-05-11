<script setup lang="ts">
const text = ref('# Hello Editor ![图片描述](https://via.placeholder.com/350x150)')
</script>

<template>
  <n-card title="MarkDown编辑器">
    <n-space vertical :size="12">
      <n-alert title="基于 md-editor-v3 封装" type="success" />
      <MarkDownEditor v-model="text" />
    </n-space>
  </n-card>
</template>

<style scoped></style>
