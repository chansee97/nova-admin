import { createApp } from 'vue';
import App from './App.vue';
import { setupRouter } from './router';
import { setupAssets } from './plugins';

async function setupApp() {
  // 引入静态资源
  setupAssets();
  // 创建vue实例
  const app = createApp(App);
  // 安装router
  await setupRouter(app);
  // 挂载
  app.mount('#app');
}
setupApp();
