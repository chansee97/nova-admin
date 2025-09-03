import { request } from '../../utils/alova'

export type MenuSearchQuery = Partial<Pick<Entity.Menu, 'title' | 'status'>>
/**
 * 创建菜单
 * POST /menu
 */
export function createMenu(data: Partial<Entity.Menu>) {
  return request.Post<Api.Response<Entity.Menu>>('/menu', data)
}

/**
 * 分页查询菜单
 * GET /menu
 */
export function getMenuList(params?: MenuSearchQuery) {
  return request.Get<Api.Response<Entity.Menu[]>>('/menu', { params })
}

/**
 * 查询菜单详情
 * GET /menu/{id}
 */
export function getMenuById(id: number) {
  return request.Get<Api.Response<Entity.Menu>>(`/menu/${id}`)
}

/**
 * 更新菜单信息
 * PUT /menu/{id}
 */
export function updateMenu(id: number, data: Partial<Entity.Menu>) {
  return request.Put<Api.Response<Entity.Menu>>(`/menu/${id}`, data)
}

/**
 * 删除菜单
 * DELETE /menu/{id}
 */
export function deleteMenu(id: number) {
  return request.Delete<Api.Response<any>>(`/menu/${id}`)
}

/**
 * 查询菜单树
 * GET /menu/selectTree
 */
export function getMenuOptions() {
  return request.Get<Api.Response<Entity.TreeNode[]>>('/menu/options')
}
