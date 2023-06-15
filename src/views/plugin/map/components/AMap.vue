<script setup lang="ts">
import { useScriptTag } from '@vueuse/core'
import { GAODE_MAP_SDK_URL } from '@/config'

const { load } = useScriptTag(GAODE_MAP_SDK_URL)
/* https://lbs.amap.com/api/jsapi-v2/summary 高德地图开发文档 */

onMounted(() => {
  initMap()
})

const domRef = ref<HTMLDivElement>()
const map = ref()

async function initMap() {
  await load()
  if (!domRef.value)
    return
  map.value = new AMap.Map(domRef.value, {
    zoom: 15,
    center: [117.19, 31.84],
    viewMode: '3D',
  })
}
</script>

<template>
  <div
    ref="domRef"
    class="w-full h-full"
  />
</template>

<style scoped></style>
