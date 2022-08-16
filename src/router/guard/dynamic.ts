import { RouteRecordRaw } from 'vue-router';
import { router } from '@/router';
import { BasicLayout } from '@/layouts/index';
import { useAuthStore } from '@/store';

export async function setDynamicRoutes() {
  const authStore = useAuthStore();
  const vueRootRoute: RouteRecordRaw = {
    path: '/test',
    name: 'test',
    redirect: '/test/test1',
    component: BasicLayout,
    children: [],
  };
  const dynamicRoutes = [
    {
      path: '/dashboard/workbench',
      name: 'workbench',
      component: () => import('@/views/dashboard/workbench/index.vue'),
      meta: {
        title: '工作台',
        icon: 'icon-park-outline:music-list',
        requiresAuth: true,
        role: ['admin'],
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
        role: ['admin'],
      },
    },
    {
      path: '/test/test1',
      name: 'test1',
      component: () => import(`@/views/test/test1.vue`),
      meta: {
        title: '测试1',
        icon: 'icon-park-outline:game-three',
        requiresAuth: true,
        role: ['admin'],
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
        role: ['admin'],
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
        role: ['admin'],
      },
    },
  ];
  // 根据角色过滤后的插入根路由中
  vueRootRoute.children = dynamicRoutes.filter((route) => {
    return route.meta.role.includes(authStore.userInfo.role);
  });
  router.addRoute(vueRootRoute);
}
