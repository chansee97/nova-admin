import { createI18n } from 'vue-i18n'
import type { App } from 'vue'
import en from '../../locales/en.json'
import zh from '../../locales/zh.json'
import { local } from '@/utils'

export const i18n = createI18n({
  legacy: false,
  locale: local.get('lang') || 'zh', // 默认显示语言
  fallbackLocale: 'en',
  messages: {
    zh,
    en,
  },
})

export function install(app: App) {
  app.use(i18n)
}
