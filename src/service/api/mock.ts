import { alovaInstance } from '../http'

export function fetchUserList() {
  return alovaInstance.Get('/userList')
}
