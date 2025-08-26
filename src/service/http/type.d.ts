import type { Method } from 'alova'
import type {
  ERROR_STATUS,
} from './config'

export type ErrorStatus = keyof typeof ERROR_STATUS

export interface AlovaConfig {
  baseURL: string
  timeout?: number
  beforeRequest?: (method: Method<globalThis.Ref<unknown>>) => void
}

/** 后端接口返回的数据结构配置 */
export interface BackendConfig {
  /** 表示后端请求状态码的属性字段 */
  codeKey?: string
  /** 表示后端请求数据的属性字段 */
  dataKey?: string
  /** 表示后端消息的属性字段 */
  msgKey?: string
  /** 后端业务上定义的成功请求的状态 */
  successCode?: number | string
}
