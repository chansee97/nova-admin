/* 接口类型数据 */

/** 后端返回的用户相关类型 */
declare namespace ApiAuth {
  /* 登录返回的用户字段 */
  interface loginInfo {
    /** 用户id */
    id: number
    /** 用户名 */
    username: string
    /* 用户头像 */
    avatar?: string
    /* 用户邮箱 */
    email?: string
    /* 用户昵称 */
    nickname?: string
    /* 用户电话 */
    tel?: string
    /** 用户角色类型 */
    role: Auth.RoleType
    /** 访问toekn */
    accessToken: string
    /** 刷新toekn */
    refreshToken: string
  }
}
declare namespace CommonList {
  /* 返回的性别类型 */
  type GenderType = '0' | '1' | null
  interface UserList {
    id: number
    name: string
    age: number
    gender: GenderType
    email: string
    address: string
    role: Auth.RoleType
    disabled: boolean
  }
}
