<script setup lang="ts">
import { useAppStore } from '@/store/app'
import { SettingDrawer } from './components'
import leftMenu from './leftMenu.layout.vue'
import mixMenu from './mixMenu.layout.vue'
import topMenu from './topMenu.layout.vue'

const appStore = useAppStore()
const layoutMap = {
  leftMenu,
  topMenu,
  mixMenu,
}
</script>

<template>
  <SettingDrawer />
  <component :is="layoutMap[appStore.layoutMode]" />
</template>
