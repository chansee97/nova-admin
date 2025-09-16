<script setup lang="ts">
import { useAppStore } from '@/store'
import { naiveI18nOptions } from '@/utils'
import { darkTheme } from 'naive-ui'

const appStore = useAppStore()

const naiveLocale = computed(() => {
  return naiveI18nOptions[appStore.lang] ? naiveI18nOptions[appStore.lang] : naiveI18nOptions.enUS
})

const propOverrides = {
  ProSearchForm: {
    labelPlacement: 'left',
    cols: 4,
  },
  ProModalForm: {
    labelWidth: 100,
    labelPlacement: 'left',
    preset: 'card',
  },
  ProDataTable: {
    tableCardProps: {
      size: 'small',
    },
    size: 'small',
    paginateSinglePage: false,
  },
}
</script>

<template>
  <pro-config-provider
    :prop-overrides="propOverrides"
    abstract
    inline-theme-disabled
    :theme="appStore.colorMode === 'dark' ? darkTheme : null"
    :locale="naiveLocale.locale"
    :date-locale="naiveLocale.dateLocale"
    :theme-overrides="appStore.theme"
  >
    <naive-provider>
      <router-view />
      <Watermark :show-watermark="appStore.showWatermark" />
    </naive-provider>
  </pro-config-provider>
</template>
