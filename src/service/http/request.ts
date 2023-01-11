import type { AxiosRequestConfig } from 'axios';
import createAxiosInstance from './instance';

/**
 * @description:
 * @param {AxiosRequestConfig} axiosConfig - axios配置
 * @param {Service} backendConfig - 后台字段配置
 * @return {*}
 */
export function createRequest(
	axiosConfig: AxiosRequestConfig,
	backendConfig?: Service.BackendResultConfig
) {
	const axiosInstance = new createAxiosInstance(axiosConfig, backendConfig);
	const { instance } = axiosInstance;

	/**
	 * @description: 通用请求方法
	 * @param {string} url- 请求地址
	 * @param {RequestMethod} method - 请求方法
	 * @param {any} data - 请求数据体
	 * @param {AxiosRequestConfig} config - 请求配置
	 * @return {*}
	 */
	type RequestMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';
	const request = async (
		url: string,
		method: RequestMethod = 'get',
		data: any,
		config?: AxiosRequestConfig
	) => {
		return instance(url, { method, data, ...config });
	};

	/**
	 * @description: get请求
	 * @param {string} url - 请求地址
	 * @return {*}
	 */
	const get = async (url: string, config?: AxiosRequestConfig) => {
		return instance.get(url, config);
	};

	/**
	 * @description: post请求
	 * @param url - 请求地址
	 * @param data - 请求的body的data
	 * @param config - axios配置
	 */
	const post = async (url: string, data?: any, config?: AxiosRequestConfig) => {
		return instance.post(url, data, config);
	};

	/**
	 * @description: delete请求
	 * @param url - 请求地址
	 * @param config - axios配置
	 */
	const Delete = async (url: string, config?: AxiosRequestConfig) => {
		return instance.delete(url, config);
	};

	/**
	 * @description: put请求
	 * @param url - 请求地址
	 * @param data - 请求的body的data
	 * @param config - axios配置
	 */
	const put = async (url: string, data?: any, config?: AxiosRequestConfig) => {
		return instance.put(url, data, config);
	};

	/**
	 * @description: patch请求
	 * @param url - 请求地址
	 * @param data - 请求的body的data
	 * @param config - axios配置
	 */
	const patch = async (
		url: string,
		data?: any,
		config?: AxiosRequestConfig
	) => {
		return instance.patch(url, data, config);
	};

	return {
		request,
		get,
		post,
		Delete,
		put,
		patch,
	};
}
