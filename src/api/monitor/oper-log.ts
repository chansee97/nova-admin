import { request } from '@/utils/alova'

export interface OperLogQueryParams extends Api.PageParams {
}
/**
 * 分页查询操作日志列表
 */
export function getOperLogPage(params: OperLogQueryParams) {
  return request.Get<Api.ListResponse<Entity.OperLog>>('/oper-log', { params })
}

/**
 * 获取操作日志详情
 */
export function getOperLogDetail(id: number) {
  return request.Get<Entity.OperLog>(`/oper-log/${id}`)
}

/**
 * 删除操作日志
 */
export function deleteOperLog(ids: string) {
  return request.Delete(`/oper-log/${ids}`)
}

/**
 * 清空操作日志
 */
export function clearOperLog() {
  return request.Delete('/oper-log/clean')
}
