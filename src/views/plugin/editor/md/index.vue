<script setup lang="ts">
const text = ref('# Hello Editor ![图片描述](https://via.placeholder.com/350x150)')
</script>

<template>
  <n-card title="MarkDown编辑器">
    <n-space vertical :size="12">
      <n-alert :show-icon="false" type="info">
        使用 md-editor-v3 实现
      </n-alert>
      <MarkDownEditor v-model="text" />
    </n-space>
  </n-card>
</template>

<style scoped></style>
