/// <reference path="../global.d.ts"/>

/* 数据库表字段 */
namespace Entity {
  type RoleType = string

  interface Role {
    /**
     * 角色ID
     */
    id: number
    /**
     * 菜单ID数组
     */
    menuIds?: number[]
    /**
     * 备注信息
     */
    remark?: string
    /**
     * 角色权限字符串
     */
    roleKey: string
    /**
     * 角色名称
     */
    roleName: string
    /**
     * 角色状态
     */
    status?: number
    /**
     * 数据范围（1：全部数据权限 2：自定数据权限 3：本部门数据权限 4：本部门及以下数据权限 5：仅本人数据权限）
     */
    dataScope: number
    /**
     * 创建时间
     */
    createTime?: string
    /**
     * 更新时间
     */
    updateTime?: string
    menus?: Entity.Menu[]
    depts?: Entity.Dept[]
    [property: string]: any
  }
}
