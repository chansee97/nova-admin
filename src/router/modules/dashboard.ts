export const dashboard = {
  name: 'dashboard',
  path: '/dashboard',
  redirect: '/dashboard/workbench',
  meta: {
    title: '分析页-static',
    requiresAuth: true,
    icon: 'icon-park-outline:analysis',
  },
  children: [
    {
      name: 'dashboard_workbench',
      path: '/dashboard/workbench',
      meta: {
        title: '工作台',
        requiresAuth: true,
        icon: 'icon-park-outline:alarm',
      },
    },
    {
      name: 'dashboard_monitor',
      path: '/dashboard/monitor',
      meta: {
        title: '监控页',
        requiresAuth: true,
        icon: 'icon-park-outline:anchor',
      },
    },
  ],
}
