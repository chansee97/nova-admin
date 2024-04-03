import { request } from '../http'

interface Ilogin {
  username: string
  password: string
}

export function fetchLogin(params: Ilogin) {
  const methodInstance = request.Post<Service.ResponseResult<ApiAuth.loginInfo>>('/login', params)
  methodInstance.meta = {
    authRole: null,
  }
  return methodInstance
}
export function fetchUpdateToken(data: any) {
  const method = request.Post<Service.ResponseResult<ApiAuth.loginInfo>>('/updateToken', data)
  method.meta = {
    authRole: 'refreshToken',
  }
  return method
}

export function fetchUserRoutes(params: { id: number }) {
  return request.Get<Service.ResponseResult<AppRoute.RowRoute[]> >('/getUserRoutes', { params })
}
