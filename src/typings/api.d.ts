/* 接口类型数据 */

/** 后端返回的用户相关类型 */
declare namespace ApiAuth {
  /** 返回的用户信息 */
  type UserInfo = Auth.UserInfo;
  /* 登录token字段 */
  interface loginToken {
    token: string;
    refreshToken: string;
  }
}
declare namespace CommonList {
  /* 返回的性别类型 */
  type GenderType = '0' | '1' | null;
  interface UserList {
    id: number;
    name: string;
    age: number;
    gender: GenderType;
    email: string;
    address: string;
    role: Auth.RoleType;
    disabled: boolean;
  }
}
