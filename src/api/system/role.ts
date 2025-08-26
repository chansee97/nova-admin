import { request } from '../../utils/alova'

// 角色查询参数接口
interface RoleQueryParams {
  pageNum?: number
  pageSize?: number
  roleName?: string
  roleKey?: string
  status?: number
}

/**
 * 创建角色
 * POST /role
 */
export function createRole(data: Partial<Entity.Role>) {
  return request.Post<Api.Response<Entity.Role>>('/role', data)
}

/**
 * 分页查询角色
 * GET /role
 */
export function getRoleList(params?: RoleQueryParams) {
  return request.Get<Api.ListResponse<Entity.Role>>('/role', { params })
}

/**
 * 查询角色详情
 * GET /role/{id}
 */
export function getRoleById(id: number) {
  return request.Get<Api.Response<Entity.Role>>(`/role/${id}`)
}

/**
 * 更新角色信息
 * PUT /role/{id}
 */
export function updateRole(id: number, data: Partial<Entity.Role>) {
  return request.Put<Api.Response<Entity.Role>>(`/role/${id}`, data)
}

/**
 * 删除角色
 * DELETE /role/{id}
 */
export function deleteRole(id: number) {
  return request.Delete<Api.Response<boolean>>(`/role/${id}`)
}
