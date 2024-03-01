import App from './App.vue'
import AppLoading from './components/common/appLoading.vue'
import { installDirectives } from './directives'
import { installRouter } from '@/router'
import { installPinia } from '@/store'

// 全局引入的静态资源
import 'uno.css'
import '@/styles/css/index.css'
import 'virtual:svg-icons-register'

async function setupApp() {
  // 载入全局loading加载状态
  const appLoading = createApp(AppLoading)
  appLoading.mount('#appLoading')

  // 创建vue实例
  const app = createApp(App)

  // 注册模块 Vue-router
  installRouter(app)

  // 注册模块Pinia
  installPinia(app)

  // 安装自定义指令
  installDirectives(app)

  // 卸载载入动画
  appLoading.unmount()

  // 挂载
  app.mount('#app')
}

setupApp()
