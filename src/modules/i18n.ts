import { createI18n } from 'vue-i18n'
import type { App } from 'vue'
import enUS from '../../locales/enUS.json'
import zhCN from '../../locales/zhCN.json'
import { local } from '@/utils'

export const i18n = createI18n({
  legacy: false,
  locale: local.get('lang') || 'zhCN', // 默认显示语言
  fallbackLocale: 'enUS',
  messages: {
    zhCN,
    enUS,
  },
})

export function install(app: App) {
  app.use(i18n)
}
