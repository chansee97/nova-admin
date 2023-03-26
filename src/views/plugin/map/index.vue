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
<script lang="ts">
export default {
  name: 'PluginMap', //此处的组件命需要和路由的name保持一致
};
</script>
<script setup lang="ts">
import AMap from './components/AMap.vue';
import BMap from './components/BMap.vue';

const maps = [
  {
    id: 'AMap',
    label: '高德地图',
    component: AMap,
  },
  {
    id: 'BMap',
    label: '百度地图',
    component: BMap,
  },
];
</script>

<style scoped></style>
