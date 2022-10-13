import Mock from 'mockjs';
import { resultSuccess } from '../utils';

const Random = Mock.Random;

const token = Random.string('upper', 32, 32);

const userInfo = {
  userId: '1',
  userName: 'admin',
  realName: '管理员大人',
  avatar: 'https://z3.ax1x.com/2021/10/29/5jnWgf.jpg',
  role: 'admin',
  password: '123456',
};
const userRoutes = [
  {
    name: 'dashboard',
    path: '/dashboard',
    redirect: '/dashboard/workbench',
    meta: {
      title: '仪表盘',
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
  },
  {
    name: 'test',
    path: '/test',
    redirect: '/test/test1',
    meta: {
      title: '多级菜单演示',
      requiresAuth: true,
      icon: 'icon-park-outline:list',
    },
    children: [
      {
        name: 'test1',
        path: '/test/test1',
        meta: {
          title: '多级菜单1',
          requiresAuth: true,
          icon: 'icon-park-outline:list',
        },
      },
      {
        name: 'test2',
        path: '/test/test2',
        meta: {
          title: '多级菜单2',
          requiresAuth: true,
          icon: 'icon-park-outline:list',
        },
        children: [
          {
            name: 'test2_detail',
            path: '/test/test2/detail',
            meta: {
              title: '多级菜单2的详情页',
              requiresAuth: true,
              icon: 'icon-park-outline:list',
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
          title: '多级菜单3',
          requiresAuth: true,
          icon: 'icon-park-outline:list',
        },
        children: [
          {
            name: 'test4',
            path: '/test/test3/test4',
            meta: {
              title: '多级菜单3-1',
              requiresAuth: true,
              icon: 'icon-park-outline:list',
            },
          },
        ],
      },
    ],
  },
  {
    name: 'list',
    path: '/list',
    redirect: '/list/commonList',
    meta: {
      title: '列表页',
      requiresAuth: true,
      icon: 'icon-park-outline:list-two',
    },
    children: [
      {
        name: 'list_commonList',
        path: '/list/commonList',
        meta: {
          title: '常用列表',
          requiresAuth: true,
          icon: 'icon-park-outline:list-view',
        },
      },
      {
        name: 'list_cardList',
        path: '/list/cardList',
        meta: {
          title: '卡片列表',
          requiresAuth: true,
          icon: 'icon-park-outline:view-grid-list',
        },
      },
    ],
  },
  {
    name: 'plugin',
    path: '/plugin',
    redirect: '/plugin/charts',
    meta: {
      title: '组件示例',
      requiresAuth: true,
      icon: 'icon-park-outline:application-one',
    },
    children: [
      {
        name: 'plugin_charts',
        path: '/plugin/charts',
        meta: {
          title: '图表',
          requiresAuth: true,
          icon: 'icon-park-outline:chart-line',
        },
        children: [
          {
            name: 'echarts',
            path: '/plugin/charts/echarts',
            meta: {
              title: 'ECharts',
              requiresAuth: true,
              icon: 'icon-park-outline:chart-proportion',
            },
          },
          {
            name: 'antV',
            path: '/plugin/charts/antV',
            meta: {
              title: 'antV',
              requiresAuth: true,
              icon: 'ant-design:ant-design-outlined',
            },
          },
        ],
      },
      {
        name: 'plugin_map',
        path: '/plugin/map',
        meta: {
          title: '地图',
          requiresAuth: true,
          icon: 'carbon:map',
        },
      },
      {
        name: 'plugin_editor',
        path: '/plugin/editor',
        meta: {
          title: '编辑器',
          requiresAuth: true,
          icon: 'icon-park-outline:editor',
        },
        children: [
          {
            name: 'md',
            path: '/plugin/editor/md',
            meta: {
              title: 'MarkDown',
              requiresAuth: true,
              icon: 'ri:markdown-line',
            },
          },
          {
            name: 'rich',
            path: '/plugin/editor/rich',
            meta: {
              title: '富文本',
              requiresAuth: true,
              icon: 'icon-park-outline:edit-one',
            },
          },
        ],
      },
      {
        name: 'plugin_clipboard',
        path: '/plugin/clipboard',
        meta: {
          title: '剪贴板',
          requiresAuth: true,
          icon: 'icon-park-outline:clipboard',
        },
      },
      {
        name: 'plugin_icons',
        path: '/plugin/icons',
        meta: {
          title: '图标',
          requiresAuth: true,
          icon: 'icon-park-outline:winking-face-with-open-eyes',
        },
      },
      {
        name: 'plugin_QRCode',
        path: '/plugin/QRCode',
        meta: {
          title: '二维码',
          requiresAuth: true,
          icon: 'icon-park-outline:two-dimensional-code',
        },
      },
    ],
  },
  {
    name: 'error',
    path: '/error',
    redirect: '/error/not-found',
    meta: {
      title: '异常页',
      requiresAuth: true,
      icon: 'icon-park-outline:error-computer',
    },
    children: [
      {
        name: 'not-found',
        path: '/error/not-found',
        meta: {
          title: '404页',
          requiresAuth: true,
          icon: 'icon-park-outline:error',
        },
      },
      {
        name: 'not-permission',
        path: '/error/not-permission',
        meta: {
          title: '403页',
          requiresAuth: true,
          icon: 'carbon:error',
        },
      },
      {
        name: 'service-error',
        path: '/error/service-error',
        meta: {
          title: '500页',
          requiresAuth: true,
          icon: 'carbon:data-error',
        },
      },
    ],
  },
  {
    name: 'setting',
    path: '/setting',
    redirect: '/setting/account',
    meta: {
      title: '系统设置',
      requiresAuth: true,
      icon: 'icon-park-outline:setting',
    },
    children: [
      {
        name: 'not-found',
        path: '/setting/account',
        meta: {
          title: '用户设置',
          requiresAuth: true,
          icon: 'icon-park-outline:user',
        },
      },
      {
        name: 'dictionary',
        path: '/setting/dictionary',
        meta: {
          title: '字典设置',
          requiresAuth: true,
          icon: 'icon-park-outline:book-one',
        },
      },
      {
        name: 'menu',
        path: '/setting/menu',
        meta: {
          title: '菜单设置',
          requiresAuth: true,
          icon: 'icon-park-outline:application-menu',
        },
      },
      {
        name: 'system',
        path: '/setting/system',
        meta: {
          title: '系统配置',
          requiresAuth: true,
          icon: 'icon-park-outline:coordinate-system',
        },
      },
    ],
  },
  {
    name: 'about',
    path: '/about',
    meta: {
      title: '关于',
      requiresAuth: true,
      icon: 'icon-park-outline:info',
    },
  },
];

export default [
  {
    url: '/mock/login',
    timeout: 1000,
    method: 'post',
    response: () => {
      return resultSuccess({ token });
    },
  },
  {
    url: '/mock/getUserInfo',
    timeout: 1000,
    method: 'get',
    response: () => {
      return resultSuccess(userInfo);
    },
  },
  {
    url: '/mock/getUserRoutes',
    timeout: 1000,
    method: 'post',
    response: () => {
      return resultSuccess(userRoutes);
    },
  },
];
