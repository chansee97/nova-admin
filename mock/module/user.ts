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
  permissions: [
    {
      label: '主控台',
      key: 'dashboard_console',
      icon: 'icon-park-outline:alarm',
    },
    {
      label: '监控页',
      key: 'dashboard_monitor',
      icon: 'icon-park-outline:anchor',
    },
    {
      label: 'test1',
      key: '/test1',
      icon: 'icon-park-outline:alarm',
    },
    {
      label: 'test2',
      key: '/test2',
      icon: 'icon-park-outline:pic',
    },
    {
      label: 'test3',
      key: '/test3',
      icon: 'icon-park-outline:tool',
    },
    {
      label: '舞，舞，舞',
      key: 'dance-dance-dance',
      icon: 'icon-park-outline:command',
      children: [
        {
          label: '饮品',
          key: 'beverage',
          children: [
            {
              label: '威士忌',
              key: 'whisky',
            },
          ],
        },
        {
          label: '食物',
          key: 'food',
          children: [
            {
              label: '三明治',
              key: 'sandwich',
            },
          ],
        },
        {
          label: '过去增多，未来减少',
          key: 'the-past-increases-the-future-recedes',
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
