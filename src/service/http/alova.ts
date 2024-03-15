import type { Method } from 'alova'
import { createAlova } from 'alova'
import VueHook from 'alova/vue'
import GlobalFetch from 'alova/GlobalFetch'
import {
  handleBusinessError,
  handleRefreshToken,
  handleResponseError,
  handleServiceResult,
} from './handle'
import {
  DEFAULT_ALOVA_OPTIONS,
  DEFAULT_BACKEND_OPTIONS,
  REFRESH_TOKEN_CODE,
} from './config'
import { local } from '@/utils'

// docs path of alova.js https://alova.js.org/
/**
 * 前端alova的配置
 */
interface AlovaConfig {
  baseURL: string
  timeout?: number
  beforeRequest?: (method: Method<globalThis.Ref<unknown>>) => void
}

export function createAlovaInstance(
  alovaConfig: AlovaConfig,
  backendConfig?: Service.BackendConfig,
) {
  const _backendConfig = { ...DEFAULT_BACKEND_OPTIONS, ...backendConfig }
  const _alovaConfig = { ...DEFAULT_ALOVA_OPTIONS, ...alovaConfig }

  return createAlova({
    statesHook: VueHook,
    requestAdapter: GlobalFetch(),
    localCache: null,
    baseURL: _alovaConfig.baseURL,
    timeout: _alovaConfig.timeout,

    beforeRequest(method) {
      // 添加token到请求头
      method.config.headers.token = `Bearer ${local.get('token')}`
      alovaConfig.beforeRequest?.(method)
    },

    responded: {
    // 请求成功的拦截器
      onSuccess: async (response, method) => {
        const { status } = response

        if (status === 200) {
        // 获取返回的数据
          const apiData = await response.json()
          // 请求成功
          if (apiData[_backendConfig.codeKey] === _backendConfig.successCode)
            return handleServiceResult(apiData.data, null)

          // token失效, 刷新token
          if (REFRESH_TOKEN_CODE.includes(apiData[_backendConfig.codeKey])) {
            await handleRefreshToken()
            method.send()
          }

          // 业务请求失败
          const errorResult = handleBusinessError(apiData, _backendConfig)
          return handleServiceResult(null, errorResult)
        }
        // 接口请求失败
        const errorResult = handleResponseError(response)
        return handleServiceResult(null, errorResult)
      },
      onError: (error, _method) => {
        console.warn('🚀 ~ error:', error)
      },

      onComplete: async (_method) => {
        // 处理请求完成逻辑
      },
    },
  })
}
