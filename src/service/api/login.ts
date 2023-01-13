import { mockRequest } from '../http';

interface Ilogin {
	userName: string;
	password: string;
}
interface Itoken {
	token: string;
	refreshToken: string;
}
export function fetchLogin(params: Ilogin) {
	return mockRequest.post<any>('/login', params);
}
export function fetchUpdateToken(params: string) {
	return mockRequest.post<Itoken>('/updateToken', params);
}
export function fetchUserInfo() {
	return mockRequest.get('/getUserInfo');
}
export function fetchUserRoutes(params: string) {
	return mockRequest.post<any>('/getUserRoutes', params);
}
