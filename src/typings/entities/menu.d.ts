/// <reference path="../global.d.ts"/>

/** 数据库表字段 */
namespace Entity {
  type MenuType = 'directory' | 'page' | 'permission'

  interface Menu {
    id: number
    /**
     * 组件路径
     */
    component: string
    /**
     * 菜单图标
     */
    icon: string
    /**
     * 是否缓存
     */
    keepAlive: boolean
    /**
     * 是否为外链
     */
    isLink: boolean
    /**
     * 菜单名称
     */
    title: string
    /**
     * 国际化标识Key
     */
    i18nKey: string
    /**
     * 菜单类型
     */
    menuType: MenuType
    /**
     * 父菜单ID
     */
    parentId: number
    /**
     * 路由地址
     */
    path: string
    /**
     * 高亮菜单路径
     */
    activePath: string
    /**
     * 权限标识
     */
    perms: string
    /**
     * 备注信息
     */
    remark: string
    /**
     * 显示顺序
     */
    sort: number
    /**
     * 菜单状态
     */
    status: number
    /**
     * 菜单显示状态
     */
    menuVisible: boolean
    /**
     * 标签栏显示状态
     */
    tabVisible: boolean
    /**
     * 子菜单
     */
    children?: Menu[]
  }
}
