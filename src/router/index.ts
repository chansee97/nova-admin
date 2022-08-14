import type { App } from 'vue';
import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { setupRouterGuard } from './guard';
import { BasicLayout } from '../layouts/index';
import { constantRoutes } from './routes';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'root',
    redirect: '/test1',
    component: BasicLayout,
    children: [
      {
        path: '/test/test1',
        name: 'test1',
        component: () => import(`@/views/test/test1.vue`),
        meta: {
          title: '测试1',
          icon: 'icon-park-outline:game-three',
          requiresAuth: true,
        },
      },
      {
        path: '/test/test2',
        name: 'test2',
        component: () => import('@/views/test/test2.vue'),
        meta: {
          title: '测试2',
          icon: 'carbon:aperture',
          requiresAuth: true,
        },
      },
      {
        path: '/test/test3',
        name: 'test3',
        component: () => import('@/views/test/test3.vue'),
        meta: {
          title: '测试3',
          icon: 'icon-park-outline:music-list',
          requiresAuth: true,
        },
      },
      ...constantRoutes,
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'), // 注意这里要带上 文件后缀.vue
    meta: {
      title: '登录',
    },
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
