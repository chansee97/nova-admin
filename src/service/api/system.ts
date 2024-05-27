import { request } from '../http'

// 获取所有路由信息
export function fetchAllRoutes() {
  return request.Get<Service.ResponseResult<AppRoute.RowRoute[]> >('/getUserRoutes')
}

// 获取所有用户信息
export function fetchUserPage() {
  return request.Get<Service.ResponseResult<Entity.User[]> >('/userPage')
}
// 获取所有角色列表
export function fetchRoleList() {
  return request.Get<Service.ResponseResult<Entity.Role[]> >('/role/list')
}
