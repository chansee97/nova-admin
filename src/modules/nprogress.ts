import NProgress from 'nprogress'
import { useAppStore } from '@/store'

export function install() {
  // 初始载入，初始化body的css变量
  const appStore = useAppStore()
  appStore.setPrimaryColor(appStore.primaryColor)

  NProgress.configure({ easing: 'ease', speed: 500 })
  window.$NProgress = NProgress
}
