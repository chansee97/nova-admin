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
      title: '分析页',
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
