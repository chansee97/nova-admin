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

<script setup lang="ts">
import { useAppStore } from './store';
import {
	zhCN,
	dateZhCN,
	GlobalThemeOverrides,
	useOsTheme,
	darkTheme,
} from 'naive-ui';
import themeConfig from './theme.json';

const locale = zhCN;
const dateLocale = dateZhCN;
const appStore = useAppStore();

const osThemeRef = useOsTheme();
appStore.setDarkMode(osThemeRef.value === 'dark');

const themeOverrides: GlobalThemeOverrides = themeConfig;
</script>

<style scoped></style>
