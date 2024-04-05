<script setup lang="ts">
const emit = defineEmits<{
  update: [data: any] // 具名元组语法
}>()

async function get() {
  const res = import.meta.env
  emit('update', res)
}
</script>

<template>
  <n-card title="检查环境变量" size="small">
    <n-button @click="get">
      click
    </n-button>
  </n-card>
</template>

<style scoped>

</style>
