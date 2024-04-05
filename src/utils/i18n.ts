import { i18n } from '@/modules/i18n'

export function setLocale(locale: App.lang) {
  i18n.global.locale.value = locale
}

export const $t = i18n.global.t
