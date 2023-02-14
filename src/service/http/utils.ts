import { ERROR_MSG_DURATION, ERROR_NO_TIP_STATUS } from '@/config';
import { isArray, isFile, isEmpty, isNullOrUnDef } from '@/utils';
import { EnumContentType } from '@/enum';
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
export async function transformRequestData(requestData: any, contentType?: string) {
	// application/json类型不处理
	let data = clearInvalidParameters(requestData);
	// let data = requestData;

	// form类型转换
	if (contentType === EnumContentType.formUrlencoded) {
		data = qs.stringify(data);
	}
	// form-data类型转换
	if (contentType === EnumContentType.formData) {
		data = await handleFormData(data);
	}

	return data;
}

async function handleFormData(data: Record<string, any>) {
	const formData = new FormData();
	const entries = Object.entries(data);

	entries.forEach(async ([key, value]) => {
		const isFileType = isFile(value) || (isArray(value) && value.length && isFile(value[0]));

		if (isFileType) {
			await transformFile(formData, key, value);
		} else {
			formData.append(key, value);
		}
	});

	return formData;
}

/**
 * 接口为上传文件的类型时数据转换
 * @param key - 文件的属性名
 * @param file - 单文件或多文件
 */
async function transformFile(formData: FormData, key: string, file: File[] | File) {
	if (isArray(file)) {
		// 多文件
		await Promise.all(
			(file as File[]).map((item) => {
				formData.append(key, item);
				return true;
			})
		);
	} else {
		// 单文件
		formData.append(key, file);
	}
}

/**
 * 接口提交的参数去除无效字段
 * @param requestData -接口提交的参数
 */
function clearInvalidParameters(requestData: Record<string, any>) {
	const result: Record<string, any> = {};
	for (const key in requestData) {
		if (isEmpty(requestData[key]) || isNullOrUnDef(requestData[key])) continue;
		result[key] = requestData[key];
	}
	return result;
}
