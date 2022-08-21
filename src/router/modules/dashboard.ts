import { RouteRecordRaw } from 'vue-router';
import { BasicLayout } from '@/layouts/index';
export const dashboard: RouteRecordRaw = {
  path: '/dashboard',
  name: 'dashboard',
  redirect: '/dashboard/workbench',
  component: BasicLayout,
  meta: {
    title: '分析页',
    requiresAuth: true,
    icon: 'icon-park-outline:analysis',
  },
  children: [
    {
      name: 'dashboard_workbench',
      path: '/dashboard/workbench',
      component: () => import('@/views/dashboard/workbench/index.vue'),
      meta: {
        title: '工作台',
        requiresAuth: true,
        icon: 'icon-park-outline:alarm',
      },
    },
    {
      name: 'dashboard_monitor',
      path: '/dashboard/monitor',
      component: () => import('@/views/dashboard/monitor/index.vue'),
      meta: {
        title: '监控页',
        requiresAuth: true,
        icon: 'icon-park-outline:anchor',
      },
    },
  ],
};
