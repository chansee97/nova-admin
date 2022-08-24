import { mockRequest } from '../http';

export function fetchUserList() {
  return mockRequest.get('/userList');
}
