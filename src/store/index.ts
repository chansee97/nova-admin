import piniaPluginPersist from 'pinia-plugin-persist'
import type { App } from 'vue'

export function setupStore(app: App) {
  const pinia = createPinia()
  pinia.use(piniaPluginPersist)
  app.use(pinia)
}

export * from './modules'
