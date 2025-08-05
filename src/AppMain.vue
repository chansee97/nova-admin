<script setup lang="ts">
import type { App } from 'vue'
import { installRouter } from '@/router'
import { installPinia } from '@/store'
import { naiveI18nOptions } from '@/utils'
import { darkTheme } from 'naive-ui'
import { useAppStore } from './store'

// 创建异步初始化 Promise - 这会让组件变成异步组件
const initializationPromise = (async () => {
  // 获取当前应用实例
  const app = getCurrentInstance()?.appContext.app
  if (!app) {
    throw new Error('Failed to get app instance')
  }

  // 注册模块 Pinia
  await installPinia(app)

  // 注册模块 Vue-router
  await installRouter(app)

  // 注册模块 指令/静态资源
  const modules = import.meta.glob<{ install: (app: App) => void }>('./modules/*.ts', {
    eager: true,
  })

  Object.values(modules).forEach(module => app.use(module))

  return true
})()

// 等待初始化完成 - 这使得整个 setup 函数变成异步的
await initializationPromise

const appStore = useAppStore()

const naiveLocale = computed(() => {
  return naiveI18nOptions[appStore.lang] ? naiveI18nOptions[appStore.lang] : naiveI18nOptions.enUS
})
</script>

<template>
  <n-config-provider
    class="wh-full"
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
  </n-config-provider>
</template>
