<script setup lang="ts">
import {
  fetchDelete,
} from '@/service'

const emit = defineEmits<{
  update: [data: any] // 具名元组语法
}>()

async function handleDelete() {
  const res = await fetchDelete()
  emit('update', res)
}
</script>

<template>
  <n-card title="Delete" size="small">
    <n-button @click="handleDelete">
      click
    </n-button>
  </n-card>
</template>

<style scoped>

</style>
