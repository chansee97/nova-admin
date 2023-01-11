import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { getToken } from '@/utils';
import { handleAxiosError, handleResponseError, handleBusinessError } from './handle';

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
			async (config) => {
				const handleConfig = { ...config };
				if (handleConfig.headers) {
					// 设置token
					typeof handleConfig.headers.set === 'function' &&
						handleConfig.headers.set('Authorization', `Bearer ${getToken() || ''}`);
				}
				return handleConfig;
			},
			(axiosError: AxiosError) => {
				const error = handleAxiosError(axiosError);
				Promise.reject(error);
			}
		);
		this.instance.interceptors.response.use(
			async (response) => {
				const { status } = response;
				if (status === 200) {
					// 获取返回的数据
					const apiData = response.data;
					const { codeKey, successCode } = this.backendConfig;
					// 请求成功
					if (apiData[codeKey] == successCode) {
						// return apiData[dataKey];
						return apiData;
					}
					//TODO 添加刷新token的操作
					// 业务请求失败
					const error = handleBusinessError(apiData, this.backendConfig);
					return Promise.reject(error);
				}
				// 接口请求失败
				const error = handleResponseError(response);
				return Promise.reject(error);
			},
			(axiosError: AxiosError) => {
				// 处理http常见错误，进行全局提示等
				const error = handleAxiosError(axiosError);
				return Promise.reject(error);
			}
		);
	}
}
