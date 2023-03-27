import { decrypto, encrypto } from './crypto'
// 读取缓存前缀
import { STORAGE_DEFAULT_CACHE_TIME, STORAGE_PREFIX } from '@/config'

interface StorageData<T> {
  value: T
  expire: number | null
}
/**
 * LocalStorage部分操作
 */
function createLocalStorage<T extends Storage.Local>() {
  // 默认缓存期限为7天

  function set<K extends keyof T>(key: K, value: T[K], expire: number = STORAGE_DEFAULT_CACHE_TIME) {
    const storageData: StorageData<T[K]> = {
      value,
      expire: new Date().getTime() + expire * 1000,
    }
    const json = encrypto(storageData)
    window.localStorage.setItem(`${STORAGE_PREFIX}${String(key)}`, json)
  }

  function get<K extends keyof T>(key: K) {
    const json = window.localStorage.getItem(`${STORAGE_PREFIX}${String(key)}`)
    if (!json)
      return null

    let storageData: StorageData<T[K]> | null = null
    try {
      storageData = decrypto(json)
    }
    catch {
      // 防止解析失败
    }

    if (storageData) {
      const { value, expire } = storageData
      if (expire === null || expire >= Date.now())
        return value
    }
    remove(key)
    return null
  }

  function remove(key: keyof T) {
    window.localStorage.removeItem(`${STORAGE_PREFIX}${String(key)}`)
  }

  function clear() {
    window.localStorage.clear()
  }
  return {
    set,
    get,
    remove,
    clear,
  }
}
/**
 * sessionStorage部分操作
 */

function createSessionStorage<T extends Storage.Session>() {
  function set<K extends keyof T>(key: K, value: T[K]) {
    const json = encrypto(value)
    window.sessionStorage.setItem(`${STORAGE_PREFIX}${String(key)}`, json)
  }
  function get<K extends keyof T>(key: K) {
    const json = sessionStorage.getItem(`${STORAGE_PREFIX}${String(key)}`)
    if (!json)
      return null

    let storageData: T[K] | null = null
    try {
      storageData = decrypto(json)
    }
    catch {
      // 防止解析失败
    }

    if (storageData)
      return storageData

    return null
  }
  function remove(key: keyof T) {
    window.sessionStorage.removeItem(`${STORAGE_PREFIX}${String(key)}`)
  }
  function clear() {
    window.sessionStorage.clear()
  }

  return {
    set,
    get,
    remove,
    clear,
  }
}

export const local = createLocalStorage()
export const session = createSessionStorage()
