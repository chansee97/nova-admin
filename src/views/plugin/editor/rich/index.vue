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
  <n-card>
    <RichTextEditor v-model="text" />
  </n-card>
</template>

<style scoped></style>
