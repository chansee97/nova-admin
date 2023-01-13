// 读取缓存前缀
const prefix = import.meta.env.VITE_STORAGE_PREFIX as string;

interface StorageData {
	value: any;
	expire: number | null;
}
/**
 * LocalStorage部分操作
 */
function createLocalStorage() {
	// 默认缓存期限为7天
	const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

	function set(key: string, value: any, expire: number = DEFAULT_CACHE_TIME) {
		const storageData: StorageData = {
			value,
			expire: new Date().getTime() + expire * 1000,
		};
		const json = JSON.stringify(storageData);
		window.localStorage.setItem(prefix + key, json);
	}

	function get(key: string) {
		const json = window.localStorage.getItem(prefix + key);
		if (!json) return null;

		let storageData: StorageData | null = null;
		storageData = JSON.parse(json as string);

		if (storageData) {
			const { value, expire } = storageData;
			if (expire === null || expire >= Date.now()) {
				return value;
			}
		}
		local.remove(key);
		return null;
	}

	function remove(key: string) {
		window.localStorage.removeItem(prefix + key);
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
		const json = JSON.stringify(value);
		window.sessionStorage.setItem(prefix + key, json);
	}
	function get<T>(key: string) {
		const json = sessionStorage.getItem(prefix + key);
		let data: T | null = null;
		if (json) {
			try {
				data = JSON.parse(json);
			} catch {
				// 防止解析失败
			}
		}
		return data;
	}
	function remove(key: string) {
		window.sessionStorage.removeItem(prefix + key);
	}
	function clear() {
		window.sessionStorage.clear();
	}
}

export const local = createLocalStorage();
export const session = createSessionStorage();
