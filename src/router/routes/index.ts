// import { BasicLayout } from '@/layouts/index';

export const constantRoutes = [
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
