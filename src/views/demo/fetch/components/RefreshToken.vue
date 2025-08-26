<script setup lang="ts">
import {
  fetchRefreshToken,
} from '@/api'

const emit = defineEmits<{
  update: [data: any] // 具名元组语法
}>()

async function updataToken() {
  const res = await fetchRefreshToken({ token: 'test token' })
  emit('update', res)
}
</script>

<template>
  <n-card title="Refresh token" size="small">
    <n-button @click="updataToken">
      click
    </n-button>
  </n-card>
</template>

<style scoped>

</style>
