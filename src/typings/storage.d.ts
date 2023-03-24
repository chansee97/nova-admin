declare namespace Storage {

  interface Session {
    demoKey: string
  }

  interface Local {
    userInfo: Auth.UserInfo
    token: string
    refreshToken: string
    tabsRoutes: string
  }
}