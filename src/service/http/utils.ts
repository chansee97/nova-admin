import { ERROR_MSG_DURATION, ERROR_NO_TIP_STATUS } from '@/config';
import { isArray, isFile, isEmpty, isNullOrUnDef } from '@/utils';
import qs from 'qs';

export function showError(error: Service.RequestError) {
	// 如果error不需要提示,则跳过
	const code = Number(error.code);
	if (ERROR_NO_TIP_STATUS.includes(code)) return;

	window.console.warn(error.code, error.msg);
	window.$message?.error(error.msg, { duration: ERROR_MSG_DURATION });
}
/**
 * 请求数据的转换
 * @param requestData - 请求数据
 * @param contentType - 请求头的Content-Type
 */
export async function transformRequestData(requestData: any, contentType?: UnionKey.ContentType) {
	// application/json类型不处理,清除发送参数的无效字段
	let data: any = clearInvalidParameters(requestData);

	// form类型转换
	if (contentType === 'application/x-www-form-urlencoded') {
		data = qs.stringify(data);
	}
	// form-data类型转换
	if (contentType === 'multipart/form-data') {
		data = await handleFormData(data);
	}

	return data;
}

async function handleFormData(data: Record<string, any>) {
	const formData = new FormData();
	const entries = Object.entries(data);

	entries.forEach(async ([key, value]) => {
		const isFileType = isFile(value) || (isArray(value) && value.length && isFile(value[0]));

		if (isFileType && isArray(value)) {
			value.forEach((item) => formData.append(key, item))

		} else {
			formData.append(key, value);
		}
	});

	return formData;
}

/**
 * 接口提交的参数去除无效字段
 * @param requestData -接口提交的参数
 */
export function clearInvalidParameters(requestData: Record<string, any>) {
	const result: Record<string, any> = {};
	for (const key in requestData) {
		if (isEmpty(requestData[key]) || isNullOrUnDef(requestData[key])) continue;
		result[key] = requestData[key];
	}
	return result;
}
