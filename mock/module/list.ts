import Mock from 'mockjs';
import { resultSuccess } from '../utils';

const userList = Mock.mock({
  'list|20': [
    {
      id: '@id',
      name: '@cname',
      'age|20-36': 36,
      'gender|1': ['0', '1', null],
      email: '@email("qq.com")',
      address: '@county(true)	',
      'role|1': ['super', 'admin', 'user'],
      'disabled|1': true,
    },
  ],
});

export default [
  {
    url: '/mock/userList',
    timeout: 1000,
    method: 'get',
    response: () => {
      return resultSuccess(userList.list);
    },
  },
];
