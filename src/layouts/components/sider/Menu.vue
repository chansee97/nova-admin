<script setup lang="ts">
import type { MenuInst } from 'naive-ui'
import { useAppStore } from '@/store'
import { useRouteStore } from '@/store/route'

const route = useRoute()
const appStore = useAppStore()
const routesStore = useRouteStore()
const menuInstRef = ref<MenuInst | null>(null)

watch(
  () => route.path,
  () => {
    menuInstRef.value?.showOption(routesStore.activeMenu as string)
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
    :options="routesStore.menus"
    :value="routesStore.activeMenu"
  />
</template>

<style scoped></style>
