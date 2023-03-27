import axios from 'axios'
import type { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
import {
  handleAxiosError,
  handleBusinessError,
  handleRefreshToken,
  handleResponseError,
  handleServiceResult,
} from './handle'
import { clearInvalidParameters, transformRequestData } from './utils'
import { local } from '@/utils'
import { DEFAULT_AXIOS_OPTIONS, DEFAULT_BACKEND_OPTIONS, REFRESH_TOKEN_CODE } from '@/config'

/**
 * @description: 封装axios请求类
 */
export default class CreateAxiosInstance {
  // axios 实例
  instance: AxiosInstance
  // 后台字段配置
  backendConfig: Service.BackendResultConfig
  // 基础配置
  axiosConfig: AxiosRequestConfig = {}

  constructor(axiosConfig: AxiosRequestConfig, backendConfig: Service.BackendResultConfig = DEFAULT_BACKEND_OPTIONS) {
    // 设置了axios实例上的一些默认配置,新配置会覆盖默认配置
    this.backendConfig = { ...DEFAULT_BACKEND_OPTIONS, ...backendConfig }
    this.instance = axios.create({ ...DEFAULT_AXIOS_OPTIONS, ...axiosConfig })
    this.setInterceptor()
  }

  // 设置类拦截器的函数
  setInterceptor() {
    this.instance.interceptors.request.use(
      async (config) => {
        const handleConfig = { ...config }
        if (handleConfig.headers) {
          // 清除无效字段
          handleConfig.data = clearInvalidParameters(handleConfig.data)
          // 数据格式转换
          const contentType = handleConfig.headers.getContentType() as unknown as UnionKey.ContentType
          if (contentType)
            handleConfig.data = await transformRequestData(handleConfig.data, contentType)

          // 设置token
          handleConfig.headers.setAuthorization(`Bearer ${local.get('token') || ''}`)
        }
        return handleConfig
      },
      (error: AxiosError) => {
        const errorResult = handleAxiosError(error)
        return handleServiceResult(null, errorResult)
      },
    )
    this.instance.interceptors.response.use(
      async (response): Promise<any> => {
        const { status } = response
        if (status === 200) {
          // 获取返回的数据
          const apiData = response.data
          const { codeKey, successCode, dataKey } = this.backendConfig
          // 请求成功
          if (apiData[codeKey] === successCode)
            return handleServiceResult(apiData[dataKey], null)

          // token失效, 刷新token
          if (REFRESH_TOKEN_CODE.includes(apiData[codeKey])) {
            const config = await handleRefreshToken(response.config)
            if (config)
              return this.instance.request(config)
          }
          // 业务请求失败
          const errorResult = handleBusinessError(apiData, this.backendConfig)
          return handleServiceResult(null, errorResult)
        }
        // 接口请求失败
        const errorResult = handleResponseError(response)
        return handleServiceResult(null, errorResult)
      },
      (error: AxiosError) => {
        // 处理http常见错误，进行全局提示等
        const errorResult = handleAxiosError(error)
        return handleServiceResult(null, errorResult)
      },
    )
  }
}
