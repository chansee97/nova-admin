import type { App } from 'vue'
import { installRouter } from '@/router'
import { installPinia } from '@/store'
import AppVue from './App.vue'
import AppLoading from './components/common/AppLoading.vue'

async function setupApp() {
  // 载入全局loading加载状态
  const appLoading = createApp(AppLoading)
  appLoading.mount('#appLoading')

  // 创建vue实例
  const app = createApp(AppVue)

  // 注册模块Pinia
  await installPinia(app)

  // 注册模块 Vue-router
  await installRouter(app)

  /* 注册模块 指令/静态资源 */
  Object.values(
    import.meta.glob<{ install: (app: App) => void }>('./modules/*.ts', {
      eager: true,
    }),
  ).map(i => app.use(i))

  // 卸载载入动画
  appLoading.unmount()

  // 挂载
  app.mount('#app')
}

setupApp()
