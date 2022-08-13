<template>
  <n-menu
    :collapsed="appStore.collapsed"
    :collapsed-width="64"
    :collapsed-icon-size="24"
    :indent="20"
    :options="routesStore.menus"
    @update:value="handleClickMenu"
  />
</template>

<script setup lang="ts">
import { useAppStore } from '@/store';
import { useAppRouter } from '@/hook';
import { useRouteStore } from '~/src/store/modules/route';

const { routerPush } = useAppRouter();
const appStore = useAppStore();
const routesStore = useRouteStore();

const handleClickMenu = (key: string) => {
  routerPush(key);
};
</script>

<style scoped></style>
