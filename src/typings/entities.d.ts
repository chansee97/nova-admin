/* 存放数据库实体表类型 */

/** 通用状态类型 false | true */
type CommonStatus = 0 | 1

/** 用户相关模块 */
declare namespace Auth {
  /** 用户角色类型 */
  type RoleType = 'super' | 'admin' | 'user'

  /** 用户信息 */
  interface User {
    /** 用户id */
    id?: number
    /** 用户名 */
    userName?: string
    /* 用户头像 */
    avatar?: string
    /* 用户性别 */
    gender?: CommonStatus
    /* 用户邮箱 */
    email?: string
    /* 用户昵称 */
    nickname?: string
    /* 用户电话 */
    tel?: string
    /** 用户角色类型 */
    role?: RoleType[]
    /** 用户状态 */
    status?: CommonStatus
    /** 备注 */
    remark?: string
  }

  interface Role {
    /** 用户id */
    id?: number
    /** 用户名 */
    role?: RoleType
  }
}
/* 系统消息 */
declare namespace Message {
  interface List {
    id: number
    type: 0 | 1 | 2
    title: string
    icon: string
    tagTitle?: string
    tagType?: 'error' | 'info' | 'success' | 'warning'
    description?: string
    isRead?: boolean
    date: string
  }
}
