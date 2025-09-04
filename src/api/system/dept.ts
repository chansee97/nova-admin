import { request } from '../../utils/alova'

export type DeptSearchQuery = Partial<Pick<Entity.Dept, 'deptName' | 'status'>>

/**
 * 创建部门
 * POST /dept
 */
export function createDept(data: Partial<Entity.Dept>) {
  return request.Post<Api.Response<Entity.Dept>>('/dept', data)
}

/**
 * 分页查询部门
 * GET /dept
 */
export function getDeptList(params?: DeptSearchQuery) {
  return request.Get<Api.Response<Entity.Dept[]>>('/dept', { params })
}

/**
 * 获取部门下拉选项
 * GET /dept/options
 */
export function getDeptOptions() {
  return request.Get<Api.Response<Entity.Dept[]>>('/dept/options')
}

/**
 * 查询部门详情
 * GET /dept/{id}
 */
export function getDeptById(id: number) {
  return request.Get<Api.Response<Entity.Dept>>(`/dept/${id}`)
}

/**
 * 更新部门信息
 * PUT /dept/{id}
 */
export function updateDept(id: number, data: Partial<Entity.Dept>) {
  return request.Patch<Api.Response<Entity.Dept>>(`/dept/${id}`, data)
}

/**
 * 删除部门
 * DELETE /dept/{id}
 */
export function deleteDept(id: number) {
  return request.Delete<Api.Response<boolean>>(`/dept/${id}`)
}
