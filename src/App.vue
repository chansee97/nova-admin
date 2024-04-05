<script setup lang="ts">
import { darkTheme } from 'naive-ui'
import { useAppStore } from './store'
import { naiveI18nOptions } from '@/utils'

const appStore = useAppStore()

const naiveLocale = computed(() => naiveI18nOptions[appStore.lang])
</script>

<template>
  <n-config-provider
    class="wh-full" inline-theme-disabled :theme="appStore.colorMode === 'dark' ? darkTheme : null"
    :locale="naiveLocale.locale" :date-locale="naiveLocale.dateLocale" :theme-overrides="appStore.theme"
  >
    <naive-provider>
      <router-view />
      <Watermark :show-watermark="appStore.showWatermark" />
    </naive-provider>
  </n-config-provider>
</template>
