import App from './App.vue'
import AppLoading from './components/common/appLoading.vue'
import { setupRouter } from './router'
import { setupAssets } from './assets'
import { setupStore } from './store'
import { setupDirectives } from './directive'

async function setupApp() {
  // 引入静态资源
  setupAssets()

  // 创建vue实例
  const app = createApp(App)

  // 安装pinia全局状态库
  setupStore(app)

  // 载入全局loading加载状态
  const appLoading = createApp(AppLoading)
  appLoading.mount('#appLoading')

  // 安装自定义指令
  setupDirectives(app)

  // 安装router
  await setupRouter(app)

  // 卸载载入动画
  appLoading.unmount()

  // 挂载
  app.mount('#app')
}
await setupApp()
