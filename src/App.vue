<script setup lang="ts">
import type { GlobalThemeOverrides } from 'naive-ui'
import { dateZhCN, useOsTheme, zhCN } from 'naive-ui'
import { useAppStore } from './store'
import themeConfig from './theme.json'

const locale = zhCN
const dateLocale = dateZhCN
const appStore = useAppStore()
const osThemeRef = useOsTheme()
appStore.setDarkMode(osThemeRef.value === 'dark')

const themeOverrides: GlobalThemeOverrides = {} || themeConfig
</script>

<template>
  <n-config-provider
    class="wh-full" :theme="appStore.darkTheme" :locale="locale" :date-locale="dateLocale"
    :theme-overrides="themeOverrides"
  >
    <naive-provider><router-view /></naive-provider>
  </n-config-provider>
</template>
