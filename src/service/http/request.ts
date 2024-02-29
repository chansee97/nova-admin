import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import CreateAxiosInstance from './instance'

type RequestMethod = 'get' | 'post' | 'put' | 'delete' | 'patch'
interface RequestParam {
  url: string
  method?: RequestMethod
  data?: any
  config?: AxiosRequestConfig
}

async function getRequestResponse(options: {
  instance: AxiosInstance
  method: RequestMethod
  url: string
  data?: any
  config?: AxiosRequestConfig
}) {
  const { instance, method, url, data, config } = options

  let res: any
  if (method === 'get' || method === 'delete')
    res = await instance[method](url, config)
  else res = await instance[method](url, data, config)

  return res
}

/**
 * @description:
 * @param {AxiosRequestConfig} axiosConfig - axios配置
 * @param {Service} backendConfig - 后台字段配置
 * @return {*}
 */
export function createRequest(
  axiosConfig: AxiosRequestConfig,
  backendConfig?: Partial<Service.BackendResultConfig>,
) {
  const axiosInstance = new CreateAxiosInstance(axiosConfig, backendConfig)
  /**
   * 异步promise请求
   * @param param - 请求参数
   * - url: 请求地址
   * - method: 请求方法(默认get)
   * - data: 请求的body的data
   * - config: axios配置
   */
  async function asyncRequest<T>(
    param: RequestParam,
  ): Promise<Service.RequestResult<T>> {
    const { url, method = 'get', data, config } = param
    const { instance } = axiosInstance
    const res = (await getRequestResponse({
      instance,
      method,
      url,
      data,
      config,
    })) as Service.RequestResult<T>
    return res
  }
  /**
   * get请求
   * @param url - 请求地址
   * @param config - axios配置
   */
  function get<T>(url: string, config?: AxiosRequestConfig) {
    return asyncRequest<T>({ url, config })
  }

  /**
   * post请求
   * @param url - 请求地址
   * @param data - 请求的body的data
   * @param config - axios配置
   */
  function post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return asyncRequest<T>({ url, method: 'post', data, config })
  }

  /**
   * post请求-form参数形式
   * @param url - 请求地址
   * @param data - 请求的body的data
   * @param config - axios配置
   */
  function formPost<T>(
    url: string,
    data?: any,
    config: AxiosRequestConfig = {},
  ) {
    config.headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
    return asyncRequest<T>({ url, method: 'post', data, config })
  }

  /**
   * delete请求
   * @param url - 请求地址
   * @param config - axios配置
   */
  function handleDelete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ) {
    return asyncRequest<T>({ url, method: 'delete', config })
  }

  /**
   * put请求
   * @param url - 请求地址
   * @param data - 请求的body的data
   * @param config - axios配置
   */
  function put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return asyncRequest<T>({ url, method: 'put', data, config })
  }

  return {
    get,
    post,
    formPost,
    put,
    delete: handleDelete,
  }
}
