import { mockRequest } from '../http';

interface Ilogin {
  userName: string;
  password: string;
}
export function fetchLogin(params: Ilogin) {
  return mockRequest.post('/login', params);
}
