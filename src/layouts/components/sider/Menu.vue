<script setup lang="ts">
import { useAppStore } from '@/store'
import { useRouteStore } from '@/store/route'

const appStore = useAppStore()
const routesStore = useRouteStore()
</script>

<template>
  <n-menu
    :collapsed="appStore.collapsed"
    :indent="20"
    :collapsed-width="64"
    :options="routesStore.menus"
    :value="routesStore.activeMenu"
  />
</template>

<style scoped></style>
