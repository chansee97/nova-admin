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

<script setup lang="ts">
import { useAppStore } from '@/store';
import { useRouteStore } from '~/src/store/modules/route';

const appStore = useAppStore();
const routesStore = useRouteStore();

</script>

<style scoped></style>
