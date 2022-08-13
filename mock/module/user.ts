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
      value: 'dashboard_console',
      icon: 'icon-park-outline:alarm',
    },
    {
      label: '监控页',
      value: 'dashboard_monitor',
      icon: 'icon-park-outline:anchor',
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
