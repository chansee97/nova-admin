<script setup lang="ts">
import type { GlobalThemeOverrides } from 'naive-ui'
import { darkTheme, dateZhCN, zhCN } from 'naive-ui'
import { useAppStore } from './store'
import themeConfig from './theme.json'

const locale = zhCN
const dateLocale = dateZhCN
const appStore = useAppStore()
// const osThemeRef = useOsTheme()
// appStore.toggleDarkMode(osThemeRef.value === 'dark')

const themeOverrides: GlobalThemeOverrides = {} || themeConfig
</script>

<template>
  <n-config-provider
    class="wh-full" :theme="appStore.darkMode ? darkTheme : null" :locale="locale" :date-locale="dateLocale"
    :theme-overrides="themeOverrides"
  >
    <naive-provider><router-view /></naive-provider>
  </n-config-provider>
</template>
