import { createApp } from 'vue';
import App from './App.vue';
import { setupRouter } from './router';
import { setupAssets } from './plugins';
import { setupStore } from './store';

async function setupApp() {
  // 引入静态资源
  setupAssets();
  // 创建vue实例
  const app = createApp(App);
  // 安装pinia全局状态库
  setupStore(app);
  // 安装router
  await setupRouter(app);
  // 挂载
  await app.mount('#app');
  closeAppLoading();
}
setupApp();

function closeAppLoading() {
  document.querySelector('#loading-container')!.remove();
}
