import { devRequest, mockRequest } from '../http'

interface Ilogin {
  userName: string
  password: string
}

export function fetchLogin(params: Ilogin) {
  return devRequest.post<any>('/auth/login', params)
}
export function fetchUpdateToken(params: any) {
  return mockRequest.post<ApiAuth.loginToken>('/updateToken', params)
}
export function fetchUserInfo(params: any) {
  return mockRequest.get<Auth.UserInfo>('/getUserInfo', { params })
}
export function fetchUserRoutes(params: { userId: number }) {
  return mockRequest.post<AppRoute.Route[]>('/getUserRoutes', params)
}
