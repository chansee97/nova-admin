<script setup lang="ts">
import { useAppStore } from './store';
import { zhCN, dateZhCN, GlobalThemeOverrides } from 'naive-ui';
import json from './theme.json';

const locale = zhCN;
const dateLocale = dateZhCN;
const appStore = useAppStore();

const themeOverrides: GlobalThemeOverrides = {} || json;
</script>

<template>
  <n-config-provider
    class="wh-full"
    :theme="appStore.darkTheme"
    :locale="locale"
    :date-locale="dateLocale"
    :theme-overrides="themeOverrides"
  >
    <naive-provider><router-view /></naive-provider>
  </n-config-provider>
</template>

<style scoped></style>
