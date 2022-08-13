import { BasicLayout } from '@/layouts/index';

export const constantRoutes: AppRoute.Route[] = [
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
          requiresAuth: true,
        },
      },
      {
        path: '/test2',
        name: 'test2',
        component: () => import('~/src/views/test/test2.vue'),
        meta: {
          title: '测试2',
          icon: 'carbon:aperture',
          requiresAuth: true,
        },
      },
      {
        path: '/test3',
        name: 'test3',
        component: () => import('~/src/views/test/test3.vue'),
        meta: {
          title: '测试3',
          icon: 'icon-park-outline:music-list',
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'), // 注意这里要带上 文件后缀.vue
  },
  {
    path: '/no-permission',
    name: 'no-permission',
    component: () => import('@/views/inherit-page/not-permission/index.vue'),
    meta: {
      title: '无权限',
    },
  },
  {
    path: '/service-error',
    name: 'service-error',
    component: () => import('@/views/inherit-page/service-error/index.vue'),
    meta: {
      title: '服务器错误',
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
