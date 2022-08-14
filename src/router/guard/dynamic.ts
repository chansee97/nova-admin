import { RouteRecordRaw } from 'vue-router';
import { router } from '@/router';
import { BasicLayout } from '@/layouts/index';
import { constantRoutes } from '../routes';

export async function setDynamicRoutes() {
  const vueRoutes: RouteRecordRaw[] = [
    {
      path: '/',
      name: 'root',
      redirect: '/test/test1',
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
  ];
  vueRoutes.forEach((route) => {
    router.addRoute(route);
  });
}
