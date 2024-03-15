import qs from 'qs'
import { alovaInstance } from '../http'

/* get方法测试 */
export function fetachGet(params?: any) {
  return alovaInstance.Get('/getAPI', { params })
}
/* post方法测试 */
export function fetachPost(data: any) {
  return alovaInstance.Post('/postAPI', data)
}
/* formPost方法测试 */
export function fetachFormPost(data: any) {
  return alovaInstance.Post('/postAPI', qs.stringify(data), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
}
/* delete方法测试 */
export function fetachDelete() {
  return alovaInstance.Delete('/deleteAPI')
}
/* put方法测试 */
export function fetachPut(data: any) {
  return alovaInstance.Put('/putAPI', data)
}

/* 测试状态码500失败 */
export function testFailedRequest() {
  return alovaInstance.Get('/serverError')
}

/* 测试业务码500失败 */
export function testFailedResponse() {
  return alovaInstance.Post('/businessError')
}
/* token失效的接口 */
export function expiredTokenRequest() {
  return alovaInstance.Get('/expiredToken')
}
/* 测试token刷新接口 */
export function refreshToken() {
  return alovaInstance.Get('/updataToken')
}
