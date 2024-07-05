import { fetchDictList } from '@/service'

interface DictState {
  dict: { [key: string]: Entity.Dict[] }
}

export const useDictStore = defineStore('dict-store', {
  state: (): DictState => {
    return {
      dict: {},
    }
  },
  actions: {
    async dict(code: string) {
      const targetDict = await this.getDict(code)

      return {
        list: () => targetDict,
        mapByValue: () => Object.fromEntries(targetDict.map(({ value, ...data }) => [value, data])),
        mapByLabel: () => Object.fromEntries(targetDict.map(({ label, ...data }) => [label, data])),
      }
    },
    async getDict(code: string) {
      const isExist = Reflect.has(this.dict, code)

      if (isExist) {
        return this.dict[code]
      }
      else {
        return await this.getDictByNet(code)
      }
    },
    async getDictByNet(code: string) {
      const { data, isSuccess } = await fetchDictList(code)
      if (isSuccess) {
        Reflect.set(this.dict, code, data)
        return data
      }
      else {
        throw new Error(`Failed to get ${code} dictionary from network, check ${code} field or network`)
      }
    },
  },
  persist: {
    storage: sessionStorage,
  },
})
