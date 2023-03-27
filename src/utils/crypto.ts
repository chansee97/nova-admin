import CryptoJS from 'crypto-js';
import { isObject } from './is';

const { VITE_STORAGE_ENCRYPT } = import.meta.env;
import { STORAGE_ENCRYPT_SECRET } from '@/config';

/**
 * 加密数据
 * @param data - 数据
 */
export function encrypto(data: any) {
	let newData = data;

	if (isObject(data)) {
		newData = JSON.stringify(data);
	}

	if (VITE_STORAGE_ENCRYPT) {
		return newData;
	}

	return CryptoJS.AES.encrypt(newData, STORAGE_ENCRYPT_SECRET).toString();
}

/**
 * 解密数据
 * @param cipherText - 密文
 */
export function decrypto(cipherText: string) {
	if (!VITE_STORAGE_ENCRYPT) {
		return JSON.parse(cipherText);
	}

	const bytes = CryptoJS.AES.decrypt(cipherText, STORAGE_ENCRYPT_SECRET);
	const originalText = bytes.toString(CryptoJS.enc.Utf8);

	if (originalText) {
		return JSON.parse(originalText);
	}

	return null;
}
