import type { App as AppType } from 'vue'
import App from './App.vue'
import AppLoading from './components/common/AppLoading.vue'
import { installPinia } from '@/store'
import { installRouter } from '@/router'

async function bootstrap() {
  // 显示加载动画
  const loadingApp = createApp(AppLoading)
  loadingApp.mount('#app')

  try {
    // 创建应用实例
    const app = createApp(App)

    // 注册模块 Pinia
    await installPinia(app)

    // 注册模块 Vue-router
    await installRouter(app)

    // 注册模块 指令/静态资源
    const modules = import.meta.glob<{ install: (app: AppType) => void }>('./modules/*.ts', {
      eager: true,
    })

    Object.values(modules).forEach(module => app.use(module))

    // 卸载加载动画并挂载主应用
    loadingApp.unmount()
    app.mount('#app')
  }
  catch (error) {
    // 如果初始化失败，卸载加载动画并显示错误
    loadingApp.unmount()
    console.error('Application initialization failed:', error)
    throw error
  }
}

bootstrap().catch(console.error)
