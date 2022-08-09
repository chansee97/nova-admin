<script setup lang="ts">
// import { darkTheme } from 'naive-ui';
import { zhCN, dateZhCN, GlobalThemeOverrides } from 'naive-ui';
import json from './theme.json';

const locale = zhCN;
const dateLocale = dateZhCN;

const themeOverrides: GlobalThemeOverrides = {} || json;
</script>

<template>
  <n-config-provider wh-full :theme="null" :locale="locale" :date-locale="dateLocale" :theme-overrides="themeOverrides">
    <router-view />
  </n-config-provider>
</template>

<style scoped></style>
