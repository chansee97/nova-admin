<script setup lang="ts">
const text = ref('')
// 模拟 ajax 异步获取内容
onMounted(() => {
  setTimeout(() => {
    text.value = '<p>模拟 Ajax 异步设置内容</p>'
  }, 1500)
})
</script>

<template>
  <n-card title="富文本编辑器">
    <n-space vertical :size="12">
      <n-alert title="基于 Quill 封装" type="success" />
      <n-space :size="12">
        <div class="h-2xl">
          <RichTextEditor v-model="text" />
        </div>
        <div>
          <n-h2>v-html 预览</n-h2>
          <div v-html="text" />
        </div>
      </n-space>
    </n-space>
  </n-card>
</template>

<style scoped></style>
