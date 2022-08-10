import type { App } from 'vue';
import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { setupRouterGuard } from './guard';
import { BasicLayout } from '../layouts/index';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'root',
    redirect: '/test1',
    component: BasicLayout,
    children: [
      {
        path: '/test1',
        name: 'test1',
        component: () => import('~/src/views/test/test1.vue'),
        meta: {
          title: '测试1',
          icon: 'icon-park-outline:game-three',
        },
      },
      {
        path: '/test2',
        name: 'test2',
        component: () => import('~/src/views/test/test2.vue'),
        meta: {
          title: '测试2',
          icon: 'carbon:aperture',
        },
      },
      {
        path: '/test3',
        name: 'test3',
        component: () => import('~/src/views/test/test3.vue'),
        meta: {
          title: '测试3',
          icon: 'carbon:breaking-change',
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'), // 注意这里要带上 文件后缀.vue
  },
  {
    path: '/no-permission',
    name: 'no-permission',
    component: () => import('@/views/inherit-page/not-permission/index.vue'),
    meta: {
      title: '无权限',
      singleLayout: 'blank',
    },
  },
  {
    path: '/service-error',
    name: 'service-error',
    component: () => import('@/views/inherit-page/service-error/index.vue'),
    meta: {
      title: '服务器错误',
      singleLayout: 'blank',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/views/inherit-page/not-found/index.vue'),
    meta: {
      title: '错误404',
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
