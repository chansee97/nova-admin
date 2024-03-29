export const staticRoutes: AppRoute.RowRoute[] = [
  {
    'id': 1,
    'pid': 0,
    'name': 'dashboard',
    'path': '/dashboard',
    'componentPath': null,
    'redirect': '/dashboard/workbench',
    'meta.title': '分析页',
    'meta.requiresAuth': true,
    'meta.icon': 'icon-park-outline:analysis',
  },
  {
    'id': 2,
    'pid': 1,
    'name': 'dashboard_workbench',
    'path': '/dashboard/workbench',
    'componentPath': '/dashboard/workbench/index.vue',
    'meta.title': '工作台',
    'meta.requiresAuth': true,
    'meta.icon': 'icon-park-outline:alarm',
  },
  {
    'id': 3,
    'pid': 1,
    'name': 'dashboard_monitor',
    'path': '/dashboard/monitor',
    'componentPath': '/dashboard/monitor/index.vue',
    'meta.title': '监控页',
    'meta.requiresAuth': true,
    'meta.icon': 'icon-park-outline:anchor',
  },
  {
    'id': 4,
    'pid': 0,
    'name': 'test',
    'path': '/test',
    'componentPath': null,
    'redirect': '/test/test1',
    'meta.title': '测试专题',
    'meta.requiresAuth': true,
    'meta.icon': 'icon-park-outline:ambulance',
  },
  {
    'id': 5,
    'pid': 4,
    'name': 'test1',
    'path': '/test/test1',
    'componentPath': '/test/test1/index.vue',
    'meta.title': '测试专题1',
    'meta.requiresAuth': true,
    'meta.icon': 'icon-park-outline:alarm',
  },
  {
    'id': 6,
    'pid': 4,
    'name': 'test2',
    'path': '/test/test2',
    'componentPath': '/test/test2/index.vue',
    'meta.title': '测试专题2',
    'meta.requiresAuth': true,
    'meta.icon': 'icon-park-outline:pic',
  },
  {
    'id': 7,
    'pid': 6,
    'name': 'test2_detail',
    'path': '/test/test2/detail',
    'componentPath': '/test/test2/detail/index.vue',
    'meta.title': '测试专题2的详情页',
    'meta.requiresAuth': true,
    'meta.icon': 'icon-park-outline:tool',
    'meta.hide': true,
    'meta.activeMenu': '/test/test2',
  },
  {
    'id': 8,
    'pid': 4,
    'name': 'test3',
    'path': '/test/test3',
    'componentPath': null,
    'meta.title': '测试专题3',
    'meta.requiresAuth': true,
    'meta.icon': 'icon-park-outline:tool',
  },
  {
    'id': 9,
    'pid': 8,
    'name': 'test4',
    'path': '/test/test3/test4',
    'componentPath': '/test/test3/test4/index.vue',
    'meta.title': '测试专题4',
    'meta.requiresAuth': true,
    'meta.icon': 'icon-park-outline:tool',
  },
  {
    'id': 10,
    'pid': 0,
    'name': 'permission',
    'path': '/permission',
    'componentPath': null,
    'meta.title': '权限示例',
    'meta.requiresAuth': true,
    'meta.icon': 'icon-park-outline:people-safe',
  },
  {
    'id': 11,
    'pid': 10,
    'name': 'permission_permission',
    'path': '/permission/permission',
    'componentPath': '/permission/permission/index.vue',
    'meta.title': '权限示例',
    'meta.requiresAuth': true,
    'meta.icon': 'icon-park-outline:right-user',
  },
  {
    'id': 12,
    'pid': 10,
    'name': 'permission_justSuper',
    'path': '/permission/justSuper',
    'componentPath': '/permission/justSuper/index.vue',
    'meta.title': '超管super可见',
    'meta.requiresAuth': true,
    'meta.icon': 'icon-park-outline:wrong-user',
    'meta.roles': [
      'super',
    ],
  },
  {
    'id': 13,
    'pid': 0,
    'name': 'PluginMap',
    'path': '/plugin/map',
    'componentPath': '/plugin/map/index.vue',
    'meta.title': '地图',
    'meta.requiresAuth': true,
    'meta.icon': 'carbon:map',
    'meta.keepAlive': true,
  },
]
