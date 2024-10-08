<script setup lang="ts">
import { useTabStore } from '@/store'

const { modifyTab } = useTabStore()

const { fullPath, query } = useRoute()

modifyTab(fullPath, (target) => {
  target.meta.title = `详情页${query.id}`
})
</script>

<template>
  <n-space vertical>
    <n-alert title="目前可公开的情报" type="warning">
      这是详情子页，他不会出现在侧边栏,他其实是上个页面的同级，并不是下级，这个要注意
    </n-alert>

    <n-h2>
      详情页id:{{ query.id }}
    </n-h2>
  </n-space>
</template>

<style scoped></style>
