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
export function getBlob(url: string) {
  const methodInstance = blankInstance.Get<Blob>(url)
  methodInstance.meta = {
    // 标识为bolb数据
    isBlob: true,
  }
  return methodInstance
}

/* 带进度的下载文件 */
export function downloadFile(url: string) {
  return blankInstance.Get(url, {
    // 开启下载进度
    enableDownload: true,
  })
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
