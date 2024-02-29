/** 用户相关模块 */
declare namespace Auth {
  /** 用户角色类型 */
  type RoleType = 'super' | 'admin' | 'user'
  interface UserInfo {
    /** 用户id */
    id: number
    /** 用户名 */
    userName: string
    /* 用户称呼 */
    nickName: string
    /* 用户头像 */
    avatar: string
    /** 用户角色类型 */
    role: RoleType

  }
}
/* 系统消息 */
declare namespace Message {
  interface Tab {
    key: number
    name: string
    badgeProps?: import('naive-ui').BadgeProps
    list: List[]
  }
  interface List {
    id: number
    title: string
    icon: string
    tagTitle?: string
    tagType?: 'error' | 'info' | 'success' | 'warning'
    description?: string
    isRead?: boolean
    date: string
  }
}
