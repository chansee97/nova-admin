import { getDictDataByType } from '@/api'

// 字典缓存项接口
interface DictCacheItem {
  data: Entity.DictData[]
  timestamp: number
  expireTime: number
}

// 默认缓存时间：60分钟
const DICT_CACHE_TIME = 60 * 60 * 1000

export const useDictStore = defineStore('dict-store', {
  state: () => {
    return {
      dictMap: {} as Record<string, DictCacheItem>,
    }
  },
  actions: {

    async getDict(code: string): Promise<Entity.DictData[]> {
      const cachedItem = this.dictMap[code]
      const now = Date.now()

      // 如果缓存存在且未过期，直接返回缓存数据
      if (cachedItem && now < cachedItem.expireTime) {
        return cachedItem.data
      }

      // 如果缓存不存在或已过期，尝试重新获取数据
      try {
        return await this.getDictByNet(code)
      }
      catch (error) {
        // 如果有旧的缓存数据，返回旧数据
        if (cachedItem) {
          return cachedItem.data
        }

        // 如果没有缓存数据，抛出错误
        throw error
      }
    },

    async getDictByNet(type: string): Promise<Entity.DictData[]> {
      const { data } = await getDictDataByType(type)
      const now = Date.now()

      // 创建缓存项
      const cacheItem: DictCacheItem = {
        data,
        timestamp: now,
        expireTime: now + DICT_CACHE_TIME,
      }

      this.dictMap[type] = cacheItem
      return data
    },

    // 清理字典缓存
    cleanDict() {
      this.dictMap = {}
    },

    // 移除指定字典缓存
    removeDict(dictType: string) {
      delete this.dictMap[dictType]
    },
  },
  persist: {
    storage: sessionStorage,
  },
})
