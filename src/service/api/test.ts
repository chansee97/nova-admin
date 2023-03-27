import { mockRequest, request } from '../http'

/* get方法测试 */
export function fetachGet(params?: any) {
  return request.get('/getAPI', { params })
}
/* post方法测试 */
export function fetachPost(data: any) {
  return request.post('/postAPI', data)
}
/* formPost方法测试 */
export function fetachFormPost(data: any) {
  return request.formPost('/postAPI', data)
}
/* delete方法测试 */
export function fetachDelete() {
  return request.delete('/deleteAPI')
}
/* put方法测试 */
export function fetachPut(data: any) {
  return request.put('/putAPI', data)
}

/* 测试状态码500失败 */
export function testFailedRequest() {
  return request.get('/filedRequest')
}

/* 测试业务码500失败 */
export function testFailedResponse() {
  return request.get('/filedResponse')
}
/* 测试token刷新接口 */
export function testUpdataToken() {
  return request.get('/updataToken')
}
/* 测试token刷新接口 */
export function testFailedResponse_NT() {
  return request.get('/failedResponse_NT')
}

/* mock方法测试 */
export function fetchMock() {
  return mockRequest.post('/login')
}
