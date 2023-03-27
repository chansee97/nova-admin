export const test = {
  name: 'test',
  path: '/test',
  redirect: '/test/test1',
  meta: {
    title: '测试专题',
    requiresAuth: true,
    icon: 'icon-park-outline:ambulance',
  },
  children: [
    {
      name: 'test1',
      path: '/test/test1',
      meta: {
        title: '测试专题1',
        requiresAuth: true,
        icon: 'icon-park-outline:alarm',
      },
    },
    {
      name: 'test2',
      path: '/test/test2',
      meta: {
        title: '测试专题2',
        requiresAuth: true,
        icon: 'icon-park-outline:pic',
      },
      children: [
        {
          name: 'test2_detail',
          path: '/test/test2/detail',
          meta: {
            title: '测试专题2的详情页',
            requiresAuth: true,
            icon: 'icon-park-outline:tool',
            hide: true,
            activeMenu: '/test/test2',
          },
        },
      ],
    },
    {
      name: 'test3',
      path: '/test/test3',
      meta: {
        title: '测试专题3',
        requiresAuth: true,
        icon: 'icon-park-outline:tool',
      },
      children: [
        {
          name: 'test4',
          path: '/test/test3/test4',
          meta: {
            title: '测试专题4',
            requiresAuth: true,
            icon: 'icon-park-outline:tool',
          },
        },
      ],
    },
  ],
}
