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
  token,
  userRoutes: [
    {
      name: 'dashboard',
      path: '/dashboard',
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
        },
        {
          name: 'test3',
          path: '/test/test3',
          meta: {
            title: '测试专题3',
            requiresAuth: true,
            icon: 'icon-park-outline:tool',
          },
        },
      ],
    },
  ],
};

export default [
  {
    url: '/mock/login',
    timeout: 1000,
    method: 'post',
    response: () => {
      return resultSuccess(userInfo);
    },
  },
];
