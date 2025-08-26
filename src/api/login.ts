import { request } from '../utils/alova'

interface LoginParams {
  userName: string
  password: string
  captchaId?: string
  captcha?: string
}

interface ResponseLogin {
  accessToken: string
  refreshToken?: string
}

interface ResponseRefreshToken {
  accessToken: string
  refreshToken: string
}

interface ResponseCaptchaImage {
  captchaId: string
  captchaImage: string
  enabled: boolean
}

export function fetchLogin(data: LoginParams) {
  return request.Post<Api.Response<ResponseLogin>>('/login', data, {
    meta: { authRole: null },
  })
}

export function fetchCaptchaImage() {
  return request.Get<Api.Response<ResponseCaptchaImage>>('/captcha', {
    meta: { authRole: null },
  })
}

export function fetchUserInfo() {
  return request.Get<Api.Response<Entity.User>>('/userInfo')
}

export function fetchRefreshToken(data: any) {
  return request.Post<Api.Response<ResponseRefreshToken>>('/refreshToken', data, {
    meta: { authRole: 'refreshToken' },
  })
}

export function fetchUserRoutes(params: { id: number }) {
  return request.Get<Api.Response<AppRoute.RowRoute[]>>('/getUserRoutes', { params })
}
