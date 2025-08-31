import { local } from '@/utils'
import { createAlova } from 'alova'
import { createServerTokenAuthentication } from 'alova/client'
import adapterFetch from 'alova/fetch'
import VueHook from 'alova/vue'
import type { VueHookType } from 'alova/vue'
import {
  DEFAULT_ALOVA_OPTIONS,
  DEFAULT_BACKEND_OPTIONS,
  ERROR_STATUS,

} from './config'
import {
  handleRefreshToken,
} from './handle'

import type { AlovaConfig, BackendConfig, ErrorStatus } from './type'

const { onAuthRequired, onResponseRefreshToken } = createServerTokenAuthentication<VueHookType>({
  // 服务端判定token过期
  refreshTokenOnSuccess: {
    // 当服务端返回401时，表示token过期
    isExpired: async (response, method) => {
      const res = await response.clone().json()

      const isExpired = method.meta && method.meta.isExpired
      return (response.status === 401 || res.code === 401) && !isExpired
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
  alovaConfig: AlovaConfig,
  backendConfig?: BackendConfig,
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
      alovaConfig.beforeRequest?.(method as any)
    }),
    responded: onResponseRefreshToken({
      // 请求成功的拦截器
      onSuccess: async (response, method) => {
        const { status } = response
        let errorMessage = ''

        const res = await response.clone().json()
        if (status === 200) {
          // 返回blob数据
          if (method.meta?.isBlob)
            return response.blob()

          // 请求成功
          if (res[_backendConfig.codeKey] === _backendConfig.successCode)
            return res

          // 业务请求失败
          errorMessage = res[_backendConfig.msgKey]
        }
        else {
          // 接口请求失败
          const errorCode = response.status as ErrorStatus
          errorMessage = res[_backendConfig.msgKey] || ERROR_STATUS[errorCode] || ERROR_STATUS.default
        }
        window.$message?.error(errorMessage)
        throw new Error(errorMessage)
      },
      onError: (error, method) => {
        const tip = `[${method.type}] - [${method.url}] - ${error.message}`
        window.$message?.warning(tip)
        throw new Error(tip)
      },

      onComplete: async (_method) => {
        // 处理请求完成逻辑
      },
    }),
  })
}
