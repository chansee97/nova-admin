<script setup lang="ts">
import { ref } from 'vue'
import { useClipBoard } from '@/hooks'

const { copy } = useClipBoard()
const text = ref('Hello Clipboard')
</script>

<template>
  <n-card>
    <n-input-group>
      <n-input v-model:value="text" placeholder="请输入要复制的内容" />
      <n-button type="primary" @click="copy(text)">
        复制
      </n-button>
    </n-input-group>
  </n-card>
</template>

<style scoped></style>
