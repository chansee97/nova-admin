import { mockRequest } from '../http';

interface Ilogin {
  userName: string;
  password: string;
}
export function fetchLogin(params: Ilogin) {
  return mockRequest.post('/login', params);
}
export function fetchUserInfo() {
  return mockRequest.get('/getUserInfo');
}
export function fetchUserRoutes(params: string) {
  return mockRequest.post('/getUserRoutes', params);
}
