import type { App } from 'vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export * from './app/index'
export * from './auth'
export * from './dict'
export * from './router'
export * from './tab'

// 安装pinia全局状态库
export function installPinia(app: App) {
  const pinia = createPinia()
  pinia.use(piniaPluginPersistedstate)
  app.use(pinia)
}
