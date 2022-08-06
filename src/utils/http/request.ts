import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import createAxiosInstance from './instance';

type RequestMethod = 'get' | 'post' | 'put' | 'delete';

// 获取aixos请求方法
async function getRequestResponse(
  instance: AxiosInstance,
  method: RequestMethod,
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
) {
  let res: any;
  if (method === 'get' || method === 'delete') {
    res = await instance[method](url, config);
  } else {
    res = await instance[method](url, data, config);
  }
  return res;
}

interface RequestParam {
  url: string;
  method?: RequestMethod;
  data?: any;
  axiosConfig?: AxiosRequestConfig;
}

export function createRequest(axiosConfig: AxiosRequestConfig, backendConfig?: Service.BackendResultConfig) {
  const axiosInstance = new createAxiosInstance(axiosConfig, backendConfig);

  /**
   * 异步promise请求
   * @param param - 请求参数
   * - url: 请求地址
   * - method: 请求方法(默认get)
   * - data: 请求的body的data
   * - axiosConfig: axios配置
   */
  async function asyncRequest(param: RequestParam) {
    const { instance } = axiosInstance;
    const method = param.method || 'get';
    const { url } = param;
    const res = await getRequestResponse(instance, method, url, param.data, param.axiosConfig);
    return res;
  }

  /**
   * @description: get请求
   * @param {string} url
   * @param {AxiosRequestConfig} config
   * @return {*}
   */
  function get(url: string, config: AxiosRequestConfig) {
    return asyncRequest({ url, method: 'get', axiosConfig: config });
  }
}
