<script setup lang="ts">
import { darkTheme, dateZhCN, zhCN } from 'naive-ui'
import { useAppStore } from './store'

const locale = zhCN
const dateLocale = dateZhCN
const appStore = useAppStore()
</script>

<template>
  <n-config-provider
    class="wh-full"
    inline-theme-disabled
    :theme="appStore.darkMode ? darkTheme : null"
    :locale="locale"
    :date-locale="dateLocale"
    :theme-overrides="appStore.theme"
  >
    <naive-provider><router-view /></naive-provider>
  </n-config-provider>
</template>
