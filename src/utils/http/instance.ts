import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * @description: 封装axios请求类
 */
export default class createAxiosInstance {
  // axios 实例
  instance: AxiosInstance;
  // 后台字段配置
  backendConfig: Service.BackendResultConfig;
  // 基础配置，url和超时时间
  baseConfig: AxiosRequestConfig = { baseURL: '/api', timeout: 60000 };

  constructor(
    config: AxiosRequestConfig,
    backendConfig: Service.BackendResultConfig = {
      codeKey: 'code',
      dataKey: 'data',
      msgKey: 'msg',
      successCode: '200',
    },
  ) {
    this.backendConfig = backendConfig;
    this.instance = axios.create(config);
    this.setInterceptor();
  }

  // 设置类拦截器
  setInterceptor() {
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // 一般会请求拦截里面加token
        console.log('全局请求拦截器');
        return config;
      },
      (err: any) => err,
    );
    this.instance.interceptors.response.use(
      // 因为接口的数据都在res.data下，所以直接返回res.data
      // 系统如果有自定义code也可以在这里处理
      (res: AxiosResponse) => {
        console.log('全局响应拦截器');
        return res.data;
      },
      (err: any) => {
        // 这里用来处理http常见错误，进行全局提示
        console.log('错误状态码：', err.response.status);
        // 这里是AxiosError类型，所以一般我们只reject我们需要的响应即可
        return Promise.reject(err.response);
      },
    );
  }
}
