<script setup lang="ts">
import { useAppStore } from '@/store'
import { useRouteStore } from '@/store/route'

const appStore = useAppStore()
const routesStore = useRouteStore()
</script>

<template>
  <n-menu
    :collapsed="appStore.collapsed"
    :collapsed-width="64"
    :indent="20"
    accordion
    :options="routesStore.menus"
    :value="routesStore.activeMenu"
  />
</template>

<style scoped></style>
