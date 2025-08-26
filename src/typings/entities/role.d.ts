/// <reference path="../global.d.ts"/>

/* 数据库表字段 */
namespace Entity {
  type RoleType = string

  interface Role {
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
    roleStatus?: number
    /**
     * 显示顺序
     */
    sort: number
    [property: string]: any
  }
}
