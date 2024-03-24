import { alovaInstance } from '../http'

interface Ilogin {
  username: string
  password: string
}

export function fetchLogin(params: Ilogin) {
  const methodInstance = alovaInstance.Post<any>('/login', params)
  methodInstance.meta = {
    authRole: null,
  }
  return methodInstance
}
export function fetchUpdateToken(params: any) {
  const method = alovaInstance.Post<ApiAuth.loginInfo>('/updateToken', params)
  method.meta = {
    authRole: 'refreshToken',
  }
  return method
}

export function fetchUserRoutes(params: { id: number }) {
  return alovaInstance.Get<AppRoute.RowRoute[]>('/getUserRoutes', { params })
}
