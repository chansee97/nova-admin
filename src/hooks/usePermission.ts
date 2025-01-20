import { useAuthStore } from '@/store'

/** 权限判断 */
export function usePermission() {
  const authStore = useAuthStore()

  function hasPermission(
    permission?: Entity.RoleType[],
  ) {
    if (!permission)
      return true

    if (!authStore.userInfo)
      return false
    const { role } = authStore.userInfo

    let has = role.includes('super')
    if (!has) {
      has = permission.every(i => role.includes(i))
    }
    return has
  }

  return {
    hasPermission,
  }
}
