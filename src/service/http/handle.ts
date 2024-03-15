import type { AxiosError } from 'axios'
import { showError } from './utils'
import {
  DEFAULT_REQUEST_ERROR_CODE,
  DEFAULT_REQUEST_ERROR_MSG,
  ERROR_STATUS,
  NETWORK_ERROR_CODE,
  NETWORK_ERROR_MSG,
  REQUEST_TIMEOUT_CODE,
  REQUEST_TIMEOUT_MSG,
} from './config'
import { useAuthStore } from '@/store'
import { fetchUpdateToken } from '@/service'
import { local } from '@/utils'

type ErrorStatus = keyof typeof ERROR_STATUS

/**
 * @description: 处理axios或http错误
 * @param {AxiosError} err
 * @return {*}
 */
export function handleFontEndError(err: AxiosError) {
  const error: Service.RequestError = {
    type: 'Alova',
    code: DEFAULT_REQUEST_ERROR_CODE,
    msg: DEFAULT_REQUEST_ERROR_MSG,
  }
  // 网络错误
  if (!window.navigator.onLine || err.message === 'Network Error')
    Object.assign(error, { code: NETWORK_ERROR_CODE, msg: NETWORK_ERROR_MSG })

  // 超时错误
  if (err.code === REQUEST_TIMEOUT_CODE && err.message.includes('timeout')) {
    Object.assign(error, {
      code: REQUEST_TIMEOUT_CODE,
      msg: REQUEST_TIMEOUT_MSG,
    })
  }
  // 请求错误
  if (err.response) {
    const errorCode: ErrorStatus = (err.response?.status as ErrorStatus) || 'DEFAULT'
    const msg = ERROR_STATUS[errorCode]
    Object.assign(error, { code: errorCode, msg })
  }

  showError(error)

  return error
}

/**
 * @description: 处理axios请求成功，但返回后端服务器报错
 * @param {AxiosResponse} response
 * @return {*}
 */
export function handleResponseError(response: Response) {
  const error: Service.RequestError = {
    type: 'Axios',
    code: DEFAULT_REQUEST_ERROR_CODE,
    msg: DEFAULT_REQUEST_ERROR_MSG,
  }

  if (!window.navigator.onLine) {
    // 网路错误
    Object.assign(error, { code: NETWORK_ERROR_CODE, msg: NETWORK_ERROR_MSG })
  }
  else {
    // 请求成功的状态码非200的错误
    const errorCode: ErrorStatus = response.status as ErrorStatus
    const msg = ERROR_STATUS[errorCode] || DEFAULT_REQUEST_ERROR_MSG
    Object.assign(error, { type: 'Response', code: errorCode, msg })
  }

  showError(error)

  return error
}

/**
 * @description:
 * @param {Record} data 接口返回的后台数据
 * @param {Service} config axios字段配置
 * @return {*}
 */
export function handleBusinessError(data: Record<string, any>, config: Service.BackendConfig) {
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
  const refreshToken = local.get('refreshToken')
  const { data } = await fetchUpdateToken(refreshToken)
  if (data) {
    local.set('token', data.accessToken)
    local.set('refreshToken', data.refreshToken)
  }
  else {
    // 刷新失败，推出
    await authStore.resetAuthStore()
  }
}
