/* 存放数据库实体表类型， 具体内容在 ./entities */
declare namespace Entity {
}

/* 各类接口返回的数据类型， 具体内容在 ./api */
declare namespace Api {

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

// 修复naive-ui的TabPane组件的slots类型 https://github.com/tusen-ai/naive-ui/issues/6779 ,但是直接这样会导致更多类型报错，也无法查看naive-ui的源码
// declare module 'naive-ui' {
//   interface TabPaneSlots {
//     tab?: () => VNode[]
//   }
// }
declare namespace Storage {
  interface Session {
    dict: DictMap
  }

  interface Local {
    /* 存储用户信息 */
    userInfo: Api.Login.Info
    /* 存储访问token */
    accessToken: string
    /* 存储刷新token */
    refreshToken: string
    /* 存储登录账号 */
    loginAccount: any
    /* 存储当前语言 */
    lang: App.lang
  }
}

declare namespace App {
  type lang = 'zhCN' | 'enUS'
}

interface DictMap {
  [key: string]: Entity.Dict[]
}
