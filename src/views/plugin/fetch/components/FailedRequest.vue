<script setup lang="ts">
import {
  FailedRequest,
} from '@/service'

const emit = defineEmits<{
  update: [data: any] // 具名元组语法
}>()

async function failedRequest() {
  const res = await FailedRequest()
  emit('update', res)
}
</script>

<template>
  <n-card title="失败-服务器错误" size="small">
    <n-button type="error" @click="failedRequest">
      click
    </n-button>
  </n-card>
</template>

<style scoped>

</style>
