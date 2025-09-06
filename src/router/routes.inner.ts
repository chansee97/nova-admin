import Layout from '@/layouts/index.vue'

/* 页面中的一些固定路由，错误页等 */
export const routes = [
  {
    path: '/appRoot',
    name: 'appRoot',
    redirect: import.meta.env.VITE_HOME_PATH,
    component: Layout,
    meta: {
      title: '',
      icon: 'icon-park-outline:home',
    },
    children: [
      {
        path: '/user-center',
        name: 'userCenter',
        component: () => import('@/views/build-in/user-center/index.vue'),
        meta: {
          title: '个人中心',
          icon: 'carbon:user-avatar-filled-alt',
        },
      },
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/build-in/home/index.vue'),
        meta: {
          title: '首页',
          icon: 'icon-park-outline:analysis',
          pinTab: true,
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/build-in/login/index.vue'),
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
