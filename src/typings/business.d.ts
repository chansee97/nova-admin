/** 用户相关模块 */
declare namespace Auth {
  /** 用户角色类型 */
  type RoleType = 'super' | 'admin' | 'user'
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
