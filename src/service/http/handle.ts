import { showError } from './utils'
import {
  ERROR_STATUS,
} from './config'
import { useAuthStore } from '@/store'
import { fetchUpdateToken } from '@/service'
import { local } from '@/utils'

type ErrorStatus = keyof typeof ERROR_STATUS

/**
 * @description: 处理请求成功，但返回后端服务器报错
 * @param {Response} response
 * @return {*}
 */
export function handleResponseError(response: Response) {
  const error: Service.RequestError = {
    type: 'Response',
    code: 0,
    msg: ERROR_STATUS[0],
  }
  const errorCode: ErrorStatus = response.status as ErrorStatus
  const msg = ERROR_STATUS[errorCode] || ERROR_STATUS[0]
  Object.assign(error, { code: errorCode, msg })

  showError(error)

  return error
}

/**
 * @description:
 * @param {Record} data 接口返回的后台数据
 * @param {Service} config 后台字段配置
 * @return {*}
 */
export function handleBusinessError(data: Record<string, any>, config: Required<Service.BackendConfig>) {
  const { codeKey, msgKey } = config
  const error: Service.RequestError = {
    type: 'Business',
    code: data[codeKey],
    msg: data[msgKey],
  }

  showError(error)

  return error
}

/**
 * @description: 统一成功和失败返回类型
 * @param {any} data
 * @param {Service} error
 * @return {*} result
 */
export function handleServiceResult<T = any>(data: any, error: Service.RequestError | null) {
  if (error) {
    const fail: Service.FailedResult = {
      error,
      data: null,
    }
    return fail
  }
  const success: Service.SuccessResult<T> = {
    error: null,
    data,
  }
  return success
}

/**
 * @description: 处理接口token刷新
 * @return {*}
 */
export async function handleRefreshToken() {
  const authStore = useAuthStore()
  const data = await fetchUpdateToken({ refreshToken: local.get('refreshToken') })
  if (data) {
    local.set('token', data.accessToken)
    local.set('refreshToken', data.refreshToken)
  }
  else {
    // 刷新失败，退出
    await authStore.resetAuthStore()
  }
}
