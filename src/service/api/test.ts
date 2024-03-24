import { alovaInstance, blankInstance } from '../http'

/* get方法测试 */
export function fetachGet(params?: any) {
  return alovaInstance.Get('/getAPI', { params })
}

/* post方法测试 */
export function fetchPost(data: any) {
  return alovaInstance.Post('/postAPI', data)
}
/* formPost方法测试 */
export function fetchFormPost(data: any) {
  const methodInstance = alovaInstance.Post('/postFormAPI', data)
  methodInstance.meta = {
    isFormPost: true,
  }
  return methodInstance
}
/* delete方法测试 */
export function fetchDelete() {
  return alovaInstance.Delete('/deleteAPI')
}
/* put方法测试 */
export function fetchPut(data: any) {
  return alovaInstance.Put('/putAPI', data)
}
/* 不携带token的接口 */
export function withoutToken() {
  const methodInstance = alovaInstance.Get('/getAPI')
  methodInstance.meta = {
    authRole: null,
  }
  return methodInstance
}
/* 接口数据转换 */
export function dictData() {
  return alovaInstance.Get('/getDictData', {
    transformData(rawData, _headers) {
      const { data } = rawData as any
      return {
        gender: data.gender === 0 ? '男' : '女',
        status: `状态是${data.status}`,
      }
    },
  })
}
/* 模拟获取二进制文件 */
export function getBlob() {
  const methodInstance = blankInstance.Get('https://images.unsplash.com/photo-1663529628961-80aa6ebcd157?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80')
  methodInstance.meta = {
    isDownload: true,
  }
  return methodInstance
}
/* 测试状态码500失败 */
export function FailedRequest() {
  return alovaInstance.Get('/serverError')
}

/* 测试业务码500失败 */
export function FailedResponse() {
  return alovaInstance.Post('/businessError')
}
/* 测试业务码10000失败,无提示 */
export function FailedResponseWithoutTip() {
  return alovaInstance.Post('/businessErrorWithoutTip')
}
/* token失效的接口 */
export function expiredTokenRequest() {
  return alovaInstance.Get('/expiredToken')
}
/* 测试token刷新接口 */
export function refreshToken() {
  return alovaInstance.Get('/updataToken')
}
