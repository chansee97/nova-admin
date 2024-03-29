/** 默认实例的Aixos配置 */
export const DEFAULT_ALOVA_OPTIONS = {
  // 请求超时时间,默认15秒
  timeout: 15 * 1000,
}

/** 默认实例的后端字段配置 */
export const DEFAULT_BACKEND_OPTIONS = {
  codeKey: 'code',
  dataKey: 'data',
  msgKey: 'msg',
  successCode: 200,
}

/** 请求不成功各种状态的错误 */
export const ERROR_STATUS = {
  default: '请求错误~',
  400: '400: 请求出现语法错误~',
  401: '401: 用户未授权~',
  403: '403: 服务器拒绝访问~',
  404: '404: 请求的资源不存在~',
  405: '405: 请求方法未允许~',
  408: '408: 网络请求超时~',
  500: '500: 服务器内部错误~',
  501: '501: 服务器未实现请求功能~',
  502: '502: 错误网关~',
  503: '503: 服务不可用~',
  504: '504: 网关超时~',
  505: '505: http版本不支持该请求~',
}

/** 没有错误提示的code */
export const ERROR_NO_TIP_STATUS = [10000]
