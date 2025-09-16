/* 存放数据库实体表类型， 具体内容在 ./entities */
declare namespace Entity {
  interface TreeNode {
    id: number
    label: string
    children: TreeNode[]
  }
}

/* 各类接口返回的数据类型， 具体内容在 ./api */
declare namespace Api {
  interface PageParams {
    pageNum: number
    pageSize: number
  }

  interface Response<T> {
    /** 业务状态码 */
    code: number
    /** 业务信息 */
    message: string
    /** 业务数据 */
    data: T
  }

  interface ListResponse<T> extends Response {
    /** 业务数据 */
    data: {
      list: T[]
      total: number
    }
  }
}

interface Window {
  $loadingBar: import('naive-ui').LoadingBarApi
  $dialog: import('naive-ui').DialogApi
  $message: import('naive-ui').MessageApi
  $notification: import('naive-ui').NotificationApi
}

declare const AMap: any
declare const BMap: any

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent
  export default component
}

declare namespace NaiveUI {
  type ThemeColor = 'default' | 'error' | 'primary' | 'info' | 'success' | 'warning'
}

declare namespace App {
  type lang = 'zhCN' | 'enUS'

  interface Session {
    dict: {
      [key: string]: Entity.Dict[]
    }
  }

  interface Local {
    /* 存储用户信息 */
    userInfo: Entity.User
    /* 存储访问token */
    accessToken: string
    /* 存储刷新token */
    refreshToken: string
    /* 存储登录账号 */
    loginAccount: any
    /* 存储当前语言 */
    lang: App.lang
  }

  interface RouteRecord {
    name: string
    path: string
    redirect?: string
    component?: string | (() => Promise<unknown>)
    meta: Entity.Menu
    children?: RouteRecord[]
  }
}
