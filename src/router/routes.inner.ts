import type { RouteRecordRaw } from 'vue-router'

/* 页面中的一些固定路由，错误页等 */
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'root',
    children: [
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/build-in/login/index.vue'), // 注意这里要带上 文件后缀.vue
    meta: {
      title: '登录',
      withoutTab: true,
    },
  },
  {
    path: '/public',
    name: 'publicAccess',
    component: () => import('@/views/build-in/public-access/index.vue'),
    meta: {
      title: '公共访问示例',
      requiresAuth: false,
      withoutTab: true,
    },
  },
  {
    path: '/not-found',
    name: 'not-found',
    component: () => import('@/views/build-in/not-found/index.vue'),
    meta: {
      title: '找不到页面',
      icon: 'icon-park-outline:ghost',
      withoutTab: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/build-in/not-found/index.vue'),
    name: 'not-found',
    meta: {
      title: '找不到页面',
      icon: 'icon-park-outline:ghost',
      withoutTab: true,
    },
  },

]
