<script setup lang="ts">
import {
  fetchGet,
} from '@/service'

const emit = defineEmits<{
  update: [data: any] // 具名元组语法
}>()

async function pinterEnv() {
  const res = await fetchGet({ a: 112211, b: false })
  emit('update', res)
}
</script>

<template>
  <n-card title="Get" size="small">
    <n-button @click="pinterEnv">
      click
    </n-button>
  </n-card>
</template>

<style scoped>

</style>
