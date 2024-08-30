<script lang="ts">
</script>

<script setup lang="ts">
import AMap from './components/AMap.vue'
import BMap from './components/BMap.vue'

defineOptions({
  name: 'map',
})

const maps = [
  {
    id: 'BMap',
    label: '百度地图',
    component: BMap,
  },
  {
    id: 'AMap',
    label: '高德地图',
    component: AMap,
  },
]
</script>

<template>
  <n-card title="地图示例(keepalive缓存)">
    <n-tabs
      type="line"
      animated
    >
      <n-tab-pane
        v-for="item in maps"
        :key="item.id"
        :name="item.id"
        :tab="item.label"
        class="h-600px"
      >
        <component :is="item.component" />
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<style scoped></style>
