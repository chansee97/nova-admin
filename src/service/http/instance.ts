import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { getToken } from '@/utils';
// import { handleHttpError, handleResponseError, handleBusinessError } from './help';
import { handleHttpError } from './help';

/**
 * @description: 封装axios请求类
 */
export default class createAxiosInstance {
	// axios 实例
	instance: AxiosInstance;
	// 后台字段配置
	backendConfig: Service.BackendResultConfig;
	// 基础配置
	axiosConfig: AxiosRequestConfig = {};

	constructor(
		axiosConfig: AxiosRequestConfig,
		backendConfig: Service.BackendResultConfig = {
			codeKey: 'code',
			dataKey: 'data',
			msgKey: 'msg',
			successCode: '200',
		}
	) {
		this.backendConfig = backendConfig;
		// 设置了axios实例上的一些默认配置,新配置会覆盖默认配置
		this.instance = axios.create({ timeout: 60000, ...axiosConfig });

		this.setInterceptor();
	}

	// 设置类拦截器的函数
	setInterceptor() {
		this.instance.interceptors.request.use(
			(config: AxiosRequestConfig) => {
				// 一般会请求拦截里面加token
				config.headers!.Authorization = getToken();
				return config;
			},
			(err: any) => Promise.reject(err)
		);
		this.instance.interceptors.response.use(
			// 因为接口的数据都在res.data下，所以直接返回res.data
			// 系统如果有自定义code也可以在这里处理
			(res: AxiosResponse) => {
				// apiData 是 API 返回的数据
				const apiData = res.data;
				// 这个 Code 是和后端约定的业务 Code
				const code = String(res.data[this.backendConfig.codeKey]);
				switch (code) {
					case this.backendConfig.successCode:
						// code === 200 代表没有错误,直接返回约定的数据内容
						return apiData;
					default:
						// 不是正确的 Code,返回错误提示信息
						return Promise.reject(new Error(`Error:${this.backendConfig.dataKey}`));
				}
			},
			(err: AxiosError) => {
				// 这里用来处理http常见错误，进行全局提示等
				const error = handleHttpError(err);
				// 这里是AxiosError类型，所以一般我们只reject我们需要的响应即可
				return Promise.reject(error);
			}
		);
	}
}
