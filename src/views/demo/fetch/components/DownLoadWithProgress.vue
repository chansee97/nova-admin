<script setup lang="ts">
import {
  downloadFile,
} from '@/service'
import { useRequest } from 'alova/client'

const emit = defineEmits<{
  update: [data: any]
}>()

const filePath = ref('https://images.unsplash.com/photo-1663529628961-80aa6ebcd157?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80')

const { downloading, abort, send, data } = useRequest(downloadFile(filePath.value), {
  // 当immediate为false时，默认不发出
  immediate: false,
})

const downloadProcess = computed(() => {
  if (!downloading.value.loaded)
    return 0
  return Math.floor(downloading.value.loaded / downloading.value.total * 100)
})

async function handleDownloadFile() {
  await send()
  emit('update', 'fileOk')
  downloadLink(data.value, 'fileOk')
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
  <n-card title="带进度的下载文件" size="small">
    <n-space vertical>
      <n-input v-model:value="filePath" />
      <div>文件大小：{{ downloading.total }}B</div>
      <div>已下载：{{ downloading.loaded }}B</div>
      <n-progress type="line" indicator-placement="inside" :percentage="downloadProcess" />
      <n-space>
        <n-button strong secondary @click="handleDownloadFile">
          开始下载
        </n-button>
        <n-button strong secondary type="warning" @click="abort">
          中断下载
        </n-button>
      </n-space>
    </n-space>
  </n-card>
</template>

<style scoped>

</style>
