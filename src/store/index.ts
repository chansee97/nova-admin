import piniaPluginPersist from 'pinia-plugin-persist'
import type { App } from 'vue'

export function setupStore(app: App) {
  const store = createPinia()
  store.use(piniaPluginPersist)
  app.use(store)
}
export * from './modules'
