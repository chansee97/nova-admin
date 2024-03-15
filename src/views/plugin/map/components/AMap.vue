<script setup lang="ts">
const { load } = useScriptTag('https://webapi.amap.com/maps?v=2.0&key=85e62187c6f8e51c797c87b1f36f787a')
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
