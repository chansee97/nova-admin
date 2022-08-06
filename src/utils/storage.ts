// 默认缓存期限为7天
const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

// 读取缓存前缀
const prefix = import.meta.env.VITE_STORAGE_PREFIX as string;

interface StorageData {
  value: any;
  expire: number | null;
}

/**
 * LocalStorage部分操作
 */
export const setLocal = (key: string, value: unknown, expire: number | null = DEFAULT_CACHE_TIME): void => {
  const storageData: StorageData = {
    value,
    expire: expire !== null ? new Date().getTime() + expire * 1000 : null,
  };
  const json = JSON.stringify(storageData);
  localStorage.setItem(prefix + key, json);
};

export const getLocal = (key: string) => {
  const json = localStorage.getItem(prefix + key);
  if (!json) return null;

  let storageData: StorageData | null = null;
  storageData = JSON.parse(json as string);

  if (storageData) {
    const { value, expire } = storageData;
    if (expire === null || expire >= Date.now()) {
      return value;
    }
  }
  removeLocal(key);
  return null;
};

export const removeLocal = (key: string): void => {
  localStorage.removeItem(prefix + key);
};

export const clearLocal = (): void => {
  localStorage.clear();
};

/**
 * sessionStorage部分操作
 */
export function setSession(key: string, value: unknown) {
  const json = JSON.stringify(value);
  sessionStorage.setItem(prefix + key, json);
}

export function getSession<T>(key: string) {
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

export function removeSession(key: string) {
  window.sessionStorage.removeItem(prefix + key);
}

export function clearSession() {
  window.sessionStorage.clear();
}
