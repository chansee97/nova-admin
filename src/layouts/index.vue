<script setup lang="ts">
import leftMenu from './leftMenu.layout.vue'
import topMenu from './topMenu.layout.vue'
import { SettingDrawer } from './components'
import { useAppStore } from '@/store/app'

const appStore = useAppStore()
const layoutMap = {
  leftMenu,
  topMenu,
}
</script>

<template>
  <SettingDrawer />
  <component :is="layoutMap[appStore.layoutMode]" />
</template>
