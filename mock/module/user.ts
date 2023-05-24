import Mock from 'mockjs'
import { resultFailed, resultSuccess } from '../utils'

const Random = Mock.Random

const token = () => Random.string('upper', 32, 32)

const userData = [
  {
    userId: '1',
    userName: 'super',
    password: '123456',
    nickName: '超级管理员大人',
    avatar: 'https://z3.ax1x.com/2021/10/29/5jnWgf.jpg',
    role: 'super',
  },
  {
    userId: '2',
    userName: 'admin',
    password: '123456',
    nickName: '管理员大人',
    avatar: 'https://z3.ax1x.com/2021/10/29/5jnWgf.jpg',
    role: 'admin',
  },
  {
    userId: '3',
    userName: 'user',
    password: '123456',
    nickName: '用户大人',
    avatar: 'https://z3.ax1x.com/2021/10/29/5jnWgf.jpg',
    role: 'user',
  },
]
const userRoutes = [
  {
    name: 'dashboard',
    path: '/dashboard',
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
          title: '接口功能测试',
          requiresAuth: true,
          icon: 'icon-park-outline:list',
        },
      },
      {
        name: 'test2',
        path: '/test/test2',
        meta: {
          title: '多级菜单子页',
          requiresAuth: true,
          icon: 'icon-park-outline:list',
        },
        children: [
          {
            name: 'test2_detail',
            path: '/test/test2/detail',
            meta: {
              title: '多级菜单的详情页',
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
          title: '多级菜单',
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
            name: 'plugin_echarts',
            path: '/plugin/charts/echarts',
            meta: {
              title: 'ECharts',
              requiresAuth: true,
              icon: 'icon-park-outline:chart-proportion',
            },
          },
          {
            name: 'plugin_antV',
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
          keepAlive: true,
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
            name: 'plugin_md',
            path: '/plugin/editor/md',
            meta: {
              title: 'MarkDown',
              requiresAuth: true,
              icon: 'ri:markdown-line',
            },
          },
          {
            name: 'plugin_rich',
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
    name: 'docments',
    path: '/docments',
    meta: {
      title: '外链文档',
      requiresAuth: true,
      icon: 'icon-park-outline:file-doc',
    },
    children: [
      {
        name: 'docments_vue',
        path: '/docments/vue',
        meta: {
          title: 'vue',
          requiresAuth: true,
          icon: 'logos:vue',
        },
      },
      {
        name: 'docments_vite',
        path: '/docments/vite',
        meta: {
          title: 'vite',
          requiresAuth: true,
          icon: 'logos:vitejs',
        },
      },
      {
        name: 'docments_vueuse',
        path: '/docments/vueuse',
        meta: {
          title: 'VueUse（外链）',
          requiresAuth: true,
          icon: 'logos:vueuse',
          herf: 'https://vueuse.org/guide/',
        },
      },
    ],
  },
  {
    name: 'permission',
    path: '/permission',
    meta: {
      title: '权限示例',
      requiresAuth: true,
      icon: 'icon-park-outline:people-safe',
    },
    children: [
      {
        name: 'permission_permission',
        path: '/permission/permission',
        meta: {
          title: '权限示例',
          requiresAuth: true,
          icon: 'icon-park-outline:right-user',
        },
      },
      {
        name: 'permission_justSuper',
        path: '/permission/justSuper',
        meta: {
          title: '超管super可见',
          requiresAuth: true,
          roles: ['super'],
          icon: 'icon-park-outline:wrong-user',
        },
      },
    ],
  },
  {
    name: 'error',
    path: '/error',
    meta: {
      title: '异常页',
      requiresAuth: true,
      icon: 'icon-park-outline:error-computer',
    },
    children: [
      {
        name: '403',
        path: '/error/403',
        meta: {
          title: '403页',
          requiresAuth: true,
          icon: 'carbon:error',
          order: 3,
        },
      },
      {
        name: '404',
        path: '/error/404',
        meta: {
          title: '404页',
          requiresAuth: true,
          icon: 'icon-park-outline:error',
          order: 2,
        },
      },
      {
        name: '500',
        path: '/error/500',
        meta: {
          title: '500页',
          requiresAuth: true,
          icon: 'carbon:data-error',
          order: 1,
        },
      },
    ],
  },
  {
    name: 'setting',
    path: '/setting',
    meta: {
      title: '系统设置',
      requiresAuth: true,
      icon: 'icon-park-outline:setting',
    },
    children: [
      {
        name: 'setting_account',
        path: '/setting/account',
        meta: {
          title: '用户设置',
          requiresAuth: true,
          icon: 'icon-park-outline:every-user',
        },
      },
      {
        name: 'setting_dictionary',
        path: '/setting/dictionary',
        meta: {
          title: '字典设置',
          requiresAuth: true,
          icon: 'icon-park-outline:book-one',
        },
      },
      {
        name: 'setting_menu',
        path: '/setting/menu',
        meta: {
          title: '菜单设置',
          requiresAuth: true,
          icon: 'icon-park-outline:application-menu',
        },
      },
      {
        name: 'setting_system',
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
    name: 'userCenter',
    path: '/userCenter',
    meta: {
      title: '个人中心',
      requiresAuth: true,
      icon: 'carbon:user-avatar-filled-alt',
    },
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
]

export default [
  {
    url: '/mock/login',
    method: 'post',
    response: (options: any) => {
      const { userName = undefined, password = undefined } = options.body

      if (!userName || !password)
        return resultFailed(null, '账号密码不全')

      const userInfo = userData.find(item => item.userName === userName && item.password === password)

      if (userInfo) {
        return {
          code: 200,
          message: 'ok',
          data: {
            userId: userInfo.userId,
            token: token(),
            refreshToken: token(),
          },
        }
      }
      return resultFailed(null, '账号密码错误')
    },
  },
  {
    url: '/mock/updateToken',
    method: 'post',
    response: () => {
      return resultSuccess({ token: token(), refreshToken: token() })
    },
  },
  {
    url: '/mock/getUserInfo',
    method: 'get',
    response: (options: any) => {
      const { userId } = options.query
      if (!userId)
        return resultFailed(null, '未传入用户id！')

      const userInfo = userData.find(item => item.userId === userId)
      console.warn("🚀 ~ file: user.ts:480 ~ userData:", userData)
      console.warn("🚀 ~ file: user.ts:486 ~ userId:", userId)
      if (userInfo)
        return resultSuccess(userInfo)

      return resultFailed(null, '未找到用户信息，请检查提交参数')
    },
  },
  {
    url: '/mock/getUserRoutes',
    method: 'post',
    response: () => {
      return resultSuccess(userRoutes)
    },
  },
]
