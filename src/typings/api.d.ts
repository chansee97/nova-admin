/* 接口类型数据 */

/** 后端返回的用户相关类型 */
declare namespace ApiAuth {
  /* 登录返回的用户字段, 该数据是根据用户表扩展而来, 部分字段可能需要覆盖，例如id */
  interface loginInfo extends Auth.User {
    /** 用户id */
    id: number
    /** 用户角色类型 */
    role: RoleType
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
