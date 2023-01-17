import { encrypto, decrypto } from './crypto';
// 读取缓存前缀
import { STORAGE_PREFIX, STORAGE_DEFAULT_CACHE_TIME } from '@/config';

interface StorageData {
	value: any;
	expire: number | null;
}
/**
 * LocalStorage部分操作
 */
function createLocalStorage() {
	// 默认缓存期限为7天

	function set(key: string, value: any, expire: number = STORAGE_DEFAULT_CACHE_TIME) {
		const storageData: StorageData = {
			value,
			expire: new Date().getTime() + expire * 1000,
		};
		const json = encrypto(storageData);
		window.localStorage.setItem(STORAGE_PREFIX + key, json);
	}

	function get(key: string) {
		const json = window.localStorage.getItem(STORAGE_PREFIX + key);
		if (!json) return null;

		let storageData: StorageData | null = null;
		try {
			storageData = decrypto(json);
		} catch {
			// 防止解析失败
		}

		if (storageData) {
			const { value, expire } = storageData;
			if (expire === null || expire >= Date.now()) {
				return value;
			}
		}
		remove(key);
		return null;
	}

	function remove(key: string) {
		window.localStorage.removeItem(STORAGE_PREFIX + key);
	}

	function clear() {
		window.localStorage.clear();
	}
	return {
		set,
		get,
		remove,
		clear,
	};
}
/**
 * sessionStorage部分操作
 */

function createSessionStorage() {
	function set(key: string, value: any) {
		const json = encrypto(value);
		window.sessionStorage.setItem(STORAGE_PREFIX + key, json);
	}
	function get(key: string) {
		const json = sessionStorage.getItem(STORAGE_PREFIX + key);
		if (!json) return null;

		let storageData;
		try {
			storageData = decrypto(json);
		} catch {
			// 防止解析失败
		}

		if (storageData) {
			return storageData;
		}
		return null;
	}
	function remove(key: string) {
		window.sessionStorage.removeItem(STORAGE_PREFIX + key);
	}
	function clear() {
		window.sessionStorage.clear();
	}

	return {
		set,
		get,
		remove,
		clear,
	};
}

export const local = createLocalStorage();
export const session = createSessionStorage();
