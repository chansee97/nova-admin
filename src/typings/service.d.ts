/** 请求的相关类型 */
declare namespace Service {
  import type { Method } from 'alova'

  interface AlovaConfig {
    baseURL: string
    timeout?: number
    beforeRequest?: (method: Method<globalThis.Ref<unknown>>) => void
  }

  /** 后端接口返回的数据结构配置 */
  interface BackendConfig {
    /** 表示后端请求状态码的属性字段 */
    codeKey?: string
    /** 表示后端请求数据的属性字段 */
    dataKey?: string
    /** 表示后端消息的属性字段 */
    msgKey?: string
    /** 后端业务上定义的成功请求的状态 */
    successCode?: number | string
  }

  type RequestErrorType = 'Response' | 'Business'
  type RequestCode = string | number

  interface RequestError {
    /** 请求服务的错误类型 */
    type: RequestErrorType
    /** 错误码 */
    code: RequestCode
    /** 错误信息 */
    msg: string
  }

  /** 自定义的请求成功结果 */
  interface SuccessResult<T = any> {
    /** 请求错误 */
    error: null
    /** 请求数据 */
    data: T
  }

  /** 自定义的请求失败结果 */
  interface FailedResult {
    /** 请求错误 */
    error: RequestError
    /** 请求数据 */
    data: null
  }

  /** 自定义的请求结果 */
  type RequestResult<T = any> = SuccessResult<T> | FailedResult
}
