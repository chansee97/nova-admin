<template>
  <n-menu
    :collapsed="appStore.collapsed"
    :collapsed-width="64"
    :collapsed-icon-size="24"
    :indent="20"
    accordion
    :options="routesStore.menus"
    :value="routesStore.activeMenu"
    @update:value="handleClickMenu"
  />
</template>

<script setup lang="ts">
import { useAppStore } from '@/store';
import { useAppRouter } from '@/hooks';
import { useRouteStore } from '~/src/store/modules/route';
import type { MenuOption } from 'naive-ui';

const { routerPush } = useAppRouter();
const appStore = useAppStore();
const routesStore = useRouteStore();

const handleClickMenu = (key: string, item: MenuOption) => {
  routerPush(key);
};
</script>

<style scoped></style>
