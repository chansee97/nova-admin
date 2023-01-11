import { createApp } from 'vue';
import App from './App.vue';
import AppLoading from './components/common/appLoading.vue';
import { setupRouter } from './router';
import { setupAssets } from './plugins';
import { setupStore } from './store';

async function setupApp() {
	// 引入静态资源
	setupAssets();
	// 载入全局loading加载状态
	const appLoading = createApp(AppLoading);
	appLoading.mount('#appLoading');

	// 创建vue实例
	const app = createApp(App);
	// 安装pinia全局状态库
	setupStore(app);
	// 安装router
	await setupRouter(app);
	// 挂载
	await app.mount('#app');
	// 卸载载入动画
	appLoading.unmount();
}
setupApp();
