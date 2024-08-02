<script setup lang="ts">
import {
  expiredTokenRequest,
} from '@/service'

const emit = defineEmits<{
  update: [data: any] // 具名元组语法
}>()

async function expiredToken() {
  const res = await expiredTokenRequest()
  emit('update', res)
}
</script>

<template>
  <n-card title="Token Expiration" size="small">
    注意观察第二次的请求，token已刷新
    <n-button type="error" @click="expiredToken">
      click
    </n-button>
  </n-card>
</template>

<style scoped>

</style>
