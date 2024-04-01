import { request } from '../http'

export function fetchUserList() {
  return request.Get('/userList')
}
