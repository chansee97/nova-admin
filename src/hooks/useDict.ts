import { useDictStore } from '@/store/dict'

/**
 * 字典数据转换工具类型
 */
export interface DictUtils {
  /** 原始字典数据 */
  data: Entity.DictData[]
  /** 枚举映射 { value: label } */
  enum: Record<string, string>
  /** 值映射 { value: dictData } */
  valueMap: Record<string, Omit<Entity.DictData, 'value'>>
  /** 标签映射 { label: dictData } */
  labelMap: Record<string, Omit<Entity.DictData, 'name'>>
  /** 选项数组 [{ label, value }] */
  options: Array<{ label: string, value: string }>
}

/**
 * 使用字典数据的 Hook
 * @param dictType 字典类型
 * @returns 字典工具对象和加载状态
 */
export function useDict(dictType: string) {
  const dictStore = useDictStore()

  const dictData = ref<Entity.DictData[]>([])

  // 获取字典数据
  async function fetchDict() {
    try {
      dictData.value = await dictStore.getDict(dictType)
    }
    catch (err) {
      console.error(`获取字典数据失败 [${dictType}]:`, err)
    }
  }

  // 立即获取数据
  fetchDict()

  const enumMap = computed(() => {
    return Object.fromEntries(
      dictData.value.map(({ value, name }) => [value, name]),
    )
  })
  const valueMap = computed(() => {
    return Object.fromEntries(
      dictData.value.map(({ value, ...data }) => [value, data]),
    )
  })
  const labelMap = computed(() => {
    return Object.fromEntries(
      dictData.value.map(({ name, ...data }) => [name, data]),
    )
  })

  const options = computed(() => {
    return dictData.value.map(({ name, value }) => ({
      label: name,
      value,
    }))
  })

  return {
    rawData: dictData,
    enumMap,
    valueMap,
    labelMap,
    options,
  }
}
