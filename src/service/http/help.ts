import type { AxiosResponse, AxiosError } from 'axios';
import {
	DEFAULT_REQUEST_ERROR_CODE,
	DEFAULT_REQUEST_ERROR_MSG,
	NETWORK_ERROR_CODE,
	NETWORK_ERROR_MSG,
	REQUEST_TIMEOUT_CODE,
	REQUEST_TIMEOUT_MSG,
	ERROR_STATUS,
} from '@/config';
type ErrorStatus = keyof typeof ERROR_STATUS;
/**
 * @description: 处理axios返回的http错误
 * @param {AxiosError} err
 * @return {*}
 */
export function handleHttpError(err: AxiosError) {
	const error = {
		type: 'axios',
		code: DEFAULT_REQUEST_ERROR_CODE,
		msg: DEFAULT_REQUEST_ERROR_MSG,
	};
	// 网络错误
	if (!window.navigator.onLine || err.message === 'Network Error') {
		Object.assign(error, { code: NETWORK_ERROR_CODE, msg: NETWORK_ERROR_MSG });
	}
	// 超时错误
	if (err.code === REQUEST_TIMEOUT_CODE && err.message.includes('timeout')) {
		Object.assign(error, {
			code: REQUEST_TIMEOUT_CODE,
			msg: REQUEST_TIMEOUT_MSG,
		});
	}
	// 请求错误
	if (err.response) {
		const errorCode: ErrorStatus = (err.response?.status as ErrorStatus) || 'DEFAULT';
		const msg = ERROR_STATUS[errorCode];
		Object.assign(error, { code: errorCode, msg });
	}

	return error;
}

/**
 * @description: 处理axios请求成功，但返回后端服务器报错
 * @param {AxiosResponse} err
 * @return {*}
 */
// export function handleResponseError(err: AxiosResponse) {}

// export function handleBusinessError() {}
