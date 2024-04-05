<script setup lang="ts">
import {
  getBlob,
} from '@/service'

const emit = defineEmits<{
  update: [data: any]
}>()

const filePath = ref('https://images.unsplash.com/photo-1663529628961-80aa6ebcd157?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80')

async function getBlobFile() {
  const res = await getBlob(filePath.value)
  emit('update', 'fileOk')
  downloadLink(res, 'fileOk')
}

function downloadLink(data: Blob, name: string) {
  const link = URL.createObjectURL(data)
  const eleLink = document.createElement('a')
  eleLink.download = name
  eleLink.style.display = 'none'
  eleLink.href = link
  document.body.appendChild(eleLink)
  eleLink.click()
  document.body.removeChild(eleLink)
}
</script>

<template>
  <n-card title="下载文件" size="small">
    <n-button @click="getBlobFile">
      click
    </n-button>
  </n-card>
</template>

<style scoped>

</style>
