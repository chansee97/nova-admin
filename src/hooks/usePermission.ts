import { useAuthStore } from '@/store'
import { isArray, isString } from 'radash'

/** 权限判断 */
export function usePermission() {
  const authStore = useAuthStore()

  function hasPermission(
    permission?: Entity.RoleType | Entity.RoleType[],
  ) {
    if (!permission)
      return true

    if (!authStore.userInfo)
      return false
    const { role } = authStore.userInfo

    // 角色为super可直接通过
    let has = role.includes('super')
    if (!has) {
      if (isArray(permission))
        // 角色为数组, 判断是否有交集
        has = permission.some(i => role.includes(i))

      if (isString(permission))
        // 角色为字符串, 判断是否包含
        has = role.includes(permission)
    }
    return has
  }

  return {
    hasPermission,
  }
}
