import { request } from '../http';
import { mockRequest } from '../http';

interface Itest {
	data: string;
}
/* get方法测试 */
export function fetachGet() {
	return request.get('/getAPI');
}
/* post方法测试 */
export function fetachPost(params: Itest) {
	return request.post('/postAPI', params);
}
/* delete方法测试 */
export function fetachDelete() {
	return request.Delete('/deleteAPI');
}
/* put方法测试 */
export function fetachPut(params: Itest) {
	return request.put('/putAPI', params);
}
/* patch方法测试 */
export function fetachPatch(params: Itest) {
	return request.patch('/patchAPI', params);
}

/* 测试状态码500失败 */
export function testFailedRequest() {
	return request.get('/filedRequest');
}

/* 测试业务码500失败 */
export function testFailedResponse() {
	return request.get('/filedResponse');
}
/* 测试token刷新接口 */
export function testUpdataToken() {
	return request.get('/updataToken');
}
/* 测试token刷新接口 */
export function testFailedResponse_NT() {
	return request.get('/failedResponse_NT');
}

/* mock方法测试 */
export function fetchMock() {
	return mockRequest.post('/login');
}
