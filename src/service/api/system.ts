import { request } from '../http'

// 获取所有路由信息
export function fetchAllRoutes() {
  return request.Get<Service.ResponseResult<AppRoute.RowRoute[]>>('/getUserRoutes')
}

// 获取所有用户信息
export function fetchUserPage() {
  return request.Get<Service.ResponseResult<Entity.User[]>>('/userPage')
}
// 获取所有角色列表
export function fetchRoleList() {
  return request.Get<Service.ResponseResult<Entity.Role[]>>('/role/list')
}

// 获取所有字典列表
export function fetchDictList() {
  return request.Get<Service.ResponseResult<Entity.Dict[]>>('/dict/list')
}

// 获取所有字典列表
export function fetchDictContent(id: number) {
  const params = { id }
  return request.Get<Service.ResponseResult<Entity.Dict[]>>('/dict/contentById', { params })
}
