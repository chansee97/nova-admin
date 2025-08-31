/// <reference path="../global.d.ts"/>

/** 数据库表字段 */
namespace Entity {
  interface User {
    /** 用户id */
    id: number
    /** 部门id */
    deptId?: any
    /** 用户名 */
    username: string
    /** 密码 */
    password: string
    /** 昵称 */
    nickName?: string
    /** 邮箱 */
    email?: string
    /** 手机号 */
    phone?: string
    /** 性别 */
    gender: 'male' | 'female' | 'unknown'
    /** 头像 */
    avatar?: string
    /** 用户状态 */
    status: number
    /** 创建时间 */
    createTime: string
    /** 更新时间 */
    updateTime: string
    /** 备注 */
    remark?: string
    /** 用户角色类型 */
    roles: Entity.Role[]
  }
}
