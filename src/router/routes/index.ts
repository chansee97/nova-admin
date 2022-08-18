/* 页面中的一些固定路由，错误页等 */
export const constantRoutes = [
  {
    path: '/no-found',
    name: 'not-found',
    component: () => import('@/views/error/not-found/index.vue'),
    meta: {
      title: '找不到页面',
      icon: 'icon-park-outline:ghost',
    },
  },
  {
    path: '/no-permission',
    name: 'no-permission',
    component: () => import('@/views/error/not-permission/index.vue'),
    meta: {
      title: '用户无权限',
      icon: 'icon-park-outline:error',
    },
  },
  {
    path: '/service-error',
    name: 'service-error',
    component: () => import('@/views/error/service-error/index.vue'),
    meta: {
      title: '服务器错误',
      icon: 'icon-park-outline:close-wifi',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/no-found',
  },
];
