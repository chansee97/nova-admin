<script setup lang="ts">
import {
  fetchPost,
} from '@/service'

const emit = defineEmits<{
  update: [data: any] // 具名元组语法
}>()

async function post() {
  const params = {
    data: '2022-2-2',
    data1: [],
    data2: {},
    data3: '',
    data4: null,
    data5: undefined,
  }
  const res = await fetchPost(params)
  emit('update', res)
}
</script>

<template>
  <n-card title="Post" size="small">
    <n-button @click="post">
      click
    </n-button>
  </n-card>
</template>

<style scoped>

</style>
