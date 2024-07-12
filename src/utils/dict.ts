import { fetchDictList } from '@/service'
import { session } from '@/utils'

export const dictMap: DictMap = {}

/**
 * 获取与给定代码对应的字典对象
 *
 * @param code - 字典编码
 * @return 包含字典列表、值映射字典和标签映射字典的对象
 */
export async function dict(code: string) {
  const targetDict = await getDict(code)

  return {
    data: () => targetDict,
    enum: () => Object.fromEntries(targetDict.map(({ value, label }) => [value, label])),
    valueMap: () => Object.fromEntries(targetDict.map(({ value, ...data }) => [value, data])),
    labelMap: () => Object.fromEntries(targetDict.map(({ label, ...data }) => [label, data])),
  }
}

/**
 * 根据字典编码获取字典数据
 * 如果本地有缓存，则返回缓存数据，否则通过网络请求获取数据
 *
 * @param code - 字典编码
 * @return 字典数据
 */
export async function getDict(code: string) {
  const isExist = Reflect.has(dictMap, code)

  if (isExist) {
    return dictMap[code]
  }
  else {
    return await getDictByNet(code)
  }
}

/**
 * 通过网络请求获取字典数据
 *
 * @param code - 字典编码
 * @return 字典数据
 */
export async function getDictByNet(code: string) {
  const { data, isSuccess } = await fetchDictList(code)
  if (isSuccess) {
    Reflect.set(dictMap, code, data)
    // 同步至session
    session.set('dict', dictMap)
    return data
  }
  else {
    throw new Error(`Failed to get ${code} dictionary from network, check ${code} field or network`)
  }
}

function initDict() {
  const dict = session.get('dict')
  if (dict) {
    Object.assign(dictMap, dict)
  }
}

initDict()
