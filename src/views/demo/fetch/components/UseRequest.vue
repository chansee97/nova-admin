<script setup lang="ts">
import {
  fetchGet,
} from '@/service'

import { useRequest } from 'alova/client'

const emit = defineEmits<{
  update: [data: any] // 具名元组语法
}>()

const { data: fetchGetData, send: sendFetchGet } = useRequest(fetchGet({ a: 112211 }), {
  // 当immediate为false时，默认不发出
  immediate: false,
})

async function handleRequestHook() {
  await sendFetchGet()
  emit('update', fetchGetData.value)
}
</script>

<template>
  <n-card title="useRequest风格" size="small">
    <n-button @click="handleRequestHook">
      click
    </n-button>
  </n-card>
</template>

<style scoped>

</style>
