import { local } from '@/utils'
import { createAlova } from 'alova'
import { createServerTokenAuthentication } from 'alova/client'
import adapterFetch from 'alova/fetch'
import VueHook, { type VueHookType } from 'alova/vue'
import {
  DEFAULT_ALOVA_OPTIONS,
  DEFAULT_BACKEND_OPTIONS,
} from './config'
import {
  handleBusinessError,
  handleRefreshToken,
  handleResponseError,
  handleServiceResult,
} from './handle'

const { onAuthRequired, onResponseRefreshToken } = createServerTokenAuthentication<VueHookType>({
  // 服务端判定token过期
  refreshTokenOnSuccess: {
    // 当服务端返回401时，表示token过期
    isExpired: (response, method) => {
      const isExpired = method.meta && method.meta.isExpired
      return response.status === 401 && !isExpired
    },

    // 当token过期时触发，在此函数中触发刷新token
    handler: async (_response, method) => {
      // 此处采取限制，防止过期请求无限循环重发
      if (!method.meta)
        method.meta = { isExpired: true }
      else
        method.meta.isExpired = true

      await handleRefreshToken()
    },
  },
  // 添加token到请求头
  assignToken: (method) => {
    method.config.headers.Authorization = `Bearer ${local.get('accessToken')}`
  },
})

// docs path of alova.js https://alova.js.org/
export function createAlovaInstance(
  alovaConfig: Service.AlovaConfig,
  backendConfig?: Service.BackendConfig,
) {
  const _backendConfig = { ...DEFAULT_BACKEND_OPTIONS, ...backendConfig }
  const _alovaConfig = { ...DEFAULT_ALOVA_OPTIONS, ...alovaConfig }

  return createAlova({
    statesHook: VueHook,
    requestAdapter: adapterFetch(),
    cacheFor: null,
    baseURL: _alovaConfig.baseURL,
    timeout: _alovaConfig.timeout,

    beforeRequest: onAuthRequired((method) => {
      if (method.meta?.isFormPost) {
        method.config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        method.data = new URLSearchParams(method.data as URLSearchParams).toString()
      }
      alovaConfig.beforeRequest?.(method)
    }),
    responded: onResponseRefreshToken({
      // 请求成功的拦截器
      onSuccess: async (response, method) => {
        const { status } = response

        if (status === 200) {
          // 返回blob数据
          if (method.meta?.isBlob)
            return response.blob()

          // 返回json数据
          const apiData = await response.json()
          // 请求成功
          if (apiData[_backendConfig.codeKey] === _backendConfig.successCode)
            return handleServiceResult(apiData)

          // 业务请求失败
          const errorResult = handleBusinessError(apiData, _backendConfig)
          return handleServiceResult(errorResult, false)
        }
        // 接口请求失败
        const errorResult = handleResponseError(response)
        return handleServiceResult(errorResult, false)
      },
      onError: (error, method) => {
        const tip = `[${method.type}] - [${method.url}] - ${error.message}`
        window.$message?.warning(tip)
      },

      onComplete: async (_method) => {
        // 处理请求完成逻辑
      },
    }),
  })
}
