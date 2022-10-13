<template>
  <div ref="domRef" class="w-full h-full"></div>
</template>

<script setup lang="ts">
import { useScriptTag } from '@vueuse/core';
import { onMounted, ref } from 'vue';
import { GAODE_MAP_SDK_URL } from '@/config';

const { load } = useScriptTag(GAODE_MAP_SDK_URL);
/* https://lbs.amap.com/api/jsapi-v2/summary 高德地图开发文档 */

onMounted(() => {
  initMap();
});

const domRef = ref<HTMLDivElement>();
let map = null;

async function initMap() {
  await load();
  if (!domRef.value) return;
  map = new AMap.Map(domRef.value, {
    zoom: 15,
    center: [117.19, 31.84],
    viewMode: '3D',
  });
}
</script>

<style scoped></style>
