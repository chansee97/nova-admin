<script setup lang="ts">
import {
  fetchFormPost,
} from '@/service'

const emit = defineEmits<{
  update: [data: any] // 具名元组语法
}>()

async function post() {
  const params = {
    data: '2022-2-2',
    name: 'for',
  }
  const res = await fetchFormPost(params)
  emit('update', res)
}
</script>

<template>
  <n-card title="formPost" size="small">
    <n-button @click="post">
      click
    </n-button>
  </n-card>
</template>

<style scoped>

</style>
