import type { App } from 'vue';
import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { setupRouterGuard } from './guard';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/login/index.vue'), // 注意这里要带上 文件后缀.vue
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/test/index.vue'), // 注意这里要带上 文件后缀.vue
  },
];

const { VITE_HASH_ROUTE = 'N', VITE_BASE_URL } = import.meta.env;
export const router = createRouter({
  history: VITE_HASH_ROUTE === 'Y' ? createWebHashHistory(VITE_BASE_URL) : createWebHistory(VITE_BASE_URL),
  routes,
});
// 安装vue路由
export async function setupRouter(app: App) {
  // 添加路由守卫
  setupRouterGuard(router);
  app.use(router);
  await router.isReady(); //https://router.vuejs.org/zh/api/index.html#isready
}
