import { request } from '../../utils/alova'

// 字典类型查询参数接口
interface DictTypeQueryParams {
  pageNum?: number
  pageSize?: number
  dictName?: string
  dictType?: string
  status?: number
}

// 字典数据查询参数接口
interface DictDataQueryParams {
  pageNum?: number
  pageSize?: number
  dictType?: string
  dictLabel?: string
  status?: number
}

/**
 * ==================== 字典类型管理 ====================
 */

/**
 * 字典类型-创建
 * POST /dict/types
 */
export function createDictType(data: Partial<Entity.DictType>) {
  return request.Post<Api.Response<Entity.DictType>>('/dict/types', data)
}

/**
 * 字典类型-列表
 * GET /dict/types
 */
export function getDictTypeList(params?: DictTypeQueryParams) {
  return request.Get<Api.ListResponse<Entity.DictType>>('/dict/types', { params })
}

/**
 * 字典类型-详情
 * GET /dict/types/{id}
 */
export function getDictTypeById(id: number) {
  return request.Get<Api.Response<Entity.DictType>>(`/dict/types/${id}`)
}

/**
 * 字典类型-更新
 * PUT /dict/types/{id}
 */
export function updateDictType(id: number, data: Partial<Entity.DictType>) {
  return request.Put<Api.Response<Entity.DictType>>(`/dict/types/${id}`, data)
}

/**
 * 字典类型-删除
 * DELETE /dict/types/{id}
 */
export function deleteDictType(id: number) {
  return request.Delete<Api.Response<boolean>>(`/dict/types/${id}`)
}

/**
 * ==================== 字典数据管理 ====================
 */

/**
 * 字典数据-创建
 * POST /dict/data
 */
export function createDictData(data: Partial<Entity.DictData>) {
  return request.Post<Api.Response<Entity.DictData>>('/dict/data', data)
}

/**
 * 字典数据-列表
 * GET /dict/data
 */
export function getDictDataList(params?: DictDataQueryParams) {
  return request.Get<Api.ListResponse<Entity.DictData>>('/dict/data', { params })
}

/**
 * 字典数据-详情
 * GET /dict/data/{id}
 */
export function getDictDataById(id: number) {
  return request.Get<Api.Response<Entity.DictData>>(`/dict/data/${id}`)
}

/**
 * 字典数据-更新
 * PUT /dict/data/{id}
 */
export function updateDictData(id: number, data: Partial<Entity.DictData>) {
  return request.Put<Api.Response<Entity.DictData>>(`/dict/data/${id}`, data)
}

/**
 * 字典数据-删除
 * DELETE /dict/data/{id}
 */
export function deleteDictData(id: number) {
  return request.Delete<Api.Response<boolean>>(`/dict/data/${id}`)
}

/**
 * ==================== 字典数据查询 ====================
 */

/**
 * 字典数据-按类型查询
 * GET /dict/data/type/{dictType}
 */
export function getDictDataByType(dictType: string) {
  return request.Get<Api.Response<Entity.DictData[]>>(`/dict/data/type/${dictType}`)
}
