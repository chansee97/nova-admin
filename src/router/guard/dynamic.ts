import { RouteRecordRaw } from 'vue-router';
import { router } from '@/router';
import { BasicLayout } from '@/layouts/index';

export async function setDynamicRoutes() {
  const vueRoutes: RouteRecordRaw[] = [
    {
      path: '/test',
      name: 'test',
      redirect: '/test/test1',
      component: BasicLayout,
      children: [
        {
          path: 'test1',
          name: 'test1',
          component: () => import(`@/views/test/test1.vue`),
          meta: {
            title: '测试1',
            icon: 'icon-park-outline:game-three',
            requiresAuth: true,
          },
        },
        {
          path: 'test2',
          name: 'test2',
          component: () => import('@/views/test/test2.vue'),
          meta: {
            title: '测试2',
            icon: 'carbon:aperture',
            requiresAuth: true,
          },
        },
        {
          path: 'test3',
          name: 'test3',
          component: () => import('@/views/test/test3.vue'),
          meta: {
            title: '测试3',
            icon: 'icon-park-outline:music-list',
            requiresAuth: true,
          },
        },
        {
          path: '/dashboard/workbench',
          name: 'workbench',
          component: () => import('@/views/dashboard/workbench/index.vue'),
          meta: {
            title: '工作台',
            icon: 'icon-park-outline:music-list',
            requiresAuth: true,
          },
        },
        {
          path: '/dashboard/monitor',
          name: 'monitor',
          component: () => import('@/views/dashboard/monitor/index.vue'),
          meta: {
            title: '控制页',
            icon: 'icon-park-outline:music-list',
            requiresAuth: true,
          },
        },
      ],
    },
  ];
  vueRoutes.forEach((route) => {
    router.addRoute(route);
  });
}
