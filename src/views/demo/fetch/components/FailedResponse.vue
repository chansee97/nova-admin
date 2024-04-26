<script setup lang="ts">
import {
  FailedResponse,
} from '@/service'

const emit = defineEmits<{
  update: [data: any] // 具名元组语法
}>()

async function failedResponse() {
  const res = await FailedResponse()
  emit('update', res)
}
</script>

<template>
  <n-card title="失败-业务操作错误" size="small">
    <n-button type="error" @click="failedResponse">
      click
    </n-button>
  </n-card>
</template>

<style scoped>

</style>
