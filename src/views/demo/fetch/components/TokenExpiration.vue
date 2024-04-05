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
    <n-button type="error" @click="expiredToken">
      click
    </n-button>
    <n-alert title="关于401-token失效刷新" type="warning" class="mt-1">
      请在控制台将网络速率设置为最低（1kb左右）后点击查看，否则会造成请求大量发送
    </n-alert>
  </n-card>
</template>

<style scoped>

</style>
