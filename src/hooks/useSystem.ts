import { useAuthStore } from '@/store'
import { isArray, isString } from '@/utils'

interface AppInfo {
  /** 项目名称 */
  name: string
}

/** 项目信息 */
export function useAppInfo(): AppInfo {
  const { VITE_APP_NAME: name } = import.meta.env

  return {
    name,
  }
}

/** 权限判断 */
export function usePermission() {
  const authStore = useAuthStore()

  function hasPermission(
    permission: Auth.RoleType | Auth.RoleType[] | undefined,
  ) {
    if (!permission)
      return true

    if (!authStore.userInfo)
      return false
    const { role } = authStore.userInfo

    let has = role === 'super'
    if (!has) {
      if (isArray(permission))
        has = permission.includes(role)

      if (isString(permission))
        has = permission === role
    }
    return has
  }

  return {
    hasPermission,
  }
}
