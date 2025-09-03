<script setup lang="tsx">
import type { ProDataTableColumns, ProDataTableDragSortEnd } from 'pro-naive-ui'
import { AimOutlined } from '@vicons/antd'
import { NButton, NIcon } from 'naive-ui'
import { move } from 'pro-naive-ui'
import { onMounted, ref } from 'vue'

interface Song {
  no: number
  title: string
  length: string
}

const dragHandle = ref(true)
const loading = ref(false)

// 初始设置为空数组
const data = ref<Song[]>([])

// 模拟的歌曲数据
const songData: Song[] = [
  { no: 3, title: 'Wonderwall', length: '4:18' },
  { no: 4, title: 'Don\'t Look Back in Anger', length: '4:48' },
  { no: 12, title: 'Champagne Supernova', length: '7:27' },
  { no: 33, title: 'Wonderwall', length: '4:18' },
  { no: 44, title: 'Don\'t Look Back in Anger', length: '4:48' },
  { no: 122, title: 'Champagne Supernova', length: '7:27' },
]

// 模拟异步请求获取数据
function fetchData() {
  loading.value = true
  return new Promise<Song[]>((resolve) => {
    setTimeout(() => {
      resolve(songData)
      loading.value = false
    }, 1500) // 1.5秒后加载完成
  })
}

onMounted(async () => {
  data.value = await fetchData()
})

const columns: ProDataTableColumns<Song> = [
  {
    path: 'dragSort',
  },
  {
    title: '自定义排序名称',
    path: 'dragSort',
    width: 160,
  },
  {
    title: '自定义渲染拖拽手柄',
    path: 'dragSort',
    width: 160,
    render() {
      return (
        <NButton text={true} class="cursor-grab align-middle">
          <NIcon size={16}>
            <AimOutlined />
          </NIcon>
        </NButton>
      )
    },
  },
  {
    title: '不依赖手柄',
    tooltip: '设置为 true 后再来拖拽',
    path: 'length',
  },
]

/**
 * 你需要在这里同步数据源
 */
function onDragSortEnd(event: Parameters<ProDataTableDragSortEnd>['0']) {
  const { newIndex, oldIndex } = event
  move(data.value, oldIndex, newIndex)
}
</script>

<template>
  <pro-data-table
    :data="data"
    :loading
    :columns="columns"
    :drag-sort-options="{
      columnPath: 'dragSort',
      // 为 false 则不限制为手柄拖拽
      handle: dragHandle ? undefined : false,
      onEnd: onDragSortEnd,
    }"
    row-key="no"
  >
    <template #extra>
      <div>
        依赖手柄拖拽: <n-switch v-model:value="dragHandle" />
      </div>
    </template>
  </pro-data-table>
</template>
