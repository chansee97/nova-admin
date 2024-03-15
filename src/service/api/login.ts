import { alovaInstance } from '../http'

interface Ilogin {
  username: string
  password: string
}

export function fetchLogin(params: Ilogin) {
  return alovaInstance.Post<any>('/login', params)
}
export function fetchUpdateToken(params: any) {
  const method = alovaInstance.Post<ApiAuth.loginToken>('/updateToken', params)
  method.meta = {
    authRole: 'refreshToken',
  }
  return method
}
export function fetchUserInfo(params: any) {
  return alovaInstance.Get<Auth.UserInfo>('/getUserInfo', { params })
}
export function fetchUserRoutes(params: { id: number }) {
  return alovaInstance.Get<AppRoute.Route[]>('/getUserRoutes', { params })
}
