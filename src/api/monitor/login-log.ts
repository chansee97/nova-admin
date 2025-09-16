import { request } from '@/utils/alova'

export type LoginLogSearchQuery = Partial<Entity.LoginLog> & Api.PageParams

/**
 * 分页查询登录日志列表
 */
export function getLoginLogPage(params: LoginLogSearchQuery) {
  return request.Get<Api.ListResponse<Entity.LoginLog>>('/login-log', { params })
}

/**
 * 获取登录日志详情
 */
export function getLoginLogDetail(id: number) {
  return request.Get<Entity.LoginLog>(`/login-log/${id}`)
}

/**
 * 删除登录日志
 */
export function deleteLoginLog(ids: string) {
  return request.Delete(`/login-log/${ids}`)
}

/**
 * 清空登录日志
 */
export function clearLoginLog() {
  return request.Delete('/login-log/clean')
}
