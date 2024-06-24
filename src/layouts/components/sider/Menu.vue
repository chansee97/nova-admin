<script setup lang="ts">
import type { MenuInst } from 'naive-ui'
import { useAppStore, useRouteStore } from '@/store'

const route = useRoute()
const appStore = useAppStore()
const routeStore = useRouteStore()

const menuInstRef = ref<MenuInst | null>(null)
watch(
  () => route.path,
  () => {
    menuInstRef.value?.showOption(routeStore.activeMenu as string)
  },
  { immediate: true },
)
</script>

<template>
  <n-menu
    ref="menuInstRef"
    :collapsed="appStore.collapsed"
    :indent="20"
    :collapsed-width="64"
    :options="routeStore.menus"
    :value="routeStore.activeMenu"
  />
</template>
