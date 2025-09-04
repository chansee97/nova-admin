import { request } from '../../utils/alova'

// 用户查询参数接口
export interface UserQueryParams {
  pageNum?: number
  pageSize?: number
  username?: string
  status?: number
  deptId?: number
}

/**
 * 创建用户
 * POST /user
 */
export function createUser(data: Partial<Entity.User>) {
  return request.Post<Api.Response<Entity.User>>('/user', data)
}

/**
 * 获取用户列表（分页）
 * GET /user
 */
export function getUserList(params?: UserQueryParams) {
  return request.Get<Api.ListResponse<Entity.User>>('/user', { params })
}

/**
 * 根据ID获取单个用户信息
 * GET /user/{id}
 */
export function getUserById(id: number) {
  return request.Get<Api.Response<Entity.User>>(`/user/${id}`)
}

/**
 * 更新用户信息
 * PUT /user/{id}
 */
export function updateUser(id: number, data: Partial<Entity.User>) {
  return request.Patch<Api.Response<Entity.User>>(`/user/${id}`, data)
}

/**
 * 删除用户
 * DELETE /user/{id}
 */
export function deleteUser(id: number) {
  return request.Delete<Api.Response<boolean>>(`/user/${id}`)
}
/**
 * 更新用户密码
 * Patch /user/password
 */
export interface UserPasswordParams {
  oldPassword: string
  newPassword: string
}
export function updateUserPassword(data: UserPasswordParams) {
  return request.Patch<Api.Response<boolean>>(`/user/password`, data)
}
