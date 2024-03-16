import type { App } from 'vue'
import piniaPluginPersist from 'pinia-plugin-persist'

export * from './app'
export * from './auth'
export * from './route'
export * from './tab'

// 安装pinia全局状态库
export function installPinia(app: App) {
  const pinia = createPinia()
  pinia.use(piniaPluginPersist)
  app.use(pinia)
}
