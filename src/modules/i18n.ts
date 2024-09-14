import type { App } from 'vue'
import { local } from '@/utils'
import { createI18n } from 'vue-i18n'
import enUS from '../../locales/en_US.json'
import zhCN from '../../locales/zh_CN.json'

const { VITE_DEFAULT_LANG } = import.meta.env

export const i18n = createI18n({
  legacy: false,
  locale: local.get('lang') || VITE_DEFAULT_LANG, // 默认显示语言
  fallbackLocale: VITE_DEFAULT_LANG,
  messages: {
    zhCN,
    enUS,
  },
  // 缺失国际化键警告
  // missingWarn: false,

  // 缺失回退内容警告
  fallbackWarn: false,
})

export function install(app: App) {
  app.use(i18n)
}
