<script setup lang="ts">
// import { darkTheme } from 'naive-ui';
import { zhCN, dateZhCN, GlobalThemeOverrides } from 'naive-ui';

const locale = zhCN;
const dateLocale = dateZhCN;

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#316C72FF',
    primaryColorHover: '#316C72E3',
    primaryColorPressed: '#2B4C59FF',
    primaryColorSuppl: '#316C7263',
  },
};
</script>

<template>
  <n-config-provider wh-full :theme="null" :locale="locale" :date-locale="dateLocale" :theme-overrides="themeOverrides">
    <router-view />
  </n-config-provider>
</template>

<style scoped></style>
